// routes/courseRoutes.js
const express = require('express');
const Course = require('../models/Course');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware to check role === instructor
const instructorOnly = (req, res, next) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ message: 'Access denied: Instructors only' });
  }
  next();
};

// POST /api/courses
router.post('/', protect, instructorOnly, async (req, res) => {
  try {
    const { title, description, videoUrl, resources } = req.body;

    const newCourse = new Course({
      title,
      description,
      videoUrl,
      resources,
      instructor: req.user.userId,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create course' });
  }
});

module.exports = router;
