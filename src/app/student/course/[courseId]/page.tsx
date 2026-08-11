'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useUser } from '@/context/UserContext';
import confetti from 'canvas-confetti';
import {
  Play,
  CheckCircle2,
  Circle,
  FileText,
  Download,
  MessageSquare,
  Code2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
} from 'lucide-react';
import {
  StudentCourse,
  getStoredCourses,
  advanceCourseProgress,
} from '@/lib/course-store';

export default function CoursePlayerPage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || 'c1';
  const { addXP, incrementStreak } = useUser();

  const [course, setCourse] = useState<StudentCourse | null>(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState(4);
  const [activeTab, setActiveTab] = useState<'notes' | 'resources' | 'discussion' | 'sandbox'>('notes');

  useEffect(() => {
    const list = getStoredCourses();
    const found = list.find((c) => c.id === courseId) || list[0];
    setCourse(found);
  }, [courseId]);

  const [syllabus, setSyllabus] = useState([
    { id: 1, title: '1. Intro to Full Stack & Architecture', status: 'completed' },
    { id: 2, title: '2. HTML5 Accessibility & Semantic Markup', status: 'completed' },
    { id: 3, title: '3. CSS Grid, Flexbox & Responsive Systems', status: 'completed' },
    { id: 4, title: '4. JavaScript Async/Await & Event Loop', status: 'completed' },
    { id: 5, title: '5. React 19 State, Effects & Custom Hooks', status: 'active' },
    { id: 6, title: '6. Node.js & Express REST API Design', status: 'pending' },
    { id: 7, title: '7. MongoDB & Mongoose Schema Modeling', status: 'pending' },
    { id: 8, title: '8. Full Stack Capstone Deployment', status: 'pending' },
  ]);

  const handleMarkModuleComplete = () => {
    if (!course) return;

    // Update local syllabus
    const updatedSyllabus = [...syllabus];
    updatedSyllabus[activeModuleIdx] = {
      ...updatedSyllabus[activeModuleIdx],
      status: 'completed',
    };

    if (activeModuleIdx < updatedSyllabus.length - 1) {
      updatedSyllabus[activeModuleIdx + 1] = {
        ...updatedSyllabus[activeModuleIdx + 1],
        status: 'active',
      };
      setActiveModuleIdx(activeModuleIdx + 1);
    }
    setSyllabus(updatedSyllabus);

    // Advance Real-Time Course Progress in Store
    const { updatedCourses, newProgress, isCompleted } = advanceCourseProgress(course.id);
    const updated = updatedCourses.find((c) => c.id === course.id) || null;
    setCourse(updated);

    // Add Real-Time XP
    addXP(100);
    incrementStreak();

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const activeModuleTitle = syllabus[activeModuleIdx]?.title || 'Current Module';
  const progressPct = course ? course.progress : 72;

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#2563EB] selection:text-white font-sans">
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Player Header Bar */}
          <div className="p-6 bg-[#161B22] border border-[#30363D] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <Link
                href="/student/courses"
                className="p-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] hover:bg-[#1F2937] text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <h1 className="text-xl font-extrabold text-white">
                  {course?.title || 'MERN Stack Development Bootcamp'}
                </h1>
                <p className="text-xs text-blue-400 font-mono mt-0.5">
                  Current Lesson: {activeModuleTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-white font-bold">{progressPct}% Completed</span>
              <div className="w-32 h-2.5 rounded-full bg-[#0D1117] border border-[#30363D] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Main 2-Column LMS Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 4 Columns: Course Syllabus Sidebar */}
            <div className="lg:col-span-4 bg-[#161B22] border border-[#30363D] rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
                <h2 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Course Content</span>
                </h2>
                <span className="text-[10px] font-mono text-slate-400">
                  {syllabus.filter((s) => s.status === 'completed').length} / {syllabus.length}
                </span>
              </div>

              <div className="space-y-2">
                {syllabus.map((item, idx) => {
                  const isActive = idx === activeModuleIdx;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveModuleIdx(idx)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 text-xs font-mono ${
                        isActive
                          ? 'bg-[#2563EB] text-white border-[#3B82F6] shadow-md'
                          : item.status === 'completed'
                          ? 'bg-[#0D1117] text-slate-200 border-[#30363D] hover:bg-[#1F2937]'
                          : 'bg-[#161B22] text-slate-400 border-[#30363D] hover:bg-[#1F2937]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isActive ? (
                          <Play className="w-4 h-4 text-white fill-current shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                        <span className="truncate">{item.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 8 Columns: Video Player & Controls */}
            <div className="lg:col-span-8 space-y-6">
              {/* Video Player Frame */}
              <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-4 overflow-hidden space-y-4 shadow-xl">
                <div className="w-full aspect-video bg-[#0D1117] rounded-xl relative flex items-center justify-center text-white border border-[#30363D] overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20" />
                  <Play className="w-16 h-16 text-blue-400 group-hover:text-white cursor-pointer transition-all transform group-hover:scale-110 drop-shadow-lg" />
                  <span className="absolute bottom-4 left-4 text-xs font-mono bg-[#161B22]/90 border border-[#30363D] px-3 py-1.5 rounded-lg text-slate-200">
                    {activeModuleTitle} (24:15)
                  </span>
                </div>

                {/* Real-Time Mark Module Complete Button */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span>Watch video & complete exercise</span>
                  </span>

                  <button
                    onClick={handleMarkModuleComplete}
                    className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark Module Complete (+100 XP)</span>
                  </button>
                </div>
              </div>

              {/* Bottom Resource Tabs */}
              <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 border-b border-[#30363D] pb-3 text-xs font-mono">
                  {(['notes', 'resources', 'discussion', 'sandbox'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-4 py-2 rounded-xl uppercase font-bold transition-all ${
                        activeTab === t
                          ? 'bg-[#2563EB] text-white border border-[#3B82F6]'
                          : 'text-slate-400 hover:text-white hover:bg-[#1F2937]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-slate-300 leading-relaxed font-mono">
                  {activeTab === 'notes' && (
                    <p className="bg-[#0D1117] p-4 rounded-xl border border-[#30363D]">
                      💡 <strong>Key Takeaway:</strong> React 19 introduces automatic memoization.
                      Use standard <code className="text-blue-400">useState</code> for local state and custom hooks for shared side effects.
                    </p>
                  )}
                  {activeTab === 'resources' && (
                    <p className="bg-[#0D1117] p-4 rounded-xl border border-[#30363D]">
                      📥 <strong>Downloads:</strong> React-19-Cheatsheet.pdf • FullStack-Starter-Repo.zip
                    </p>
                  )}
                  {activeTab === 'discussion' && (
                    <p className="bg-[#0D1117] p-4 rounded-xl border border-[#30363D]">
                      💬 <strong>Discussion Thread:</strong> 14 Student comments. Live mentor responses active.
                    </p>
                  )}
                  {activeTab === 'sandbox' && (
                    <p className="bg-[#0D1117] p-4 rounded-xl border border-[#30363D]">
                      ⚡ <strong>Live Code Sandbox:</strong> Code runner environment initialized.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
