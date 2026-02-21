import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

export default function StudentResources() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const response = await api.get('/enrollments/resources');
            setCourses(response.data || []);
        } catch (error) {
            console.error('Error fetching resources:', error);
        } finally {
            setLoading(false);
        }
    };

    const getIconForType = (fileType) => {
        const type = String(fileType || '').toLowerCase();
        if (type.includes('pdf')) return { icon: 'picture_as_pdf', bg: 'bg-red-50 dark:bg-red-900/20', color: 'text-red-500' };
        if (type.includes('video') || type.includes('recording')) return { icon: 'movie', bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-primary' };
        return { icon: 'description', bg: 'bg-slate-50 dark:bg-slate-900/20', color: 'text-slate-500' };
    };

    const handleDownloadResource = async (resource) => {
        try {
            const response = await api.get(`/media/signed-url?courseId=${selectedCourse.courseId}&path=${resource.file_url}`);
            window.open(response.data.signedUrl, '_blank');
        } catch (err) {
            alert('Failed to get access link: ' + (err.response?.data?.error || err.message));
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (selectedCourse) {
        const filteredResources = selectedCourse.resources.filter(r =>
            r.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="space-y-6">
                <button
                    onClick={() => { setSelectedCourse(null); setSearchQuery(''); }}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4 group"
                >
                    <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
                    <span className="font-semibold">Back to Courses</span>
                </button>

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">{selectedCourse.courseTitle}</h2>
                        <p className="text-slate-500 text-sm">Browse all resources for this course</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all outline-none"
                        placeholder="Search resources in this course..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredResources.length === 0 ? (
                        <div className="col-span-2 text-center py-12 text-slate-400 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300">
                            <span className="material-symbols-outlined text-4xl mb-2 block">folder_off</span>
                            <p className="font-medium text-sm">No resources found matching your search</p>
                        </div>
                    ) : (
                        filteredResources.map((resource) => {
                            const styles = getIconForType(resource.file_type);
                            return (
                                <div
                                    key={resource.id}
                                    className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-primary transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${styles.bg} rounded-xl flex items-center justify-center ${styles.color}`}>
                                            <span className="material-symbols-outlined text-3xl">{styles.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold truncate max-w-[200px]">{resource.title}</h4>
                                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                                {resource.file_type || 'RESOURCE'} • {new Date(resource.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownloadResource(resource)}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined">
                                            {styles.icon === 'movie' ? 'play_arrow' : 'download'}
                                        </span>
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        );
    }

    const filteredCourses = courses.filter(c =>
        c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">Course Resources</h2>
                <p className="text-slate-500 text-sm">Select a course to view available notes and recordings</p>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all outline-none"
                    placeholder="Search courses..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredCourses.length === 0 ? (
                <div className="text-center py-20 text-slate-400 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-200">
                    <span className="material-symbols-outlined text-5xl mb-3 block">auto_stories</span>
                    <p className="text-lg font-semibold">No courses with resources found</p>
                    <p className="text-sm">Enrolled courses with resources will appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.courseId}
                            onClick={() => { setSelectedCourse(course); setSearchQuery(''); }}
                            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer group hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="h-32 bg-slate-100 dark:bg-slate-700 relative">
                                {course.thumbnail ? (
                                    <img
                                        src={course.thumbnail}
                                        alt={course.courseTitle}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-indigo-50 dark:bg-indigo-900/10 text-indigo-400">
                                        <span className="material-symbols-outlined text-4xl mb-1">school</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest">EduFlow</span>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-slate-800/90 rounded-full text-[10px] font-bold text-primary shadow-sm border border-primary/10">
                                    {course.resourceCount} {course.resourceCount === 1 ? 'RESOURCE' : 'RESOURCES'}
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 truncate">{course.courseTitle}</h3>
                                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                                    <span>View Resources</span>
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
