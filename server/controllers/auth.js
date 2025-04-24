const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');
const validator = require('validator');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

// Password validation utility
const validatePassword = (password) => {
  const requirements = [
    { regex: /.{8,}/, message: 'at least 8 characters' },
    { regex: /[A-Z]/, message: 'one uppercase letter' },
    { regex: /[a-z]/, message: 'one lowercase letter' },
    { regex: /\d/, message: 'one number' },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, message: 'one special character' },
    { regex: /^.{8,20}$/, message: 'between 8 and 20 characters' },
    { regex: /^[^\s]+$/, message: 'no spaces' },
    { 
      test: (pwd) => !/(.)\1{2,}/.test(pwd), 
      message: 'no more than 2 repeating characters' 
    },
    {
      test: (pwd) => !pwd.toLowerCase().includes('password') && 
                     !pwd.toLowerCase().includes('123'),
      message: 'no common weak patterns'
    }
  ];

  const errors = [];
  requirements.forEach(req => {
    if ('regex' in req && !req.regex.test(password)) {
      errors.push(req.message);
    } else if ('test' in req && !req.test(password)) {
      errors.push(req.message);
    }
  });

  return errors.length > 0 ? `Password must contain ${errors.join(', ')}` : null;
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return next(new ErrorResponse('Please provide name, email and password', 400));
  }

  if (!validator.isEmail(email)) {
    return next(new ErrorResponse('Please provide a valid email address', 400));
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return next(new ErrorResponse(passwordError, 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse('Email already in use', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    emailVerificationToken: crypto.randomBytes(20).toString('hex'),
    lastPasswordChange: Date.now(),
    passwordVersion: 1
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  const user = await User.findOne({ email })
    .select('+password +loginAttempts +lockUntil');

  // Account lock check
  if (user?.lockUntil && user.lockUntil > Date.now()) {
    const retryAfter = Math.ceil((user.lockUntil - Date.now()) / 1000);
    return next(new ErrorResponse(
      `Account locked. Try again in ${retryAfter} seconds`, 
      423
    ));
  }

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    user.loginAttempts += 1;
    if (user.loginAttempts >= 5) {
      user.lockUntil = Date.now() + 15 * 60 * 1000;
    }
    await user.save();
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Reset security counters
  if (user.loginAttempts > 0 || user.lockUntil) {
    user.loginAttempts = 0;
    user.lockUntil = undefined;
  }

  user.lastLogin = Date.now();
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .select('-password -loginAttempts -lockUntil -emailVerificationToken');

  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      ...user.toObject(),
      security: {
        lastLogin: user.lastLogin,
        lastPasswordChange: user.lastPasswordChange
      }
    }
  });
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  try {
    // Clear HTTP-only cookie
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000), // Expire in 10 seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    res.status(200).json({
      success: true,
      data: { message: 'Logged out successfully' }
    });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error during logout'
    });
  }
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Current password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  user.passwordVersion += 1;
  user.lastPasswordChange = Date.now();
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('No user with that email', 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Please make a PUT request to:\n\n${resetUrl}`
    });

    res.status(200).json({ success: true, data: 'Email sent' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('Email could not be sent', 500));
  }
});

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid or expired token', 400));
  }

  user.password = req.body.password;
  user.passwordVersion += 1;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user.lastPasswordChange = Date.now();
  await user.save();

  sendTokenResponse(user, 200, res);
});

// Helper to send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken({
    lastLogin: user.lastLogin,
    passwordVersion: user.passwordVersion
  });

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
};