const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const User = require('../models/User');

// GET all users (protected)
router.get('/users', protect, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
