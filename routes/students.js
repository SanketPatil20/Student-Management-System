const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');

const router = express.Router();

// Validation middleware
const validateStudent = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('course')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Course must be between 2 and 100 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('address')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Address cannot exceed 200 characters'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'graduated'])
    .withMessage('Status must be active, inactive, or graduated')
];

// GET /api/students - Fetch all students
router.get('/', async (req, res) => {
  try {
    const { search, course, status, sort = 'name', order = 'asc' } = req.query;
    
    // Build query
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { course: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (course) {
      query.course = { $regex: course, $options: 'i' };
    }
    
    if (status) {
      query.status = status;
    }
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;
    
    const students = await Student.find(query)
      .sort(sortObj)
      .select('-__v');
    
    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch students'
    });
  }
});

// GET /api/students/:id - Fetch single student
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-__v');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to fetch student'
    });
  }
});

// POST /api/students - Add new student
router.post('/', validateStudent, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // Check if email already exists
    const existingStudent = await Student.findOne({ email: req.body.email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    
    const student = new Student(req.body);
    await student.save();
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    console.error('Error creating student:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to create student'
    });
  }
});

// PUT /api/students/:id - Update student
router.put('/:id', validateStudent, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    // Check if email exists for other students
    if (req.body.email) {
      const existingStudent = await Student.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id }
      });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          error: 'Email already exists'
        });
      }
    }
    
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    console.error('Error updating student:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already exists'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to update student'
    });
  }
});

// DELETE /api/students/:id - Delete student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Student deleted successfully',
      data: { id: req.params.id }
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid student ID'
      });
    }
    res.status(500).json({
      success: false,
      error: 'Failed to delete student'
    });
  }
});

module.exports = router;
