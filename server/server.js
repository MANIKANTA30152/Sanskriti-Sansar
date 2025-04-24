const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Debug log for environment variables
console.log('Environment Variables Loaded:', {
  MONGO_URI: process.env.MONGO_URI ? 'Exists' : 'Missing',
  MONGODB_URI: process.env.MONGODB_URI ? 'Exists' : 'Missing',
  NODE_ENV: process.env.NODE_ENV
});

// Connect to database
mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/indianculture')
  .then(() => console.log('✅ MongoDB Connected'.green.bold))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:'.red.bold, err.message);
    process.exit(1);
  });

// Route files
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const heritageRoutes = require('./routes/heritageRoutes');

const app = express();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per window
  message: {
    success: false,
    error: 'Too many attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Security middleware
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(mongoSanitize());

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Apply rate limiting to auth routes
app.use('/api/v1/auth/login', authLimiter);
app.use('/api/v1/auth/register', authLimiter);

// Test endpoint
app.get('/api/v1/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working',
    version: 'v1'
  });
});

// Mount routers
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/heritage-sites', heritageRoutes);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});
app.use((req, res, next) => {
  if (req.path === '/api/v1/auth/me' || req.path === '/favicon.ico') {
    return next();
  }
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use('/api/heritage-sites/virtual-tours', (req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 minute cache
  next();
});
// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Internal Server Error' 
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle process termination
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:'.red.bold, err);
  server.close(() => process.exit(1));
});