import React from 'react';

const navItems = [
    { id: 'my-learning', label: 'My Courses', icon: 'auto_stories' },
    { id: 'live-classes', label: 'Live Classes', icon: 'videocam' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar_today' },
    { id: 'resources', label: 'Resources', icon: 'folder_open' },
];

export default function StudentSidebar({ activeTab, setActiveTab, onLogout, stats }) {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-40">
            {/* Logo */}
            <div className="p-8 pb-10 flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">school</span>
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">EduFlow</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === item.id
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Stats Summary */}
            <div className="px-8 py-10 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Courses</span>
                        <span className="text-slate-900 dark:text-white font-black">{stats.total || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Completed</span>
                        <span className="text-slate-900 dark:text-white font-black">{stats.completed || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">In Progress</span>
                        <span className="text-slate-900 dark:text-white font-black">{stats.inProgress || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Certificates</span>
                        <span className="text-slate-900 dark:text-white font-black">{stats.certificates || 0}</span>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="mt-10 w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl text-sm font-black transition-all"
                >
                    <span className="material-symbols-outlined text-xl">logout</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}
