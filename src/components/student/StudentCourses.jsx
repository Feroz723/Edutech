import React, { useState } from 'react';
import CourseTopics from './CourseTopics';

const coursesList = [
    {
        name: 'Advanced React & UI Design',
        description: 'Master hooks, context, and modern component patterns.',
        category: 'Coding',
        progress: 68,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
        primaryCTA: true,
    },
    {
        name: 'Data Structures & Algorithms',
        description: 'Optimize your code and master technical interviews.',
        category: 'Data',
        progress: 42,
        image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=225&fit=crop',
        primaryCTA: false,
    },
    {
        name: 'JavaScript Fundamentals',
        description: 'Learn the core concepts of JavaScript programming.',
        category: 'Coding',
        progress: 85,
        image: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=400&h=225&fit=crop',
        primaryCTA: false,
    },
    {
        name: 'Python for Data Science',
        description: 'Master Python for data analysis and machine learning.',
        category: 'Data',
        progress: 30,
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop',
        primaryCTA: false,
    },
    {
        name: 'Web Design Principles',
        description: 'Learn modern web design and user experience principles.',
        category: 'Design',
        progress: 92,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
        primaryCTA: false,
    },
    {
        name: 'Machine Learning Basics',
        description: 'Introduction to machine learning concepts and applications.',
        category: 'Data',
        progress: 15,
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop',
        primaryCTA: false,
    },
    {
        name: 'Database Management',
        description: 'Learn database design and SQL fundamentals.',
        category: 'Data',
        progress: 55,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
        primaryCTA: false,
    },
];

export default function StudentCourses() {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleContinueLearning = (courseName) => {
        setSelectedCourse(courseName);
    };

    if (selectedCourse) {
        return (
            <CourseTopics 
                courseName={selectedCourse} 
                onBack={() => setSelectedCourse(null)} 
            />
        );
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coursesList.map((course, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/20 transition-all"
                >
                    {/* Course Image */}
                    <div className="relative h-40 w-full mb-4 overflow-hidden rounded-2xl">
                        <img
                            alt={course.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            src={course.image}
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 uppercase">
                            {course.category}
                        </div>
                    </div>

                    {/* Course Info */}
                    <h3 className="font-bold text-lg mb-2">{course.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{course.description}</p>

                    {/* Progress */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-primary">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="bg-primary h-full rounded-full transition-all duration-1000 ease-in-out"
                                style={{ width: `${course.progress}%` }}
                            />
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => handleContinueLearning(course.name)}
                            className={`w-full mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${course.primaryCTA
                                    ? 'bg-primary text-white hover:bg-blue-600'
                                    : 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary hover:bg-primary hover:text-white'
                                }`}
                        >
                            Continue Learning
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
