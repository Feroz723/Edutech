import React, { useState, useEffect } from 'react';
import api from '../../lib/api';
import CreateStudentModal from '../CreateStudentModal';
import AssignCourseModal from '../AssignCourseModal';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/users');
      setStudents(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentCreated = (newStudent) => {
    setStudents(prev => [newStudent, ...prev]);
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student? This will also remove their authentication account.')) {
      try {
        await api.delete(`/admin/students/${studentId}`);
        setStudents(prev => prev.filter(s => s.id !== studentId));
      } catch (err) {
        alert('Failed to delete student: ' + err.message);
      }
    }
  };

  const filteredStudents = students.filter(student =>
    (student.name || student.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-left">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Student Directory</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Manage and monitor learner progression</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">search</span>
            <input
              type="text"
              placeholder="Filter by name or email..."
              className="pl-12 pr-6 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-sm min-w-[300px] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-indigo-600 border border-indigo-600 transition-all shadow-xl shadow-indigo-500/20"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Enroll New
          </button>
        </div>
      </div>

      <CreateStudentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onStudentCreated={handleStudentCreated}
      />

      <AssignCourseModal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent}
      />

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-bold">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Registered Learners</h3>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {filteredStudents.length} Total
          </span>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Synchronizing Directory...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-2">person_off</span>
              <p className="font-bold">No students found</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Profile info</th>
                  <th className="px-8 py-5">User ID</th>
                  <th className="px-8 py-5">System Role</th>
                  <th className="px-8 py-5">Joined Date</th>
                  <th className="px-8 py-5 text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 overflow-hidden border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 font-black text-lg">
                          {student.name ? student.name.charAt(0) : student.email?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white text-sm">{student.name || 'Anonymous User'}</p>
                          <p className="text-xs text-slate-500 font-medium">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-mono text-xs">{student.id.split('-')[0]}...</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${student.role === 'admin'
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
                        : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30'
                        }`}>
                        {student.role || 'student'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-bold text-xs">
                      {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white flex items-center gap-1"
                          title="Assign Course"
                        >
                          <span className="material-symbols-outlined text-sm font-bold">add_task</span>
                          Assign
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all text-slate-400 hover:text-red-500"
                          title="Delete Student"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
