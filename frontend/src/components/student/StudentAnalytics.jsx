import React, { useState } from 'react';

const getCurrentDayIndex = () => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S'];
    const today = new Date().getDay();
    // Map Sunday(0) to Saturday(6) to our day array
    const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Sun->S, Mon->M, Tue->T, Wed->W, Thu->T, Fri->F, Sat->S
    return dayMap[today];
};

const initialBarData = [
    { day: 'M', height: '40%', active: false },
    { day: 'T', height: '60%', active: false },
    { day: 'W', height: '85%', active: false },
    { day: 'T', height: '95%', active: false },
    { day: 'F', height: '75%', active: false },
    { day: 'S', height: '50%', active: false },
].map((bar, index) => ({
    ...bar,
    active: index === getCurrentDayIndex()
}));

export default function StudentAnalytics({ onBack }) {
    const [barData, setBarData] = useState(initialBarData);

    const handleBarClick = (index) => {
        setBarData(prevData => 
            prevData.map((bar, i) => ({
                ...bar,
                active: i === index
            }))
        );
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Student Activity Analytics</h1>
                    <p className="text-slate-600 dark:text-slate-400">Track your learning progress and performance</p>
                </div>
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="font-medium">Back to Dashboard</span>
                </button>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">schedule</span>
                        </div>
                        <span className="text-green-500 text-sm font-medium">+12%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">24.5h</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Weekly Study Time</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                        </div>
                        <span className="text-green-500 text-sm font-medium">+8%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">87%</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Completion Rate</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">local_fire_department</span>
                        </div>
                        <span className="text-orange-500 text-sm font-medium">15 days</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">12</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Current Streak</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">grade</span>
                        </div>
                        <span className="text-green-500 text-sm font-medium">+25%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">A+</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Performance Grade</p>
                </div>
            </div>

            {/* Daily Activity Chart */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Daily Activity This Week</h3>
                
                {/* Bar Chart */}
                <div className="flex items-end justify-between h-32 px-2 gap-2 mb-4">
                    {barData.map((bar, index) => (
                        <div
                            key={index}
                            className={`w-full rounded-t-lg transition-colors cursor-pointer ${bar.active
                                    ? 'bg-primary'
                                    : 'bg-slate-100 dark:bg-slate-700 hover:bg-primary/20'
                                }`}
                            style={{ height: bar.height }}
                            onClick={() => handleBarClick(index)}
                        />
                    ))}
                </div>
                
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">
                    {barData.map((bar, index) => (
                        <span key={index} className={bar.active ? 'text-primary' : ''}>
                            {bar.day}
                        </span>
                    ))}
                </div>
                
                <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                    Average: 4.1 hours per day
                </div>
            </div>

            {/* Course Progress */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Course Progress</h3>
                
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">code</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-slate-900 dark:text-white">Advanced React</h4>
                                <span className="text-sm text-slate-600 dark:text-slate-400">68%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-green-600 dark:text-green-400">data_object</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-slate-900 dark:text-white">Data Structures</h4>
                                <span className="text-sm text-slate-600 dark:text-slate-400">42%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">javascript</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-slate-900 dark:text-white">JavaScript Fundamentals</h4>
                                <span className="text-sm text-slate-600 dark:text-slate-400">85%</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Learning Patterns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Learning Patterns</h3>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Most Active Time</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">2:00 PM - 6:00 PM</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Best Performance Day</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">Thursday</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Preferred Content Type</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">Video Lessons</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Average Session Length</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">45 minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Quiz Score Average</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-white">92%</span>
                        </div>
                    </div>
                </div>

                {/* Recent Achievements */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Recent Achievements</h3>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">military_tech</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">Week Warrior</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">7-day streak completed</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">speed</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">Quick Learner</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">5 lessons this week</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400">trending_up</span>
                            </div>
                            <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">On Fire</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Top 10% this month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Footer */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Weekly Average</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            4.8h <span className="text-green-500 text-sm">+12%</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Global Rank</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            #14 <span className="text-slate-400 text-sm">Global</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
