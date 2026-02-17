import React, { useState } from 'react';

const courseTopicsData = {
    'Advanced React & UI Design': [
        {
            id: 1,
            title: 'Introduction to React Hooks',
            duration: '15:30',
            description: 'Learn the fundamentals of React Hooks and how they replace class components',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
            viewedPercentage: 100,
            completed: true
        },
        {
            id: 2,
            title: 'useState and useEffect Deep Dive',
            duration: '22:45',
            description: 'Master the most essential React Hooks with practical examples',
            thumbnail: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=225&fit=crop',
            viewedPercentage: 75,
            completed: false
        },
        {
            id: 3,
            title: 'Custom Hooks Creation',
            duration: '18:20',
            description: 'Build reusable custom hooks for your React applications',
            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
            viewedPercentage: 45,
            completed: false
        },
        {
            id: 4,
            title: 'Context API and State Management',
            duration: '25:10',
            description: 'Learn how to manage global state using React Context API',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
            viewedPercentage: 0,
            completed: false
        },
        {
            id: 5,
            title: 'Advanced Component Patterns',
            duration: '30:15',
            description: 'Explore advanced patterns like render props, HOCs, and compound components',
            thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop',
            viewedPercentage: 0,
            completed: false
        }
    ],
    'Data Structures & Algorithms': [
        {
            id: 1,
            title: 'Introduction to Big O Notation',
            duration: '20:00',
            description: 'Understanding time and space complexity in algorithms',
            thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=225&fit=crop',
            viewedPercentage: 100,
            completed: true
        },
        {
            id: 2,
            title: 'Arrays and Linked Lists',
            duration: '28:30',
            description: 'Deep dive into fundamental data structures',
            thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
            viewedPercentage: 60,
            completed: false
        },
        {
            id: 3,
            title: 'Stacks and Queues Implementation',
            duration: '24:15',
            description: 'Implement and understand stack and queue data structures',
            thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=225&fit=crop',
            viewedPercentage: 30,
            completed: false
        },
        {
            id: 4,
            title: 'Tree Data Structures',
            duration: '35:20',
            description: 'Binary trees, BST, and tree traversal algorithms',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
            viewedPercentage: 0,
            completed: false
        }
    ],
    'JavaScript Fundamentals': [
        {
            id: 1,
            title: 'JavaScript Basics and Syntax',
            duration: '25:00',
            description: 'Introduction to JavaScript programming language',
            thumbnail: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=400&h=225&fit=crop',
            viewedPercentage: 100,
            completed: true
        },
        {
            id: 2,
            title: 'Functions and Scope',
            duration: '30:15',
            description: 'Understanding functions, closures, and scope in JavaScript',
            thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
            viewedPercentage: 85,
            completed: false
        },
        {
            id: 3,
            title: 'Async JavaScript',
            duration: '22:30',
            description: 'Master promises, async/await and event loop',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
            viewedPercentage: 75,
            completed: false
        }
    ],
    'Python for Data Science': [
        {
            id: 1,
            title: 'Python Basics for Data Science',
            duration: '35:00',
            description: 'Introduction to Python programming for data analysis',
            thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop',
            viewedPercentage: 100,
            completed: true
        },
        {
            id: 2,
            title: 'NumPy Arrays and Operations',
            duration: '28:45',
            description: 'Learn NumPy for numerical computing',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
            viewedPercentage: 30,
            completed: false
        },
        {
            id: 3,
            title: 'Pandas DataFrames',
            duration: '32:20',
            description: 'Data manipulation with Pandas library',
            thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop',
            viewedPercentage: 0,
            completed: false
        }
    ],
    'Web Design Principles': [
        {
            id: 1,
            title: 'Introduction to Web Design',
            duration: '20:00',
            description: 'Fundamentals of modern web design principles',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
            viewedPercentage: 100,
            completed: true
        },
        {
            id: 2,
            title: 'Color Theory and Typography',
            duration: '25:30',
            description: 'Understanding color schemes and typography',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
            viewedPercentage: 92,
            completed: false
        },
        {
            id: 3,
            title: 'Responsive Design',
            duration: '28:15',
            description: 'Creating designs that work on all devices',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
            viewedPercentage: 85,
            completed: false
        }
    ],
    'Machine Learning Basics': [
        {
            id: 1,
            title: 'Introduction to Machine Learning',
            duration: '40:00',
            description: 'Overview of ML concepts and applications',
            thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop',
            viewedPercentage: 100,
            completed: true
        },
        {
            id: 2,
            title: 'Supervised Learning',
            duration: '35:20',
            description: 'Classification and regression algorithms',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
            viewedPercentage: 15,
            completed: false
        }
    ],
    'Database Management': [
        {
            id: 1,
            title: 'Database Fundamentals',
            duration: '30:00',
            description: 'Introduction to database concepts and SQL',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
            viewedPercentage: 100,
            completed: true
        },
        {
            id: 2,
            title: 'SQL Queries and Joins',
            duration: '25:45',
            description: 'Master SQL queries and table joins',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=225&fit=crop',
            viewedPercentage: 55,
            completed: false
        }
    ]
};

