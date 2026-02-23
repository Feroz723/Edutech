import { db, isFirebaseInitialized } from '../config/firebaseAdmin.js';
import ApiError from '../utils/ApiError.js';

class LessonService {
    /**
     * Internal helper to verify Firebase
     */
    _checkInit() {
        if (!isFirebaseInitialized) {
            throw new ApiError(500, 'Firestore is not properly configured.');
        }
    }

    /**
     * Create a new lesson for a course
     */
    async createLesson(courseId, lessonData) {
        this._checkInit();

        // Get current max sort_order for this course
        const existing = await db.collection('lessons')
            .where('courseId', '==', courseId)
            .orderBy('sort_order', 'desc')
            .limit(1)
            .get();

        const lastLesson = existing.docs[0]?.data();
        const nextOrder = (lastLesson?.sort_order || 0) + 1;

        const lessonPayload = {
            courseId: courseId,
            title: lessonData.title,
            content: lessonData.content || '',
            video_url: lessonData.video_url || null,
            duration: lessonData.duration || null,
            sort_order: nextOrder,
            createdAt: new Date().toISOString()
        };

        const docRef = await db.collection('lessons').add(lessonPayload);
        return { id: docRef.id, ...lessonPayload };
    }

    /**
     * Get all lessons for a course (ordered)
     */
    async getLessonsByCourse(courseId) {
        this._checkInit();
        const snapshot = await db.collection('lessons')
            .where('courseId', '==', courseId)
            .orderBy('sort_order', 'asc')
            .get();

        const lessons = [];
        for (const doc of snapshot.docs) {
            const lessonData = { id: doc.id, ...doc.data() };

            // Fetch resources for this specific lesson
            const resSnapshot = await db.collection('resources')
                .where('lessonId', '==', doc.id)
                .get();

            lessonData.resources = resSnapshot.docs.map(rd => ({ id: rd.id, ...rd.data() }));
            lessons.push(lessonData);
        }

        return lessons;
    }

    /**
     * Update a lesson
     */
    async updateLesson(lessonId, updates) {
        this._checkInit();
        await db.collection('lessons').doc(lessonId).update(updates);
        const doc = await db.collection('lessons').doc(lessonId).get();
        return { id: doc.id, ...doc.data() };
    }

    /**
     * Delete a lesson
     */
    async deleteLesson(lessonId) {
        this._checkInit();
        await db.collection('lessons').doc(lessonId).delete();
        // Also delete resources associated with this lesson
        const resSnapshot = await db.collection('resources').where('lessonId', '==', lessonId).get();
        const batch = db.batch();
        resSnapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();

        return { deleted: true };
    }

    /**
     * Add a resource to a lesson
     */
    async addResource(lessonId, resourceData) {
        this._checkInit();

        let { course_id } = resourceData;
        if (!course_id) {
            const lessonDoc = await db.collection('lessons').doc(lessonId).get();
            course_id = lessonDoc.data()?.courseId;
        }

        const resourcePayload = {
            lessonId: lessonId,
            courseId: course_id,
            title: resourceData.title,
            file_url: resourceData.file_url,
            file_type: resourceData.file_type || 'Note',
            createdAt: new Date().toISOString()
        };

        const docRef = await db.collection('resources').add(resourcePayload);
        return { id: docRef.id, ...resourcePayload };
    }

    /**
     * Delete a resource
     */
    async deleteResource(resourceId) {
        this._checkInit();
        await db.collection('resources').doc(resourceId).delete();
        return { deleted: true };
    }
}

export default new LessonService();
