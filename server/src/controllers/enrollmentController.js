import enrollmentService from '../services/enrollmentService.js';
import { asyncHandler } from '../middleware/error.js';
import { enrollmentSchema } from '../utils/validators.js';

/**
 * Student self-enrollment
 */
export const enrollInCourse = asyncHandler(async (req, res) => {
    const { courseId } = enrollmentSchema.parse(req.body);
    const studentId = req.user.id;

    const enrollment = await enrollmentService.enrollStudent(studentId, courseId);

    res.status(201).json({
        success: true,
        data: enrollment
    });
});

/**
 * Get my enrollments (student)
 */
export const getMyEnrollments = asyncHandler(async (req, res) => {
    const studentId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const enrollments = await enrollmentService.getStudentEnrollments(studentId, page, limit);

    res.json({
        success: true,
        data: enrollments
    });
});

/**
 * Admin assigns a course to a student
 */
export const adminAssignCourse = asyncHandler(async (req, res) => {
    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
        return res.status(400).json({ error: 'studentId and courseId are required' });
    }

    const enrollment = await enrollmentService.adminAssignCourse(studentId, courseId);

    res.status(201).json({
        success: true,
        data: enrollment
    });
});

/**
 * Admin gets all enrollments for a specific course
 */
export const getCourseEnrollments = asyncHandler(async (req, res) => {
    const { courseId } = req.params;

    const enrollments = await enrollmentService.getCourseEnrollments(courseId);

    res.json({
        success: true,
        data: enrollments
    });
});

/**
 * Admin removes an enrollment
 */
export const removeEnrollment = asyncHandler(async (req, res) => {
    const { enrollmentId } = req.params;

    await enrollmentService.removeEnrollment(enrollmentId);

    res.json({
        success: true,
        message: 'Enrollment removed successfully'
    });
});
/**
 * Admin: Get specific student's enrollments
 */
export const getStudentEnrollments = asyncHandler(async (req, res) => {
    const { studentId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const enrollments = await enrollmentService.getStudentEnrollments(studentId, page, limit);

    res.json({
        success: true,
        data: enrollments
    });
});

/**
 * Get resources for student's courses
 */
export const getStudentResources = asyncHandler(async (req, res) => {
    const studentId = req.user.id;
    const resources = await enrollmentService.getStudentResources(studentId);

    res.json({
        success: true,
        data: resources
    });
});
