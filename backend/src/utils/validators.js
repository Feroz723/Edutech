import { z } from 'zod';

export const courseSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.string().optional(),
    // instructor_id is handled server-side now for security
    thumbnail_url: z.string().optional().or(z.literal('')),
    price: z.number().min(0).optional(),
    level: z.string().optional(),
    duration: z.string().optional(),
});

export const statusUpdateSchema = z.object({
    status: z.enum(['draft', 'published']),
});

export const enrollmentSchema = z.object({
    courseId: z.string().min(1, 'Course ID is required'),
});

export const mediaRequestSchema = z.object({
    path: z.string().min(1, 'Path is required'),
    courseId: z.string().min(1, 'Course ID is required'),
});
