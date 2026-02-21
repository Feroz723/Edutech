import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { updateProfile, getStudentStats } from '../controllers/userController.js';

const router = express.Router();

router.use(authenticateUser);

router.put('/profile', updateProfile);
router.get('/stats', getStudentStats);

export default router;
