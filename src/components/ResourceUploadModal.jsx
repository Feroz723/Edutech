import React, { useState } from 'react';

export default function ResourceUploadModal({ isOpen, onClose }) {
  const [resourceData, setResourceData] = useState({
    title: '',
    type: 'Note',
    description: '',
    files: []
  });

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setResourceData(prev => ({ 
        ...prev, 
        files: [...prev.files, ...Array.from(files)] 
      }));
    }
  };

  const removeFile = (index) => {
    setResourceData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Uploading resources:', resourceData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upload Resources & Notes</h2>
            <p className="text-sm text-slate-500">Add reference materials, diagrams, or study notes</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Resource Title</label>
            <input
              type="text"
              placeholder="e.g. Chapter 1 Summary & Diagrams"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
              value={resourceData.title}
              onChange={(e) => setResourceData({...resourceData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Type</label>
            <div className="grid grid-cols-3 gap-3">
              {['Note', 'Reference', 'Diagram'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setResourceData({...resourceData, type: t})}
                  className={`py-2 rounded-lg border-2 text-sm font-bold transition-all ${
                    resourceData.type === t 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-slate-100 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Details / Description</label>
            <textarea
              rows="3"
              placeholder="Provide context for these resources..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
              value={resourceData.description}
              onChange={(e) => setResourceData({...resourceData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Upload Files (PDF, PNG, JPG)</label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 text-center bg-slate-50 dark:bg-slate-800/30 hover:border-primary/50 transition-colors cursor-pointer group">
              <input
                type="file"
                multiple
                accept=".pdf,image/*,.zip"
                onChange={handleFileChange}
                className="hidden"
                id="direct-resource-upload"
              />
              <label
                htmlFor="direct-resource-upload"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary">upload_file</span>
                </div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Click to Browse Files</span>
              </label>
            </div>

            {/* File List */}
            <div className="space-y-2">
              {resourceData.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      {file.type.includes('image') ? 'image' : 'description'}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{file.name}</span>
                      <span className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-800/50">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-2 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
          >
            Upload All
          </button>
        </div>
      </div>
    </div>
  );
}
