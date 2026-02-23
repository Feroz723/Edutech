import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

export default function LessonViewer({ courseId, courseTitle, onBack }) {
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [resources, setResources] = useState([]);
    const [videoUrl, setVideoUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [videoLoading, setVideoLoading] = useState(false);
    const [error, setError] = useState(null);
    const [videoError, setVideoError] = useState(null);

    useEffect(() => {
        fetchCourseDetails();
    }, [courseId]);

    const fetchCourseDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await api.get(`/courses/${courseId}`);
            const courseData = response.data;
            setCourse(courseData);
            setLessons(courseData?.lessons || []);
            if (courseData?.lessons?.length > 0) {
                handleLessonSelect(courseData.lessons[0]);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch course details');
        } finally {
            setLoading(false);
        }
    };

    const handleLessonSelect = async (lesson) => {
        setSelectedLesson(lesson);
        setResources(lesson.resources || []);
        setVideoUrl(null);
        setVideoError(null);

        if (lesson.video_url) {
            try {
                setVideoLoading(true);
                // The filename is extracted from the video_url column in DB
                const response = await api.get(`/media/signed-url?courseId=${courseId}&path=${lesson.video_url}`);
                setVideoUrl(response.data.signedUrl);
            } catch (err) {
                setVideoError(err.message || 'Failed to load video. Your session might have expired or you may not have access.');
            } finally {
                setVideoLoading(false);
            }
        }
    };

    const handleDownloadResource = async (resource) => {
        try {
            const response = await api.get(`/media/signed-url?courseId=${courseId}&path=${resource.file_url}`);
            window.open(response.data.signedUrl, '_blank');
        } catch (err) {
            alert('Failed to get download link: ' + err.message);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col gap-6 animate-pulse">
                <div className="h-12 w-48 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-3xl" />
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/20 text-red-700 dark:text-red-400 p-8 rounded-3xl text-center">
                <span className="material-symbols-outlined text-4xl mb-4">error</span>
                <p className="font-bold mb-2">Access Denied or Load Failed</p>
                <p className="text-sm mb-6 opacity-80">{error}</p>
                <button onClick={onBack} className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors mb-2"
                >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back to Dashboard
                </button>

                <div className="relative aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/10">
                    {videoLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm z-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-white text-xs font-black uppercase tracking-widest">Securing Connection...</p>
                            </div>
                        </div>
                    ) : videoError ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 p-8 text-center">
                            <div className="max-w-xs">
                                <span className="material-symbols-outlined text-red-500 text-5xl mb-4">lock_reset</span>
                                <p className="text-white font-bold mb-2">Video Access Error</p>
                                <p className="text-slate-400 text-xs leading-relaxed">{videoError}</p>
                            </div>
                        </div>
                    ) : videoUrl ? (
                        <video
                            key={videoUrl}
                            src={videoUrl}
                            controls
                            className="w-full h-full object-contain"
                            onContextMenu={e => e.preventDefault()}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                            <p className="text-slate-500 font-bold italic">Select a lesson to start learning</p>
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                        {selectedLesson?.title || 'Course Overview'}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                        {selectedLesson?.content || course?.description}
                    </p>

                    {resources.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Lesson Materials</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {resources.map(res => (
                                    <div key={res.id} className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-indigo-500 transition-all">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-indigo-600">
                                                {res.file_type?.toLowerCase().includes('image') ? 'image' : 'description'}
                                            </span>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{res.file_type || 'Resource'}</p>
                                                <p className="font-bold text-slate-700 dark:text-slate-200 text-sm truncate max-w-[120px]">{res.title}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDownloadResource(res)}
                                            className="p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-slate-400 hover:text-indigo-600 shadow-sm transition-all"
                                            title="Download Material"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">download</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar / Lesson List */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/50 h-fit sticky top-8">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 px-2">Table of Contents</h3>
                    <div className="space-y-2">
                        {lessons.map((lesson, idx) => (
                            <button
                                key={lesson.id}
                                onClick={() => handleLessonSelect(lesson)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${selectedLesson?.id === lesson.id
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 border border-indigo-100 dark:border-indigo-900/30'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-700/30 text-slate-600 dark:text-slate-400 border border-transparent'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${selectedLesson?.id === lesson.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                                    }`}>
                                    {idx + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate">{lesson.title}</p>
                                    <p className="text-[10px] opacity-60 font-black uppercase tracking-tight">
                                        {lesson.video_url ? 'Video Lesson' : 'Reading Materials'}
                                    </p>
                                </div>
                                {selectedLesson?.id === lesson.id && (
                                    <span className="material-symbols-outlined text-lg animate-pulse">play_circle</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
