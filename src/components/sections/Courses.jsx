import React, { useState } from 'react';
import CourseBoxModal from '../CourseBoxModal';
import CreateCourseModal from '../CreateCourseModal';

export default function Courses() {
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);

  const handleEditClick = (course) => {
    setSelectedCourseForEdit(course);
    setShowCourseModal(true);
  };

  const coursesList = [
    {
      id: 1,
      name: 'Advanced React Design Patterns',
      chapters: 12,
      hours: 8.5,
      category: 'Development',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcproyESwAtBxJeCkdywZp38Oo9rkqeX5apcg0j8xOO838c35xrqnMuFGblAb1Nua4ZuLp5jn06CS8FHbo4r9pu8o3fNBWGTQNIIwezziecK2M6ZrZDAz6qlPCyA1yUhIvNT0SRJsBXKGPGHUHZkB7XcT34CMg3_IMKeyAE8mkoOdWgbNlgJyPPX07zivyL-QiBdXIUYi1-Xr-2AvqsNkM6Ybybrz7Uou_u3E2H1E4ZTuFsqfq3_IbnpFMS7S9mBrqjSf5ol2w8Opo',
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
      }
    },
    {
      id: 2,
      name: 'JavaScript Mastery',
      chapters: 15,
      hours: 12,
      category: 'Development',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcproyESwAtBxJeCkdywZp38Oo9rkqeX5apcg0j8xOO838c35xrqnMuFGblAb1Nua4ZuLp5jn06CS8FHbo4r9pu8o3fNBWGTQNIIwezziecK2M6ZrZDAz6qlPCyA1yUhIvNT0SRJsBXKGPGHUHZkB7XcT34CMg3_IMKeyAE8mkoOdWgbNlgJyPPX07zivyL-QiBdXIUYi1-Xr-2AvqsNkM6Ybybrz7Uou_u3E2H1E4ZTuFsqfq3_IbnpFMS7S9mBrqjSf5ol2w8Opo',
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
      }
    },
    {
      id: 3,
      name: 'UI/UX Design Fundamentals',
      chapters: 10,
      hours: 6,
      category: 'Design',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcproyESwAtBxJeCkdywZp38Oo9rkqeX5apcg0j8xOO838c35xrqnMuFGblAb1Nua4ZuLp5jn06CS8FHbo4r9pu8o3fNBWGTQNIIwezziecK2M6ZrZDAz6qlPCyA1yUhIvNT0SRJsBXKGPGHUHZkB7XcT34CMg3_IMKeyAE8mkoOdWgbNlgJyPPX07zivyL-QiBdXIUYi1-Xr-2AvqsNkM6Ybybrz7Uou_u3E2H1E4ZTuFsqfq3_IbnpFMS7S9mBrqjSf5ol2w8Opo',
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
      }
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Intermediate': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Courses</h1>
          <p className="text-slate-500">Manage and organize your learning material.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20 font-bold"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Create New Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesList.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="relative">
              <img 
                alt="Course" 
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" 
                src={course.image} 
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-slate-900 dark:text-white truncate mb-2">{course.name}</h4>
              <p className="text-sm text-slate-500 mb-3">
                {course.chapters} Chapters • {course.hours} Hours • {course.students} students
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-primary bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                  {course.category}
                </span>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-amber-500 text-sm">star</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{course.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary text-lg">${course.price}</span>
                <button 
                  onClick={() => handleEditClick(course)}
                  className="text-primary font-bold text-sm hover:underline flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">edit</span>
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Course Modal */}
      <CreateCourseModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Course Management Modal (Edit Details) */}
      <CourseBoxModal 
        isOpen={showCourseModal} 
        onClose={() => setShowCourseModal(false)} 
        initialCourse={selectedCourseForEdit}
      />

      {/* Video Upload Modal Removed from here as requested */}
    </div>
  );
}
