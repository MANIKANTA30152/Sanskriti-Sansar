const express = require('express');
const router = express.Router();

// Import with debug
const authMiddleware = require('../middleware/auth');
console.log('Auth Middleware:', {
  protect: typeof authMiddleware.protect,
  authorize: typeof authMiddleware.authorize
});

const {
  getUsers,
  getUser,
  getMe,
  createUser,
  updateUser,
  deleteUser,
  updateDetails,
  updatePassword,
  registerUser,
  loginUser
} = require('../controllers/users');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protect all routes after this middleware
router.use(authMiddleware.protect);

// User profile routes
router.get('/me', getMe);
router.put('/updatedetails', updateDetails);
router.put('/updatepassword', updatePassword);

// Admin only routes
router.use(authMiddleware.authorize('admin'));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;