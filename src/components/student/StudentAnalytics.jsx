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
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Performance Analytics</h3>
                <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-24 px-2 gap-2 mb-4">
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
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-8">
                {barData.map((bar, index) => (
                    <span key={index} className={bar.active ? 'text-primary' : ''}>
                        {bar.day}
                    </span>
                ))}
            </div>

            {/* Skills Mastery Radar Chart */}
            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Skills Mastery</h4>
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    {/* Radial grid background */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, transparent 20%, rgba(0,102,255,0.05) 20%, rgba(0,102,255,0.05) 21%, transparent 21%, transparent 40%, rgba(0,102,255,0.05) 40%, rgba(0,102,255,0.05) 41%, transparent 41%, transparent 60%, rgba(0,102,255,0.05) 60%, rgba(0,102,255,0.05) 61%, transparent 61%, transparent 80%, rgba(0,102,255,0.05) 80%, rgba(0,102,255,0.05) 81%, transparent 81%)',
                        }}
                    />
                    {/* SVG Radar Polygon */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <polygon
                            fill="rgba(0,102,255,0.2)"
                            points="50,15 80,40 70,75 30,75 20,40"
                            stroke="#0066FF"
                            strokeWidth="1.5"
                        />
                        <circle cx="50" cy="15" fill="#0066FF" r="2" />
                        <circle cx="80" cy="40" fill="#0066FF" r="2" />
                        <circle cx="70" cy="75" fill="#0066FF" r="2" />
                        <circle cx="30" cy="75" fill="#0066FF" r="2" />
                        <circle cx="20" cy="40" fill="#0066FF" r="2" />
                    </svg>
                    {/* Skill Labels */}
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-bold">Logic</span>
                    <span className="absolute top-1/4 -right-6 text-[9px] font-bold">Design</span>
                    <span className="absolute -bottom-4 right-1/4 text-[9px] font-bold">Coding</span>
                    <span className="absolute -bottom-4 left-1/4 text-[9px] font-bold">Data</span>
                    <span className="absolute top-1/4 -left-6 text-[9px] font-bold">Speed</span>
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
