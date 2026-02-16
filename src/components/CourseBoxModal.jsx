import React, { useState } from 'react';

export default function CourseBoxModal({ isOpen, onClose }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingTutor, setEditingTutor] = useState(false);
  const [tutorData, setTutorData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    expertise: '',
    experience: '',
    rating: 0
  });

  // Sample course data with mentors
  const courses = [
    {
      id: 1,
      title: 'Advanced React Design Patterns',
      category: 'Development',
      students: 1204,
      duration: '8.5 hours',
      level: 'Advanced',
      rating: 4.8,
      thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcproyESwAtBxJeCkdywZp38Oo9rkqeX5apcg0j8xOO838c35xrqnMuFGblAb1Nua4ZuLp5jn06CS8FHbo4r9pu8o3fNBWGTQNIIwezziecK2M6ZrZDAz6qlPCyA1yUhIvNT0SRJsBXKGPGHUHZkB7XcT34CMg3_IMKeyAE8mkoOdWgbNlgJyPPX07zivyL-QiBdXIUYi1-Xr-2AvqsNkM6Ybybrz7Uou_u3E2H1E4ZTuFsqfq3_IbnpFMS7S9mBrqjSf5ol2w8Opo',
      tutor: {
        name: 'Dr. Sarah Mitchell',
        email: 'sarah.mitchell@edutech.com',
        phone: '+1 234-567-8901',
        bio: 'Senior React developer with 10+ years of experience building scalable web applications.',
        expertise: 'React, JavaScript, TypeScript, Node.js',
        experience: '10 years',
        rating: 4.9,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBojQj7MnbGZohBA4TDWOtJQcuxJi9pCC_pti67WICpmWgdbhXgiI0yz045vTUU2eUig-TQn1-n-pviZEYk9NmB0cWwkslkksLRxjzvEsK3x8pUO5R7jNcnC0aWxeRE1CHkb-cOsD-3iEXYdH6hVIDUSjD495NeK78j2a0esNoQFXaqZBJPWDuk5HBqV7ks_HMMFrrR4PC-xSQjpOdCrE5nAZxnSq5UNHB5UYicIkawU1nqzigNRKeP5YakuMV2mUFwNDaBXzYcV2yv'
      }
    },
    {
      id: 2,
      title: 'JavaScript Mastery',
      category: 'Development',
      students: 892,
      duration: '12 hours',
      level: 'Intermediate',
      rating: 4.7,
      thumbnail: 'https://via.placeholder.com/400x200?text=JavaScript',
      tutor: {
        name: 'Prof. Michael Chen',
        email: 'michael.chen@edutech.com',
        phone: '+1 234-567-8902',
        bio: 'JavaScript expert and educator passionate about teaching modern web development.',
        expertise: 'JavaScript, ES6+, Async Programming, Algorithms',
        experience: '8 years',
        rating: 4.8,
        avatar: 'https://via.placeholder.com/150'
      }
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      category: 'Design',
      students: 656,
      duration: '6 hours',
      level: 'Beginner',
      rating: 4.6,
      thumbnail: 'https://via.placeholder.com/400x200?text=Design',
      tutor: {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@edutech.com',
        phone: '+1 234-567-8903',
        bio: 'Creative designer with expertise in user experience and interface design.',
        expertise: 'Figma, Adobe XD, Prototyping, User Research',
        experience: '6 years',
        rating: 4.7,
        avatar: 'https://via.placeholder.com/150'
      }
    },
    {
      id: 4,
      title: 'Node.js Backend Development',
      category: 'Development',
      students: 445,
      duration: '10 hours',
      level: 'Intermediate',
      rating: 4.5,
      thumbnail: 'https://via.placeholder.com/400x200?text=Node.js',
      tutor: {
        name: 'James Wilson',
        email: 'james.wilson@edutech.com',
        phone: '+1 234-567-8904',
        bio: 'Backend specialist focused on building scalable server-side applications.',
        expertise: 'Node.js, Express, MongoDB, REST APIs',
        experience: '7 years',
        rating: 4.6,
        avatar: 'https://via.placeholder.com/150'
      }
    },
    {
      id: 5,
      title: 'Digital Marketing Strategy',
      category: 'Marketing',
      students: 328,
      duration: '5 hours',
      level: 'Beginner',
      rating: 4.4,
      thumbnail: 'https://via.placeholder.com/400x200?text=Marketing',
      tutor: {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@edutech.com',
        phone: '+1 234-567-8905',
        bio: 'Marketing expert helping businesses grow through digital strategies.',
        expertise: 'SEO, Social Media, Content Marketing, Analytics',
        experience: '5 years',
        rating: 4.5,
        avatar: 'https://via.placeholder.com/150'
      }
    },
    {
      id: 6,
      title: 'Python for Data Science',
      category: 'Data Science',
      students: 789,
      duration: '15 hours',
      level: 'Advanced',
      rating: 4.9,
      thumbnail: 'https://via.placeholder.com/400x200?text=Python',
      tutor: {
        name: 'Dr. Robert Kumar',
        email: 'robert.kumar@edutech.com',
        phone: '+1 234-567-8906',
        bio: 'Data scientist and machine learning researcher with academic and industry experience.',
        expertise: 'Python, Machine Learning, Data Analysis, TensorFlow',
        experience: '12 years',
        rating: 4.9,
        avatar: 'https://via.placeholder.com/150'
      }
    }
  ];

  // Sample students who watched courses
  const getCourseStudents = (courseId) => {
    const allStudents = [
      { name: 'Alex Johnson', email: 'alex@example.com', progress: 85, completedDate: '2024-02-10' },
      { name: 'Sarah Chen', email: 'sarah@example.com', progress: 92, completedDate: '2024-02-12' },
      { name: 'Mike Wilson', email: 'mike@example.com', progress: 78, completedDate: '2024-02-08' },
      { name: 'Emma Davis', email: 'emma@example.com', progress: 95, completedDate: '2024-02-14' },
      { name: 'John Smith', email: 'john@example.com', progress: 67, completedDate: '2024-02-05' },
      { name: 'Lisa Brown', email: 'lisa@example.com', progress: 88, completedDate: '2024-02-11' },
      { name: 'David Lee', email: 'david@example.com', progress: 73, completedDate: '2024-02-09' },
      { name: 'Anna Martinez', email: 'anna@example.com', progress: 91, completedDate: '2024-02-13' }
    ];
    return allStudents.slice(0, Math.floor(Math.random() * 4) + 5);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setTutorData(course.tutor);
  };

  const handleEditTutor = () => {
    setEditingTutor(true);
  };

  const handleSaveTutor = () => {
    // Update tutor data (in real app, this would save to backend)
    if (selectedCourse) {
      selectedCourse.tutor = { ...tutorData };
    }
    setEditingTutor(false);
  };

  const handleTutorChange = (e) => {
    const { name, value } = e.target;
    setTutorData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Course Management</h2>
              <p className="text-slate-500">View courses and manage tutor assignments</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
        </div>

        {!selectedCourse ? (
          /* Course Grid View */
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleCourseClick(course)}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-lg text-xs font-medium">
                      {course.level}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Category:</span>
                        <span className="font-medium text-slate-900 dark:text-white">{course.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Students:</span>
                        <span className="font-medium text-slate-900 dark:text-white">{course.students}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                        <span className="font-medium text-slate-900 dark:text-white">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Rating:</span>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-amber-500 text-sm">star</span>
                          <span className="font-medium text-slate-900 dark:text-white">{course.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <img
                          src={course.tutor.avatar}
                          alt={course.tutor.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Tutor: {course.tutor.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Course Detail View */
          <div className="flex flex-col lg:flex-row h-full">
            {/* Course Info */}
            <div className="lg:w-1/2 p-6 border-r border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedCourse(null)}
                className="mb-4 flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Back to courses
              </button>

              <div className="space-y-6">
                <div>
                  <img
                    src={selectedCourse.thumbnail}
                    alt={selectedCourse.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {selectedCourse.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400">category</span>
                      <span className="text-slate-600 dark:text-slate-400">{selectedCourse.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400">groups</span>
                      <span className="text-slate-600 dark:text-slate-400">{selectedCourse.students} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400">schedule</span>
                      <span className="text-slate-600 dark:text-slate-400">{selectedCourse.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400">star</span>
                      <span className="text-slate-600 dark:text-slate-400">{selectedCourse.rating} rating</span>
                    </div>
                  </div>
                </div>

                {/* Tutor Info */}
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-900 dark:text-white">Course Tutor</h4>
                    {!editingTutor && (
                      <button
                        onClick={handleEditTutor}
                        className="text-sm text-primary hover:text-blue-600 font-medium"
                      >
                        Edit Tutor
                      </button>
                    )}
                  </div>

                  {editingTutor ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="name"
                        value={tutorData.name}
                        onChange={handleTutorChange}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        placeholder="Tutor Name"
                      />
                      <input
                        type="email"
                        name="email"
                        value={tutorData.email}
                        onChange={handleTutorChange}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        placeholder="Email"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={tutorData.phone}
                        onChange={handleTutorChange}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                        placeholder="Phone"
                      />
                      <textarea
                        name="bio"
                        value={tutorData.bio}
                        onChange={handleTutorChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white resize-none"
                        placeholder="Bio"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveTutor}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTutor(false)}
                          className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <img
                        src={tutorData.avatar}
                        alt={tutorData.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-slate-900 dark:text-white">{tutorData.name}</h5>
                        <p className="text-sm text-slate-500">{tutorData.email}</p>
                        <p className="text-sm text-slate-500">{tutorData.phone}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{tutorData.bio}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span>Experience: {tutorData.experience}</span>
                          <span>Rating: {tutorData.rating} ⭐</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Students List */}
            <div className="lg:w-1/2 p-6">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                Students Who Watched This Course
              </h4>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {getCourseStudents(selectedCourse.id).map((student, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                        <p className="text-sm text-slate-500">{student.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">{student.progress}%</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Completed: {new Date(student.completedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
