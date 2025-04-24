const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const BlogPost = require('../models/BlogPost');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { getPosts } = require('../controllers/blogPosts');


// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
router.get('/', asyncHandler(async (req, res, next) => {
  // Add pagination, filtering, etc. here if needed
  const posts = await BlogPost.find()
    .populate('author', 'name email')
    .sort('-createdAt');

  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts
  });
}));

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res, next) => {
  const post = await BlogPost.findById(req.params.id).populate('author', 'name email');

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: post
  });
}));

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private
router.post(
  '/',
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').trim().notEmpty().withMessage('Category is required')
  ],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array()[0].msg, 400));
    }

    const post = await BlogPost.create({
      ...req.body,
      excerpt: req.body.excerpt || req.body.content.substring(0, 150) + '...',
      author: req.user.id,
      imageUrl: req.body.imageUrl || 'default.jpg'
    });

    res.status(201).json({
      success: true,
      data: post
    });
  })
);

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private
router.put(
  '/:id',
  auth,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
    body('category').optional().trim().notEmpty().withMessage('Category cannot be empty')
  ],
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array()[0].msg, 400));
    }

    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      return next(
        new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is post owner
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this post`,
          401
        )
      );
    }

    post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: post
    });
  })
);

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private
router.delete(
  '/:id',
  auth,
  asyncHandler(async (req, res, next) => {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return next(
        new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is post owner
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this post`,
          401
        )
      );
    }
    
router.route('/')
.get(getPosts);

    await post.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  })
);

module.exports = router;