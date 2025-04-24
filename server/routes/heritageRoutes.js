// server/routes/heritageRoutes.js
const express = require('express');
const router = express.Router();
const HeritageSite = require('../models/HeritageSite');

// Get all virtual tours
router.get('/virtual-tours', async (req, res) => {
  try {
    const virtualTours = await HeritageSite.find({ hasVirtualTour: true });
    res.status(200).json({
      success: true,
      count: virtualTours.length,
      data: virtualTours
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;