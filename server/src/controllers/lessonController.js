import lessonService from '../services/lessonService.js';
import { asyncHandler } from '../middleware/error.js';

/**
 * Create a new lesson for a course
 */
export const createLesson = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const lessonData = req.body;

    const lesson = await lessonService.createLesson(courseId, lessonData);

    res.status(201).json({
        success: true,
        data: lesson
    });
});

/**
 * Get all lessons for a course
 */
export const getCourseLessons = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const lessons = await lessonService.getLessonsByCourse(courseId);

    res.json({
        success: true,
        data: lessons
    });
});

/**
 * Update a lesson
 */
export const updateLesson = asyncHandler(async (req, res) => {
    const { lessonId } = req.params;
    const updates = req.body;

    const lesson = await lessonService.updateLesson(lessonId, updates);

    res.json({
        success: true,
        data: lesson
    });
});

/**
 * Delete a lesson
 */
export const deleteLesson = asyncHandler(async (req, res) => {
    const { lessonId } = req.params;

    await lessonService.deleteLesson(lessonId);

    res.json({
        success: true,
        message: 'Lesson deleted successfully'
    });
});

/**
 * Add a resource to a lesson
 */
export const addResource = asyncHandler(async (req, res) => {
    const { lessonId } = req.params;
    const resourceData = req.body;

    const resource = await lessonService.addResource(lessonId, resourceData);

    res.status(201).json({
        success: true,
        data: resource
    });
});

/**
 * Delete a resource
 */
export const deleteResource = asyncHandler(async (req, res) => {
    const { resourceId } = req.params;

    await lessonService.deleteResource(resourceId);

    res.json({
        success: true,
        message: 'Resource deleted successfully'
    });
});

