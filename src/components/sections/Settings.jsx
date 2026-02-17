import React, { useState, useRef } from 'react';

export default function Settings() {
  const fileInputRef = useRef(null);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Alex Johnson',
    email: 'admin@learnflow.com',
    role: 'Platform Owner',
    phone: '+1 (555) 000-1234',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    notifications: {
      email: true,
      enrollment: true,
      revenue: true,
      system: false
    },
    platformName: 'LearnFlow Academy',
    currency: 'USD',
    language: 'English'
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setAdminProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setAdminProfile(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Settings</h1>
          <p className="text-slate-500 text-sm">Manage platform preferences and your admin profile.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
          ) : (
            <span className="material-symbols-outlined text-sm">save</span>
          )}
          {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: General & Profile */}
        <div className="xl:col-span-2 space-y-6">
          {/* Profile Section */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              Admin Profile
            </h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="relative group">
                <img 
                  src={adminProfile.avatar} 
                  className="w-24 h-24 rounded-full border-4 border-slate-50 dark:border-slate-800 shadow-md object-cover transition-transform group-hover:scale-105" 
                  alt="Admin" 
                />
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAvatarChange} 
                  className="hidden" 
                  accept="image/*"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full border-2 border-white dark:border-slate-900 shadow-lg hover:scale-110 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-bold text-slate-900 dark:text-white text-xl">{adminProfile.name}</h4>
                <p className="text-primary font-bold text-sm">{adminProfile.role}</p>
                <p className="text-slate-500 text-xs mt-1">Manage your personal information and credentials.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={adminProfile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={adminProfile.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="sm:col-span-2 pt-2">
                <button className="text-primary text-xs font-black uppercase hover:underline flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Change Admin Password
                </button>
              </div>
            </div>
          </div>

          {/* Platform Configuration */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">settings_suggest</span>
              Platform Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Platform Name</label>
                <input
                  type="text"
                  name="platformName"
                  value={adminProfile.platformName}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Default Currency</label>
                <select
                  name="currency"
                  value={adminProfile.currency}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Notifications & Security */}
        <div className="space-y-6">
          {/* Notifications Toggle */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">notifications_active</span>
              Notifications
            </h3>
            <div className="space-y-5">
              {Object.entries(adminProfile.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between group">
                  <div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 capitalize">{key} Alerts</p>
                    <p className="text-[10px] text-slate-400 font-medium">Receive real-time {key} updates</p>
                  </div>
                  <button
                    onClick={() => handleToggle(key)}
                    className={`w-11 h-6 rounded-full transition-all duration-300 relative ${value ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${value ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/20 text-left">
            <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              Danger Zone
            </h3>
            <p className="text-[10px] text-red-500 mb-6 font-bold uppercase tracking-wider italic">Permanent actions</p>
            <button className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-[0.98]">
              Clear All Platform Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
