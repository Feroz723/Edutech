import React, { useState, useEffect } from 'react';

const liveClasses = [
    {
        id: 1,
        title: 'React Hooks Deep Dive',
        instructor: 'Sarah Johnson',
        course: 'Advanced React & UI Design',
        startTime: '10:00 AM',
        endTime: '11:30 AM',
        duration: '1h 30m',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
        status: 'live', // live, upcoming, completed
        studentsJoined: 45,
        maxStudents: 60,
        meetingLink: '#',
        description: 'Advanced concepts of React Hooks including custom hooks and performance optimization'
    },
    {
        id: 2,
        title: 'Algorithm Problem Solving',
        instructor: 'Dr. Michael Chen',
        course: 'Data Structures & Algorithms',
        startTime: '2:00 PM',
        endTime: '3:30 PM',
        duration: '1h 30m',
        thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=225&fit=crop',
        status: 'upcoming',
        studentsJoined: 0,
        maxStudents: 50,
        meetingLink: '#',
        description: 'Practice solving complex algorithmic problems with step-by-step explanations'
    },
    {
        id: 3,
        title: 'JavaScript Async Patterns',
        instructor: 'Emily Rodriguez',
        course: 'JavaScript Fundamentals',
        startTime: '9:00 AM',
        endTime: '10:00 AM',
        duration: '1h',
        thumbnail: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=400&h=225&fit=crop',
        status: 'completed',
        studentsJoined: 38,
        maxStudents: 45,
        meetingLink: '#',
        description: 'Understanding promises, async/await and event loop in JavaScript'
    }
];

export default function LiveClassesList({ onBack }) {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    const getStatusBadge = (status, startTime) => {
        const now = currentTime;
        const classTime = new Date();
        const [time, period] = startTime.split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        
        classTime.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours);
        classTime.setMinutes(minutes);
        classTime.setSeconds(0);
        classTime.setMilliseconds(0);

        const timeDiff = classTime - now;
        const minutesUntilStart = Math.floor(timeDiff / (1000 * 60));

        if (status === 'live' || (minutesUntilStart >= -30 && minutesUntilStart <= 0)) {
            return (
                <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    LIVE NOW
                </div>
            );
        } else if (minutesUntilStart > 0 && minutesUntilStart <= 60) {
            return (
                <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Starts in {minutesUntilStart}m
                </div>
            );
        } else if (status === 'completed' || minutesUntilStart < -30) {
            return (
                <div className="bg-slate-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Completed
                </div>
            );
        } else {
            return (
                <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Upcoming
                </div>
            );
        }
    };

    const getActionButton = (classItem) => {
        const status = getStatusBadge(classItem.status, classItem.startTime);
        
        if (status.props.children === 'LIVE NOW') {
            return (
                <button className="flex-1 bg-red-500 text-white py-2 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">live_tv</span>
                    Join Live Class
                </button>
            );
        } else if (status.props.children === 'Completed') {
            return (
                <button className="flex-1 bg-slate-600 text-white py-2 rounded-xl font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">play_circle</span>
                    Watch Recording
                </button>
            );
        } else {
            return (
                <button className="flex-1 bg-primary text-white py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">event</span>
                    Set Reminder
                </button>
            );
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Dashboard
                </button>
                <h2 className="text-2xl font-bold">Today's Live Classes</h2>
            </div>

            {/* Classes List */}
            <div className="space-y-6">
                {liveClasses.map((classItem) => (
                    <div
                        key={classItem.id}
                        className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                    >
                        <div className="flex flex-col md:flex-row gap-6 p-6">
                            {/* Class Thumbnail */}
                            <div className="md:w-64 relative">
                                <img
                                    src={classItem.thumbnail}
                                    alt={classItem.title}
                                    className="w-full h-40 md:h-full object-cover rounded-xl"
                                />
                                {getStatusBadge(classItem.status, classItem.startTime)}
                            </div>

                            {/* Class Info */}
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 mb-1">
                                            Instructor: {classItem.instructor}
                                        </p>
                                        <p className="text-sm text-primary font-medium">
                                            Course: {classItem.course}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                                    {classItem.description}
                                </p>

                                {/* Class Details */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-slate-400">schedule</span>
                                        <div>
                                            <p className="font-semibold">{classItem.startTime}</p>
                                            <p className="text-xs text-slate-400">Start Time</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-slate-400">timer</span>
                                        <div>
                                            <p className="font-semibold">{classItem.duration}</p>
                                            <p className="text-xs text-slate-400">Duration</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-slate-400">groups</span>
                                        <div>
                                            <p className="font-semibold">{classItem.studentsJoined}/{classItem.maxStudents}</p>
                                            <p className="text-xs text-slate-400">Students</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="material-symbols-outlined text-slate-400">link</span>
                                        <div>
                                            <p className="font-semibold text-primary">Meeting Link</p>
                                            <p className="text-xs text-slate-400">Available</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    {getActionButton(classItem)}
                                    <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                        <span className="material-symbols-outlined">info</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-red-500 mb-1">
                        {liveClasses.filter(c => {
                            const status = getStatusBadge(c.status, c.startTime);
                            return status.props.children === 'LIVE NOW';
                        }).length}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Live Now</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-blue-500 mb-1">
                        {liveClasses.filter(c => {
                            const status = getStatusBadge(c.status, c.startTime);
                            return status.props.children === 'Upcoming' || 
                                   (typeof status.props.children === 'string' && status.props.children.includes('Starts in'));
                        }).length}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Upcoming</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-slate-500 mb-1">
                        {liveClasses.filter(c => {
                            const status = getStatusBadge(c.status, c.startTime);
                            return status.props.children === 'Completed';
                        }).length}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
                </div>
            </div>
        </div>
    );
}
