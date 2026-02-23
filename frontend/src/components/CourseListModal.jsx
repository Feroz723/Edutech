import React, { useState, useEffect } from 'react';
import api from '../lib/api';

/**
 * CourseListModal - A premium modal for displaying all courses
 */
export default function CourseListModal({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            fetchCourses();
        }
    }, [isOpen]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            // Fetch ALL courses (including drafts)
            const response = await api.get('/courses/all');
            setCourses(response.data || []);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter(course => {
        const term = searchTerm.toLowerCase();
        return (course.title || '').toLowerCase().includes(term) ||
            (course.category || '').toLowerCase().includes(term);
    });

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'published': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'draft': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'archived': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-white/10">
                {/* Header */}
                <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Course Directory</h2>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Platform educational content catalog</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
                        >
                            <span className="material-symbols-outlined text-slate-500">close</span>
                        </button>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="p-8 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">search</span>
                        <input
                            type="text"
                            placeholder="Search courses by title or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-80 space-y-4">
                            <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Course Database...</p>
                        </div>
                    ) : error ? (
                        <div className="p-12 text-center">
                            <p className="text-red-500 font-bold">Error: {error}</p>
                            <button onClick={fetchCourses} className="mt-4 text-indigo-600 font-black uppercase text-xs hover:underline">Retry Connection</button>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                    <th className="px-8 py-5">Course Information</th>
                                    <th className="px-8 py-5">Category</th>
                                    <th className="px-8 py-5">Status</th>
                                    <th className="px-8 py-5">Investment</th>
                                    <th className="px-8 py-5 text-right">ID Mapping</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredCourses.map((course) => (
                                    <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={course.thumbnailUrl || course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80'}
                                                    alt=""
                                                    className="w-12 h-12 rounded-xl object-cover bg-slate-100 dark:bg-slate-800"
                                                />
                                                <div className="min-w-0">
                                                    <p className="font-black text-slate-900 dark:text-white text-sm truncate">{course.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{course.level || 'Novice'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{course.category}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${getStatusColor(course.status)}`}>
                                                {course.status || 'draft'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm">
                                                ${course.price || '0'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">
                                                {course.id.substring(0, 8).toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Showing {filteredCourses.length} courses across platform categories
                    </p>
                    <button
                        onClick={onClose}
                        className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20"
                    >
                        Close Directory
                    </button>
                </div>
            </div>
        </div>
    );
}
