import courseService from '../services/courseService.js';
import { asyncHandler } from '../middleware/error.js';
import { courseSchema, statusUpdateSchema } from '../utils/validators.js';

/**
 * Controller for Course Management
 */
export const createCourse = asyncHandler(async (req, res) => {
    // 1. Validate Input
    const validatedData = courseSchema.parse(req.body);

    // 2. ENFORCE OWNERSHIP: Always use user ID from verified token
    const courseData = {
        ...validatedData,
        instructorId: req.user.id
    };

    // 3. Call Service
    const course = await courseService.createCourse(courseData);

    res.status(201).json({
        success: true,
        data: course
    });
});

export const getPublishedCourses = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const courses = await courseService.getPublishedCourses(page, limit);
    res.json({
        success: true,
        data: courses
    });
});

export const updateCourseStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = statusUpdateSchema.parse(req.body);

    const course = await courseService.updateCourseStatus(id, status);
    res.json({
        success: true,
        data: course
    });
});

export const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await courseService.updateCourse(id, req.body);
    res.json({
        success: true,
        data: course
    });
});

export const getCourseDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const course = await courseService.getCourseDetails(id);
    res.json({
        success: true,
        data: course
    });
});

/**
 * Get ALL courses regardless of status (Admin only)
 */
export const getAllCourses = asyncHandler(async (req, res) => {
    const courses = await courseService.getAllCourses();
    res.json({
        success: true,
        data: courses
    });
});

/**
 * Delete a course (Admin only)
 */
export const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await courseService.deleteCourse(id);
    res.json({
        success: true,
        message: 'Course deleted successfully'
    });
});

