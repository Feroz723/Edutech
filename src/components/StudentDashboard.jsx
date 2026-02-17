import React, { useState, useEffect } from 'react';
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
    { id: 'liveClasses', label: 'Live Classes', icon: 'live_tv' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar_month' },
];

export default function StudentDashboard() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('courses');
    const [darkMode, setDarkMode] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard'); // dashboard, enrolledCourses, liveClasses, editProfile, settings, analytics

    // Listen for chatbot open event
    useEffect(() => {
        const handleOpenChatbot = () => {
            setIsChatOpen(true);
        };

        const handleNavigateToDashboard = () => {
            setCurrentView('dashboard');
        };

        const handleNavigateToEditProfile = () => {
            setCurrentView('editProfile');
        };

        const handleNavigateToSettings = () => {
            setCurrentView('settings');
        };

        window.addEventListener('openChatbot', handleOpenChatbot);
        window.addEventListener('navigateToDashboard', handleNavigateToDashboard);
        window.addEventListener('navigateToEditProfile', handleNavigateToEditProfile);
        window.addEventListener('navigateToSettings', handleNavigateToSettings);
        
        return () => {
            window.removeEventListener('openChatbot', handleOpenChatbot);
            window.removeEventListener('navigateToDashboard', handleNavigateToDashboard);
            window.removeEventListener('navigateToEditProfile', handleNavigateToEditProfile);
            window.removeEventListener('navigateToSettings', handleNavigateToSettings);
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

    const handleBackToDashboard = () => {
        setCurrentView('dashboard');
    };

    const handleViewAnalytics = () => {
        setCurrentView('analytics');
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'courses':
                return <StudentCourses />;
            case 'liveClasses':
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
                {/* Static Left Sidebar - Full Height */}
                <div className="hidden lg:block fixed left-0 top-0 w-64 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-40">
                    <div className="p-6 h-full flex flex-col">
                        <button
                            onClick={() => {
                                setCurrentView('dashboard');
                                setActiveTab('courses');
                            }}
                            className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity"
                        >
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="material-symbols-outlined text-white text-xl">school</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight">EduFlow</span>
                        </button>
                        
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('courses')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    activeTab === 'courses' && currentView === 'dashboard'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                <span className="material-symbols-outlined">play_circle</span>
                                <span className="font-medium">My Courses</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('liveClasses')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    activeTab === 'liveClasses' && currentView === 'dashboard'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                <span className="material-symbols-outlined">live_tv</span>
                                <span className="font-medium">Live Classes</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('schedule')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    activeTab === 'schedule' && currentView === 'dashboard'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                <span className="material-symbols-outlined">calendar_month</span>
                                <span className="font-medium">Schedule</span>
                            </button>
                            <button
                                onClick={handleViewAnalytics}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    currentView === 'analytics'
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                }`}
                            >
                                <span className="material-symbols-outlined">analytics</span>
                                <span className="font-medium">Analytics</span>
                            </button>
                        </nav>

                        {/* Quick Stats */}
                        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Quick Stats</h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">Courses</span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">7</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">Completed</span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">2</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">In Progress</span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">5</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">Certificates</span>
                                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">2</span>
                                </div>
                            </div>
                        </div>

                        {/* Logout Button - At Bottom */}
                        <div className="mt-auto pt-8 border-t border-slate-200 dark:border-slate-700">
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:ml-64">
                    <StudentNavbar toggleDarkMode={toggleDarkMode} />
                    
                    <div className="p-6">
                        {currentView === 'enrolledCourses' && (
                            <EnrolledCoursesList />
                        )}
                        
                        {currentView === 'liveClasses' && (
                            <LiveClassesList />
                        )}
                        
                        {currentView === 'editProfile' && (
                            <EditProfile />
                        )}
                        
                        {currentView === 'settings' && (
                            <Settings />
                        )}
                        
                        {currentView === 'analytics' && (
                            <StudentAnalytics />
                        )}
                        
                        {currentView === 'dashboard' && (
                            <>
                                {/* Hero Section */}
                                <StudentHero onViewAnalytics={handleViewAnalytics} />

                                {/* Main Content Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Main Content (2 cols) */}
                                    <div className="lg:col-span-2">
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

                                    {/* Right Sidebar (1 col) */}
                                    <div className="lg:col-span-1">
                                        <StudentDeadlines onViewSchedule={() => setActiveTab('schedule')} />
                                    </div>
                                </div>

                                {/* FAQ Section */}
                                <div className="mt-12 p-8 bg-slate-100 dark:bg-slate-900 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 text-center">
                                    <h4 className="text-lg font-bold mb-2">Have general questions about our courses?</h4>
                                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                                        Our FAQ section has answers for most of your queries regarding curriculum and mentorship.
                                    </p>
                                    <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                                        Visit FAQ
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* AI Chatbot */}
                <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </div>
        </div>
    );
}
