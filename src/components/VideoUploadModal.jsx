import React, { useState, useRef } from 'react';

export default function VideoUploadModal({ isOpen, onClose }) {
  const fileRef = useRef(null);
  const [videoData, setVideoData] = useState({
    title: '',
    concept: '',
    description: '',
    category: '',
    duration: '',
    thumbnail: '',
    videoFile: null,
    resourceFiles: [],
    tags: '',
    level: 'beginner',
    notes: '',
    source: 'local', // local, drive, record
    visibility: 'public',
    instructor: '',
    language: 'English',
    captions: false
  });

  const handleResourceUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setVideoData(prev => ({ 
        ...prev, 
        resourceFiles: [...prev.resourceFiles, ...Array.from(files)] 
      }));
    }
  };

  const removeResource = (index) => {
    setVideoData(prev => ({
      ...prev,
      resourceFiles: prev.resourceFiles.filter((_, i) => i !== index)
    }));
  };
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoData(prev => ({ ...prev, videoFile: file }));
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setVideoData(prev => ({ ...prev, thumbnail: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            onClose();
            // Reset form
            setVideoData({
              title: '',
              concept: '',
              description: '',
              category: '',
              duration: '',
              thumbnail: '',
              videoFile: null,
              tags: '',
              level: 'beginner',
              notes: '',
              source: 'local',
              visibility: 'public',
              instructor: '',
              language: 'English',
              captions: false
            });
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Upload New Video</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Upload Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setVideoData(prev => ({ ...prev, source: 'local' }))}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${videoData.source === 'local' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}`}
            >
              <span className="material-symbols-outlined text-2xl">upload_file</span>
              <span className="text-sm font-semibold">Local File</span>
            </button>
            <button
              type="button"
              onClick={() => setVideoData(prev => ({ ...prev, source: 'drive' }))}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${videoData.source === 'drive' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}`}
            >
              <span className="material-symbols-outlined text-2xl">cloud_upload</span>
              <span className="text-sm font-semibold">Cloud Drive</span>
            </button>
            <button
              type="button"
              onClick={() => setVideoData(prev => ({ ...prev, source: 'record' }))}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${videoData.source === 'record' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'}`}
            >
              <span className="material-symbols-outlined text-2xl">videocam</span>
              <span className="text-sm font-semibold">Record Video</span>
            </button>
          </div>

          {/* Conditional Upload Areas */}
          {videoData.source === 'local' && (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-800/50">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">video_upload</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {videoData.videoFile ? videoData.videoFile.name : 'Choose video file'}
              </h3>
              <p className="text-sm text-slate-500 mb-4">MP4, WebM, or OGG (Max 500MB)</p>
              <input
                ref={fileRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Select Video
              </button>
            </div>
          )}

          {videoData.source === 'drive' && (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-800/50">
              <div className="flex justify-center gap-4 mb-4">
                <button type="button" className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" className="w-8 h-8" alt="Google Drive" />
                </button>
                <button type="button" className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Dropbox_logo_2017.svg" className="w-8 h-8" alt="Dropbox" />
                </button>
                <button type="button" className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:border-primary transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_OneDrive_Logo.svg" className="w-8 h-8" alt="OneDrive" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Connect to Cloud</h3>
              <p className="text-sm text-slate-500">Import your video directly from cloud storage</p>
            </div>
          )}

          {videoData.source === 'record' && (
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-800/50">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="material-symbols-outlined text-red-500 text-3xl">fiber_manual_record</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Ready to Record</h3>
              <p className="text-sm text-slate-500 mb-4">Ensure your camera and microphone are connected</p>
              <button
                type="button"
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center gap-2 mx-auto"
              >
                <span className="material-symbols-outlined text-sm">videocam</span>
                Start Recording
              </button>
            </div>
          )}

          {/* Form Fields - Sectioned */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="material-symbols-outlined">info</span>
              Video Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                name="title"
                value={videoData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter video title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Concept *
              </label>
              <input
                type="text"
                name="concept"
                value={videoData.concept}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Main concept covered"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={videoData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="development">Development</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
                <option value="marketing">Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={videoData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Video duration"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Level
              </label>
              <select
                name="level"
                value={videoData.level}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={videoData.tags}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="react, javascript, tutorial"
              />
            </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={videoData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Describe what students will learn..."
              />
            </div>
          </div>

          {/* Additional Metadata */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="material-symbols-outlined">settings</span>
              Professional Metadata
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Instructor Name
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={videoData.instructor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Who is the instructor?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={videoData.language}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Visibility
                </label>
                <select
                  name="visibility"
                  value={videoData.visibility}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="public">Public (All Students)</option>
                  <option value="private">Private (Only Me)</option>
                  <option value="unlisted">Unlisted (With Link)</option>
                </select>
              </div>
              <div className="flex items-center gap-3 h-full pt-6">
                <input
                  type="checkbox"
                  id="captions"
                  name="captions"
                  checked={videoData.captions}
                  onChange={(e) => setVideoData(prev => ({ ...prev, captions: e.target.checked }))}
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <label htmlFor="captions" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Generate Auto-Captions
                </label>
              </div>
            </div>
          </div>

          {/* Video Notes & Resources */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800 pb-2">
              <span className="material-symbols-outlined">description</span>
              Notes & Related Resources
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Reference Notes
                </label>
                <textarea
                  name="notes"
                  value={videoData.notes}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Add important notes, links, or diagram descriptions..."
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Upload Related Files (PDF, Images, ZIP)
                </label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/30">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,image/*,.zip"
                    onChange={handleResourceUpload}
                    className="hidden"
                    id="resource-upload"
                  />
                  <label
                    htmlFor="resource-upload"
                    className="flex flex-col items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-2xl">attach_file</span>
                    <span className="text-xs font-bold uppercase">Add Related Resources</span>
                  </label>
                </div>

                {/* File List */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {videoData.resourceFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 text-xs group">
                      <div className="flex items-center gap-2 truncate">
                        <span className="material-symbols-outlined text-sm text-primary">
                          {file.type.includes('image') ? 'image' : 'description'}
                        </span>
                        <span className="truncate">{file.name}</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeResource(index)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Thumbnail (Optional)
            </label>
            <div className="flex items-center gap-4">
              {videoData.thumbnail && (
                <img
                  src={videoData.thumbnail}
                  alt="Thumbnail preview"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-600"
              />
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Uploading...</span>
                <span className="text-primary font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !videoData.videoFile || !videoData.title || !videoData.concept}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
