import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/api';

export default function StudentHero({ onViewAnalytics }) {
    const { user } = useAuth();
    const [stats, setStats] = useState({ enrollments: 0 });
    const fullName = user?.name || user?.fullName || 'Student';
    const firstName = fullName.split(' ')[0];
    const capitalizedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/enrollments/my');
                setStats({ enrollments: response.data.data?.length || 0 });
            } catch (err) {
                console.error('Hero stats error:', err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="relative bg-indigo-600 rounded-[2.5rem] overflow-hidden p-10 mb-12 shadow-2xl shadow-indigo-600/20">
            {/* Decorative mesh gradient feel */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-32 -mt-32 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full -ml-20 -mb-20 blur-[80px]" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left side: Welcome */}
                <div className="flex items-center gap-8">
                    <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-white/10 flex items-center justify-center font-black text-white text-5xl uppercase backdrop-blur-sm">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                user?.name?.charAt(0) || 'U'
                            )}
                        </div>
                        <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-indigo-600 rounded-full shadow-lg" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                            Welcome back, {capitalizedName}! 👏
                        </h1>
                        <p className="text-indigo-100 text-lg opacity-80 max-w-md font-medium leading-relaxed">
                            You have completed <span className="font-black text-white">75%</span> of your weekly goals. Keep it up!
                        </p>
                    </div>
                </div>

                {/* Right side: Summary Stats Card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] w-full lg:w-96 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <button className="px-6 py-2 bg-white text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-lg shadow-white/10">
                            View Analytics
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/20">
                                <span className="material-symbols-outlined font-black">menu_book</span>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-white leading-none">{stats.enrollments}</p>
                                <p className="text-[10px] text-indigo-100 uppercase tracking-widest font-black opacity-60 mt-1">Courses Joined</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white border border-white/20">
                                <span className="material-symbols-outlined font-black">schedule</span>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-white leading-none">2</p>
                                <p className="text-[10px] text-indigo-100 uppercase tracking-widest font-black opacity-60 mt-1">Live Classes Today</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
