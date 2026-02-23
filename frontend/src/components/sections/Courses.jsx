import React, { useState, useEffect } from 'react';
import CourseBoxModal from '../CourseBoxModal';
import CreateCourseModal from '../CreateCourseModal';
import ConfirmModal from '../ConfirmModal';
import api from '../../lib/api';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/courses/all');
      setCourses(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (course) => {
    setSelectedCourseForEdit(course);
    setShowCourseModal(true);
  };

  const handleDeleteCourse = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;
    try {
      setIsDeleting(true);
      await api.delete(`/courses/${courseToDelete.id}`);
      setCourses(prev => prev.filter(c => c.id !== courseToDelete.id));
      setShowDeleteModal(false);
    } catch (err) {
      alert('Failed to delete course: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsDeleting(false);
      setCourseToDelete(null);
    }
  };

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'intermediate': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white dark:bg-slate-900 h-80 rounded-2xl border border-slate-200" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Manage Courses</h1>
          <p className="text-slate-500 font-medium">Create, edit and monitor educational content.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-xl shadow-indigo-500/20 font-black text-xs uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          Add New Course
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-bold">
          Failed to load courses: {error}
        </div>
      )}

      {courses.length === 0 && !error && (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 font-bold mb-4 uppercase tracking-widest text-xs">No courses in catalog</p>
          <button onClick={() => setShowCreateModal(true)} className="text-indigo-600 font-black hover:underline uppercase text-xs">Create your first one</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative aspect-video">
              <img
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'}
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${getLevelColor(course.level || 'Beginner')}`}>
                  {course.level || 'Beginner'}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded uppercase tracking-widest">
                  {course.category || 'General'}
                </span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-amber-500 text-sm">star</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">4.9</span>
                </div>
              </div>
              <h4 className="font-black text-slate-900 dark:text-white text-lg mb-2 line-clamp-1">{course.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="font-black text-indigo-600 text-xl">${course.price || '0'}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(course)}
                    className="text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-xl transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">edit</span>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course)}
                    className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    title="Delete Course"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateCourseModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          fetchCourses();
        }}
      />

      <CourseBoxModal
        isOpen={showCourseModal}
        onClose={() => {
          setShowCourseModal(false);
          fetchCourses();
        }}
        initialCourse={selectedCourseForEdit}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteCourse}
        loading={isDeleting}
        title="Delete Course"
        message={`Are you sure you want to delete "${courseToDelete?.title}"? This will permanently remove all associated lessons, resources, and student enrollments.`}
        confirmText="Permanently Delete"
      />
    </div>
  );
}
