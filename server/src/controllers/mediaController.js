import mediaService from '../services/mediaService.js';
import { asyncHandler } from '../middleware/error.js';
import { z } from 'zod';

const signedUrlSchema = z.object({
    courseId: z.string().optional(),
    path: z.string().min(1),
    bucket: z.string().optional()
});

/**
 * Get signed URL for media access
 */
export const getSignedUrl = asyncHandler(async (req, res) => {
    const validated = signedUrlSchema.parse(req.query);
    const userId = req.user.id;

    let signedUrl;

    if (req.user.role === 'admin') {
        signedUrl = await mediaService.getSignedUrlForAdmin('lessons', validated.path);
    } else {
        signedUrl = await mediaService.getSignedUrlForStudent(
            userId,
            validated.courseId,
            'lessons',
            validated.path
        );
    }

    res.json({
        success: true,
        data: { signedUrl }
    });
});

/**
 * Upload a file (video or resource) to Supabase Storage
 * Expects multipart/form-data with fields: bucket, folder
 */
export const uploadFile = asyncHandler(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
    }

    const bucket = req.body.bucket || 'lessons';
    const folder = req.body.folder || '';

    // Build storage path: folder/timestamp_filename
    const timestamp = Date.now();
    const safeName = req.file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = folder ? `${folder}/${timestamp}_${safeName}` : `${timestamp}_${safeName}`;

    const result = await mediaService.uploadFile(
        bucket,
        storagePath,
        req.file.buffer,
        req.file.mimetype
    );

    res.status(201).json({
        success: true,
        data: {
            path: storagePath,
            bucket,
            originalName: req.file.originalname,
            size: req.file.size,
            mimetype: req.file.mimetype
        }
    });
});

/**
 * Delete a file from storage
 */
export const deleteMedia = asyncHandler(async (req, res) => {
    const { bucket, path } = req.body;

    if (!bucket || !path) {
        return res.status(400).json({ error: 'bucket and path are required' });
    }

    await mediaService.deleteFile(bucket, path);

    res.json({
        success: true,
        message: 'File deleted successfully'
    });
});