export default function CourseTopics({ courseName, onBack }) {
    const topics = courseTopicsData[courseName] || [];
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [activeTab, setActiveTab] = useState('videos'); // videos, resources

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
    };

    const handleResourceClick = () => {
        // Navigate to enrolled courses view
        onBack();
        // Trigger enrolled courses view after a short delay
        setTimeout(() => {
            const event = new CustomEvent('showEnrolledCourses');
            window.dispatchEvent(event);
        }, 100);
    };

    const handleVideoPlay = () => {
        // Simulate video playing and updating viewed percentage
        if (selectedTopic && selectedTopic.viewedPercentage < 100) {
            const updatedTopics = topics.map(topic => 
                topic.id === selectedTopic.id 
                    ? { ...topic, viewedPercentage: Math.min(100, topic.viewedPercentage + 10) }
                    : topic
            );
            courseTopicsData[courseName] = updatedTopics;
            setSelectedTopic({ ...selectedTopic, viewedPercentage: Math.min(100, selectedTopic.viewedPercentage + 10) });
        }
    };

    if (selectedTopic) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => setSelectedTopic(null)}
                        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Topics
                    </button>
                    <h2 className="text-xl font-bold">{courseName}</h2>
                </div>

                {/* Video Player */}
                <div className="relative bg-black rounded-2xl overflow-hidden mb-6">
                    <div className="aspect-video flex items-center justify-center">
                        <img
                            src={selectedTopic.thumbnail}
                            alt={selectedTopic.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <button
                                onClick={handleVideoPlay}
                                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all transform hover:scale-110"
                            >
                                <span className="material-symbols-outlined text-4xl text-primary">play_arrow</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="text-white text-sm mb-2">
                            {selectedTopic.viewedPercentage}% watched
                        </div>
                        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                            <div
                                className="bg-primary h-full rounded-full transition-all duration-300"
                                style={{ width: `${selectedTopic.viewedPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Video Info */}
                <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{selectedTopic.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">{selectedTopic.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            {selectedTopic.duration}
                        </span>
                        <span className={`flex items-center gap-1 ${selectedTopic.completed ? 'text-green-500' : ''}`}>
                            <span className="material-symbols-outlined text-base">
                                {selectedTopic.completed ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            {selectedTopic.completed ? 'Completed' : 'In Progress'}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handleVideoPlay}
                        className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Continue Watching
                    </button>
                    <button className="px-6 py-3 bg-slate-100 dark:bg-slate-700 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                        <span className="material-symbols-outlined">bookmark</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Courses
                </button>
                <h2 className="text-2xl font-bold">{courseName}</h2>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto whitespace-nowrap pb-1">
                <button
                    onClick={() => setActiveTab('videos')}
                    className={`pb-4 text-sm font-semibold flex items-center gap-2 transition-all border-b-2 ${
                        activeTab === 'videos'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    Videos
                </button>
                <button
                    onClick={() => setActiveTab('resources')}
                    className={`pb-4 text-sm font-semibold flex items-center gap-2 transition-all border-b-2 ${
                        activeTab === 'resources'
                            ? 'border-primary text-primary'
                            : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">folder_open</span>
                    Resources
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topics.map((topic, index) => (
                        <div
                            key={topic.id}
                            onClick={() => handleTopicClick(topic)}
                            className="group cursor-pointer bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                        >
                            {/* Video Thumbnail */}
                            <div className="relative aspect-video">
                                <img
                                    src={topic.thumbnail}
                                    alt={topic.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                
                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">play_arrow</span>
                                    </div>
                                </div>

                                {/* Progress Badge */}
                                <div className="absolute top-3 right-3">
                                    {topic.completed ? (
                                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">check</span>
                                            Completed
                                        </div>
                                    ) : topic.viewedPercentage > 0 ? (
                                        <div className="bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            {topic.viewedPercentage}%
                                        </div>
                                    ) : (
                                        <div className="bg-slate-800/70 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                            New
                                        </div>
                                    )}
                                </div>

                                {/* Viewed Progress Bar */}
                                {topic.viewedPercentage > 0 && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                                        <div
                                            className="bg-primary h-full transition-all duration-300"
                                            style={{ width: `${topic.viewedPercentage}%` }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Topic Info */}
                            <div className="p-4">
                                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {index + 1}. {topic.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                                    {topic.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">schedule</span>
                                        {topic.duration}
                                    </span>
                                    {topic.viewedPercentage > 0 && !topic.completed && (
                                        <span className="text-xs text-primary font-medium">
                                            Continue watching
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'resources' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* PDF Resources */}
                    <div 
                        onClick={handleResourceClick}
                        className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-red-600 dark:text-red-400">picture_as_pdf</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-2">Course Notes</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                    Complete lecture notes and slides for this course
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">PDF • 2.4 MB</span>
                                    <span className="text-xs text-primary font-medium">View Courses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assignment PDF */}
                    <div 
                        onClick={handleResourceClick}
                        className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">assignment</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-2">Assignments</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                    Practice assignments and coding challenges
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">PDF • 1.8 MB</span>
                                    <span className="text-xs text-primary font-medium">View Courses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Code Examples */}
                    <div 
                        onClick={handleResourceClick}
                        className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-600 dark:text-green-400">code</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-2">Code Examples</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                    Source code examples and project files
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">ZIP • 856 KB</span>
                                    <span className="text-xs text-primary font-medium">View Courses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reference Materials */}
                    <div 
                        onClick={handleResourceClick}
                        className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">menu_book</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-2">Reference Materials</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                    Additional reading materials and documentation
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">PDF • 3.2 MB</span>
                                    <span className="text-xs text-primary font-medium">View Courses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cheat Sheet */}
                    <div 
                        onClick={handleResourceClick}
                        className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">description</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-2">Quick Reference</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                    Quick reference guide and cheat sheet
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">PDF • 456 KB</span>
                                    <span className="text-xs text-primary font-medium">View Courses</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Files */}
                    <div 
                        onClick={handleResourceClick}
                        className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
                                <span className="material-symbols-outlined text-indigo-600 dark:text-indigo-400">folder</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-2">Project Files</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                                    Complete project files and templates
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400">ZIP • 1.2 MB</span>
                                    <span className="text-xs text-primary font-medium">View Courses</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
