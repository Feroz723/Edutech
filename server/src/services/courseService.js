import { db, isFirebaseInitialized } from '../config/firebaseAdmin.js';
import ApiError from '../utils/ApiError.js';

class CourseService {
    /**
     * Internal helper to verify Firebase
     */
    _checkInit() {
        if (!isFirebaseInitialized) {
            throw new ApiError(500, 'Firestore is not properly configured.');
        }
    }

    /**
     * Internal helper to resolve storage paths to public URLs
     */
    _resolveImageUrl(path) {
        if (!path) return null;
        if (path.startsWith('http')) return path; // Already a URL

        const bucketRaw = process.env.FIREBASE_STORAGE_BUCKET || '';
        const bucket = bucketRaw.replace('gs://', '');
        return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;
    }

    /**
     * Create a new course (Admin only)
     */
    async createCourse(courseData) {
        this._checkInit();
        const docRef = await db.collection('courses').add({
            ...courseData,
            status: 'draft',
            createdAt: new Date().toISOString()
        });
        const doc = await docRef.get();
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            thumbnail_url: this._resolveImageUrl(data.thumbnail_url)
        };
    }

    /**
     * Update course details (Admin only)
     */
    async updateCourse(courseId, updateData) {
        this._checkInit();

        // Remove restricted fields if they somehow slip in
        const { id, createdAt, instructorId, ...safeData } = updateData;

        await db.collection('courses').doc(courseId).update({
            ...safeData,
            updatedAt: new Date().toISOString()
        });

        const doc = await db.collection('courses').doc(courseId).get();
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            thumbnail_url: this._resolveImageUrl(data.thumbnail_url)
        };
    }

    /**
     * Update course status (Admin only)
     */
    async updateCourseStatus(courseId, status) {
        this._checkInit();
        await db.collection('courses').doc(courseId).update({ status });
        const doc = await db.collection('courses').doc(courseId).get();
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            thumbnail_url: this._resolveImageUrl(data.thumbnail_url)
        };
    }

    /**
     * Get all published courses (Public/Student)
     */
    async getPublishedCourses(page = 1, limit = 10) {
        this._checkInit();
        const snapshot = await db.collection('courses')
            .where('status', '==', 'published')
            .orderBy('createdAt', 'desc')
            .limit(limit)
            .get();

        const courses = [];
        for (const doc of snapshot.docs) {
            const data = doc.data();

            let instructorProfile = null;
            if (data.instructorId) {
                const userDoc = await db.collection('users').doc(data.instructorId).get();
                if (userDoc.exists) {
                    instructorProfile = {
                        full_name: userDoc.data().fullName || userDoc.data().name,
                        avatar_url: userDoc.data().avatar_url
                    };
                }
            }

            courses.push({
                id: doc.id,
                ...data,
                thumbnail_url: this._resolveImageUrl(data.thumbnail_url),
                profiles: instructorProfile
            });
        }
        return courses;
    }

    /**
     * Get course details with lessons
     */
    async getCourseDetails(courseId) {
        this._checkInit();
        const courseDoc = await db.collection('courses').doc(courseId).get();

        if (!courseDoc.exists) {
            throw new ApiError(404, 'Course not found');
        }

        const course = {
            id: courseDoc.id,
            ...courseDoc.data(),
            thumbnail_url: this._resolveImageUrl(courseDoc.data().thumbnail_url)
        };

        // Fetch lessons for this course
        const lessonSnapshot = await db.collection('lessons')
            .where('courseId', '==', courseId)
            .orderBy('sort_order', 'asc')
            .get();

        const lessons = [];
        for (const lDoc of lessonSnapshot.docs) {
            const lData = lDoc.data();
            // Fetch resources for each lesson
            const resSnapshot = await db.collection('resources')
                .where('lessonId', '==', lDoc.id)
                .get();

            lessons.push({
                id: lDoc.id,
                ...lData,
                resources: resSnapshot.docs.map(rd => ({ id: rd.id, ...rd.data() }))
            });
        }

        course.lessons = lessons;
        return course;
    }

    /**
     * Get ALL courses regardless of status (Admin only)
     */
    async getAllCourses() {
        this._checkInit();
        const snapshot = await db.collection('courses')
            .orderBy('createdAt', 'desc')
            .get();

        const courses = [];
        for (const doc of snapshot.docs) {
            const data = doc.data();

            let instructorProfile = null;
            if (data.instructorId) {
                const userDoc = await db.collection('users').doc(data.instructorId).get();
                if (userDoc.exists) {
                    instructorProfile = {
                        full_name: userDoc.data().fullName || userDoc.data().name,
                        avatar_url: userDoc.data().avatar_url
                    };
                }
            }

            courses.push({
                id: doc.id,
                ...data,
                thumbnail_url: this._resolveImageUrl(data.thumbnail_url),
                profiles: instructorProfile
            });
        }
        return courses;
    }

    /**
     * Delete a course (Admin only)
     */
    async deleteCourse(courseId) {
        this._checkInit();

        // 1. Delete all resources associated with this course
        const resourceSnapshot = await db.collection('resources').where('courseId', '==', courseId).get();
        const resBatch = db.batch();
        resourceSnapshot.docs.forEach(doc => resBatch.delete(doc.ref));
        await resBatch.commit();

        // 2. Delete all lessons associated with this course
        const lessonSnapshot = await db.collection('lessons').where('courseId', '==', courseId).get();
        const lessonBatch = db.batch();
        lessonSnapshot.docs.forEach(doc => lessonBatch.delete(doc.ref));
        await lessonBatch.commit();

        // 3. Delete all enrollments for this course
        const enrollmentSnapshot = await db.collection('enrollments').where('courseId', '==', courseId).get();
        const enrollBatch = db.batch();
        enrollmentSnapshot.docs.forEach(doc => enrollBatch.delete(doc.ref));
        await enrollBatch.commit();

        // 4. Delete the course itself
        await db.collection('courses').doc(courseId).delete();

        return { deleted: true };
    }
}

export default new CourseService();
