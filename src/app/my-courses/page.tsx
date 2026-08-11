'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookOpen, Play, CheckCircle2, Clock, Sparkles, ArrowRight, Code, Award } from 'lucide-react';

const courses = [
  {
    id: 'c1',
    title: '1-Day Full Stack Development Experience',
    category: 'Full Stack',
    instructor: 'Arjun Mehta',
    progress: 60,
    totalModules: 5,
    completedModules: 3,
    status: 'In Progress',
    lastAccessed: '2 hours ago',
    thumbnailBg: 'from-purple-900/60 to-slate-900',
  },
  {
    id: 'c2',
    title: 'AI Resume Analyzer & Agent Builder',
    category: 'AI & Python',
    instructor: 'Priya Sharma',
    progress: 100,
    totalModules: 4,
    completedModules: 4,
    status: 'Completed',
    lastAccessed: '3 days ago',
    thumbnailBg: 'from-cyan-900/60 to-slate-900',
  },
  {
    id: 'c3',
    title: 'MERN Stack Developer Bootcamp',
    category: 'Bootcamp',
    instructor: 'Arjun Mehta',
    progress: 0,
    totalModules: 8,
    completedModules: 0,
    status: 'Upcoming',
    lastAccessed: 'Starts Aug 18',
    thumbnailBg: 'from-pink-900/60 to-slate-900',
  },
];

export default function MyCoursesPage() {
  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="py-12 bg-gradient-to-b from-purple-950/30 via-[#0a0b14] to-[#07080d] border-b border-purple-500/20 text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Student Learning Portal</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white">
              My <span className="text-gradient-cyan">Courses</span>
            </h1>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Track your course progression, resume live video lessons, and complete capstone projects.
            </p>
          </div>

          {/* Courses List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-3xl bg-[#0c0e19] border border-white/[0.06] hover:border-purple-500/30 overflow-hidden flex flex-col justify-between card-hover-lift group"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className={`p-6 bg-gradient-to-br ${course.thumbnailBg} border-b border-white/[0.06] relative overflow-hidden`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900/80 text-purple-300 border border-slate-800">
                        {course.category}
                      </span>
                      <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${
                        course.status === 'Completed' ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30' :
                        course.status === 'In Progress' ? 'bg-purple-950/80 text-purple-300 border-purple-500/30' :
                        'bg-slate-900 text-slate-400 border-slate-700'
                      }`}>
                        {course.status}
                      </span>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-lg font-bold font-display text-white leading-tight group-hover:text-cyan-300 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono">Mentor: {course.instructor}</p>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Modules: {course.completedModules}/{course.totalModules}</span>
                      <span>Last active: {course.lastAccessed}</span>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-mono font-bold text-slate-300 mb-1.5">
                        <span>Completion</span>
                        <span className="text-cyan-400">{course.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0">
                  <button className="w-full py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 text-white font-bold text-xs border border-white/[0.06] hover:border-transparent transition-all flex items-center justify-center gap-2 group/btn">
                    <Play className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:text-white fill-current" />
                    <span>{course.status === 'Completed' ? 'Review Content' : 'Continue Learning'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
