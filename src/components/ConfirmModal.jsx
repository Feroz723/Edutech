import React from 'react';

/**
 * ConfirmModal - A premium-styled confirmation dialog
 * Props:
 * - isOpen: Boolean
 * - onClose: Function
 * - onConfirm: Function
 * - title: String
 * - message: String
 * - confirmText: String
 * - cancelText: String
 * - loading: Boolean
 * - type: 'danger' | 'warning' | 'info'
 */
export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    message = 'This action cannot be undone.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    loading = false,
    type = 'danger'
}) {
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: 'warning',
                    iconBg: 'bg-red-100 dark:bg-red-900/30 text-red-600',
                    confirmBtn: 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
                };
            case 'warning':
                return {
                    icon: 'report_problem',
                    iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
                    confirmBtn: 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
                };
            default:
                return {
                    icon: 'help',
                    iconBg: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600',
                    confirmBtn: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] shadow-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className={`w-16 h-16 ${styles.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                            <span className="material-symbols-outlined text-3xl">{styles.icon}</span>
                        </div>

                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                            {message}
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col gap-3">
                        <button
                            disabled={loading}
                            onClick={onConfirm}
                            className={`w-full py-4 ${styles.confirmBtn} text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2`}
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : confirmText}
                        </button>
                        <button
                            disabled={loading}
                            onClick={onClose}
                            className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
