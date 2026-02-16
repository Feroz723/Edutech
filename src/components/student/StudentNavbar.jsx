import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function StudentNavbar({ toggleDarkMode }) {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
                {/* Left: Logo + Nav Links */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">school</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight">EduFlow</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
                        <a className="hover:text-primary transition-colors cursor-pointer" href="#">Courses</a>
                        <a className="hover:text-primary transition-colors cursor-pointer" href="#">Mentors</a>
                        <a className="hover:text-primary transition-colors cursor-pointer" href="#">Community</a>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Dark Mode Toggle */}
                    <button
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                        onClick={toggleDarkMode}
                        title="Toggle dark mode"
                    >
                        <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">dark_mode</span>
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <span className="material-symbols-outlined p-2 text-slate-600 dark:text-slate-400 cursor-pointer hover:text-primary transition-colors">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    </div>

                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>

                    {/* User Profile */}
                    <div className="flex items-center gap-3 pl-2">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-semibold">{user?.name || 'Student'}</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{user?.plan || 'Free Plan'}</p>
                        </div>
                        <img
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover"
                            src={user?.avatar || ''}
                        />
                    </div>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors group"
                        title="Logout"
                    >
                        <span className="material-symbols-outlined text-slate-500 group-hover:text-red-500 transition-colors">logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
