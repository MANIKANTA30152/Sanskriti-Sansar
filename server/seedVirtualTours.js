require('dotenv').config();
const mongoose = require('mongoose');
const HeritageSite = require('./models/HeritageSite');

// Debug: Verify environment variables are loaded
console.log('Environment Variables:', {
  MONGO_URI: process.env.MONGO_URI ? 'Exists' : 'Missing',
  MONGODB_URI: process.env.MONGODB_URI ? 'Exists' : 'Missing',
  NODE_ENV: process.env.NODE_ENV
});

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/indianculture')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    console.log('Database:', mongoose.connection.db.databaseName);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('Connection string used:', process.env.MONGODB_URI || process.env.MONGO_URI);
    process.exit(1);
  });

// Sample virtual tour data
const virtualTours = [
  {
    name: "Taj Mahal Virtual Tour",
    location: "Agra, India",
    description: "Explore the iconic white marble mausoleum",
    image: "https://example.com/taj-mahal.jpg",
    hasVirtualTour: true,
    virtualTourUrl: "https://example.com/taj-mahal-tour"
  },
  {
    name: "Red Fort Virtual Experience",
    location: "Delhi, India",
    description: "Walk through this historic Mughal fort",
    image: "https://example.com/red-fort.jpg",
    hasVirtualTour: true,
    virtualTourUrl: "https://example.com/red-fort-tour"
  }
];

async function seedDatabase() {
  try {
    console.log('⏳ Starting database seeding...');
    
    // Clear existing virtual tours
    const deleteResult = await HeritageSite.deleteMany({ hasVirtualTour: true });
    console.log(`🧹 Deleted ${deleteResult.deletedCount} existing virtual tours`);
    
    // Insert new virtual tours
    const createdTours = await HeritageSite.insertMany(virtualTours);
    console.log(`🌱 Successfully created ${createdTours.length} virtual tours`);
    
    console.log('✅ Database seeding completed!');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    console.error('Error details:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🔻 Received SIGINT. Closing connections...');
  await mongoose.disconnect();
  process.exit(0);
});

// Run the seed function
seedDatabase();