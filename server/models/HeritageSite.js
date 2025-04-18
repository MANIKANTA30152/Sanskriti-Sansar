const mongoose = require('mongoose');

const heritageSiteSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  location: { 
    type: String, 
    required: [true, 'Please add a location'] 
  },
  description: { 
    type: String, 
    required: [true, 'Please add a description'] 
  },
  historicalPeriod: { 
    type: String, 
    required: [true, 'Please specify historical period'] 
  },
  architecturalStyle: { 
    type: String,
    trim: true
  },
  image: { 
    type: String,
    default: 'no-photo.jpg'
  },
  virtualTour: { 
    type: String 
  },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('HeritageSite', heritageSiteSchema);