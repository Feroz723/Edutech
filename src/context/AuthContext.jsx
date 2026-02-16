import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Demo credentials — replace with real API auth in production
const DEMO_USERS = {
  'admin@edutech.com': {
    password: 'admin123',
    role: 'admin',
    name: 'Alex Johnson',
    email: 'admin@edutech.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChMOz1dv-upp3dHSWnij8O_BzmYAIcEiu6bxUGDEJAhuLE98rtjxwuHPKf3kxbA4wyzOLzIfQZRlW8TDvZqD1jSmfuQx2uCAqZ5foAQA7-VR5NW4rN1uDeLE3tLNtR8jMb68nLIa5Ce6G78dXH8l8SwWQhN8GaDYDbwUPxFSpgWPZRLujHGA3Xsn3bI527slvpOUomZP6Ht00NvbiFAKEn9XgkptY18mcfbUF_QLkeecO-_jzvhumdCaGw1zDtoW_Wf4KfOeT-Djpd',
    plan: 'Super Admin',
  },
  'student@edutech.com': {
    password: 'student123',
    role: 'student',
    name: 'Alex Johnson',
    email: 'student@edutech.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBojQj7MnbGZohBA4TDWOtJQcuxJi9pCC_pti67WICpmWgdbhXgiI0yz045vTUU2eUig-TQn1-n-pviZEYk9NmB0cWwkslkksLRxjzvEsK3x8pUO5R7jNcnC0aWxeRE1CHkb-cOsD-3iEXYdH6hVIDUSjD495NeK78j2a0esNoQFXaqZBJPWDuk5HBqV7ks_HMMFrrR4PC-xSQjpOdCrE5nAZxnSq5UNHB5UYicIkawU1nqzigNRKeP5YakuMV2mUFwNDaBXzYcV2yv',
    plan: 'Premium Plan',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = DEMO_USERS[normalizedEmail];

    if (!account) {
      return { success: false, error: 'No account found with this email address.' };
    }
    if (account.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const { password: _pwd, ...userData } = account;
    setUser(userData);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
