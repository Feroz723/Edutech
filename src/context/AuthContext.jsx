import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth, db } from '../config/firebaseClient';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (authUser) => {
    if (!authUser) return null;

    try {
      const docRef = doc(db, 'users', authUser.uid);
      const docSnap = await getDoc(docRef);
      const profile = docSnap.exists() ? docSnap.data() : null;

      const userData = {
        id: authUser.uid,
        email: authUser.email,
        role: profile?.role || 'student',
        fullName: profile?.fullName || profile?.name || 'User',
        name: profile?.name || profile?.fullName || 'User',
        avatar: profile?.avatar || profile?.avatar_url,
        plan: profile?.plan || 'free',
        bio: profile?.bio || '',
        phone: profile?.phone || '',
        location: profile?.location || '',
        education: profile?.education || '',
        experience: profile?.experience || '',
        dateOfBirth: profile?.dateOfBirth || '',
        ...profile // Include any other fields for flexibility
      };

      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching profile:', error.message);
      const fallback = { id: authUser.uid, email: authUser.email, role: 'student' };
      setUser(fallback);
      return fallback;
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        await fetchProfile(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Safety timeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [fetchProfile]);

  const login = useCallback(async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      const authUser = userCredential.user;

      // Initial user data
      const userData = {
        id: authUser.uid,
        email: authUser.email,
        role: 'student',
      };
      setUser(userData);

      // Fetch full profile (updates state)
      fetchProfile(authUser).catch(console.error);

      return { success: true, user: userData };
    } catch (err) {
      let message = 'Login failed. Please try again.';
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        message = 'Invalid email or password.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'The email address is not valid.';
      }
      return { success: false, error: message };
    }
  }, [fetchProfile]);

  const logout = useCallback(async () => {
    await signOut(auth);
    setUser(null);
    document.documentElement.classList.remove('dark');
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : prev);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
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
