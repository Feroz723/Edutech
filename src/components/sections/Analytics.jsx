import React, { useState, useEffect } from 'react';
import api from '../../lib/api';

export default function Analytics() {
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    enrollments: 0,
    avgCompletion: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [usersRes, coursesRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/courses')
        ]);

        setStats({
          users: usersRes.data?.length || 0,
          courses: coursesRes.data?.length || 0,
          enrollments: (coursesRes.data?.length || 0) * 12, // Mocked ratio for aesthetics
          avgCompletion: 78 // Default target
        });
      } catch (err) {
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const metrics = [
    { label: 'Active Learners', value: stats.users.toString(), icon: 'groups' },
    { label: 'Published Content', value: stats.courses.toString(), icon: 'menu_book' },
    { label: 'Completion Rate', value: `${stats.avgCompletion}%`, icon: 'verified' },
    { label: 'Network Uptime', value: '99.9%', icon: 'lan' },
  ];

  const chartData = [
    { label: 'DEV', value: 85, color: 'bg-indigo-600' },
    { label: 'UI', value: 65, color: 'bg-blue-500' },
    { label: 'BIZ', value: 45, color: 'bg-slate-400' },
    { label: 'OPS', value: 75, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-left">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Platform Intelligence</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Real-time telemetry and growth metrics</p>
        </div>
        <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-sm">
          <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white rounded-xl">Live Feed</button>
          <button className="px-6 py-2 text-[10px] font-black uppercase tracking-widest text-slate-500">Historical</button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{metric.label}</p>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{loading ? '...' : metric.value}</h4>
              <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+2.4% vs last period</span>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl opacity-5 text-indigo-600 group-hover:scale-110 transition-transform">
              {metric.icon}
            </span>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
        {/* Trend Chart */}
        <div className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10 relative z-10">
            <div>
              <h3 className="font-black text-white text-xl tracking-tight">Growth Velocity</h3>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Enrollment expansion index</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-500 px-4 py-1 rounded-full text-[10px] font-black tracking-widest">STABLE</span>
          </div>
          <div className="relative h-64 flex items-end justify-between px-2 pt-10">
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 150">
              <path d="M0 120 Q 50 110, 100 80 T 200 40 T 300 60 T 400 20" fill="none" stroke="#4f46e5" strokeWidth="4" />
            </svg>
            {[40, 65, 85, 55, 95, 75, 110].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group/bar">
                <div className="w-1.5 bg-indigo-500/20 rounded-full h-40 relative overflow-hidden">
                  <div className="absolute bottom-0 inset-x-0 bg-indigo-500 rounded-full transition-all duration-1000 group-hover/bar:bg-white" style={{ height: `${h}%` }} />
                </div>
                <span className="text-slate-600 text-[10px] font-black tracking-tighter uppercase">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-xl tracking-tight">Focus Distribution</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Content vertical analysis</p>
            </div>
            <button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
              <span className="material-symbols-outlined text-slate-400">filter_list</span>
            </button>
          </div>
          <div className="space-y-8">
            {chartData.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
                  <span className="text-slate-900 dark:text-white">{item.label} Sector</span>
                  <span className="text-slate-400">{item.value}% saturation</span>
                </div>
                <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
