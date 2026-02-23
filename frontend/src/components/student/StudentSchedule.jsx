import React from 'react';

const scheduleData = [
    {
        time: '09:00 AM',
        slots: {
            Mon: { subject: 'UI Design', topic: 'Intro to Figma', color: 'blue', borderColor: 'border-primary', textColor: 'text-primary', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
            Tue: null,
            Wed: { subject: 'React', topic: 'Hooks Deep Dive', color: 'purple', borderColor: 'border-purple-500', textColor: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
            Thu: null,
            Fri: { subject: 'UI Design', topic: 'Prototyping', color: 'blue', borderColor: 'border-primary', textColor: 'text-primary', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
        },
    },
    {
        time: '11:30 AM',
        slots: {
            Mon: null,
            Tue: { subject: 'Data Sci', topic: 'Python Basics', color: 'orange', borderColor: 'border-orange-500', textColor: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
            Wed: null,
            Thu: { subject: 'Workshop', topic: 'Career Prep', color: 'green', borderColor: 'border-green-500', textColor: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
            Fri: null,
        },
    },
    {
        time: '02:00 PM',
        slots: {
            Mon: null,
            Tue: null,
            Wed: { subject: 'Data Sci', topic: 'Numpy/Pandas', color: 'orange', borderColor: 'border-orange-500', textColor: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
            Thu: null,
            Fri: { subject: 'React', topic: 'Q&A Session', color: 'purple', borderColor: 'border-purple-500', textColor: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
        },
    },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function StudentSchedule() {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Weekly Class Schedule</h3>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <span className="text-sm font-semibold">Feb 12 - Feb 18, 2026</span>
                        <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Schedule Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50">
                                <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-left border-b border-slate-100 dark:border-slate-700">
                                    Time
                                </th>
                                {days.map((day) => (
                                    <th
                                        key={day}
                                        className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-left border-b border-slate-100 dark:border-slate-700"
                                    >
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {scheduleData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="p-4 text-xs font-medium text-slate-400 border-b border-slate-50 dark:border-slate-700/50">
                                        {row.time}
                                    </td>
                                    {days.map((day) => {
                                        const slot = row.slots[day];
                                        return (
                                            <td key={day} className="p-2 border-b border-slate-50 dark:border-slate-700/50">
                                                {slot ? (
                                                    <div className={`${slot.bgColor} p-3 rounded-xl border-l-4 ${slot.borderColor}`}>
                                                        <p className={`text-[10px] font-bold ${slot.textColor} uppercase`}>{slot.subject}</p>
                                                        <p className="text-xs font-bold truncate">{slot.topic}</p>
                                                    </div>
                                                ) : null}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
