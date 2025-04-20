const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['Dance', 'Music', 'Festivals', 'Cuisine', 'Architecture', 'Traditions', 'Art', 'Literature']
  },
  imageUrl: {
    type: String,
    default: 'default-image.jpg'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);