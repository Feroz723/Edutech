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

export default function StudentAnalytics() {
    const [barData, setBarData] = useState(initialBarData);

    const handleBarClick = (index) => {
        setBarData(prevData => 
            prevData.map((bar, i) => ({
                ...bar,
                active: i === index
            }))
        );
    };

    const handleBack = () => {
        const event = new CustomEvent('navigateToDashboard');
        window.dispatchEvent(event);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Dashboard
                </button>
                <h2 className="text-2xl font-bold">Student Activity Analytics</h2>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">schedule</span>
                        </div>
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">+12%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">24.5 hrs</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Weekly Study Time</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">check_circle</span>
                        </div>
                        <span className="text-sm text-green-600 dark:text-green-400 font-medium">+8%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">87%</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Completion Rate</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">local_fire_department</span>
                        </div>
                        <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">15 days</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">12</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Current Streak</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-2xl border border-orange-200 dark:border-orange-800">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">trending_up</span>
                        </div>
                        <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">+25%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">A+</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Performance Grade</p>
                </div>
            </div>

            {/* Daily Activity Chart */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Daily Activity Analysis</h3>
                <div className="flex items-end justify-between h-40 gap-4">
                    {barData.map((bar, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            <div
                                onClick={() => handleBarClick(index)}
                                className={`w-full rounded-t-lg transition-all duration-300 cursor-pointer hover:opacity-80 ${
                                    bar.active 
                                        ? 'bg-primary' 
                                        : 'bg-slate-300 dark:bg-slate-600'
                                }`}
                                style={{ height: bar.height }}
                            />
                            <span className={`text-xs font-medium ${
                                bar.active 
                                    ? 'text-primary' 
                                    : 'text-slate-500 dark:text-slate-400'
                            }`}>
                                {bar.day}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Daily Learning Hours</span>
                    <span>Average: 4.1 hrs/day</span>
                </div>
            </div>

            {/* Course Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Course Progress</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-sm">code</span>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">Advanced React</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">68% Complete</p>
                                </div>
                            </div>
                            <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-blue-500 rounded-full h-2" style={{ width: '68%' }} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-sm">data_object</span>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">Data Structures</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">42% Complete</p>
                                </div>
                            </div>
                            <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-green-500 rounded-full h-2" style={{ width: '42%' }} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                    <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-sm">javascript</span>
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-slate-100">JavaScript</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">85% Complete</p>
                                </div>
                            </div>
                            <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                <div className="bg-purple-500 rounded-full h-2" style={{ width: '85%' }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Learning Patterns</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Most Active Time</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">2:00 PM - 6:00 PM</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Best Performance Day</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Thursday</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Preferred Content Type</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">Video Lessons</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Average Session Length</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">45 minutes</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Quiz Score Average</span>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">92%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Recent Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">emoji_events</span>
                        </div>
                        <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">Week Warrior</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">7-day streak completed</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">star</span>
                        </div>
                        <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">Quick Learner</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Completed 5 lessons this week</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">local_fire_department</span>
                        </div>
                        <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">On Fire</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Top 10% this month</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Footer */}
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">Weekly Avg.</p>
                    <p className="text-xl font-bold">
                        4.8h <span className="text-green-500 text-xs">+12%</span>
                    </p>
                </div>
                <div>
                    <p className="text-xs text-slate-400 font-medium mb-1">Rank</p>
                    <p className="text-xl font-bold">
                        #14 <span className="text-slate-400 text-xs">Global</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
