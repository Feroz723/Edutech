import express from 'express';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';
import {
    createLesson,
    getCourseLessons,
    updateLesson,
    deleteLesson,
    addResource,
    deleteResource
} from '../controllers/lessonController.js';

const router = express.Router();

// Get lessons for a course (authenticated users)
router.get('/:courseId', authenticateUser, getCourseLessons);

// Admin only: Create lesson
router.post('/:courseId', authenticateUser, authorizeRole(['admin']), createLesson);

// Admin only: Update lesson
router.put('/:lessonId', authenticateUser, authorizeRole(['admin']), updateLesson);

// Admin only: Delete lesson
router.delete('/:lessonId', authenticateUser, authorizeRole(['admin']), deleteLesson);

// Admin only: Add resource to lesson
router.post('/resources/:lessonId', authenticateUser, authorizeRole(['admin']), addResource);

// Admin only: Delete resource
router.delete('/resources/:resourceId', authenticateUser, authorizeRole(['admin']), deleteResource);

export default router;
