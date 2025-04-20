const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  // Validate MONGO_URI exists before attempting connection
  if (!process.env.MONGO_URI) {
    console.error('❌ MongoDB Connection Error:'.red.bold, 'MONGO_URI is not defined in environment variables');
    process.exit(1);
  }

  try {
    console.log('⌛ Attempting MongoDB connection...'.yellow);
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      maxPoolSize: 10, // Maximum number of sockets in the connection pool
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    console.log(`   Database Name: ${conn.connection.name}`.cyan);
    console.log(`   MongoDB Version: ${conn.connection.version}`.cyan);
    
    return conn;
  } catch (error) {
    console.error('\n❌ MongoDB Connection Failed:'.red.bold);
    console.error(`   Error: ${error.message}`.red);
    
    // Provide more detailed error information
    if (error.name === 'MongooseServerSelectionError') {
      console.error('   Possible causes:'.yellow);
      console.error('   - Incorrect connection string'.yellow);
      console.error('   - Database server not running'.yellow);
      console.error('   - Network connectivity issues'.yellow);
    }
    
    process.exit(1);
  }
};

// MongoDB connection event listeners
mongoose.connection.on('connected', () => {
  console.log('ℹ️  Mongoose connected to DB cluster'.green);
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:'.red, err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Mongoose disconnected from DB'.yellow);
});

// Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received: Closing MongoDB connection...`.yellow);
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed gracefully'.green);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error closing MongoDB connection:'.red, err);
    process.exit(1);
  }
};

// Handle different shutdown signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

module.exports = connectDB;