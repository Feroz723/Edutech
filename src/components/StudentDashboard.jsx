import React, { useState, useEffect, useRef } from 'react';
import StudentNavbar from './student/StudentNavbar';
import StudentHero from './student/StudentHero';
import StudentCourses from './student/StudentCourses';
import StudentSchedule from './student/StudentSchedule';
import StudentResources from './student/StudentResources';
import StudentAnalytics from './student/StudentAnalytics';
import StudentDeadlines from './student/StudentDeadlines';
import AIChatbot from './student/AIChatbot';
import EnrolledCoursesList from './student/EnrolledCoursesList';
import LiveClassesList from './student/LiveClassesList';
import EditProfile from './student/EditProfile';
import Settings from './student/Settings';
import { useAuth } from '../context/AuthContext';

const tabs = [
    { id: 'courses', label: 'My Courses', icon: 'play_circle' },
    { id: 'live', label: 'Live Classes', icon: 'live_tv' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar_month' },
];

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState('courses');
    const [darkMode, setDarkMode] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard'); // dashboard, enrolledCourses, liveClasses, analytics, editProfile, settings
    const { user, logout } = useAuth();

    // Listen for chatbot open event
    useEffect(() => {
        const handleOpenChatbot = () => {
            setIsChatOpen(true);
        };

        const handleNavigateToDashboard = () => {
            setCurrentView('dashboard');
        };

        const handleShowEnrolledCourses = () => {
            setCurrentView('enrolledCourses');
        };

        window.addEventListener('openChatbot', handleOpenChatbot);
        window.addEventListener('navigateToDashboard', handleNavigateToDashboard);
        window.addEventListener('showEnrolledCourses', handleShowEnrolledCourses);
        
        return () => {
            window.removeEventListener('openChatbot', handleOpenChatbot);
            window.removeEventListener('navigateToDashboard', handleNavigateToDashboard);
            window.removeEventListener('showEnrolledCourses', handleShowEnrolledCourses);
        };
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    const handleShowEnrolledCourses = () => {
        setCurrentView('enrolledCourses');
    };

    const handleShowLiveClasses = () => {
        setCurrentView('liveClasses');
    };

    const handleShowAnalytics = () => {
        setCurrentView('analytics');
    };

    const handleBackToDashboard = () => {
        setCurrentView('dashboard');
    };

    const handleLogout = () => {
        logout();
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'courses':
                return <StudentCourses />;
            case 'live':
                return <LiveClassesList />;
            case 'schedule':
                return <StudentSchedule />;
            default:
                return <StudentCourses />;
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 min-h-screen">
                {/* Static Sidebar */}
                <div className="fixed left-0 top-0 w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 hidden lg:block">
                    <div className="p-6 h-full flex flex-col">
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-xl">school</span>
                            </div>
                            <span className="font-bold text-xl">EduFlow</span>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1">
                            <div className="space-y-2">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setCurrentView('dashboard');
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                                            activeTab === tab.id && currentView === 'dashboard'
                                                ? 'bg-primary text-white'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {tab.icon}
                                        </span>
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </nav>

                        {/* Quick Stats */}
                        <div className="py-6 border-t border-slate-200 dark:border-slate-800">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Courses</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">7</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Completed</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">2</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">In Progress</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">5</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Certificates</span>
                                    <span className="font-semibold text-slate-900 dark:text-white">2</span>
                                </div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:ml-64">
                    <StudentNavbar toggleDarkMode={toggleDarkMode} setCurrentView={setCurrentView} />

                    <main className="p-6 lg:p-10">
                        {currentView === 'enrolledCourses' && (
                            <EnrolledCoursesList onBack={handleBackToDashboard} />
                        )}
                        
                        {currentView === 'liveClasses' && (
                            <LiveClassesList onBack={handleBackToDashboard} />
                        )}
                        
                        {currentView === 'editProfile' && (
                            <EditProfile />
                        )}
                        
                        {currentView === 'settings' && (
                            <Settings />
                        )}
                        
                        {currentView === 'analytics' && (
                            <StudentAnalytics onBack={handleBackToDashboard} />
                        )}
                        
                        {currentView === 'dashboard' && (
                            <>
                                {/* Hero Section */}
                                <StudentHero 
                                    onViewAnalytics={handleShowAnalytics}
                                />

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
                                        </div>

                                        {/* Tab Content */}
                                        {renderTabContent()}
                                    </div>

                                    {/* Right Sidebar (4 cols) */}
                                    <div className="lg:col-span-4 space-y-8">
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
                            </>
                        )}
                    </main>

                    {/* Floating Chat Button */}
                    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3 z-40">
                        <button 
                            onClick={() => setIsChatOpen(true)}
                            className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center transform transition-transform active:scale-95 hover:scale-110"
                        >
                            <span className="material-symbols-outlined">forum</span>
                        </button>
                    </div>

                    {/* AI Chatbot */}
                    <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                </div>
            </div>
        </div>
    );
}
