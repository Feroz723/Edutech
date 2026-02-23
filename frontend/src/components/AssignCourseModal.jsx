import React, { useState, useEffect } from 'react';
import api from '../lib/api';

export default function AssignCourseModal({ isOpen, onClose, student }) {
    const [courses, setCourses] = useState([]);
    const [studentEnrollments, setStudentEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [assigning, setAssigning] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && student?.id) {
            fetchData();
        }
    }, [isOpen, student]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [coursesRes, enrollmentsRes] = await Promise.all([
                api.get('/courses/all'),
                api.get(`/enrollments/student/${student.id}`)
            ]);
            setCourses(coursesRes.data || []);
            setStudentEnrollments(enrollmentsRes.data || []);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const isAssigned = (courseId) => {
        return studentEnrollments.some(e => e.courseId === courseId);
    };

    const handleAssign = async (courseId) => {
        try {
            setAssigning(courseId);
            const response = await api.post('/enrollments/assign', {
                studentId: student.id,
                courseId: courseId
            });
            // Update local state to reflect the new assignment
            setStudentEnrollments(prev => [...prev, response.data]);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to assign course');
        } finally {
            setAssigning(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800 max-h-[80vh]">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Assign Course</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Select a course to enroll <span className="text-primary">{student?.fullName || student?.name}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all">
                        <span className="material-symbols-outlined text-slate-400">close</span>
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-500 font-bold">{error}</div>
                    ) : (
                        <div className="space-y-3">
                            {courses.map(course => {
                                const assigned = isAssigned(course.id);
                                const isProcessing = assigning === course.id;

                                return (
                                    <div key={course.id} className="group p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 rounded-2xl flex items-center justify-between hover:border-primary/30 transition-all">
                                        <div className="flex items-center gap-4 text-left">
                                            <img
                                                src={course.thumbnailUrl || course.thumbnail_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80'}
                                                alt=""
                                                className="w-12 h-12 rounded-xl object-cover"
                                            />
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{course.title}</h4>
                                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{course.level} • ${course.price}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => !assigned && handleAssign(course.id)}
                                            disabled={isProcessing || assigned}
                                            className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isProcessing
                                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                                : assigned
                                                    ? 'bg-green-100 text-green-600 cursor-default'
                                                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                                                }`}
                                        >
                                            {isProcessing ? 'Assigning...' : assigned ? 'Assigned' : 'Assign'}
                                        </button>
                                    </div>
                                );
                            })}
                            {courses.length === 0 && (
                                <div className="text-center py-12 text-slate-400 font-bold">No courses available</div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
