import React from 'react';

export default function Sidebar({ activeTab, setActiveTab, toggleDarkMode }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'courses', label: 'Courses', icon: 'menu_book' },
    { id: 'students', label: 'Students', icon: 'groups' },
    { id: 'analytics', label: 'Analytics', icon: 'analytics' },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex-shrink-0 flex flex-col sticky top-0 h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white">school</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">LearnFlow</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="material-symbols-outlined">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <span className="material-symbols-outlined">settings</span>
          Settings
        </button>
      </nav>

      {/* Dark Mode Toggle */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          <span className="material-symbols-outlined">dark_mode</span>
          Dark Mode
        </button>
      </div>
    </aside>
  );
}
