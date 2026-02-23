import express from 'express';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';
import { enrollInCourse, getMyEnrollments, adminAssignCourse, removeEnrollment, getCourseEnrollments, getStudentEnrollments, getStudentResources } from '../controllers/enrollmentController.js';

const router = express.Router();

// Student: Enroll in a course (self-enrollment)
router.post('/', authenticateUser, enrollInCourse);

// Student: Get my enrolled courses
router.get('/my', authenticateUser, getMyEnrollments);

// Student: Get resources across all enrolled courses
router.get('/resources', authenticateUser, getStudentResources);

// Admin: Assign course to student
router.post('/assign', authenticateUser, authorizeRole(['admin']), adminAssignCourse);

// Admin: Get all enrollments for a course
router.get('/course/:courseId', authenticateUser, authorizeRole(['admin']), getCourseEnrollments);

// Admin: Get specific student's enrollments
router.get('/student/:studentId', authenticateUser, authorizeRole(['admin']), getStudentEnrollments);

// Admin: Remove enrollment
router.delete('/:enrollmentId', authenticateUser, authorizeRole(['admin']), removeEnrollment);

export default router;
