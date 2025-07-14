const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route: GET /api/github/:username
router.get('/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const { data } = await axios.get(`https://api.github.com/users/${username}`);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
