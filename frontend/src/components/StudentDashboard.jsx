import React, { useState, useEffect } from 'react';
import StudentNavbar from './student/StudentNavbar';
import StudentHero from './student/StudentHero';
import StudentSidebar from './student/StudentSidebar';
import StudentCourses from './student/StudentCourses';
import EnrolledCoursesList from './student/EnrolledCoursesList';
import StudentSchedule from './student/StudentSchedule';
import StudentResources from './student/StudentResources';
import StudentDeadlines from './student/StudentDeadlines';
import AIChatbot from './student/AIChatbot';
import StudentAnalytics from './student/StudentAnalytics';
import LessonViewer from './student/LessonViewer';
import EditProfile from './student/EditProfile';
import Settings from './student/Settings';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api';

export default function StudentDashboard() {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('my-learning');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [viewingCourse, setViewingCourse] = useState(null);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [stats, setStats] = useState({ enrollments: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/users/stats');
                setStats(response.data || { enrollments: 0 });
            } catch (err) {
                console.error('Dashboard stats error:', err);
            }
        };
        fetchStats();
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleStartLearning = (courseId, courseTitle) => {
        setViewingCourse({ id: courseId, title: courseTitle });
        setShowAnalytics(false);
    };

    const handleBackToDashboard = () => {
        setViewingCourse(null);
        setShowAnalytics(false);
        setActiveTab('my-learning');
    };

    const renderMainContent = () => {
        if (showAnalytics) {
            return <StudentAnalytics onBack={handleBackToDashboard} />;
        }

        if (viewingCourse) {
            return (
                <LessonViewer
                    courseId={viewingCourse.id}
                    courseTitle={viewingCourse.title}
                    onBack={handleBackToDashboard}
                />
            );
        }

        switch (activeTab) {
            case 'courses':
                return <StudentCourses onStartLearning={handleStartLearning} />;
            case 'my-learning':
                return <EnrolledCoursesList onStartLearning={handleStartLearning} />;
            case 'schedule':
                return <StudentSchedule />;
            case 'resources':
                return <StudentResources />;
            case 'profile':
                return <EditProfile onBack={handleBackToDashboard} />;
            case 'settings':
                return <Settings onBack={handleBackToDashboard} />;
            default:
                return <EnrolledCoursesList onStartLearning={handleStartLearning} />;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex font-sans selection:bg-indigo-100 selection:text-indigo-600 relative">
            {/* Sidebar Navigation */}
            <StudentSidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setIsSidebarOpen(false); // Close on mobile after selection
                }}
                onLogout={logout}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                stats={{
                    total: stats.enrollments || 0,
                    completed: stats.completed || 0,
                    inProgress: stats.inProgress || 0,
                    certificates: stats.certificates || 0
                }}
            />

            <div className="flex-1 flex flex-col lg:ml-64 min-h-screen relative overflow-hidden">
                <StudentNavbar
                    onLogout={logout}
                    activeTab={activeTab}
                    setActiveTab={(tab) => {
                        setActiveTab(tab);
                        setViewingCourse(null);
                        setShowAnalytics(false);
                    }}
                    toggleDarkMode={toggleDarkMode}
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <main className="flex-1 overflow-y-auto pt-6 px-10 pb-20">
                    <div className="max-w-[1440px] mx-auto">
                        {!viewingCourse && !showAnalytics && !['profile', 'settings', 'resources'].includes(activeTab) && (
                            <StudentHero stats={stats} onViewAnalytics={() => setShowAnalytics(true)} />
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                            {/* Main Content Area */}
                            <div className={!viewingCourse && !showAnalytics && !['profile', 'settings', 'resources'].includes(activeTab) && !isChatOpen ? "lg:col-span-3" : "lg:col-span-4"}>
                                {renderMainContent()}
                            </div>

                            {/* Right Sidebar - Deadlines */}
                            {!viewingCourse && !showAnalytics && !['profile', 'settings', 'resources'].includes(activeTab) && !isChatOpen && (
                                <div className="lg:col-span-1">
                                    <StudentDeadlines />
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* AI Chat Button */}
                <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`fixed bottom-12 right-12 w-16 h-16 rounded-[1.5rem] shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-90 z-[110] ${isChatOpen
                        ? 'bg-slate-900 text-white rotate-180'
                        : 'bg-indigo-600 text-white'
                        }`}
                >
                    <span className="material-symbols-outlined text-3xl font-black">
                        {isChatOpen ? 'close' : 'smart_toy'}
                    </span>
                    {!isChatOpen && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-4 border-white dark:border-slate-950 animate-bounce" />
                    )}
                </button>

                {isChatOpen && (
                    <AIChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
                )}
            </div>
        </div>
    );
}
