const HeritageSite = require('../models/HeritageSite');

exports.getHeritageSites = async (req, res) => {
  try {
    const sites = await HeritageSite.find();
    res.status(200).json({ success: true, data: sites });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};