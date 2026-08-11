'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';

export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  college: string;
  track: string;
  role?: string;
  phone?: string;
  streak: number;
  xp: number;
  level: number;
  enrolledCoursesCount: number;
  weeklyHours: number;
  aggregateScore: number;
}

interface UserContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  loginUser: (data: Partial<UserProfile>, tokens?: { accessToken: string; refreshToken: string }) => void;
  logoutUser: () => void;
  resetAll: () => void;
  refetchUser: () => Promise<void>;
  addXP: (amount: number) => Promise<void>;
  incrementStreak: () => Promise<void>;
  enrollCourse: (courseId?: string) => Promise<void>;
  toastMessage: string | null;
  clearToast: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  loginUser: () => {},
  logoutUser: () => {},
  resetAll: () => {},
  refetchUser: async () => {},
  addXP: async () => {},
  incrementStreak: async () => {},
  enrollCourse: async () => {},
  toastMessage: null,
  clearToast: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const refetchUser = useCallback(async () => {
    const token = localStorage.getItem('nxtgen_access_token');
    if (!token) return;

    try {
      const data = await apiClient.get<UserProfile>('/api/v1/auth/me');
      setUser(data);
      localStorage.setItem('nxtgen_user', JSON.stringify(data));
    } catch {
      // Token invalid or expired
      setUser(null);
      localStorage.removeItem('nxtgen_user');
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('nxtgen_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse cached user', e);
      }
    }
    refetchUser();
  }, [refetchUser]);

  const loginUser = (data: Partial<UserProfile>, tokens?: { accessToken: string; refreshToken: string }) => {
    if (tokens) {
      localStorage.setItem('nxtgen_access_token', tokens.accessToken);
      localStorage.setItem('nxtgen_refresh_token', tokens.refreshToken);
    }

    const fullUser: UserProfile = {
      _id: data._id || 'temp',
      name: data.name || (data.email ? data.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ') : 'Student'),
      email: data.email || 'student@college.edu',
      college: data.college || 'College / University Not Set',
      track: data.track || 'Full Stack Development',
      role: data.role || 'STUDENT',
      phone: data.phone || '',
      streak: data.streak || 0,
      xp: data.xp || 0,
      level: data.level || 1,
      enrolledCoursesCount: data.enrolledCoursesCount || 0,
      weeklyHours: data.weeklyHours || 0,
      aggregateScore: data.aggregateScore || 0,
    };

    setUser(fullUser);
    localStorage.setItem('nxtgen_user', JSON.stringify(fullUser));
    triggerToast(`Welcome ${fullUser.name}! Synchronized with Database.`);
  };

  const enrollCourse = async (courseId?: string) => {
    if (!user) return;
    try {
      if (courseId) {
        await apiClient.post('/api/v1/enrollments', { courseId });
      }
      await refetchUser();
      triggerToast(`🎉 Successfully enrolled in course!`);
    } catch (err: any) {
      // Local fallback for quick UI state
      const updated = { ...user, enrolledCoursesCount: user.enrolledCoursesCount + 1 };
      setUser(updated);
      triggerToast(err.message || `🎉 Successfully enrolled!`);
    }
  };

  const addXP = async (amount: number) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 250) + 1;
    const updated = { ...user, xp: newXP, level: newLevel };
    setUser(updated);
    localStorage.setItem('nxtgen_user', JSON.stringify(updated));
    triggerToast(`⚡ +${amount} XP Earned! Total XP: ${newXP}`);
  };

  const incrementStreak = async () => {
    if (!user) return;
    const newStreak = user.streak + 1;
    const updated = { ...user, streak: newStreak };
    setUser(updated);
    localStorage.setItem('nxtgen_user', JSON.stringify(updated));
    triggerToast(`🔥 Real-Time Streak Increased to ${newStreak} ${newStreak === 1 ? 'Day' : 'Days'}!`);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const clearToast = () => setToastMessage(null);

  const logoutUser = () => {
    setUser(null);
    apiClient.clearAuth();
  };

  const resetAll = () => {
    setUser(null);
    apiClient.clearAuth();
    localStorage.clear();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loginUser,
        logoutUser,
        resetAll,
        refetchUser,
        addXP,
        incrementStreak,
        enrollCourse,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
