import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let isFirebaseInitialized = false;
let auth = null;
let db = null;
let storage = null;

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID?.replace(/^["']|["']$/g, ''),
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL?.replace(/^["']|["']$/g, ''),
};

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
