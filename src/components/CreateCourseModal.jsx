import React, { useState } from 'react';
import api from '../lib/api';

export default function CreateCourseModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [courseData, setCourseData] = useState({
    title: '',
    category: 'Development',
    level: 'Beginner',
    price: '',
    description: '',
    thumbnail_url: ''
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const [uploadProgress, setUploadProgress] = useState(0);
  const [submissionStage, setSubmissionStage] = useState(''); // '' | 'uploading' | 'creating'

  if (!isOpen) return null;

  const resetState = () => {
    setCourseData({
      title: '',
      category: 'Development',
      level: 'Beginner',
      price: '',
      description: '',
      thumbnail_url: ''
    });
    setThumbnailFile(null);
    setThumbnailPreview('');
    setError('');
    setIsSubmitting(false);
    setUploadProgress(0);
    setSubmissionStage('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let finalThumbnailUrl = courseData.thumbnail_url;

      // 1. Upload thumbnail if file is selected
      if (thumbnailFile) {
        setSubmissionStage('uploading');
        const formDataUpload = new FormData();
        formDataUpload.append('file', thumbnailFile);
        formDataUpload.append('folder', 'courses/thumbnails');

        const uploadRes = await api.post('/media/upload', formDataUpload, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percent);
          }
        });
        finalThumbnailUrl = uploadRes.data.path;
      }

      setSubmissionStage('creating');
      await api.post('/courses', {
        ...courseData,
        thumbnail_url: finalThumbnailUrl,
        price: parseFloat(courseData.price) || 0
      });

      handleClose();
    } catch (err) {
      setError(err.message || 'Failed to create course');
      setIsSubmitting(false);
      setSubmissionStage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/10">
        {/* Header */}
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Create Course</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Publish new educational content</p>
          </div>
          <button onClick={handleClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        {/* Progress Bar */}
        {isSubmitting && (
          <div className="px-8 pt-4">
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                style={{ width: `${submissionStage === 'uploading' ? (uploadProgress * 0.8) : (submissionStage === 'creating' ? 95 : 0)}%` }}
              ></div>
            </div>
            <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest mt-2">
              {submissionStage === 'uploading' ? `Uploading Assets (${uploadProgress}%)` : 'Finalizing Course...'}
            </p>
          </div>
        )}

        {/* Form */}
        <form id="create-course-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Course Title</label>
              <input
                type="text"
                placeholder="e.g. Master Clean Code in JavaScript"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Category</label>
              <select
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                value={courseData.category}
                onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
              >
                <option>Development</option>
                <option>Design</option>
                <option>Business</option>
                <option>Marketing</option>
                <option>Data Science</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Target Level</label>
              <select
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                value={courseData.level}
                onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Price (USD)</label>
              <input
                type="number"
                step="0.01"
                placeholder="49.99"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold"
                value={courseData.price}
                onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-left">Course Thumbnail</label>
              <div
                onClick={() => document.getElementById('thumbnail-input').click()}
                className="w-full h-[58px] px-5 py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-500 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-500 transition-colors">image</span>
                  <span className="text-slate-500 font-bold truncate">
                    {thumbnailFile ? thumbnailFile.name : 'Choose Image...'}
                  </span>
                </div>
                {thumbnailPreview && (
                  <img src={thumbnailPreview} alt="" className="h-8 w-8 rounded-lg object-cover border border-slate-200" />
                )}
                <input
                  id="thumbnail-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Course Description</label>
              <textarea
                rows="4"
                placeholder="What will students learn in this course?"
                className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-none font-bold"
                value={courseData.description}
                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                required
              ></textarea>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button
            form="create-course-form"
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">refresh</span>
                {submissionStage === 'uploading' ? 'Uploading...' : 'Launching...'}
              </>
            ) : 'Launch Course'}
          </button>
        </div>
      </div>
    </div>
  );
}
