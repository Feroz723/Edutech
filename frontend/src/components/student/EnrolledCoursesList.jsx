import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

const EnrolledCoursesList = ({ onStartLearning }) => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get('/enrollments/my');
            setEnrollments(response.data || []);
        } catch (err) {
            setError(err.message || 'Failed to sync learning progress');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse bg-white dark:bg-slate-800 h-28 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/50" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10 bg-red-50 dark:bg-red-900/10 rounded-[2rem] border border-red-100 dark:border-red-900/20 text-center">
                <span className="material-symbols-outlined text-red-500 text-4xl mb-4">sync_problem</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white mb-2">Connection Interrupted</p>
                <p className="text-xs text-slate-500 mb-6">{error}</p>
                <button onClick={fetchEnrollments} className="px-6 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
                    Try Again
                </button>
            </div>
        );
    }

    if (enrollments.length === 0) {
        return (
            <div className="p-16 text-center bg-white dark:bg-slate-800 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-slate-300 text-3xl">school</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">No active courses</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">You haven't enrolled in any courses yet. Start your journey by exploring the catalog.</p>
                <button
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent('showCatalog'));
                    }}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20"
                >
                    Explore Catalog
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Continued Learning</h3>
            {enrollments.map((item) => {
                const course = item.courses;
                return (
                    <div
                        key={item.id}
                        className="group p-6 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/50 hover:border-indigo-500 hover:shadow-2xl transition-all duration-500 flex items-center gap-6"
                    >
                        <div className="h-20 w-20 rounded-[1.5rem] bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-700">
                            <img
                                src={course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80'}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-slate-300'}`}></span>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.status}</p>
                            </div>
                            <h4 className="font-black text-slate-900 dark:text-white truncate text-lg group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{course.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium opacity-60">Complete your next lesson to stay on track</p>
                        </div>
                        <button
                            onClick={() => onStartLearning(course.id, course.title)}
                            className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-2"
                        >
                            Open <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default EnrolledCoursesList;
