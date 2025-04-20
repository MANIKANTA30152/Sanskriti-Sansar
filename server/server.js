const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

// Enhanced environment loading with debugging
const envPath = path.resolve(__dirname, '.env');
console.log(`\n=== Loading environment from: ${envPath} ===`.cyan);

// Load environment variables with validation
const envResult = dotenv.config({ path: envPath });
if (envResult.error) {
  console.error('❌ Error loading .env file:'.red, envResult.error);
  process.exit(1);
}

console.log('=== Environment Variables ==='.cyan);
console.log({
  NODE_ENV: process.env.NODE_ENV || 'Not set (default: development)',
  PORT: process.env.PORT || 'Not set (default: 5000)',
  MONGO_URI: process.env.MONGO_URI ? '✔ Loaded'.green : '❌ Missing (required)'.red,
  JWT_SECRET: process.env.JWT_SECRET ? '✔ Loaded'.green : '❌ Missing (required)'.red,
});
console.log('============================\n'.cyan);

// Connect to database
connectDB();

// Route files
const usersRouter = require('./routes/users');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/users', usersRouter);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`\nServer running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`.yellow.bold)
);

// Enhanced error handling
process.on('unhandledRejection', (err, promise) => {
  console.error(`\n❌ Unhandled Rejection at: ${promise}\nError: ${err.message}`.red);
  console.error(err.stack);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (err) => {
  console.error('\n❌ Uncaught Exception:'.red, err.message);
  console.error(err.stack);
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n🔴 SIGTERM received. Shutting down gracefully...'.yellow);
  server.close(() => {
    console.log('🟢 Process terminated'.green);
  });
});