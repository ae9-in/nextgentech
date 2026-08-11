'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { useUser } from '@/context/UserContext';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Bookmark,
  Layers,
  ArrowRight,
  Sparkles,
  Code2,
  Cpu,
  Search,
  PlusCircle,
  TrendingUp,
} from 'lucide-react';
import {
  StudentCourse,
  getStoredCourses,
  toggleSaveCourse,
  advanceCourseProgress,
} from '@/lib/course-store';

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [activeTab, setActiveTab] = useState<'All' | 'In Progress' | 'Completed' | 'Saved'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addXP, incrementStreak } = useUser();

  // Load real-time courses state
  useEffect(() => {
    setCourses(getStoredCourses());

    const handleSync = () => {
      setCourses(getStoredCourses());
    };

    window.addEventListener('nxtgen_course_store_updated', handleSync);
    return () => window.removeEventListener('nxtgen_course_store_updated', handleSync);
  }, []);

  // Handle Real-Time Save/Bookmark
  const handleToggleSave = (courseId: string, title: string) => {
    const updated = toggleSaveCourse(courseId);
    setCourses(updated);
  };

  // Handle Real-Time Module Progress Advance
  const handleAdvanceProgress = (courseId: string, title: string) => {
    const { updatedCourses, newProgress, isCompleted } = advanceCourseProgress(courseId);
    setCourses(updatedCourses);

    // Award Real-Time XP & Streak
    addXP(75);
    incrementStreak();

    if (isCompleted) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  // Filter courses dynamically based on tab and search query
  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'All') return true;
    if (activeTab === 'Saved') return c.isSaved || c.status === 'Saved';
    return c.status === activeTab;
  });

  const getCategoryBadge = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'ai':
        return (
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>AI & Data</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Development</span>
          </span>
        );
    }
  };

  return (
    <StudentLayout
      title="My Learning Workspace"
      subtitle="Access your active 1-Day Experience modules, review completed tracks, and continue building live capstones."
    >
      <div className="space-y-8">
        {/* Dynamic Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#30363D] pb-6">
          {/* Navigation Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#161B22] p-1 rounded-xl border border-[#30363D] font-mono text-xs overflow-x-auto">
            {(['All', 'In Progress', 'Completed', 'Saved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#3B82F6] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-[#1F2937]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, category, or mentor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161B22] border border-[#30363D] focus:border-[#3B82F6] text-xs text-white placeholder-slate-400 outline-none transition-colors"
            />
          </div>
        </div>

        {/* Dynamic Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="card-glass-dark p-12 text-center space-y-4 bg-[#161B22] border border-[#30363D] rounded-2xl max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#1F2937] text-[#3B82F6] flex items-center justify-center mx-auto border border-[#30363D]">
              <BookOpen className="w-8 h-8 text-[#3B82F6]" />
            </div>
            <h3 className="text-xl font-extrabold text-white">No Enrolled Courses Found</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              You haven&apos;t enrolled in any courses yet. Explore our 1-Day Experiences, Full Stack Bootcamps, and AI Agent tracks.
            </p>
            <div className="pt-2">
              <Link href="/programs" className="px-6 py-2.5 text-xs font-bold bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl inline-block transition-colors shadow-md">
                Browse Programs & Enroll →
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <div
                key={c.id}
                className="card-glass-dark p-6 space-y-6 bg-[#161B22] border border-[#30363D] rounded-2xl relative overflow-hidden flex flex-col justify-between group hover:border-[#3B82F6]/50 transition-all duration-300 shadow-xl"
              >
                {/* Accent Header Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition-opacity ${
                    c.status === 'Completed'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : 'bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500'
                  }`}
                />

                <div className="space-y-5">
                  {/* Top Metadata Badges & Bookmark */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryBadge(c.cat)}
                      <button
                        onClick={() => handleToggleSave(c.id, c.title)}
                        title={c.isSaved ? 'Remove Bookmark' : 'Bookmark Course'}
                        className={`p-1.5 rounded-lg border transition-all ${
                          c.isSaved
                            ? 'bg-amber-950/80 text-amber-400 border-amber-500/40'
                            : 'bg-[#0D1117] text-slate-400 border-[#30363D] hover:text-white'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-extrabold flex items-center gap-1.5 border ${
                        c.status === 'Completed'
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                          : 'bg-blue-950/80 text-blue-300 border-blue-500/30'
                      }`}
                    >
                      {c.status === 'Completed' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      <span>{c.progress}% Complete</span>
                    </span>
                  </div>

                  {/* Course Title */}
                  <div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-blue-300 transition-colors leading-snug tracking-tight">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">
                      Instructor: {c.instructor}
                    </p>
                  </div>

                  {/* Modules Count & Real-Time Progress Bar */}
                  <div className="space-y-2.5 pt-2 border-t border-[#30363D]">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-400" />
                        <span>
                          {c.completedModules} / {c.totalModules} Modules
                        </span>
                      </span>

                      {/* Interactive + Complete Module Button */}
                      {c.completedModules < c.totalModules && (
                        <button
                          onClick={() => handleAdvanceProgress(c.id, c.title)}
                          title="Advance progress (+75 XP)"
                          className="px-2.5 py-1 rounded-lg bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold transition-all flex items-center gap-1 hover:scale-105 active:scale-95"
                        >
                          <PlusCircle className="w-3 h-3 text-blue-400" />
                          <span>+ Complete Module</span>
                        </button>
                      )}
                    </div>

                    <div className="h-2.5 rounded-full bg-[#0D1117] border border-[#30363D] overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          c.status === 'Completed'
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400'
                        }`}
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Link Button */}
                <div className="pt-6 mt-4 border-t border-[#30363D]">
                  <Link
                    href={`/student/course/${c.id}`}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 group/btn shadow-lg ${
                      c.status === 'Completed'
                        ? 'bg-[#1F2937] hover:bg-[#374151] text-white border border-[#30363D]'
                        : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-blue-600/20 hover:shadow-blue-600/40'
                    }`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current text-white" />
                    <span>
                      {c.status === 'Completed' ? 'Review Course Material' : 'Continue Learning'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
