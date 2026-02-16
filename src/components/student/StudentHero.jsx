import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function StudentHero() {
    const { user } = useAuth();
    const firstName = user?.name?.split(' ')[0] || 'Student';

    return (
        <div className="relative bg-primary rounded-[2rem] overflow-hidden p-8 lg:p-12 mb-10 shadow-xl shadow-primary/20">
            {/* Decorative blurred circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-10 -mb-10 blur-2xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Image */}
                <div className="relative">
                    <img
                        alt="Student Profile"
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/30 shadow-2xl object-cover"
                        src={user?.avatar || ''}
                    />
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-primary rounded-full" />
                </div>

                {/* Welcome Text + Stats */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        Welcome back, {firstName}! 👋
                    </h1>
                    <p className="text-blue-100 text-lg mb-8 opacity-90 font-medium">
                        You've completed 75% of your weekly goals. Keep it up!
                    </p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl min-w-[160px] flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">menu_book</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">7</p>
                                <p className="text-xs text-blue-100 uppercase tracking-wide font-semibold">Courses Enrolled</p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl min-w-[160px] flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                                <span className="material-symbols-outlined">live_tv</span>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">2</p>
                                <p className="text-xs text-blue-100 uppercase tracking-wide font-semibold">Live Classes Today</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="hidden lg:block">
                    <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all transform hover:-translate-y-1">
                        View Analytics
                    </button>
                </div>
            </div>
        </div>
    );
}
