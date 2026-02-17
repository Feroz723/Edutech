import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function StudentNavbar({ toggleDarkMode }) {
    const { user } = useAuth();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleProfileClick = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleEditProfile = () => {
        const event = new CustomEvent('navigateToEditProfile');
        window.dispatchEvent(event);
        setIsProfileDropdownOpen(false);
    };

    const handleSettings = () => {
        const event = new CustomEvent('navigateToSettings');
        window.dispatchEvent(event);
        setIsProfileDropdownOpen(false);
    };

    const handleHelpSupport = () => {
        const event = new CustomEvent('openChatbot');
        window.dispatchEvent(event);
        setIsProfileDropdownOpen(false);
    };

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

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Left: Empty space */}
                <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                    {/* Logo removed - now in sidebar */}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 sm:gap-4">
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
                                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                            />
                            <span className="material-symbols-outlined text-slate-400 text-sm transition-transform duration-200">
                                {isProfileDropdownOpen ? 'expand_less' : 'expand_more'}
                            </span>
                        </div>

                        {/* Dropdown Menu */}
                        {isProfileDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
                                <button
                                    onClick={handleEditProfile}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                                >
                                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">person</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Edit Profile</span>
                                </button>
                                <button
                                    onClick={handleSettings}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                                >
                                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">settings</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Settings</span>
                                </button>
                                <button
                                    onClick={handleHelpSupport}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                                >
                                    <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">support_agent</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Help & Support</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
