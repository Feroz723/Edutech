import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Overview from './components/sections/Overview';
import Courses from './components/sections/Courses';
import Students from './components/sections/Students';
import Analytics from './components/sections/Analytics';
import Settings from './components/sections/Settings';
import StudentDashboard from './components/StudentDashboard';
import './App.css';

function AdminDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'courses':
        return <Courses />;
      case 'students':
        return <Students />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200 flex w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Not logged in -> show login page
  if (!user) {
    return <LoginPage />;
  }

  // Route to the correct dashboard based on role
  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return <StudentDashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
