'use client';

import React from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { TrendingUp, FileText, FolderGit2, Briefcase, ArrowRight } from 'lucide-react';

export default function StudentCareerPage() {
  return (
    <StudentLayout title="Career Center" subtitle="Prepare for technical hiring: ATS resume builders, portfolio builders, and campus job boards.">
      <div className="space-y-8">
        {/* Score Banner */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-500/30 inline-flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>Job Readiness Index</span>
            </span>
            <h2 className="text-3xl font-extrabold text-white">Readiness Score</h2>
            <p className="text-xs text-slate-300 font-mono">Based on completed modules, quizzes, and capstone evaluations.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0D1117] border border-[#30363D] text-center font-mono shrink-0">
            <span className="text-3xl font-extrabold text-blue-400">78 / 100</span>
            <span className="block text-[10px] text-emerald-400 font-bold mt-1">High Readiness ✓</span>
          </div>
        </div>

        {/* Career Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Resume Builder', href: '/student/resume', desc: 'Create ATS-optimized tech resumes in PDF.', icon: FileText },
            { title: 'Portfolio Builder', href: '/student/projects', desc: 'Showcase your shipped capstone applications.', icon: FolderGit2 },
            { title: 'Job Board', href: '/student/jobs', desc: 'Browse entry-level developer role openings.', icon: Briefcase },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.title}
                href={c.href}
                className="bg-[#161B22] border border-[#30363D] hover:border-[#3B82F6]/50 transition-all rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xl group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-blue-300 transition-colors">{c.title}</h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{c.desc}</p>
                </div>

                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5 pt-2 group-hover:translate-x-1 transition-transform">
                  <span>Access Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </StudentLayout>
  );
}
