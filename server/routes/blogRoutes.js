const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const BlogPost = require('../models/BlogPost');

// POST /api/blog
router.post('/', 
  auth,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('category').trim().notEmpty().withMessage('Category is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = new BlogPost({
        ...req.body,
        excerpt: req.body.excerpt || req.body.content.substring(0, 150) + '...',
        author: req.user.id,
        imageUrl: req.body.imageUrl || 'default.jpg'
      });
      
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// GET /api/blog
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'name');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;