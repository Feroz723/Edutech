import React, { useState } from 'react';
import StudentNavbar from './student/StudentNavbar';
import StudentHero from './student/StudentHero';
import StudentCourses from './student/StudentCourses';
import StudentSchedule from './student/StudentSchedule';
import StudentResources from './student/StudentResources';
import StudentAnalytics from './student/StudentAnalytics';
import StudentDeadlines from './student/StudentDeadlines';

const tabs = [
    { id: 'courses', label: 'My Courses', icon: 'play_circle' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar_month' },
    { id: 'resources', label: 'Resources', icon: 'folder_open' },
];

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('courses');
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'courses':
                return <StudentCourses />;
            case 'schedule':
                return <StudentSchedule />;
            case 'resources':
                return <StudentResources />;
            default:
                return <StudentCourses />;
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
                <StudentNavbar toggleDarkMode={toggleDarkMode} />

                <main className="p-6 lg:p-10">
                    {/* Hero Section */}
                    <StudentHero />

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Content (8 cols) */}
                        <div className="lg:col-span-8">
                            {/* Tab Navigation */}
                            <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto whitespace-nowrap pb-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`pb-4 text-sm font-semibold flex items-center gap-2 transition-all border-b-2 ${activeTab === tab.id
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                            }`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                ))}
                                {/* Disabled tab */}
                                <button className="pb-4 text-sm font-medium text-slate-500 flex items-center gap-2 opacity-50 cursor-not-allowed border-b-2 border-transparent">
                                    <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
                                    Refer & Earn
                                </button>
                            </div>

                            {/* Tab Content */}
                            {renderTabContent()}
                        </div>

                        {/* Right Sidebar (4 cols) */}
                        <div className="lg:col-span-4 space-y-8">
                            <StudentAnalytics />
                            <StudentDeadlines onViewSchedule={() => setActiveTab('schedule')} />
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-12 p-8 bg-slate-100 dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                        <h4 className="text-lg font-bold mb-2">Have general questions about our courses?</h4>
                        <p className="text-slate-500 dark:text-slate-400 mb-6">
                            Our FAQ section has answers for most of your queries regarding curriculum and mentorship.
                        </p>
                        <a className="inline-flex items-center gap-2 text-primary font-bold hover:underline" href="#">
                            Visit our FAQ page
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                    </div>
                </main>

                {/* Floating Chat Button */}
                <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-40">
                    <button className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center transform transition-transform active:scale-95 hover:scale-110">
                        <span className="material-symbols-outlined">forum</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
