import React from 'react';

const deadlines = [
    {
        day: '18',
        month: 'Feb',
        title: 'Assignment 3: Redux Logic',
        subtitle: 'Advanced React Module',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        textColor: 'text-orange-600 dark:text-orange-400',
    },
    {
        day: '21',
        month: 'Feb',
        title: 'Quiz: Time Complexity',
        subtitle: 'DSA Basics',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
        day: '25',
        month: 'Feb',
        title: 'Project Submission',
        subtitle: 'Fullstack Ecommerce App',
        bgColor: 'bg-green-100 dark:bg-green-900/30',
        textColor: 'text-green-600 dark:text-green-400',
    },
];

export default function StudentDeadlines({ onViewSchedule }) {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-6">Upcoming Deadlines</h3>

            <div className="space-y-4">
                {deadlines.map((deadline, index) => (
                    <div key={index} className="flex items-center gap-4 group cursor-pointer">
                        {/* Date Badge */}
                        <div className={`w-12 h-12 ${deadline.bgColor} rounded-2xl flex flex-col items-center justify-center ${deadline.textColor} shrink-0`}>
                            <span className="text-xs font-bold leading-tight">{deadline.day}</span>
                            <span className="text-[10px] uppercase font-bold leading-tight">{deadline.month}</span>
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                            <h4 className="text-sm font-bold group-hover:text-primary transition-colors">
                                {deadline.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{deadline.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* View Full Schedule Button */}
            <button
                onClick={onViewSchedule}
                className="w-full mt-8 py-3 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-xl font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
                View Full Schedule
            </button>
        </div>
    );
}
