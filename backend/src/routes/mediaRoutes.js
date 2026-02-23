import express from 'express';
import multer from 'multer';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';
import { getSignedUrl, uploadFile, deleteMedia } from '../controllers/mediaController.js';

const router = express.Router();

// Multer config: store in memory buffer (for Supabase upload)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max
});

// Get signed URL for a file (students need enrollment, admins get direct access)
router.get('/signed-url', authenticateUser, getSignedUrl);

// Admin: Upload file to storage
router.post('/upload', authenticateUser, authorizeRole(['admin']), upload.single('file'), uploadFile);

// Admin: Delete file from storage
router.delete('/delete', authenticateUser, authorizeRole(['admin']), deleteMedia);

export default router;
