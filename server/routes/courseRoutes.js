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

// GET /api/courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'name email') // show instructor details
      .sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

// POST /api/courses/:id/enroll
router.post('/:id/enroll', protect, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can enroll in courses' });
    }

    const courseId = req.params.id;
    const user = await require('../models/User').findById(req.user.userId);

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Enrolled successfully ✅' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Enrollment failed' });
  }
});



module.exports = router;
