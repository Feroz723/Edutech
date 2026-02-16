import React from 'react';

export default function Overview() {
  const stats = [
    {
      title: 'Total Students',
      value: '12,482',
      trend: '+12%',
      icon: 'groups',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      trendColor: 'text-green-500',
      iconColor: 'text-primary',
    },
    {
      title: 'Courses Active',
      value: '84',
      trend: '+5%',
      icon: 'play_circle',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      trendColor: 'text-green-500',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Total Revenue',
      value: '$158,240',
      trend: '-2%',
      icon: 'payments',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      trendColor: 'text-red-500',
      iconColor: 'text-emerald-600',
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-slate-500">Manage your students and course content efficiently.</p>
        </div>
        <button className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold transition-colors shadow-lg shadow-blue-500/20">
          <span className="material-symbols-outlined">video_call</span>
          Upload New Video
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${stat.iconColor}`}>{stat.icon}</span>
              </div>
              <span className={`${stat.trendColor} text-sm font-medium flex items-center`}>
                <span className="material-symbols-outlined text-sm mr-1">
                  {stat.trend.startsWith('+') ? 'trending_up' : 'trending_down'}
                </span>
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">{stat.title}</p>
            <h2 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Course Management Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Course Management</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Filter
            </button>
            <button className="px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Video/Course Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4">Date Uploaded</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {courses.map((course, index) => (
                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 bg-slate-200 dark:bg-slate-700 rounded-md overflow-hidden flex-shrink-0">
                        <img alt="Course Thumbnail" className="w-full h-full object-cover" src={course.image} />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{course.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 uppercase tracking-wide">
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{course.students}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{course.date}</td>
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
      </div>
    </div>
  );
}
