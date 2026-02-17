import React, { useState } from 'react';
import StudentListModal from '../StudentListModal';

export default function Overview() {
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Stats data
  const stats = [
    {
      title: 'Total Students',
      value: '12,482',
      trend: '+12%',
      icon: 'groups',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      trendColor: 'text-green-500',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Active Courses',
      value: '24',
      trend: '+4',
      icon: 'menu_book',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30',
      trendColor: 'text-green-500',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Expert Staff',
      value: '18',
      trend: '+2',
      icon: 'badge',
      bgColor: 'bg-amber-50 dark:bg-amber-900/30',
      trendColor: 'text-green-500',
      iconColor: 'text-amber-600',
    },
  ];

  const chartData = [
    { label: 'Development', value: 80, color: 'bg-blue-500', staff: 8 },
    { label: 'Design', value: 45, color: 'bg-purple-500', staff: 4 },
    { label: 'Business', value: 65, color: 'bg-emerald-500', staff: 3 },
    { label: 'Marketing', value: 30, color: 'bg-orange-500', staff: 2 },
    { label: 'Data Science', value: 20, color: 'bg-red-400', staff: 1 },
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
    {
      icon: 'payment',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600',
      title: 'Payment failed for React Course',
      from: 'sarah_dev',
      time: '5 hours ago',
    },
  ];

  const courses = [
    {
      name: 'Advanced React Design Patterns',
      status: 'Live',
      students: '1,204',
      date: 'Oct 24, 2023',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcproyESwAtBxJeCkdywZp38Oo9rkqeX5apcg0j8xOO838c35xrqnMuFGblAb1Nua4ZuLp5jn06CS8FHbo4r9pu8o3fNBWGTQNIIwezziecK2M6ZrZDAz6qlPCyA1yUhIvNT0SRJsBXKGPGHUHZkB7XcT34CMg3_IMKeyAE8mkoOdWgbNlgJyPPX07zivyL-QiBdXIUYi1-Xr-2AvqsNkM6Ybybrz7Uou_u3E2H1E4ZTuFsqfq3_IbnpFMS7S9mBrqjSf5ol2w8Opo',
    },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="text-left border-b border-slate-100 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Real-time performance and administrative insights.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stats Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Row Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => stat.title === 'Total Students' && setShowStudentModal(true)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined text-xl ${stat.iconColor}`}>{stat.icon}</span>
                  </div>
                  <div className={`${stat.trendColor} px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold flex items-center gap-0.5`}>
                    <span className="material-symbols-outlined text-[12px]">
                      {stat.trend.startsWith('+') ? 'trending_up' : 'trending_down'}
                    </span>
                    {stat.trend}
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[9px] text-left">Platform Metric</p>
                <div className="flex flex-col text-left mt-1">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-none">{stat.value}</h2>
                  <span className="text-slate-400 text-[11px] font-medium mt-1">{stat.title}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Category Distribution Visual */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Staff & Content Distribution</h3>
              <span className="text-xs text-slate-400 font-medium italic">By Category</span>
            </div>
            <div className="space-y-6">
              {chartData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      {item.label}
                    </span>
                    <div className="flex gap-4">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">Staff: {item.staff}</span>
                      <span className="text-slate-900 dark:text-white font-mono font-bold">{item.value}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
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
        <div className="space-y-6">
          {/* Support Inquiries Sidebar */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">contact_support</span>
              Support Desk
            </h3>
            <div className="space-y-4">
              {supportInquiries.map((inquiry, index) => (
                <div key={index} className="group p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 ${inquiry.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <span className={`material-symbols-outlined text-sm ${inquiry.iconColor}`}>{inquiry.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{inquiry.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-primary font-bold px-1.5 py-0.5 bg-primary/5 rounded capitalize">@{inquiry.from}</span>
                        <span className="text-[10px] text-slate-400">• {inquiry.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-sm font-bold text-slate-500 hover:text-primary transition-colors border-t border-slate-100 dark:border-slate-800 mt-2">
                View All Tickets
              </button>
            </div>
          </div>

          {/* Student Engagement Mini-Widget */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined">insights</span>
              <span className="font-bold text-sm uppercase tracking-widest">Active Engagement</span>
            </div>
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-indigo-100 text-xs">Completion Rate</p>
                  <h4 className="text-2xl font-black">74.2%</h4>
                </div>
                <div className="text-emerald-400 text-xs font-bold flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-xs">arrow_upward</span>
                  +2.4%
                </div>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full w-[74%]" />
              </div>
              <p className="text-[10px] text-indigo-200 italic font-medium leading-relaxed">
                * Based on student video progress across all published courses this month.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <StudentListModal 
        isOpen={showStudentModal} 
        onClose={() => setShowStudentModal(false)} 
      />
    </div>
  );
}
