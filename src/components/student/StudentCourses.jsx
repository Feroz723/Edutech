import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

const StudentCourses = ({ onStartLearning }) => {
    const [courses, setCourses] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrolling, setEnrolling] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [coursesRes, enrollmentsRes] = await Promise.all([
                api.get('/courses'),
                api.get('/enrollments/my')
            ]);
            setCourses(coursesRes.data || []);
            setEnrollments(enrollmentsRes.data || []);
        } catch (err) {
            setError(err.message || 'Error connecting to the educational network');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            setEnrolling(courseId);
            const response = await api.post('/enrollments', { courseId: courseId });

            // Optimistic update
            setEnrollments(prev => [...prev, response.data]);

            // Show toast-like feedback (optional, but requested no alerts)
            // We'll rely on the UI button change as feedback
        } catch (err) {
            setError(err.message || 'Enrollment failed. Please try again.');
        } finally {
            setEnrolling(null);
        }
    };

    const isEnrolled = (courseId) => {
        return enrollments.some(e => e.courseId === courseId);
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="animate-pulse flex flex-col gap-4">
                        <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-[2.5rem]" />
                        <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800 rounded-lg mx-4" />
                        <div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded-lg mx-4 mb-4" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 bg-red-50 dark:bg-red-900/10 rounded-[2.5rem] border border-red-100 dark:border-red-900/20 text-center max-w-2xl mx-auto">
                <span className="material-symbols-outlined text-red-500 text-5xl mb-4">cloud_off</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Sync Error</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">{error}</p>
                <button onClick={fetchData} className="px-8 py-3 bg-red-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-700 transition-all">
                    Attempt Reconnect
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {courses.map((course) => {
                const joined = isEnrolled(course.id);
                const isProcessing = enrolling === course.id;

                return (
                    <div
                        key={course.id}
                        className="group relative bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-200/60 dark:border-slate-700/50 flex flex-col"
                    >
                        {/* Thumbnail */}
                        <div className="relative aspect-video overflow-hidden">
                            <img
                                src={course.thumbnailUrl || course.thumbnail_url || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80'}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute top-6 left-6">
                                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full shadow-2xl">
                                    {course.category || 'Expert Course'}
                                </span>
                            </div>

                            {joined && (
                                <div className="absolute top-6 right-6">
                                    <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                        <span className="material-symbols-outlined text-xl font-bold">check</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-grow flex flex-col">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 line-clamp-2 leading-tight">
                                {course.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-8 font-medium leading-relaxed opacity-80">
                                {course.description}
                            </p>

                            <div className="mt-auto pt-4">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs font-black text-slate-400">
                                            {course.profiles?.fullName?.charAt(0) || course.profiles?.full_name?.charAt(0) || 'I'}
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Instructor</p>
                                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                                {course.profiles?.fullName || course.profiles?.full_name || 'System Expert'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Premium</p>
                                        <p className="text-lg font-black text-indigo-600">
                                            ${course.price || 'Free'}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => joined ? onStartLearning(course.id, course.title) : handleEnroll(course.id)}
                                    disabled={isProcessing}
                                    className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 transform active:scale-[0.97] flex items-center justify-center gap-2 ${joined
                                        ? 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-900/20'
                                        : isProcessing
                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-600/30'
                                        }`}
                                >
                                    {isProcessing ? (
                                        <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                                    ) : joined ? (
                                        <>Continue Learning <span className="material-symbols-outlined text-sm font-black">arrow_forward</span></>
                                    ) : (
                                        <>Enroll Now <span className="material-symbols-outlined text-sm font-black">bolt</span></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StudentCourses;
