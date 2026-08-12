'use client';

import React from 'react';
import Link from 'next/link';
import { StudentSidebar } from './StudentSidebar';
import { useUser } from '@/context/UserContext';
import { Bell, User, LogOut, RotateCcw, LogIn, Sparkles, ShieldCheck } from 'lucide-react';

interface StudentLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function StudentLayout({ children, title, subtitle }: StudentLayoutProps) {
  const { user, logoutUser, resetAll, incrementStreak, toastMessage, clearToast } = useUser();

  const activeName = user?.name || 'Guest Student';
  const activeCollege = user?.college || 'Student Workspace';
  const activeStreak = user?.streak ?? 0;
  const activeXP = user?.xp ?? 0;
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  return (
    <div className="min-h-screen bg-white text-[#0A1E33] flex font-sans relative">
      {/* Synchronized Left Sidebar */}
      <StudentSidebar />

      {/* Floating Real-Time Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white text-[#0A1E33] px-5 py-3 rounded-lg shadow-sm border border-[#E1E8E8] flex items-center gap-3 text-xs font-sans font-medium">
            <Sparkles className="w-4 h-4 text-[#0E8C93]" />
            <span>{toastMessage}</span>
            <button onClick={clearToast} className="text-[#4B6072] hover:text-[#0A1E33] ml-2">✕</button>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto bg-white">
        {/* Unauthenticated Alert Banner */}
        {!user && (
          <div className="p-4 rounded-lg bg-white border border-[#E1E8E8] text-xs flex items-center justify-between font-sans">
            <span className="text-[#4B6072] font-medium">
              ⚠️ You are currently viewing guest mode. Sign in or Register to save your individual domain progress.
            </span>
            <Link href="/login" className="px-4 py-1.5 text-xs bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium rounded-lg transition-colors">
              Sign In / Register →
            </Link>
          </div>
        )}

        {/* Admin Privileged Super Banner */}
        {isAdmin && (
          <div className="p-4 rounded-lg bg-white text-[#0A1E33] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans border border-[#E1E8E8]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#E4F3F3] text-[#0B6E74]">
                <ShieldCheck className="w-5 h-5 text-[#0E8C93]" />
              </div>
              <div>
                <p className="font-semibold text-[#0A1E33] text-sm">SUPER ADMIN ACCESS MODE ACTIVE</p>
                <p className="text-[#4B6072] text-xs">You have full administrative privileges to manage all domain tracks, students, and settings.</p>
              </div>
            </div>
            <Link href="/admin/dashboard" className="px-4 py-2 text-xs font-medium bg-[#0A1E33] text-white hover:bg-[#0E8C93] rounded-lg transition-colors shrink-0">
              Open Admin Console →
            </Link>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E1E8E8]">
          <div>
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase bg-[#E4F3F3] px-3 py-1 rounded-full border-none">
              STUDENT PORTAL • {activeCollege} {isAdmin && '• [ADMIN MODE]'}
            </span>
            <h1 className="text-3xl font-display font-semibold text-[#0A1E33] mt-2">{title}</h1>
            {subtitle && <p className="text-xs text-[#4B6072] font-normal mt-1">{subtitle}</p>}
          </div>

          {/* Personalized Dynamic User Status Bar */}
          <div className="flex items-center gap-3 text-xs font-sans">
            <Link href="/student/notifications" className="p-2 rounded-lg bg-white border border-[#E1E8E8] text-[#4B6072] hover:text-[#0A1E33]" title="Notifications">
              <Bell className="w-4 h-4" />
            </Link>

            {/* STREAK COUNTER */}
            <button
              onClick={incrementStreak}
              className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E1E8E8] hover:border-[#0E8C93] text-[#0A1E33] font-medium flex items-center gap-1.5 transition-all"
              title="Click to check in & boost real-time streak!"
            >
              <span>🔥</span>
              <span>{activeStreak}-Day Streak</span>
              <span className="text-[10px] text-[#0B6E74] bg-[#E4F3F3] px-1.5 py-0.5 rounded font-medium border-none">{activeXP} XP</span>
            </button>

            {user ? (
              <>
                <Link href="/student/profile" className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white text-[#0A1E33] font-medium border border-[#E1E8E8] hover:border-[#0E8C93] transition-all">
                  <User className="w-3.5 h-3.5 text-[#0E8C93]" />
                  <span>{activeName} {isAdmin && '(Admin)'}</span>
                </Link>

                <button
                  onClick={resetAll}
                  className="p-2 rounded-lg bg-white border border-[#E1E8E8] text-[#4B6072] hover:text-red-600 transition-colors"
                  title="Reset Session / Clear Data"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <Link href="/login" onClick={logoutUser} className="p-2 rounded-lg bg-white border border-[#E1E8E8] text-[#4B6072] hover:text-red-600 transition-colors" title="Sign Out">
                  <LogOut className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <Link href="/login" className="px-4 py-2 text-xs font-medium bg-[#F2803A] hover:bg-[#E06A24] text-white rounded-lg transition-colors flex items-center gap-1.5">
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}
