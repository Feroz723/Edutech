import { db } from '../config/firebaseAdmin.js';
import { asyncHandler } from '../middleware/error.js';
import ApiError from '../utils/ApiError.js';

/**
 * Update user profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const updates = req.body;

    // Filter allowed updates
    const allowedFields = ['fullName', 'name', 'phone', 'bio', 'location', 'dateOfBirth', 'education', 'experience', 'avatar'];
    const filteredUpdates = {};

    Object.keys(updates).forEach(key => {
        if (allowedFields.includes(key)) {
            filteredUpdates[key] = updates[key];
        }
    });

    if (Object.keys(filteredUpdates).length === 0) {
        throw new ApiError(400, 'No valid fields provided for update');
    }

    await db.collection('users').doc(id).update({
        ...filteredUpdates,
        updatedAt: new Date().toISOString()
    });

    const updatedDoc = await db.collection('users').doc(id).get();

    res.json({
        success: true,
        data: {
            id: updatedDoc.id,
            ...updatedDoc.data()
        }
    });
});

/**
 * Get student dashboard statistics
 */
export const getStudentStats = asyncHandler(async (req, res) => {
    const { id } = req.user;

    const enrollmentsSnapshot = await db.collection('enrollments')
        .where('userId', '==', id)
        .get();

    // In a real app, you'd track progress/lessons completed in a separate collection.
    // For now, we'll return the enrollment count and some placeholders for consistency.
    res.json({
        success: true,
        data: {
            enrollments: enrollmentsSnapshot.length,
            completed: 0, // Placeholder
            inProgress: enrollmentsSnapshot.length,
            certificates: 0 // Placeholder
        }
    });
});
