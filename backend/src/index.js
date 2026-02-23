import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { requestId, structuredLogger } from './middleware/logger.js';
import { notFound, errorHandler } from './middleware/error.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const IS_PROD = process.env.NODE_ENV === 'production';

// 1. Request Context & Logging
app.use(requestId);
app.use(structuredLogger);

// 2. Security & Body Parsing
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// 3. Global Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: IS_PROD ? 100 : 1000,
    message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// 4. Health Check
app.get('/health', async (req, res) => {
    res.json({
        status: 'healthy',
        environment: process.env.NODE_ENV
    });
});

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Edutech API',
        version: '1.0.0'
    });
});

// 5. API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/users', userRoutes);

// 6. 404 & Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Edutech Backend [${process.env.NODE_ENV}] running on port ${PORT}`);
});
