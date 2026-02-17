import React, { useRef, useState, useEffect } from 'react';
import ProfileModal from './ProfileModal';

export default function Header({ toggleDarkMode, darkMode }) {
  const fileRef = useRef(null);
  const [profileSrc, setProfileSrc] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('adminProfile');
      if (saved) setProfileSrc(saved);
    } catch (e) {}
  }, []);

  const onPick = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfileSrc(reader.result);
      try {
        localStorage.setItem('adminProfile', reader.result);
      } catch (e) {}
    };
    reader.readAsDataURL(f);
  };

  const triggerPick = () => fileRef.current && fileRef.current.click();

  return (
    <>
      <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 z-20">
        {/* Search Bar */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-1.5 w-96">
          <span className="material-symbols-outlined text-slate-400 text-lg mr-2">search</span>
          <input
            type="text"
            placeholder="Search for courses, students..."
            className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-700 dark:text-slate-300 placeholder-slate-400 outline-none"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full transition-all duration-300 relative flex items-center px-1 shadow-inner ${
              darkMode ? 'bg-primary' : 'bg-slate-200'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              <span className="material-symbols-outlined text-[10px] text-slate-900 font-bold">
                {darkMode ? 'dark_mode' : 'light_mode'}
              </span>
            </div>
          </button>

          {/* Notifications */}
          <div className="relative">
            <span className="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer">notifications</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
              2
            </span>
          </div>

          {/* User Profile (click to open modal) */}
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-6">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Alex Johnson</p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div onClick={() => setShowProfileModal(true)} className="cursor-pointer">
              <img
                alt="Admin Profile"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 hover:ring-primary transition-all"
                src={profileSrc || 'https://lh3.googleusercontent.com/aida-public/AB6AXuChMOz1dv-upp3dHSWnij8O_BzmYAIcEiu6bxUGDEJAhuLE98rtjxwuHPKf3kxbA4wyzOLzIfQZRlW8TDvZqD1jSmfuQx2uCAqZ5foAQA7-VR5NW4rN1uDeLE3tLNtR8jMb68nLIa5Ce6G78dXH8l8SwWQhN8GaDYDbwUPxFSpgWPZRLujHGA3Xsn3bI527slvpOUomZP6Ht00NvbiFAKEn9XgkptY18mcfbUF_QLkeecO-_jzvhumdCaGw1zDtoW_Wf4KfOeT-Djpd'}
              />
            </div>
            <input ref={fileRef} onChange={onPick} type="file" accept="image/*" className="hidden" />
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
      />
    </>
  );
}
