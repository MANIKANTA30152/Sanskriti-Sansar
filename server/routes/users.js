const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getFavorites,
  addFavorite,
  removeFavorite
} = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

// All routes protected after this middleware
router.use(protect);

// User profile routes
router.get('/me', getUser); // Reusing getUser with req.user.id
router.get('/favorites', getFavorites);
router.post('/favorites/:id', addFavorite);
router.delete('/favorites/:id', removeFavorite);

// Admin-only routes
router.use(authorize('admin'));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;