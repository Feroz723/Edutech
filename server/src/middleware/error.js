/**
 * Centralized Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
    const isProduction = process.env.NODE_ENV === 'production';
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // 1. Handle Zod Validation Errors
    if (err.name === 'ZodError') {
        statusCode = 400;
        message = err.errors.map(e => e.message).join(', ');
    }

    // 2. Log full error internally with Request ID
    console.error(`[API Error] ID:${req.id || 'N/A'} ${req.method} ${req.url}:`, {
        message: err.message,
        status: statusCode,
        stack: isProduction ? null : err.stack,
    });

    // 3. Clean Response for Client
    res.status(statusCode).json({
        success: false,
        error: isProduction && statusCode === 500 ? 'An internal server error occurred' : message,
        requestId: req.id, // For tracking
        ...(!isProduction && { stack: err.stack })
    });
};

/**
 * 404 Not Found Handler
 */
export const notFound = (req, res, next) => {
    const error = new Error(`Resource not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/**
 * Generic Async Wrapper
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
