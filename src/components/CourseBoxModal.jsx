import React, { useState, useEffect } from 'react';
import VideoUploadModal from './VideoUploadModal';
import ResourceUploadModal from './ResourceUploadModal';

export default function CourseBoxModal({ isOpen, onClose, initialCourse }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showVideoUpload, setShowVideoUpload] = useState(false);
  const [showResourceUpload, setShowResourceUpload] = useState(false);

  useEffect(() => {
    if (initialCourse) {
      // Map initialCourse name to title for consistency if needed
      setSelectedCourse({
        ...initialCourse,
        title: initialCourse.name || initialCourse.title,
        videos: initialCourse.videos || []
      });
    } else {
      setSelectedCourse(null);
    }
  }, [initialCourse, isOpen]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Advanced React Design Patterns',
      chapters: 12,
      hours: 8.5,
      category: 'Development',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcproyESwAtBxJeCkdywZp38Oo9rkqeX5apcg0j8xOO838c35xrqnMuFGblAb1Nua4ZuLp5jn06CS8FHbo4r9pu8o3fNBWGTQNIIwezziecK2M6ZrZDAz6qlPCyA1yUhIvNT0SRJsBXKGPGHUHZkB7XcT34CMg3_IMKeyAE8mkoOdWgbNlgJyPPX07zivyL-QiBdXIUYi1-Xr-2AvqsNkM6Ybybrz7Uou_u3E2H1E4ZTuFsqfq3_IbnpFMS7S9mBrqjSf5ol2w8Opo',
      students: 234,
      rating: 4.8,
      level: 'Advanced',
      price: 89.99,
      description: 'Master advanced React patterns and build scalable applications with high performance.',
      status: 'Published',
      tutor: {
        name: 'Sarah Drasner',
        role: 'Senior Developer',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        bio: 'Sarah is an award-winning speaker and developer with over 15 years of experience.'
      },
      videos: []
    },
    {
      id: 2,
      title: 'JavaScript Mastery',
      chapters: 15,
      hours: 12,
      category: 'Development',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcproyESwAtBxJeCkdywZp38Oo9rkqeX5apcg0j8xOO838c35xrqnMuFGblAb1Nua4ZuLp5jn06CS8FHbo4r9pu8o3fNBWGTQNIIwezziecK2M6ZrZDAz6qlPCyA1yUhIvNT0SRJsBXKGPGHUHZkB7XcT34CMg3_IMKeyAE8mkoOdWgbNlgJyPPX07zivyL-QiBdXIUYi1-Xr-2AvqsNkM6Ybybrz7Uou_u3E2H1E4ZTuFsqfq3_IbnpFMS7S9mBrqjSf5ol2w8Opo',
      students: 456,
      rating: 4.9,
      level: 'Intermediate',
      price: 79.99,
      description: 'Complete JavaScript guide from basics to advanced concepts including ESNext features.',
      status: 'Published',
      tutor: {
        name: 'John Doe',
        role: 'Full Stack Architect',
        avatar: 'https://i.pravatar.cc/150?u=john',
        bio: 'John has built systems for Fortune 500 companies and loves teaching JS.'
      },
      videos: []
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      chapters: 10,
      hours: 6,
      category: 'Design',
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcproyESwAtBxJeCkdywZp38Oo9rkqeX5apcg0j8xOO838c35xrqnMuFGblAb1Nua4ZuLp5jn06CS8FHbo4r9pu8o3fNBWGTQNIIwezziecK2M6ZrZDAz6qlPCyA1yUhIvNT0SRJsBXKGPGHUHZkB7XcT34CMg3_IMKeyAE8mkoOdWgbNlgJyPPX07zivyL-QiBdXIUYi1-Xr-2AvqsNkM6Ybybrz7Uou_u3E2H1E4ZTuFsqfq3_IbnpFMS7S9mBrqjSf5ol2w8Opo',
      students: 189,
      rating: 4.7,
      level: 'Beginner',
      price: 59.99,
      description: 'Learn the fundamentals of user interface and user experience design with Figma.',
      status: 'Hidden',
      tutor: {
        name: 'Jane Smith',
        role: 'Lead Designer',
        avatar: 'https://i.pravatar.cc/150?u=jane',
        bio: 'Jane is a creative director with a passion for clean, accessible design.'
      },
      videos: []
    }
  ]);

  const handleStatusToggle = (courseId) => {
    setCourses(prev => prev.map(c => 
      c.id === courseId 
        ? { ...c, status: c.status === 'Published' ? 'Hidden' : 'Published' } 
        : c
    ));
    if (selectedCourse?.id === courseId) {
      setSelectedCourse(prev => ({ ...prev, status: prev.status === 'Published' ? 'Hidden' : 'Published' }));
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
      setSelectedCourse(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Hidden': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
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
                      <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(course.status)}`}>{course.status}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{course.description}</p>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <span className="font-bold text-primary">${course.price}</span>
                        <span className="text-slate-400 flex items-center gap-1"><span className="material-symbols-outlined text-sm">groups</span> {course.students}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedCourse(course)} className="flex-1 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-bold flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-sm">settings</span> Manage
                        </button>
                        <button onClick={() => handleStatusToggle(course.id)} className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 rounded-lg">
                          <span className="material-symbols-outlined text-sm">{course.status === 'Published' ? 'visibility_off' : 'visibility'}</span>
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
                  <div className="flex gap-6">
                    <img src={selectedCourse.thumbnail} alt="" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-50 dark:border-slate-800 shadow-sm" />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(selectedCourse.status)}`}>{selectedCourse.status}</span>
                        <span className="text-slate-500 text-sm">{selectedCourse.category}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedCourse.title}</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 max-w-xl">{selectedCourse.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => setShowVideoUpload(true)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 font-bold shadow-lg shadow-primary/20">
                      <span className="material-symbols-outlined">video_call</span> Add Video
                    </button>
                    <button onClick={() => setShowResourceUpload(true)} className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 font-bold">
                      <span className="material-symbols-outlined">attach_file</span> Add Resources
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
                        <span className="material-symbols-outlined text-primary">video_library</span> Series of Videos
                      </h3>
                      

                      <div className="space-y-4">
                        {selectedCourse.videos?.length > 0 ? (
                          selectedCourse.videos.map((video, idx) => (
                            <div key={video.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-3">
                                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">{idx + 1}</span>
                                  <h4 className="font-semibold text-slate-900 dark:text-white">{video.title}</h4>
                                </div>
                                <div className="flex gap-2">
                                  <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors"><span className="material-symbols-outlined text-sm">edit</span></button>
                                  <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 rounded-lg transition-colors"><span className="material-symbols-outlined text-sm">delete</span></button>
                                </div>
                              </div>
                              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">notes</span> Reference Notes
                                  </label>
                                  <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50 italic min-h-[100px]">
                                    {video.notes || 'No notes added yet.'}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center justify-between">
                                    <span className="flex items-center gap-1">
                                      <span className="material-symbols-outlined text-xs">attach_file</span> Attached Files & Resources
                                    </span>
                                    <input
                                      type="file"
                                      className="hidden"
                                      id={`file-upload-${video.id}`}
                                      multiple
                                      accept=".pdf,image/*,.zip"
                                    />
                                    <label
                                      htmlFor={`file-upload-${video.id}`}
                                      className="text-primary hover:text-blue-600 cursor-pointer text-[10px] font-black uppercase flex items-center gap-1"
                                    >
                                      <span className="material-symbols-outlined text-[12px]">upload</span>
                                      Upload PDF/Image
                                    </label>
                                  </label>
                                  <div className="space-y-2">
                                    {video.files?.map((file, fidx) => (
                                      <div key={fidx} className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 rounded-lg text-sm border border-slate-100 dark:border-slate-700/50 shadow-sm group">
                                        <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                          <span className="material-symbols-outlined text-sm text-primary">description</span> {file}
                                        </span>
                                        <span className="material-symbols-outlined text-sm text-slate-400 cursor-pointer hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">close</span>
                                      </div>
                                    ))}
                                    <button className="w-full py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-500 hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-1 mt-2 font-medium bg-slate-50/50 dark:bg-slate-800/50">
                                      <span className="material-symbols-outlined text-sm">add</span> Add File/Resource
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/30 dark:bg-slate-800/30">
                            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">movie</span>
                            <p className="text-slate-500 dark:text-slate-400">No videos in this course yet.</p>
                            <button onClick={() => setShowVideoUpload(true)} className="mt-4 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-lg transition-all text-sm font-bold">
                              Upload First Video
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Instructor & Quick Stats */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
                      <img src={selectedCourse.tutor.avatar} alt="" className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-slate-50 dark:border-slate-800 shadow-sm" />
                      <h4 className="font-bold text-slate-900 dark:text-white">{selectedCourse.tutor.name}</h4>
                      <p className="text-sm text-primary font-medium mb-4">{selectedCourse.tutor.role}</p>
                      <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Edit Instructor Profile</button>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 p-6 rounded-2xl text-white shadow-lg border border-white/10">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">analytics</span> Performance
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-white/5">
                          <span className="text-slate-400 text-sm">Enrolled Students</span>
                          <span className="text-xl font-bold">{selectedCourse.students}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">Total Revenue</span>
                          <span className="text-xl font-bold text-green-400">${(selectedCourse.students * selectedCourse.price).toLocaleString()}</span>
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

      <VideoUploadModal isOpen={showVideoUpload} onClose={() => setShowVideoUpload(false)} />
      <ResourceUploadModal isOpen={showResourceUpload} onClose={() => setShowResourceUpload(false)} />
    </div>
  );
}
