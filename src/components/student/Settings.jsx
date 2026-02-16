import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Settings() {
    const { user, logout } = useAuth();
    
    const [activeTab, setActiveTab] = useState('account');
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: true,
        marketingEmails: false,
        language: 'english',
        timezone: 'UTC',
        theme: 'auto'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validatePasswordForm = () => {
        const newErrors = {};
        
        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required';
        }
        
        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        if (!validatePasswordForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Reset form
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));
            
            setShowPasswordForm(false);
            alert('Password changed successfully!');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Error changing password. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveSettings = async () => {
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Error saving settings. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        const event = new CustomEvent('navigateToDashboard');
        window.dispatchEvent(event);
    };

    const settingsTabs = [
        { id: 'account', label: 'Account Settings', icon: 'person' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' },
        { id: 'privacy', label: 'Privacy & Security', icon: 'security' },
        { id: 'preferences', label: 'Preferences', icon: 'tune' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Manage your account settings and preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
                            <nav className="space-y-1">
                                {settingsTabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-primary text-white'
                                                : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-xl">
                                            {tab.icon}
                                        </span>
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {/* Account Settings */}
                        {activeTab === 'account' && (
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                                    <h2 className="text-xl font-bold mb-6">Account Information</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                                            <div>
                                                <p className="font-semibold">Email Address</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
                                            </div>
                                            <button className="text-primary hover:underline text-sm font-medium">
                                                Change
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                                            <div>
                                                <p className="font-semibold">Password</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Last changed 30 days ago</p>
                                            </div>
                                            <button 
                                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                                                className="text-primary hover:underline text-sm font-medium"
                                            >
                                                Change
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between py-3">
                                            <div>
                                                <p className="font-semibold">Account Status</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                                    {user?.plan || 'Free Plan'}
                                                </p>
                                            </div>
                                            <button className="text-primary hover:underline text-sm font-medium">
                                                Upgrade
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {showPasswordForm && (
                                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                                        <h3 className="text-lg font-bold mb-4">Change Password</h3>
                                        <form onSubmit={handlePasswordChange} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.currentPassword ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                                    placeholder="Enter current password"
                                                />
                                                {errors.currentPassword && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.newPassword ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                                    placeholder="Enter new password"
                                                />
                                                {errors.newPassword && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'} bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                                                    placeholder="Confirm new password"
                                                />
                                                {errors.confirmPassword && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                                )}
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPasswordForm(false)}
                                                    className="px-4 py-2 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? 'Updating...' : 'Update Password'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Notifications */}
                        {activeTab === 'notifications' && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                                <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">Email Notifications</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Receive course updates and announcements via email
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="emailNotifications"
                                                checked={formData.emailNotifications}
                                                onChange={handleInputChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">Push Notifications</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Receive push notifications on your device
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="pushNotifications"
                                                checked={formData.pushNotifications}
                                                onChange={handleInputChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">SMS Notifications</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                receive important updates via SMS
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="smsNotifications"
                                                checked={formData.smsNotifications}
                                                onChange={handleInputChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">Marketing Emails</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                Receive promotional offers and newsletters
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="marketingEmails"
                                                checked={formData.marketingEmails}
                                                onChange={handleInputChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Privacy & Security */}
                        {activeTab === 'privacy' && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                                <h2 className="text-xl font-bold mb-6">Privacy & Security</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                                        <div>
                                            <p className="font-semibold">Two-Factor Authentication</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security</p>
                                        </div>
                                        <button className="text-primary hover:underline text-sm font-medium">
                                            Enable
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                                        <div>
                                            <p className="font-semibold">Login History</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">View recent login activity</p>
                                        </div>
                                        <button className="text-primary hover:underline text-sm font-medium">
                                            View
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-700">
                                        <div>
                                            <p className="font-semibold">Connected Devices</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Manage connected devices</p>
                                        </div>
                                        <button className="text-primary hover:underline text-sm font-medium">
                                            Manage
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <p className="font-semibold">Data Export</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Download your personal data</p>
                                        </div>
                                        <button className="text-primary hover:underline text-sm font-medium">
                                            Export
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Preferences */}
                        {activeTab === 'preferences' && (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                                <h2 className="text-xl font-bold mb-6">Preferences</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                            Language
                                        </label>
                                        <select
                                            name="language"
                                            value={formData.language}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option value="english">English</option>
                                            <option value="spanish">Spanish</option>
                                            <option value="french">French</option>
                                            <option value="german">German</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                            Timezone
                                        </label>
                                        <select
                                            name="timezone"
                                            value={formData.timezone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option value="UTC">UTC</option>
                                            <option value="EST">Eastern Time (EST)</option>
                                            <option value="PST">Pacific Time (PST)</option>
                                            <option value="GMT">Greenwich Mean Time (GMT)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                                            Theme
                                        </label>
                                        <select
                                            name="theme"
                                            value={formData.theme}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option value="auto">Auto</option>
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleSaveSettings}
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">refresh</span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">save</span>
                                        Save Settings
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
