import React from 'react';

const enrolledCourses = [
    {
        id: 1,
        title: 'Advanced React & UI Design',
        instructor: 'Sarah Johnson',
        progress: 68,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
        nextLesson: 'Custom Hooks Creation',
        duration: '18:20',
        enrolledDate: '2024-01-15'
    },
    {
        id: 2,
        title: 'Data Structures & Algorithms',
        instructor: 'Dr. Michael Chen',
        progress: 42,
        thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=225&fit=crop',
        nextLesson: 'Stacks and Queues Implementation',
        duration: '24:15',
        enrolledDate: '2024-01-20'
    },
    {
        id: 3,
        title: 'JavaScript Fundamentals',
        instructor: 'Emily Rodriguez',
        progress: 85,
        thumbnail: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=400&h=225&fit=crop',
        nextLesson: 'Async JavaScript',
        duration: '22:30',
        enrolledDate: '2024-01-10'
    },
    {
        id: 4,
        title: 'Python for Data Science',
        instructor: 'Prof. James Wilson',
        progress: 30,
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop',
        nextLesson: 'NumPy Arrays',
        duration: '28:45',
        enrolledDate: '2024-01-25'
    },
    {
        id: 5,
        title: 'Web Design Principles',
        instructor: 'Lisa Anderson',
        progress: 92,
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
        nextLesson: 'Final Project',
        duration: '45:00',
        enrolledDate: '2024-01-05'
    },
    {
        id: 6,
        title: 'Machine Learning Basics',
        instructor: 'Dr. Robert Kim',
        progress: 15,
        thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop',
        nextLesson: 'Introduction to ML',
        duration: '35:20',
        enrolledDate: '2024-01-28'
    },
    {
        id: 7,
        title: 'Database Management',
        instructor: 'Maria Garcia',
        progress: 55,
        thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
        nextLesson: 'SQL Joins',
        duration: '19:15',
        enrolledDate: '2024-01-18'
    }
];

export default function EnrolledCoursesList({ onBack }) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Dashboard
                </button>
                <h2 className="text-2xl font-bold">My Enrolled Courses</h2>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                    >
                        {/* Course Thumbnail */}
                        <div className="relative aspect-video">
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            
                            {/* Progress Badge */}
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold">
                                {course.progress}% Complete
                            </div>
                        </div>

                        {/* Course Info */}
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                                {course.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                Instructor: {course.instructor}
                            </p>
                            
                            {/* Progress Bar */}
                            <div className="mb-3">
                                <div className="flex justify-between text-xs text-slate-400 mb-1">
                                    <span>Progress</span>
                                    <span>{course.progress}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                        className="bg-primary h-full rounded-full transition-all duration-300"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Next Lesson Info */}
                            <div className="bg-white dark:bg-slate-800 rounded-xl p-3 mb-3">
                                <p className="text-xs text-slate-400 mb-1">Next Lesson:</p>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                    {course.nextLesson}
                                </p>
                                <p className="text-xs text-slate-400 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-base">schedule</span>
                                    {course.duration}
                                </p>
                            </div>

                            {/* Action Button */}
                            <button className="w-full bg-primary text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                                Continue Learning
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-primary mb-1">{enrolledCourses.length}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Total Courses</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-green-500 mb-1">
                        {enrolledCourses.filter(c => c.progress === 100).length}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-orange-500 mb-1">
                        {enrolledCourses.filter(c => c.progress > 0 && c.progress < 100).length}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">In Progress</p>
                </div>
            </div>
        </div>
    );
}
