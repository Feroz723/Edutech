import React from 'react';

const coursesList = [
    {
        name: 'Advanced React & UI Design',
        description: 'Master hooks, context, and modern component patterns.',
        category: 'Coding',
        progress: 68,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoVudFVrkHMAiqn3m4nWuEszfBNhIfw2VW2IMmGK_vdNlTQXvGOffImtcuQ8QJPrOlBxQTfuHftvQqudlLfe32odRSQF6nYF65XOwSgKKis0sxE0ddu2nX5P-SMC8vTzgWvq2IwZHFm1Q1EYN-tuWjwg3Y0rgTX7-H9R7XlLfOVuvNQ15DCc1V9bsFXpLwlmNLRTHmGVyJnOWeko-7TmBBOwxtCZ5L0Y8OVl5uCLLprFaT0yDyUCbvCB1XimT9jKLZR5r3_4hbdnJt',
        primaryCTA: true,
    },
    {
        name: 'Data Structures & Algorithms',
        description: 'Optimize your code and master technical interviews.',
        category: 'Data',
        progress: 42,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJK16CwTtZq0BYnmKNPjRY4Ap6Jpd0-gY8ZD8CwKG3ErJKBieJueh0ASAuF7mwJ-nMz4zbMpzrJbCywcRZSKQVXKrNHxLj0wV5JIRxKuP-VUlakXGSkvEyq8QZsgDZGQ1VbLedf8KVn4HVIlH4JebnNFZ41iIX2XIP35rAdmMzFAXVZW4xc1VxQuYNhNgIzmQ8Z1G4hPsI7w0OR_nXeQOsE7-wQnoUyl13FUrOVwDSAnNmCOvWa-13Wia4KLlCVHErPJwS9maMXhiH',
        primaryCTA: false,
    },
];

export default function StudentCourses() {
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
