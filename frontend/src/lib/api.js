import axios from 'axios';
import { auth } from '../config/firebaseClient';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// Automatically inject Firebase ID token into every request
api.interceptors.request.use(async (config) => {
    const user = auth.currentUser;

    if (user) {
        try {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
            console.error('Failed to get auth token:', error);
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Standard response interceptor for consistent error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.error || error.message || 'An unexpected error occurred';
        return Promise.reject(new Error(message));
    }
);

export default api;
