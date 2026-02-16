import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function StudentNavbar({ toggleDarkMode, setCurrentView }) {
    const { user, logout } = useAuth();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleProfileClick = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleEditProfile = () => {
        setIsProfileDropdownOpen(false);
        setCurrentView('editProfile');
    };

    const handleSettings = () => {
        setIsProfileDropdownOpen(false);
        setCurrentView('settings');
    };

    const handleHelpSupport = () => {
        setIsProfileDropdownOpen(false);
        // Open chatbot or navigate to help page
        const event = new CustomEvent('openChatbot');
        window.dispatchEvent(event);
    };

    const handleLogout = () => {
        setIsProfileDropdownOpen(false);
        logout();
    };

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
                    <div className="relative" ref={dropdownRef}>
                        <div 
                            className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg pr-2 py-1 transition-colors"
                            onClick={handleProfileClick}
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-semibold">{user?.name || 'Student'}</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{user?.plan || 'Free Plan'}</p>
                            </div>
                            <img
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover"
                                src={user?.avatar || ''}
                            />
                            <span className="material-symbols-outlined text-slate-400 text-sm transition-transform duration-200">
                                expand_more
                            </span>
                        </div>

                        {/* Profile Dropdown */}
                        {isProfileDropdownOpen && (
                            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden z-50">
                                {/* Dropdown Header */}
                                <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <img
                                            alt="Profile"
                                            className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover"
                                            src={user?.avatar || ''}
                                        />
                                        <div>
                                            <p className="font-semibold text-sm">{user?.name || 'Student'}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email || 'student@example.com'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dropdown Menu Items */}
                                <div className="py-2">
                                    <button
                                        onClick={handleEditProfile}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-slate-400">edit</span>
                                        <span>Edit Profile</span>
                                    </button>
                                    <button
                                        onClick={handleSettings}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-slate-400">settings</span>
                                        <span>Settings</span>
                                    </button>
                                    <button
                                        onClick={handleHelpSupport}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-slate-400">help</span>
                                        <span>Help & Support</span>
                                    </button>
                                    <div className="border-t border-slate-100 dark:border-slate-800 my-2"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3 text-red-500"
                                    >
                                        <span className="material-symbols-outlined">logout</span>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
