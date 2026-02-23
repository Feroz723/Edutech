import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import { handleChatMessage } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', authenticateUser, handleChatMessage);

export default router;
