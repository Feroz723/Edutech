import express from 'express';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';
import admin, { db } from '../config/firebaseAdmin.js';

const router = express.Router();

/**
 * GET /api/admin/users
 * Returns all users from the users collection (admin only)
 */
router.get('/users', authenticateUser, authorizeRole(['admin']), async (req, res) => {
    try {
        const snapshot = await db.collection('users').orderBy('email').get();

        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            name: doc.data().fullName || doc.data().name,
        }));

        res.json({
            success: true,
            data: users
        });
    } catch (err) {
        console.error('Admin users fetch error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

/**
 * POST /api/admin/students
 * Create a new student account via Firebase Auth Admin API + Firestore 'users' doc
 */
router.post('/students', authenticateUser, authorizeRole(['admin']), async (req, res) => {
    try {
        const { email, password, fullName } = req.body;

        if (!email || !password || !fullName) {
            return res.status(400).json({ error: 'email, password, and fullName are required' });
        }

        // 1. Create auth user via Firebase Admin SDK
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: fullName,
            emailVerified: true
        });

        // 2. Create profile in Firestore 'users' collection
        await db.collection('users').doc(userRecord.uid).set({
            email,
            fullName: fullName,
            role: 'student',
            plan: 'free',
            createdAt: new Date().toISOString()
        });

        res.status(201).json({
            success: true,
            data: {
                id: userRecord.uid,
                email,
                fullName: fullName,
                role: 'student',
                createdAt: new Date().toISOString()
            }
        });
    } catch (err) {
        console.error('Student creation error:', err.message);
        // Handle duplicate email or Firebase specific errors
        if (err.code === 'auth/email-already-exists') {
            return res.status(400).json({ error: 'A user with this email already exists' });
        }
        res.status(500).json({ error: err.message });
    }
});

/**
 * PUT /api/admin/students/:id
 * Update student profile in Firestore
 */
router.put('/students/:id', authenticateUser, authorizeRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { full_name, email } = req.body;

        const updates = {};
        if (full_name) updates.fullName = full_name;
        if (email) updates.email = email;

        await db.collection('users').doc(id).update(updates);

        const updatedDoc = await db.collection('users').doc(id).get();
        const data = updatedDoc.data();

        res.json({
            success: true,
            data: {
                id: updatedDoc.id,
                ...data,
                name: data.fullName || data.name
            }
        });
    } catch (err) {
        console.error('Student update error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

/**
 * DELETE /api/admin/students/:id
 * Delete a student (removes auth user + Firestore user doc)
 */
router.delete('/students/:id', authenticateUser, authorizeRole(['admin']), async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Delete from Firebase Auth
        await admin.auth().deleteUser(id);

        // 2. Delete Firestore user document
        await db.collection('users').doc(id).delete();

        res.json({
            success: true,
            message: 'Student deleted successfully'
        });
    } catch (err) {
        console.error('Student delete error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

export default router;
