const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Create user
// @route   POST /api/v1/users
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get user favorites
// @route   GET /api/v1/users/favorites
// @access  Private
exports.getFavorites = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.status(200).json({
      success: true,
      count: user.favorites.length,
      data: user.favorites
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      error: 'Error fetching favorites' 
    });
  }
};

// @desc    Add favorite
// @route   POST /api/v1/users/favorites/:id
// @access  Private
exports.addFavorite = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (user.favorites.includes(req.params.id)) {
    return next(new ErrorResponse('Already in favorites', 400));
  }

  user.favorites.push(req.params.id);
  await user.save();

  res.status(200).json({
    success: true,
    data: user.favorites
  });
});

// @desc    Remove favorite
// @route   DELETE /api/v1/users/favorites/:id
// @access  Private
exports.removeFavorite = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  
  if (!user.favorites.includes(req.params.id)) {
    return next(new ErrorResponse('Not found in favorites', 404));
  }

  user.favorites = user.favorites.filter(
    fav => fav.toString() !== req.params.id
  );
  await user.save();

  res.status(200).json({
    success: true,
    data: user.favorites
  });
});