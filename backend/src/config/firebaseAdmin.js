import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let isFirebaseInitialized = false;
let auth = null;
let db = null;
let storage = null;

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID?.replace(/^["']|["']$/g, '').trim(),
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n').trim(),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.replace(/^["']|["']$/g, '').trim(),
};

// Fix for keys that might have lost their newlines during a literal copy-paste from service-account.json
if (serviceAccount.privateKey && !serviceAccount.privateKey.includes('\n')) {
    console.warn('⚠️ FIREBASE ADMIN: Private key has no newlines. Attempting to restore PEM format.');
    // PEM private keys have very specific parts. This is a heuristic to restore newlines.
    serviceAccount.privateKey = serviceAccount.privateKey
        .replace('-----BEGIN PRIVATE KEY-----', '-----BEGIN PRIVATE KEY-----\n')
        .replace('-----END PRIVATE KEY-----', '\n-----END PRIVATE KEY-----');
}

try {
    // Only initialize if all basic required credentials exist
    if (serviceAccount.projectId && serviceAccount.privateKey && serviceAccount.clientEmail) {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                storageBucket: process.env.FIREBASE_STORAGE_BUCKET
            });
        }
        isFirebaseInitialized = true;
        auth = admin.auth();
        db = admin.firestore();
        storage = admin.storage();
        console.log('✅ Firebase Admin initialized successfully');
    } else {
        console.warn('⚠️ FIREBASE ADMIN WARNING: Missing credentials in .env. Authentication will fail.');
    }
} catch (error) {
    console.warn('❌ FIREBASE ADMIN ERROR:', error.message);
}

export { isFirebaseInitialized, auth, db, storage };
export default admin;
