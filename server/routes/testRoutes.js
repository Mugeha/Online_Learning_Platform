const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

// GET /api/protected
router.get('/protected', protect, (req, res) => {
  res.json({
    message: `Welcome ${req.user.role}! Your ID is ${req.user.userId}`,
  });
});

module.exports = router;
