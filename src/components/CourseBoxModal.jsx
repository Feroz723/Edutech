import React, { useState, useEffect } from 'react';
import VideoUploadModal from './VideoUploadModal';
import ResourceUploadModal from './ResourceUploadModal';
import ConfirmModal from './ConfirmModal';
import api from '../lib/api';

export default function CourseBoxModal({ isOpen, onClose, initialCourse }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showResourceUpload, setShowResourceUpload] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLessonForResource, setSelectedLessonForResource] = useState(null);

  // Missing States for Deletion Modals
  const [showLessonDeleteModal, setShowLessonDeleteModal] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [isDeletingLesson, setIsDeletingLesson] = useState(false);

  const [showResourceDeleteModal, setShowResourceDeleteModal] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const [isDeletingResource, setIsDeletingResource] = useState(false);

  const [isUpdatingThumbnail, setIsUpdatingThumbnail] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCourses();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialCourse) {
      setSelectedCourse({
        ...initialCourse,
        title: initialCourse.title || initialCourse.name,
        instructorId: initialCourse.instructorId || initialCourse.instructor_id,
        thumbnailUrl: initialCourse.thumbnailUrl || initialCourse.thumbnail_url,
        createdAt: initialCourse.createdAt || initialCourse.created_at,
        updatedAt: initialCourse.updatedAt || initialCourse.updated_at
      });
      fetchLessons(initialCourse.id);
    } else {
      setSelectedCourse(null);
      setLessons([]);
    }
  }, [initialCourse, isOpen]);

  useEffect(() => {
    if (selectedCourse && !lessons.length) {
      fetchLessons(selectedCourse.id);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/courses/all');
      setCourses(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const response = await api.get(`/lessons/${courseId}`);
      setLessons(response.data || []);
    } catch (err) {
      console.error('Failed to fetch lessons:', err);
    }
  };

  const handleStatusToggle = async (courseId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await api.patch(`/courses/${courseId}/status`, { status: newStatus });

      setCourses(prev => prev.map(c =>
        c.id === courseId ? { ...c, status: newStatus } : c
      ));

      if (selectedCourse?.id === courseId) {
        setSelectedCourse(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      try {
        await api.delete(`/courses/${courseId}`);
        setCourses(prev => prev.filter(c => c.id !== courseId));
        if (selectedCourse?.id === courseId) {
          setSelectedCourse(null);
        }
      } catch (err) {
        alert('Failed to delete course: ' + err.message);
      }
    }
  };

  const handleDeleteLesson = (lesson) => {
    setLessonToDelete(lesson);
    setShowLessonDeleteModal(true);
  };

  const confirmDeleteLesson = async () => {
    if (!lessonToDelete) return;
    try {
      setIsDeletingLesson(true);
      await api.delete(`/lessons/${lessonToDelete.id}`);
      setLessons(prev => prev.filter(l => l.id !== lessonToDelete.id));
      setShowLessonDeleteModal(false);
    } catch (err) {
      alert('Failed to delete lesson: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsDeletingLesson(false);
      setLessonToDelete(null);
    }
  };

  const handleDeleteResource = (resource) => {
    setResourceToDelete(resource);
    setShowResourceDeleteModal(true);
  };

  const confirmDeleteResource = async () => {
    if (!resourceToDelete) return;
    try {
      setIsDeletingResource(true);
      await api.delete(`/lessons/resources/${resourceToDelete.id}`);
      fetchLessons(selectedCourse.id);
      setShowResourceDeleteModal(false);
    } catch (err) {
      alert('Failed to delete resource: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsDeletingResource(false);
      setResourceToDelete(null);
    }
  };

  const handleThumbnailUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUpdatingThumbnail(true);

      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('folder', 'courses/thumbnails');

      const uploadRes = await api.post('/media/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const newThumbnailUrl = uploadRes.data.path;

      await api.patch(`/courses/${selectedCourse.id}`, {
        thumbnail_url: newThumbnailUrl
      });

      setSelectedCourse(prev => ({ ...prev, thumbnail_url: newThumbnailUrl }));
      fetchCourses(); // Refresh list background

    } catch (err) {
      alert('Failed to update thumbnail: ' + err.message);
    } finally {
      setIsUpdatingThumbnail(false);
    }
  };

  const handleDownloadResource = async (resource) => {
    try {
      const response = await api.get(`/media/signed-url?courseId=${selectedCourse.id}&path=${resource.file_url}`);
      window.open(response.data.signedUrl, '_blank');
    } catch (err) {
      alert('Failed to get access link: ' + (err.response?.data?.error || err.message));
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'published': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'draft': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Course Management</h2>
              <p className="text-slate-500 dark:text-slate-400">Add, edit, or manage your platform courses</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0">
          {!selectedCourse ? (
            /* Grid View */
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                    <div className="relative h-40">
                      <img src={course.thumbnailUrl || course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80'} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${getStatusColor(course.status)}`}>{course.status}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col text-left">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{course.description}</p>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="font-bold text-primary">${course.price}</span>
                        <span className="text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{course.level}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedCourse(course)} className="flex-1 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-bold flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-sm">settings</span> Manage
                        </button>
                        <button onClick={() => handleStatusToggle(course.id, course.status)} className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 rounded-lg">
                          <span className="material-symbols-outlined text-sm">{course.status === 'published' ? 'visibility_off' : 'visibility'}</span>
                        </button>
                        <button onClick={() => handleDeleteCourse(course.id)} className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Detail View */
            <div className="flex flex-col h-full">
              <div className="flex-1 p-6">
                {/* Banner */}
                <div className="flex justify-between items-start mb-8 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex gap-6 text-left">
                    <div className="relative group/thumb">
                      <img
                        src={selectedCourse.thumbnailUrl || selectedCourse.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80'}
                        alt=""
                        className={`w-32 h-32 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-sm ${isUpdatingThumbnail ? 'opacity-50' : ''}`}
                      />
                      <label
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white rounded-2xl opacity-0 group-hover/thumb:opacity-100 cursor-pointer transition-all border-4 border-transparent"
                      >
                        <span className="material-symbols-outlined text-3xl mb-1">{isUpdatingThumbnail ? 'sync' : 'camera_enhance'}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">{isUpdatingThumbnail ? 'Updating...' : 'Change Cover'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleThumbnailUpdate}
                          disabled={isUpdatingThumbnail}
                        />
                      </label>
                      {isUpdatingThumbnail && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${getStatusColor(selectedCourse.status)}`}>{selectedCourse.status}</span>
                        <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{selectedCourse.category}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedCourse.title}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 max-w-xl">{selectedCourse.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setShowVideoUpload(true)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-bold shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined">video_call</span> Add Video
                    </button>
                    {!initialCourse && (
                      <button onClick={() => setSelectedCourse(null)} className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                        Back to List
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: Videos & Resources */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">video_library</span> Course Content ({lessons.length} Lessons)
                      </h3>


                      <div className="space-y-4">
                        {lessons.length > 0 ? (
                          lessons.map((lesson, idx) => (
                            <div key={lesson.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden text-left">
                              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">{idx + 1}</span>
                                  <h4 className="font-semibold text-slate-900 dark:text-white">{lesson.title}</h4>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setSelectedLessonForResource(lesson.id);
                                      setShowResourceUpload(true);
                                    }}
                                    className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 rounded-lg transition-colors"
                                    title="Add Resources"
                                  >
                                    <span className="material-symbols-outlined text-sm">attach_file</span>
                                  </button>
                                  <button onClick={() => handleDeleteLesson(lesson)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg transition-colors">
                                    <span className="material-symbols-outlined text-sm">delete</span>
                                  </button>
                                </div>
                              </div>
                              <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
                                      <span className="material-symbols-outlined text-xs">notes</span> Lesson Content
                                    </label>
                                    <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 line-clamp-3">
                                      {lesson.description || lesson.content || 'No description provided.'}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
                                      <span className="material-symbols-outlined text-xs">movie</span> Video Path
                                    </label>
                                    <div className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-900/50 p-2 rounded border border-slate-200 dark:border-slate-800 truncate">
                                      {lesson.video_url || 'No video uploaded.'}
                                    </div>
                                  </div>
                                </div>

                                {/* Resource List Section */}
                                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3 block flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">attach_file</span> Attached Resources ({lesson.resources?.length || 0})
                                  </label>
                                  <div className="space-y-2">
                                    {lesson.resources && lesson.resources.length > 0 ? (
                                      lesson.resources.map(res => (
                                        <div key={res.id} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/20 rounded-lg border border-slate-100 dark:border-slate-700/30">
                                          <div className="flex items-center gap-2 min-w-0">
                                            <span className="material-symbols-outlined text-slate-400 text-sm">
                                              {res.file_type?.toLowerCase().includes('image') ? 'image' : 'description'}
                                            </span>
                                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{res.title}</span>
                                          </div>
                                          <div className="flex gap-1">
                                            <button onClick={() => handleDownloadResource(res)} className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-400 hover:text-primary transition-colors">
                                              <span className="material-symbols-outlined text-sm">open_in_new</span>
                                            </button>
                                            <button onClick={() => handleDeleteResource(res)} className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded transition-colors">
                                              <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-[10px] text-slate-400 italic">No resources uploaded for this lesson.</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/30 dark:bg-slate-800/30">
                            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">movie</span>
                            <p className="text-slate-500 dark:text-slate-400">No content in this course yet.</p>
                            <button onClick={() => setShowVideoUpload(true)} className="mt-4 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-bold">
                              Add First Lesson
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Quick Stats */}
                  <div className="space-y-6 text-left">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-primary text-3xl">info</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">Course Info</h4>
                      <p className="text-xs text-slate-500 mb-4 tracking-wide font-bold uppercase">{selectedCourse.level} • {selectedCourse.category}</p>
                      <div className="text-2xl font-black text-indigo-600">${selectedCourse.price}</div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 p-6 rounded-2xl text-white shadow-lg border border-white/10">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">analytics</span> Performance
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Date Created</span>
                          <span className="text-sm font-bold">{selectedCourse.createdAt ? new Date(selectedCourse.createdAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Last Updated</span>
                          <span className="text-sm font-bold">{selectedCourse.updatedAt ? new Date(selectedCourse.updatedAt).toLocaleDateString() : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <VideoUploadModal
        isOpen={showVideoUpload}
        onClose={() => setShowVideoUpload(false)}
        courseId={selectedCourse?.id}
        onLessonAdded={() => fetchLessons(selectedCourse.id)}
      />
      <ResourceUploadModal
        isOpen={showResourceUpload}
        onClose={() => {
          setShowResourceUpload(false);
          setSelectedLessonForResource(null);
        }}
        lessonId={selectedLessonForResource}
        onResourceAdded={() => fetchLessons(selectedCourse.id)}
      />

      <ConfirmModal
        isOpen={showLessonDeleteModal}
        onClose={() => setShowLessonDeleteModal(false)}
        onConfirm={confirmDeleteLesson}
        loading={isDeletingLesson}
        title="Delete Lesson"
        message={`Are you sure you want to delete "${lessonToDelete?.title}"? This will permanently remove its video and all attached resources.`}
        confirmText="Permanently Delete"
      />

      <ConfirmModal
        isOpen={showResourceDeleteModal}
        onClose={() => setShowResourceDeleteModal(false)}
        onConfirm={confirmDeleteResource}
        loading={isDeletingResource}
        title="Delete Resource"
        message={`Are you sure you want to delete "${resourceToDelete?.title}"?`}
        confirmText="Delete Resource"
      />
    </div>
  );
}
