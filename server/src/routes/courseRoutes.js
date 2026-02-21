import express from 'express';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';
import {
  createCourse,
  getPublishedCourses,
  updateCourseStatus,
  getCourseDetails,
  getAllCourses,
  deleteCourse,
  updateCourse
} from '../controllers/courseController.js';

const router = express.Router();

// Admin Only: Get ALL courses (draft + published) — must be before /:id
router.get('/all', authenticateUser, authorizeRole(['admin']), getAllCourses);

// Public/Student: Get all published courses
router.get('/', authenticateUser, getPublishedCourses);

// Get specific course details
router.get('/:id', authenticateUser, getCourseDetails);

// Admin Only: Create Course
router.post('/', authenticateUser, authorizeRole(['admin']), createCourse);

// Admin Only: Update Status (Publish/Unpublish)
router.patch('/:id/status', authenticateUser, authorizeRole(['admin']), updateCourseStatus);

// Admin Only: Update Course Meta
router.patch('/:id', authenticateUser, authorizeRole(['admin']), updateCourse);

// Admin Only: Delete Course
router.delete('/:id', authenticateUser, authorizeRole(['admin']), deleteCourse);

export default router;

