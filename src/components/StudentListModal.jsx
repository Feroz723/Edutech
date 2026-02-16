import React, { useState } from 'react';

export default function StudentListModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Sample student data
  const students = [
    {
      id: 1,
      name: 'Marcus Holloway',
      email: 'marcus@example.com',
      courses: 5,
      completion: 98,
      grade: 'A+',
      enrolledDate: '2023-01-15',
      lastActive: '2024-02-14',
      status: 'Active',
      feeStatus: 'Paid',
      phone: '+1 234-567-8901',
      location: 'New York, USA'
    },
    {
      id: 2,
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      courses: 3,
      completion: 85,
      grade: 'A',
      enrolledDate: '2023-02-20',
      lastActive: '2024-02-13',
      status: 'Active',
      feeStatus: 'Paid',
      phone: '+1 234-567-8902',
      location: 'San Francisco, USA'
    },
    {
      id: 3,
      name: 'James Wilson',
      email: 'james@example.com',
      courses: 7,
      completion: 72,
      grade: 'B+',
      enrolledDate: '2022-11-10',
      lastActive: '2024-02-12',
      status: 'Active',
      feeStatus: 'Pending',
      phone: '+1 234-567-8903',
      location: 'London, UK'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      courses: 4,
      completion: 91,
      grade: 'A',
      enrolledDate: '2023-03-05',
      lastActive: '2024-02-14',
      status: 'Active',
      feeStatus: 'Paid',
      phone: '+1 234-567-8904',
      location: 'Toronto, Canada'
    },
    {
      id: 5,
      name: 'Michael Kim',
      email: 'michael@example.com',
      courses: 2,
      completion: 45,
      grade: 'C',
      enrolledDate: '2023-04-12',
      lastActive: '2024-02-10',
      status: 'Inactive',
      feeStatus: 'Paid',
      phone: '+1 234-567-8905',
      location: 'Seoul, South Korea'
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      courses: 6,
      completion: 88,
      grade: 'A-',
      enrolledDate: '2022-12-01',
      lastActive: '2024-02-13',
      status: 'Active',
      feeStatus: 'Paid',
      phone: '+1 234-567-8906',
      location: 'Sydney, Australia'
    }
  ];

  const courses = [
    { id: 'all', name: 'All Courses' },
    { id: 'react', name: 'Advanced React' },
    { id: 'javascript', name: 'JavaScript Mastery' },
    { id: 'design', name: 'UI/UX Design' },
    { id: 'nodejs', name: 'Node.js Backend' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.courses > 0;
    return matchesSearch && matchesCourse;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Inactive': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-emerald-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Student Management</h2>
              <p className="text-slate-500">View and manage all enrolled students</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  type="text"
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white">groups</span>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Students</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{students.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white">check_circle</span>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{students.filter(s => s.status === 'Active').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white">school</span>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Avg Completion</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {Math.round(students.reduce((acc, s) => acc + s.completion, 0) / students.length)}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white">payments</span>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Paid Fees</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{students.filter(s => s.feeStatus === 'Paid').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Courses</th>
                <th className="px-6 py-4">Completion</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Fee Status</th>
                <th className="px-6 py-4">Last Active</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{student.name}</p>
                        <p className="text-xs text-slate-500">ID: STU{student.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-slate-900 dark:text-white">{student.email}</p>
                      <p className="text-xs text-slate-500">{student.phone}</p>
                      <p className="text-xs text-slate-500">{student.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{student.courses}</span>
                      <span className="text-xs text-slate-500">courses</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 max-w-[100px]">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${student.completion}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{student.completion}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${getGradeColor(student.grade)}`}>{student.grade}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusColor(student.status)} uppercase`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${student.feeStatus === 'Paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'} uppercase`}>
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {new Date(student.lastActive).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-primary rounded-lg transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button className="p-1.5 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredStudents.length} of {students.length} students
          </p>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
            Export List
          </button>
        </div>
      </div>
    </div>
  );
}
