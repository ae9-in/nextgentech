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
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] flex font-sans relative">
      {/* Synchronized Left Sidebar */}
      <StudentSidebar />

      {/* Floating Real-Time Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-[#161B22] text-[#F5F7FA] px-5 py-3 rounded-xl shadow-2xl border border-[#30363D] flex items-center gap-3 text-xs font-mono font-bold">
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span>{toastMessage}</span>
            <button onClick={clearToast} className="text-slate-400 hover:text-white ml-2">✕</button>
          </div>
        </div>
      )}

      {/* Main Content Viewport */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-y-auto bg-[#0D1117]">
        {/* Unauthenticated Alert Banner */}
        {!user && (
          <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] text-xs flex items-center justify-between font-mono">
            <span className="text-slate-300 font-medium">
              ⚠️ You are currently viewing guest mode. Sign in or Register to save your individual course progress.
            </span>
            <Link href="/login" className="btn-accent px-4 py-1.5 text-xs">
              Sign In / Register →
            </Link>
          </div>
        )}

        {/* Admin Privileged Super Banner */}
        {isAdmin && (
          <div className="p-4 rounded-xl bg-[#161B22] text-[#F5F7FA] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono border border-[#30363D]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#1F2937] text-[#3B82F6] border border-[#30363D]">
                <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div>
                <p className="font-bold text-[#F5F7FA] text-sm">SUPER ADMIN FULL PLATFORM ACCESS MODE ACTIVE</p>
                <p className="text-slate-400 text-[11px]">You have full administrative privileges to manage all students, courses, grading, and settings.</p>
              </div>
            </div>
            <Link href="/admin/dashboard" className="btn-primary px-4 py-2 text-xs font-bold shrink-0">
              Open Admin Console →
            </Link>
          </div>
        )}

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#30363D]">
          <div>
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3 py-1 rounded-md border border-[#30363D]">
              STUDENT PORTAL • {activeCollege} {isAdmin && '• [ADMIN MODE]'}
            </span>
            <h1 className="text-3xl font-extrabold text-[#F5F7FA] mt-2">{title}</h1>
            {subtitle && <p className="text-xs text-slate-400 font-normal mt-1">{subtitle}</p>}
          </div>

          {/* Personalized Dynamic User Status Bar */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <Link href="/student/notifications" className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-slate-300 hover:text-white" title="Notifications">
              <Bell className="w-4 h-4" />
            </Link>

            {/* REAL-TIME STREAK COUNTER */}
            <button
              onClick={incrementStreak}
              className="px-3.5 py-1.5 rounded-lg bg-[#161B22] border border-[#30363D] hover:border-[#484F58] text-[#F5F7FA] font-semibold flex items-center gap-1.5 transition-all"
              title="Click to check in & boost real-time streak!"
            >
              <span>🔥</span>
              <span>{activeStreak}-Day Streak</span>
              <span className="text-[10px] text-[#3B82F6] bg-[#1F2937] px-1.5 py-0.5 rounded font-bold border border-[#30363D]">{activeXP} XP</span>
            </button>

            {user ? (
              <>
                <Link href="/student/profile" className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#161B22] text-[#F5F7FA] font-bold border border-[#30363D] hover:border-[#484F58] transition-all">
                  <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{activeName} {isAdmin && '(Admin)'}</span>
                </Link>

                <button
                  onClick={resetAll}
                  className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-slate-400 hover:text-red-400 transition-colors"
                  title="Reset Session / Clear Data"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <Link href="/login" onClick={logoutUser} className="p-2 rounded-lg bg-[#161B22] border border-[#30363D] text-slate-400 hover:text-red-400 transition-colors" title="Sign Out">
                  <LogOut className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <Link href="/login" className="btn-primary px-4 py-2 text-xs flex items-center gap-1.5 font-semibold">
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
