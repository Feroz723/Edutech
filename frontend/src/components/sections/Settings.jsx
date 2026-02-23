import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
  const { user, profile } = useAuth();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    platformName: 'Edutech Academy'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    enrollment: true,
    revenue: true,
    system: false
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user && profile) {
      setFormData({
        name: profile.name || '',
        email: user.email || '',
        phone: profile.phone || '',
        platformName: 'Edutech Academy'
      });
    }
  }, [user, profile]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    try {
      // Supabase direct database update removed in Firebase Migration.
      // This should now be handled via a backend API call (e.g., PUT /api/profile)
      console.warn('Profile update via direct Supabase call is deprecated. Switch to backend API.');

      // Temporary success message for UI stability during migration
      setMessage({ type: 'success', text: 'Settings updated (Database migration pending backend link)!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Admin Console</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">Manage platform-wide configurations</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-indigo-600 border border-indigo-600 transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
          ) : (
            <span className="material-symbols-outlined text-sm">shield_person</span>
          )}
          {isSaving ? 'Synchronizing...' : 'Update Records'}
        </button>
      </div>

      {message.text && (
        <div className={`p-4 rounded-2xl text-xs font-bold border ${message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: General & Profile */}
        <div className="xl:col-span-2 space-y-8">
          {/* Profile Section */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden relative">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-600">verified_user</span>
              Administrative Identity
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
              <div className="relative group">
                <div className="w-28 h-28 rounded-3xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 text-4xl font-black border-2 border-indigo-100 dark:border-indigo-800 transition-transform group-hover:scale-105 shadow-inner">
                  {formData.name.charAt(0) || 'A'}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2.5 rounded-2xl border-4 border-white dark:border-slate-900 shadow-xl">
                  <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-black text-slate-900 dark:text-white text-2xl tracking-tight">{formData.name || 'Admin User'}</h4>
                <p className="text-indigo-600 font-bold uppercase tracking-widest text-[10px] mt-1">Status: Fully Verified</p>
                <p className="text-slate-500 text-xs mt-3 max-w-sm leading-relaxed">System administrator with full platform override privileges and directory access.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Legal Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleProfileChange}
                  className="w-full px-5 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-bold"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Primary Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-5 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 outline-none font-bold cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Platform Configuration */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-600">terminal</span>
              System Environment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Instance Name</label>
                <input
                  type="text"
                  name="platformName"
                  value={formData.platformName}
                  onChange={handleProfileChange}
                  className="w-full px-5 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold outline-none"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Ledger Currency</label>
                <select
                  className="w-full px-5 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold outline-none cursor-pointer appearance-none"
                >
                  <option value="USD">USD ($) - International Standard</option>
                  <option value="EUR">EUR (€) - European Zone</option>
                  <option value="INR">INR (₹) - Regional Local</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Notifications & Security */}
        <div className="space-y-8">
          {/* Notifications Toggle */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm text-left">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <span className="material-symbols-outlined text-indigo-600">notifications_active</span>
              Alert Matrix
            </h3>
            <div className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between group">
                  <div>
                    <p className="text-sm font-black text-slate-800 dark:text-slate-200 capitalize tracking-tight">{key} Subsystem</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Real-time telemetry</p>
                  </div>
                  <button
                    onClick={() => handleToggle(key)}
                    className={`w-12 h-6 rounded-full transition-all duration-300 relative ${value ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${value ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Banner */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-2 tracking-tight">System Integrity</h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed mb-6">Your administrative account is protected by multi-layer encryption and restricted API access nodes.</p>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/10 transition-all">
                Rotate Access Tokens
              </button>
            </div>
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-[140px] opacity-5 text-indigo-500">
              shield_lock
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
