import React, { useState, useEffect } from 'react';
import api from '../lib/api';

export default function StudentListModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/admin/users');
      setStudents(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const term = searchTerm.toLowerCase();
    return (student.name || student.fullName || '').toLowerCase().includes(term) ||
      (student.email || '').toLowerCase().includes(term);
  });

  const getStatusColor = (role) => {
    return role === 'admin'
      ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30'
      : 'bg-green-100 text-green-700 dark:bg-green-900/30';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[70] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-white/10">
        {/* Header */}
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Directory</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Platform-wide user management console</p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"
            >
              <span className="material-symbols-outlined text-slate-500">close</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="p-8 bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">search</span>
            <input
              type="text"
              placeholder="Search by name, email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-80 space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fetching user database...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-red-500 font-bold">Error: {error}</p>
              <button onClick={fetchStudents} className="mt-4 text-indigo-600 font-black uppercase text-xs hover:underline">Retry Connection</button>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="px-8 py-5">Learner Profile</th>
                  <th className="px-8 py-5">System Identity</th>
                  <th className="px-8 py-5">Role</th>
                  <th className="px-8 py-5">Platform Entry</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-black text-lg">
                          {(student.name || student.fullName || student.email || '?').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white text-sm">{student.name || student.fullName || 'Anonymous'}</p>
                          <p className="text-xs text-slate-500 font-medium">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500">
                        UID-{student.id.substring(0, 8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${getStatusColor(student.role)}`}>
                        {student.role || 'learner'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-500 font-bold">
                      {student.createdAt ? new Date(student.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Invalid Date'}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 outline-none">
                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all">
                          <span className="material-symbols-outlined text-slate-400 text-lg">more_horiz</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Audit logs indicate {filteredStudents.length} entries matching current filter
          </p>
          <button
            onClick={onClose}
            className="px-8 py-3.5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-500/20"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
}
