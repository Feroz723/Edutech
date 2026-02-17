import React, { useState } from 'react';

export default function CreateCourseModal({ isOpen, onClose }) {
  const [courseData, setCourseData] = useState({
    title: '',
    category: 'Development',
    level: 'Beginner',
    price: '',
    description: '',
    thumbnail: null
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log('Creating new course:', courseData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create New Course</h2>
            <p className="text-slate-500 dark:text-slate-400">Set up your fresh course content and details</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Thumbnail Upload Placeholder */}
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center bg-slate-50 dark:bg-slate-800/50 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl text-primary">add_photo_alternate</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">Upload Course Thumbnail</p>
            <p className="text-xs text-slate-500 mt-1">Recommended size: 1280x720px (PNG, JPG)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Course Title</label>
              <input
                type="text"
                placeholder="e.g. Master Clean Code in JavaScript"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                value={courseData.title}
                onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Category</label>
              <select
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                value={courseData.category}
                onChange={(e) => setCourseData({...courseData, category: e.target.value})}
              >
                <option>Development</option>
                <option>Design</option>
                <option>Business</option>
                <option>Marketing</option>
                <option>Data Science</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Price (USD)</label>
              <input
                type="number"
                placeholder="49.99"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                value={courseData.price}
                onChange={(e) => setCourseData({...courseData, price: e.target.value})}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Course Description</label>
              <textarea
                rows="4"
                placeholder="What will students learn in this course?"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                value={courseData.description}
                onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                required
              ></textarea>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
}
