import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            return;
        }

        setIsLoading(true);

        // Simulate a brief network delay for UX
        setTimeout(() => {
            const result = login(email, password);
            if (!result.success) {
                setError(result.error);
            }
            setIsLoading(false);
        }, 600);
    };

    const fillDemoCredentials = () => {
        if (selectedRole === 'admin') {
            setEmail('admin@edutech.com');
            setPassword('admin123');
        } else {
            setEmail('student@edutech.com');
            setPassword('student123');
        }
        setError('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Login card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-white text-2xl">school</span>
                        </div>
                        <span className="font-bold text-3xl text-white tracking-tight">EduTech</span>
                    </div>
                    <p className="text-slate-400 text-sm">Sign in to continue to your dashboard</p>
                </div>

                {/* Card */}
                <div className="bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl">
                    {/* Role Tabs */}
                    <div className="flex bg-white/[0.05] rounded-2xl p-1 mb-8">
                        <button
                            type="button"
                            onClick={() => { setSelectedRole('student'); setError(''); }}
                            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${selectedRole === 'student'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">person</span>
                            Student
                        </button>
                        <button
                            type="button"
                            onClick={() => { setSelectedRole('admin'); setError(''); }}
                            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${selectedRole === 'admin'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                            Admin
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">mail</span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                    placeholder={selectedRole === 'admin' ? 'admin@edutech.com' : 'student@edutech.com'}
                                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">lock</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    placeholder="Enter your password"
                                    className="w-full pl-12 pr-12 py-3.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm animate-shake">
                                <span className="material-symbols-outlined text-lg">error</span>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/[0.08]" />
                        <span className="text-xs text-slate-500 font-medium">DEMO ACCESS</span>
                        <div className="flex-1 h-px bg-white/[0.08]" />
                    </div>

                    {/* Quick Fill */}
                    <button
                        type="button"
                        onClick={fillDemoCredentials}
                        className="w-full py-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined text-lg">bolt</span>
                        Auto-fill {selectedRole === 'admin' ? 'Admin' : 'Student'} Credentials
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-600 text-xs mt-6">
                    © 2026 EduTech Platform. All rights reserved.
                </p>
            </div>
        </div>
    );
}
