import admin from 'firebase-admin';
import { db } from '../src/config/firebaseAdmin.js';

// Configuration for initial admin
const ADMIN_EMAIL = 'admin@edutech.com';
const ADMIN_PASSWORD = 'AdminPassword123';
const ADMIN_NAME = 'System Administrator';

async function seedAdmin() {
    try {
        console.log('🚀 Starting Admin Seeding...');

        // 1. Create Auth User
        const userRecord = await admin.auth().createUser({
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            displayName: ADMIN_NAME,
            emailVerified: true
        });

        console.log(`✅ Auth user created: ${userRecord.uid}`);

        // 2. Create Firestore Profile
        await db.collection('users').doc(userRecord.uid).set({
            email: ADMIN_EMAIL,
            fullName: ADMIN_NAME,
            role: 'admin',
            plan: 'premium',
            createdAt: new Date().toISOString()
        });

        console.log('✅ Firestore profile created');
        console.log('\n-----------------------------------');
        console.log('CREDENTIALS:');
        console.log(`Email: ${ADMIN_EMAIL}`);
        console.log(`Password: ${ADMIN_PASSWORD}`);
        console.log('-----------------------------------\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
}

seedAdmin();
