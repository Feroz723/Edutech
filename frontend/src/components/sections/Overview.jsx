import React, { useState, useEffect } from 'react';
import StudentListModal from '../StudentListModal';
import CourseListModal from '../CourseListModal';
import api from '../../lib/api';

export default function Overview() {
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ students: 0, courses: 0, staff: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [usersRes, coursesRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/courses/all') // Use /all for accurate platform-wide count
        ]);

        setCounts({
          students: usersRes.data?.length || 0,
          courses: coursesRes.data?.length || 0,
          staff: usersRes.data?.filter(u => u.role === 'admin')?.length || 1
        });
      } catch (err) {
        console.error('Stats error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Stats data
  const stats = [
    {
      title: 'Total Learners',
      value: loading ? '...' : counts.students.toLocaleString(),
      trend: '+4%',
      icon: 'groups',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      trendColor: 'text-green-500',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Number of Courses',
      value: loading ? '...' : counts.courses.toLocaleString(),
      trend: counts.courses > 0 ? '+1' : '0',
      icon: 'menu_book',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30',
      trendColor: 'text-green-500',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Instructors',
      value: loading ? '...' : counts.staff.toLocaleString(),
      trend: '0',
      icon: 'badge',
      bgColor: 'bg-amber-50 dark:bg-amber-900/30',
      trendColor: 'text-slate-400',
      iconColor: 'text-amber-600',
    },
  ];

  const chartData = [
    { label: 'Development', value: 80, color: 'bg-indigo-500', staff: 8 },
    { label: 'Design', value: 45, color: 'bg-purple-500', staff: 4 },
    { label: 'Business', value: 65, color: 'bg-emerald-500', staff: 3 },
  ];

  const supportInquiries = [
    {
      icon: 'help',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-primary',
      title: 'How to reset my password?',
      from: 'user_2492',
      time: '2 hours ago',
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="text-left border-b border-slate-100 dark:border-slate-800 pb-6">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">System Overview</h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Platform Performance & Administrative Console</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Stats Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Top Row Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => {
                  if (stat.title === 'Total Learners') setShowStudentModal(true);
                  if (stat.title === 'Number of Courses') setShowCourseModal(true);
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined text-2xl ${stat.iconColor}`}>{stat.icon}</span>
                  </div>
                  <div className={`${stat.trendColor} px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black flex items-center gap-0.5`}>
                    <span className="material-symbols-outlined text-[14px]">
                      {stat.trend.startsWith('+') ? 'trending_up' : 'trending_down'}
                    </span>
                    {stat.trend}
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-none mb-1">{stat.value}</h2>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Category Distribution Visual */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Enrollment Distribution</h3>
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Global Analytics</span>
            </div>
            <div className="space-y-8">
              {chartData.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-slate-700 dark:text-slate-300 flex items-center gap-3 uppercase text-[10px] tracking-widest">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      {item.label}
                    </span>
                    <span className="text-slate-900 dark:text-white font-black text-sm">{item.value}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-600">contact_support</span>
              Support Hub
            </h3>
            <div className="space-y-4">
              {supportInquiries.map((inquiry, index) => (
                <div key={index} className="group p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-indigo-500/20 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${inquiry.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <span className={`material-symbols-outlined text-lg ${inquiry.iconColor}`}>{inquiry.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-black text-slate-900 dark:text-white truncate">{inquiry.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-indigo-600 font-black px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 rounded uppercase">@{inquiry.from}</span>
                        <span className="text-[10px] text-slate-400 font-bold">• {inquiry.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2rem] text-white shadow-2xl shadow-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined font-bold">insights</span>
                <span className="font-black text-[10px] uppercase tracking-[0.2em]">Platform Growth</span>
              </div>
              <div>
                <h4 className="text-4xl font-black mb-1">89.4%</h4>
                <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest">Avg Course Satisfaction</p>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-[89%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <StudentListModal
        isOpen={showStudentModal}
        onClose={() => setShowStudentModal(false)}
      />
      <CourseListModal
        isOpen={showCourseModal}
        onClose={() => setShowCourseModal(false)}
      />
    </div>
  );
}
