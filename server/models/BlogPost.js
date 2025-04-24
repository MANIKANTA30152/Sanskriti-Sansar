const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [100, 'Content should be at least 100 characters long']
  },
  excerpt: {
    type: String,
    maxlength: [200, 'Excerpt cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: [
        'Festival', 
        'Heritage', 
        'Art', 
        'Cuisine',
        'Dance', 
        'Music', 
        'Architecture', 
        'Traditions', 
        'Literature'
      ],
      message: 'Invalid category'
    }
  },
  tags: {
    type: [String],
    validate: {
      validator: function(tags) {
        return tags.length <= 5;
      },
      message: 'Cannot have more than 5 tags'
    }
  },
  imageUrl: {
    type: String,
    required: [true, 'Featured image is required'],
    match: [
      /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webp)/,
      'Please use a valid image URL (jpg, png, gif, webp)'
    ],
    default: 'default-image.jpg'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'published'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true, // Automatically creates createdAt and updatedAt fields
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for like count
BlogPostSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
BlogPostSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Indexes for better performance
BlogPostSchema.index({ title: 'text', content: 'text', tags: 'text' });
BlogPostSchema.index({ category: 1, status: 1, featured: 1 });

module.exports = mongoose.model('BlogPost', BlogPostSchema);