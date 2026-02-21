import { randomUUID } from 'crypto';
import morgan from 'morgan';

/**
 * Custom Morgan token for Request ID
 */
morgan.token('id', (req) => req.id);

/**
 * Middleware to attach unique Request ID to every request
 */
export const requestId = (req, res, next) => {
    req.id = req.headers['x-request-id'] || randomUUID();
    res.setHeader('x-request-id', req.id);
    next();
};

/**
 * Structured Logger using Morgan
 * Format: ID METHOD URL STATUS RESPONSE-TIME ms
 */
export const structuredLogger = morgan((tokens, req, res) => {
    const log = {
        id: tokens.id(req, res),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        responseTime: `${tokens['response-time'](req, res)}ms`,
        timestamp: new Date().toISOString()
    };

    // Only log JSON-style in production-like environments or if requested
    if (process.env.NODE_ENV === 'production') {
        return JSON.stringify(log);
    }

    // Readable dev format
    return `[${log.timestamp}] ${log.id} ${log.method} ${log.url} ${log.status} - ${log.responseTime}`;
});
