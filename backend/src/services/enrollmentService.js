import { db, isFirebaseInitialized } from '../config/firebaseAdmin.js';
import ApiError from '../utils/ApiError.js';

class EnrollmentService {
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
        if (path.startsWith('http')) return path;
        const bucketRaw = process.env.FIREBASE_STORAGE_BUCKET || '';
        const bucket = bucketRaw.replace('gs://', '');
        return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;
    }

    /**
     * Enroll a student in a course (Student self-enrollment)
     */
    async enrollStudent(studentId, courseId) {
        this._checkInit();

        // 1. Verify course is published
        const courseDoc = await db.collection('courses').doc(courseId).get();

        if (!courseDoc.exists) {
            throw new ApiError(404, 'Course not found');
        }

        const course = courseDoc.data();
        if (course.status !== 'published') {
            throw new ApiError(400, 'Cannot enroll in a course that is not published');
        }

        // 2. Check for existing enrollment
        const existing = await db.collection('enrollments')
            .where('userId', '==', studentId)
            .where('courseId', '==', courseId)
            .limit(1)
            .get();

        if (!existing.empty) {
            throw new ApiError(400, 'Already enrolled in this course');
        }

        // 3. Insert enrollment
        const enrollmentData = {
            userId: studentId,
            courseId: courseId,
            status: 'active',
            enrolledAt: new Date().toISOString()
        };

        const docRef = await db.collection('enrollments').add(enrollmentData);
        return { id: docRef.id, ...enrollmentData };
    }

    /**
     * Admin assigns a course to a student
     */
    async adminAssignCourse(studentId, courseId) {
        this._checkInit();

        // 1. Verify course exists
        const courseDoc = await db.collection('courses').doc(courseId).get();
        if (!courseDoc.exists) {
            throw new ApiError(404, 'Course not found');
        }

        const course = courseDoc.data();

        // 2. Check for existing enrollment
        const existing = await db.collection('enrollments')
            .where('userId', '==', studentId)
            .where('courseId', '==', courseId)
            .limit(1)
            .get();

        if (!existing.empty) {
            throw new ApiError(400, 'Student is already assigned to this course');
        }

        // 3. Insert enrollment
        const enrollmentData = {
            userId: studentId,
            courseId: courseId,
            status: 'active',
            enrolledAt: new Date().toISOString()
        };

        const docRef = await db.collection('enrollments').add(enrollmentData);
        return {
            id: docRef.id,
            ...enrollmentData,
            courses: { id: courseDoc.id, title: course.title }
        };
    }

    /**
     * Get enrolled courses for a student
     */
    async getStudentEnrollments(studentId, page = 1, limit = 50) {
        this._checkInit();

        const snapshot = await db.collection('enrollments')
            .where('userId', '==', studentId)
            .orderBy('enrolledAt', 'desc')
            .limit(limit)
            .get();

        const enrollments = [];
        for (const doc of snapshot.docs) {
            const data = doc.data();

            let courseData = null;
            if (data.courseId) {
                const courseDoc = await db.collection('courses').doc(data.courseId).get();
                if (courseDoc.exists) {
                    const cData = courseDoc.data();
                    courseData = {
                        id: courseDoc.id,
                        ...cData,
                        thumbnail_url: this._resolveImageUrl(cData.thumbnail_url)
                    };
                }
            }

            enrollments.push({
                id: doc.id,
                ...data,
                courses: courseData
            });
        }

        return enrollments;
    }

    /**
     * Get all enrollments for a specific course (Admin)
     */
    async getCourseEnrollments(courseId) {
        this._checkInit();

        const snapshot = await db.collection('enrollments')
            .where('courseId', '==', courseId)
            .orderBy('enrolledAt', 'desc')
            .get();

        const enrollments = [];
        for (const doc of snapshot.docs) {
            const data = doc.data();

            let profiles = null;
            if (data.userId) {
                const userDoc = await db.collection('users').doc(data.userId).get();
                if (userDoc.exists) {
                    const userData = userDoc.data();
                    profiles = {
                        id: userDoc.id,
                        full_name: userData.fullName || userData.name,
                        email: userData.email,
                        avatar_url: userData.avatar_url
                    };
                }
            }

            enrollments.push({
                id: doc.id,
                ...data,
                profiles: profiles
            });
        }

        return enrollments;
    }

    /**
     * Remove an enrollment (Admin)
     */
    async removeEnrollment(enrollmentId) {
        this._checkInit();

        await db.collection('enrollments').doc(enrollmentId).delete();
        return { deleted: true };
    }

    /**
     * Get all courses student is enrolled in that have resources
     */
    async getStudentResources(studentId) {
        this._checkInit();

        // 1. Get all active enrollments for the student
        const enrollmentSnapshot = await db.collection('enrollments')
            .where('userId', '==', studentId)
            .where('status', '==', 'active')
            .get();

        const coursesWithResources = [];

        for (const enrollDoc of enrollmentSnapshot.docs) {
            const enrollData = enrollDoc.data();
            const courseId = enrollData.courseId;

            // 2. Fetch course details
            const courseDoc = await db.collection('courses').doc(courseId).get();
            if (!courseDoc.exists) continue;

            const courseData = courseDoc.data();

            // 3. Fetch resources for this course
            const resourceSnapshot = await db.collection('resources')
                .where('courseId', '==', courseId)
                .get();

            if (resourceSnapshot.empty) continue;

            const resources = resourceSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            coursesWithResources.push({
                courseId: courseId,
                courseTitle: courseData.title,
                thumbnail: this._resolveImageUrl(courseData.thumbnail_url || courseData.thumbnail),
                resourceCount: resources.length,
                resources: resources
            });
        }

        return coursesWithResources;
    }
}

export default new EnrollmentService();
