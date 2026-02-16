import React, { useState } from 'react';

const resourcesList = [
    {
        name: 'React Architecture Guide.pdf',
        size: '2.4 MB',
        date: 'FEB 10, 2024',
        type: 'pdf',
        icon: 'picture_as_pdf',
        iconBg: 'bg-red-50 dark:bg-red-900/20',
        iconColor: 'text-red-500',
        action: 'download',
    },
    {
        name: 'DSA Cheat Sheet v2.pdf',
        size: '1.1 MB',
        date: 'FEB 08, 2024',
        type: 'pdf',
        icon: 'picture_as_pdf',
        iconBg: 'bg-red-50 dark:bg-red-900/20',
        iconColor: 'text-red-500',
        action: 'download',
    },
    {
        name: 'Tailwind Best Practices.pdf',
        size: '4.8 MB',
        date: 'JAN 25, 2024',
        type: 'pdf',
        icon: 'picture_as_pdf',
        iconBg: 'bg-red-50 dark:bg-red-900/20',
        iconColor: 'text-red-500',
        action: 'download',
    },
    {
        name: 'Redux Logic Workshop Recap',
        size: '45 MIN',
        date: 'FEB 11, 2024',
        type: 'video',
        icon: 'movie',
        iconBg: 'bg-blue-50 dark:bg-blue-900/20',
        iconColor: 'text-primary',
        action: 'play',
    },
];

export default function StudentResources() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredResources = resourcesList.filter((resource) =>
        resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Search + Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all outline-none"
                        placeholder="Search for notes, cheat sheets, or recordings..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center gap-2 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <span className="material-symbols-outlined text-sm">filter_list</span>
                    Filter
                </button>
            </div>

            {/* Resource List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.length === 0 ? (
                    <div className="col-span-2 text-center py-12 text-slate-400">
                        <span className="material-symbols-outlined text-4xl mb-2 block">search_off</span>
                        <p className="font-medium">No resources found matching "{searchQuery}"</p>
                    </div>
                ) : (
                    filteredResources.map((resource, index) => (
                        <div
                            key={index}
                            className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between group hover:border-primary transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${resource.iconBg} rounded-xl flex items-center justify-center ${resource.iconColor}`}>
                                    <span className="material-symbols-outlined text-3xl">{resource.icon}</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">{resource.name}</h4>
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                        {resource.size} • {resource.date}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined">
                                    {resource.action === 'download' ? 'download' : 'play_arrow'}
                                </span>
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
