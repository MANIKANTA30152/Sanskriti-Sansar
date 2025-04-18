const mongoose = require('mongoose');

const cultureSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'] 
  },
  category: { 
    type: String, 
    required: [true, 'Category is required'],
    enum: ['dance', 'music', 'festival', 'art', 'cuisine', 'clothing']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'] 
  },
  region: { 
    type: String, 
    required: [true, 'Region is required'] 
  },
  images: [{ 
    type: String 
  }],
  videos: [{ 
    type: String 
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Culture', cultureSchema);