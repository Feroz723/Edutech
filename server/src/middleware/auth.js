import { isFirebaseInitialized, auth, db } from '../config/firebaseAdmin.js';

/**
 * Middleware to verify Firebase ID token and fetch user data from Firestore
 */
export const authenticateUser = async (req, res, next) => {
    // Check if Firebase is properly configured
    if (!isFirebaseInitialized) {
        return res.status(500).json({
            error: 'Firebase Auth is not properly configured on the server. Please check environment variables.'
        });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 1. Verify Firebase ID Token
        const decodedToken = await auth.verifyIdToken(token);

        if (!decodedToken) {
            throw new Error('Invalid or expired token');
        }

        const uid = decodedToken.uid;

        // 2. Fetch user profile from Firestore 'users' collection
        const userDoc = await db.collection('users').doc(uid).get();

        if (!userDoc.exists) {
            console.warn(`User document not found for uid ${uid}. Defaulting to student.`);
        }

        const userData = userDoc.data();

        // 3. Attach consolidated user info to request
        req.user = {
            id: uid,
            email: decodedToken.email,
            role: userData?.role || 'student', // Firestore is the new source of truth
            fullName: userData?.full_name || userData?.name,
            plan: userData?.plan || 'free'
        };

        next();
    } catch (error) {
        console.error('Authentication Error:', error.message);
        return res.status(401).json({ error: error.message || 'Authentication failed' });
    }
};

/**
 * RBAC Middleware to restrict access based on user role
 */
export const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: `Access denied. ${req.user.role} role is not authorized.`
            });
        }

        next();
    };
};
