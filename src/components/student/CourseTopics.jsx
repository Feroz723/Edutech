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

const courseResourcesData = {
    'Advanced React & UI Design': [
        {
            id: 1,
            title: 'React Hooks Cheatsheet',
            type: 'PDF',
            size: '2.4 MB',
            description: 'Complete reference for all React Hooks',
            url: '#',
            icon: 'description'
        },
        {
            id: 2,
            title: 'UI Design Principles Guide',
            type: 'PDF',
            size: '5.1 MB',
            description: 'Modern UI design principles and best practices',
            url: '#',
            icon: 'description'
        },
        {
            id: 3,
            title: 'Component Library',
            type: 'ZIP',
            size: '12.3 MB',
            description: 'Reusable React components and examples',
            url: '#',
            icon: 'folder_zip'
        }
    ],
    'Data Structures & Algorithms': [
        {
            id: 1,
            title: 'Algorithm Complexity Notes',
            type: 'PDF',
            size: '1.8 MB',
            description: 'Big O notation and complexity analysis',
            url: '#',
            icon: 'description'
        },
        {
            id: 2,
            title: 'Data Structures Cheat Sheet',
            type: 'PDF',
            size: '3.2 MB',
            description: 'Quick reference for all data structures',
            url: '#',
            icon: 'description'
        }
    ],
    'JavaScript Fundamentals': [
        {
            id: 1,
            title: 'JavaScript ES6 Features',
            type: 'PDF',
            size: '2.1 MB',
            description: 'Complete guide to ES6+ features',
            url: '#',
            icon: 'description'
        },
        {
            id: 2,
            title: 'Async Programming Examples',
            type: 'ZIP',
            size: '4.5 MB',
            description: 'Code examples for async/await and promises',
            url: '#',
            icon: 'folder_zip'
        }
    ],
    'Python for Data Science': [
        {
            id: 1,
            title: 'NumPy Reference Guide',
            type: 'PDF',
            size: '3.7 MB',
            description: 'Comprehensive NumPy documentation',
            url: '#',
            icon: 'description'
        },
        {
            id: 2,
            title: 'Pandas Examples',
            type: 'ZIP',
            size: '8.2 MB',
            description: 'Data analysis examples and datasets',
            url: '#',
            icon: 'folder_zip'
        }
    ],
    'Web Design Principles': [
        {
            id: 1,
            title: 'Color Theory Handbook',
            type: 'PDF',
            size: '6.4 MB',
            description: 'Understanding color in web design',
            url: '#',
            icon: 'description'
        },
        {
            id: 2,
            title: 'Typography Guide',
            type: 'PDF',
            size: '4.1 MB',
            description: 'Web typography best practices',
            url: '#',
            icon: 'description'
        }
    ],
    'Machine Learning Basics': [
        {
            id: 1,
            title: 'ML Algorithms Overview',
            type: 'PDF',
            size: '5.8 MB',
            description: 'Introduction to machine learning algorithms',
            url: '#',
            icon: 'description'
        }
    ],
    'Database Management': [
        {
            id: 1,
            title: 'SQL Fundamentals',
            type: 'PDF',
            size: '3.3 MB',
            description: 'Complete SQL reference guide',
            url: '#',
            icon: 'description'
        },
        {
            id: 2,
            title: 'Database Design Patterns',
            type: 'PDF',
            size: '2.9 MB',
            description: 'Common database design patterns',
            url: '#',
            icon: 'description'
        }
    ]
};

export default function CourseTopics({ courseName, onBack }) {
    const topics = courseTopicsData[courseName] || [];
    const resources = courseResourcesData[courseName] || [];
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [activeTab, setActiveTab] = useState('videos'); // videos, resources

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
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

            {/* Tab Navigation */}
            <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-700 mb-8">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {topics.map((topic) => (
                        <div
                            key={topic.id}
                            onClick={() => handleTopicClick(topic)}
                            className="group cursor-pointer bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all flex flex-col h-full"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={topic.thumbnail}
                                    alt={topic.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">play_arrow</span>
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-lg text-xs font-medium">
                                    {topic.duration}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-1">
                                    {topic.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                                    {topic.description}
                                </p>

                                {/* Progress */}
                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-slate-500 dark:text-slate-400">Progress</span>
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{topic.viewedPercentage}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                        <div
                                            className="bg-primary rounded-full h-2 transition-all duration-300"
                                            style={{ width: `${topic.viewedPercentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Status Badge */}
                                {topic.completed && (
                                    <div className="mt-3 inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-lg text-xs font-medium">
                                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                        Completed
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'resources' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {resources.map((resource) => (
                        <div
                            key={resource.id}
                            className="group bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                        >
                            {/* Icon and Type */}
                            <div className="flex items-start gap-4 mb-4 flex-1">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <span className="material-symbols-outlined text-primary text-xl">{resource.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{resource.title}</h3>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg font-medium">
                                            {resource.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                                        {resource.description}
                                    </p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">
                                        {resource.size}
                                    </p>
                                </div>
                            </div>

                            {/* Download Button */}
                            <button className="w-full bg-primary text-white py-2 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
