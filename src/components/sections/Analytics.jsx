import React from 'react';

export default function Analytics() {
  const metrics = [
    { label: 'Conversion Rate', value: '4.2%' },
    { label: 'Churn Rate', value: '1.8%', valueColor: 'text-red-500' },
    { label: 'Avg. LTV', value: '$240.50' },
    { label: 'Support Tickets', value: '14 New' },
  ];

  const chartData = [
    { label: 'Dev', value: 80, color: 'bg-blue-500' },
    { label: 'Design', value: 45, color: 'bg-purple-500' },
    { label: 'Biz', value: 65, color: 'bg-emerald-500' },
    { label: 'Mark', value: 30, color: 'bg-orange-500' },
    { label: 'Misc', value: 20, color: 'bg-red-400' },
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics & Performance</h1>
          <p className="text-slate-500">Key metrics and trends for the platform.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
          <button className="px-3 py-1.5 text-sm font-semibold bg-slate-100 dark:bg-slate-800 rounded-md">
            Last 7 Days
          </button>
          <button className="px-3 py-1.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            30 Days
          </button>
          <button className="px-3 py-1.5 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            12 Months
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 dark:text-white">Student Enrollment Trends</h3>
            <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-medium">
              Weekly Growth: +12.5%
            </span>
          </div>
          <div className="relative h-64 flex items-end justify-between gap-1 group">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 400 200"
            >
              <path
                d="M0 160 Q 50 140, 100 120 T 200 80 T 300 100 T 400 40"
                fill="none"
                stroke="#1d4ed8"
                strokeLinecap="round"
                strokeWidth="3"
              ></path>
              <path
                d="M0 160 Q 50 140, 100 120 T 200 80 T 300 100 T 400 40 V 200 H 0 Z"
                fill="url(#gradient-line)"
                opacity="0.1"
              ></path>
              <defs>
                <linearGradient id="gradient-line" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1d4ed8"></stop>
                  <stop offset="100%" stopColor="transparent"></stop>
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute left-0 bottom-[40px] w-2.5 h-2.5 bg-primary border-2 border-white dark:border-slate-900 rounded-full"></div>
            <div className="absolute left-[25%] bottom-[80px] w-2.5 h-2.5 bg-primary border-2 border-white dark:border-slate-900 rounded-full"></div>
            <div className="absolute left-[50%] bottom-[120px] w-2.5 h-2.5 bg-primary border-2 border-white dark:border-slate-900 rounded-full"></div>
            <div className="absolute left-[75%] bottom-[100px] w-2.5 h-2.5 bg-primary border-2 border-white dark:border-slate-900 rounded-full"></div>
            <div className="absolute right-0 bottom-[160px] w-2.5 h-2.5 bg-primary border-2 border-white dark:border-slate-900 rounded-full"></div>
            <div className="w-full flex justify-between absolute -bottom-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 dark:text-white">Revenue by Category</h3>
            <button className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              more_horiz
            </button>
          </div>
          <div className="h-64 flex items-end justify-around gap-4 px-4 border-b border-slate-100 dark:border-slate-800 pb-1 relative">
            <div className="absolute left-0 h-full flex flex-col justify-between text-[10px] text-slate-400 pr-2">
              <span>$10k</span>
              <span>$7.5k</span>
              <span>$5k</span>
              <span>$2.5k</span>
              <span>0</span>
            </div>
            {chartData.map((item, index) => (
              <div
                key={index}
                className={`w-12 ${item.color} chart-bar transition-all duration-300 hover:opacity-80 rounded-t`}
                style={{ height: `${item.value}%` }}
                title={`${item.label}: $${item.value}00`}
              ></div>
            ))}
            <div className="absolute -bottom-10 inset-x-0 flex justify-around text-[10px] text-slate-500 font-bold">
              {chartData.map((item, index) => (
                <span key={index}>{item.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500 font-bold uppercase mb-1">{metric.label}</p>
            <h4 className={`text-xl font-bold ${metric.valueColor || ''}`}>{metric.value}</h4>
          </div>
        ))}
      </div>

      {/* Support Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Support Inquiries</h3>
          <div className="space-y-4">
            {supportInquiries.map((inquiry, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full ${inquiry.bgColor} flex items-center justify-center flex-shrink-0 ${inquiry.iconColor}`}>
                  <span className="material-symbols-outlined">{inquiry.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{inquiry.title}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    From: {inquiry.from} • {inquiry.time}
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-300 text-sm">chevron_right</span>
              </div>
            ))}
          </div>
        </div>

        {/* Support Card */}
        <div className="bg-primary p-6 rounded-xl shadow-lg shadow-blue-500/20 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Need help with the platform?</h3>
            <p className="text-blue-100 mb-6 max-w-xs">
              Our technical support team is available 24/7 to assist with your admin dashboard queries.
            </p>
            <button className="bg-white text-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
              Contact Support
            </button>
          </div>
          <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10">
            support_agent
          </span>
        </div>
      </div>
    </div>
  );
}
