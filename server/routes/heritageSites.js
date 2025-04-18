const express = require('express');
const router = express.Router();
const HeritageSite = require('../models/HeritageSite');

// @desc    Get all heritage sites
// @route   GET /api/heritage-sites
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const sites = await HeritageSite.find().sort({ createdAt: -1 });
    res.json(sites);
  } catch (err) {
    next(err);
  }
});

// @desc    Add new heritage site
// @route   POST /api/heritage-sites
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const newSite = new HeritageSite({
      ...req.body,
      coordinates: req.body.coordinates || undefined
    });
    const site = await newSite.save();
    res.status(201).json(site);
  } catch (err) {
    next(err);
  }
});

// @desc    Get single heritage site
// @route   GET /api/heritage-sites/:id
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const site = await HeritageSite.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ message: 'Heritage site not found' });
    }
    res.json(site);
  } catch (err) {
    next(err);
  }
});

module.exports = router;