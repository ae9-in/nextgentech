'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import {
  LayoutDashboard,
  BookOpen,
  FileCode2,
  HelpCircle,
  Terminal,
  Trophy,
  Briefcase,
  Clock,
  Calendar,
  MessageSquare,
  Bot,
  Award,
  User,
  Settings,
  LogOut,
  Home,
} from 'lucide-react';

export function StudentSidebar() {
  const pathname = usePathname();
  const { logoutUser } = useUser();

  const sidebarLinks = [
    { name: 'Overview', href: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Learning', href: '/student/courses', icon: BookOpen },
    { name: 'Assignments', href: '/student/assignments', icon: FileCode2 },
    { name: 'Quizzes & Exams', href: '/student/quizzes', icon: HelpCircle },
    { name: 'Code Lab', href: '/student/code-lab', icon: Terminal },
    { name: 'Projects', href: '/student/projects', icon: Trophy },
    { name: 'Internships', href: '/student/internships', icon: Briefcase },
    { name: 'Live Classes', href: '/student/live-classes', icon: Clock },
    { name: 'Calendar', href: '/student/calendar', icon: Calendar },
    { name: 'Community', href: '/student/community', icon: MessageSquare },
    { name: 'AI Assistant', href: '/student/ai-assistant', icon: Bot },
    { name: 'Achievements', href: '/student/achievements', icon: Award },
    { name: 'Certificates', href: '/student/certificates', icon: Award },
    { name: 'Career Center', href: '/student/career', icon: Briefcase },
    { name: 'Profile', href: '/student/profile', icon: User },
    { name: 'Settings', href: '/student/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0D1117] text-[#F5F7FA] flex flex-col justify-between border-r border-[#30363D] shrink-0 min-h-screen sticky top-0 hidden md:flex z-30 select-none">
      <div className="p-6 space-y-6">
        <Link href="/" prefetch={true} className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#3B82F6] text-white flex items-center justify-center font-extrabold text-sm">
            N
          </div>
          <span className="font-extrabold text-base tracking-tight text-[#F5F7FA]">
            NEXTGEN TECH
          </span>
        </Link>

        <nav className="space-y-1">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/student/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                  isActive
                    ? 'bg-[#3B82F6] text-white font-bold'
                    : 'text-slate-300 hover:bg-[#1F2937] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#30363D] space-y-1 font-mono text-xs">
        <Link
          href="/"
          prefetch={true}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#1F2937] transition-colors"
        >
          <Home className="w-4 h-4 text-[#3B82F6] shrink-0" />
          <span>Return to Homepage</span>
        </Link>

        <button
          onClick={logoutUser}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
