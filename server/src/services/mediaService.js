import { isFirebaseInitialized, storage, db } from '../config/firebaseAdmin.js';
import ApiError from '../utils/ApiError.js';

export class MediaService {
    /**
     * Internal helper to get the default bucket
     */
    _getBucket() {
        if (!isFirebaseInitialized) {
            throw new ApiError(500, 'Firebase Storage is not properly configured.');
        }
        return storage.bucket();
    }

    /**
     * Upload a file to Firebase Storage
     */
    async uploadFile(bucketName, path, fileBuffer, contentType) {
        try {
            const bucket = this._getBucket();
            const file = bucket.file(path);

            await file.save(fileBuffer, {
                metadata: { contentType },
                resumable: false // Better for small buffers
            });

            return { path, bucket: bucket.name };
        } catch (error) {
            throw new ApiError(400, `Upload failed: ${error.message}`);
        }
    }

    /**
     * Delete a file from Firebase Storage
     */
    async deleteFile(bucketName, path) {
        try {
            const bucket = this._getBucket();
            await bucket.file(path).delete();
            return { deleted: true };
        } catch (error) {
            throw new ApiError(400, `Delete failed: ${error.message}`);
        }
    }

    /**
     * List files in a Firebase Storage folder
     */
    async listFiles(bucketName, folder) {
        try {
            const bucket = this._getBucket();
            const [files] = await bucket.getFiles({ prefix: folder });

            return files.map(file => ({
                name: file.name.split('/').pop(),
                id: file.name,
                metadata: file.metadata
            }));
        } catch (error) {
            throw new ApiError(400, `List failed: ${error.message}`);
        }
    }

    /**
     * Generates a signed URL for a private file, with strict enrollment verification.
     */
    async getSignedUrlForStudent(userId, courseId, bucketName, path, expiresIn = 3600) {
        if (!isFirebaseInitialized) {
            throw new ApiError(500, 'Firebase is not properly configured.');
        }

        // 1. Verify Enrollment via Firestore
        if (!courseId) {
            throw new ApiError(400, 'courseId is required for student access verification.');
        }

        const enrollmentQuery = await db.collection('enrollments')
            .where('userId', '==', userId)
            .where('courseId', '==', courseId)
            .limit(1)
            .get();

        if (enrollmentQuery.empty) {
            throw new ApiError(403, 'Access denied: Active enrollment required for this course.');
        }

        try {
            const bucket = this._getBucket();
            const [url] = await bucket.file(path).getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + (expiresIn * 1000)
            });

            return url;
        } catch (error) {
            throw new ApiError(400, `Storage operation failed: ${error.message}`);
        }
    }

    /**
     * Generate signed URL for admins
     */
    async getSignedUrlForAdmin(bucketName, path, expiresIn = 3600) {
        try {
            const bucket = this._getBucket();
            const [url] = await bucket.file(path).getSignedUrl({
                version: 'v4',
                action: 'read',
                expires: Date.now() + (expiresIn * 1000)
            });

            return url;
        } catch (error) {
            throw new ApiError(400, `Admin storage error: ${error.message}`);
        }
    }
}

export default new MediaService();
