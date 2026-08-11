'use client';

import React, { useState } from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import confetti from 'canvas-confetti';
import { Briefcase, Calendar, FolderGit2, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

export default function StudentInternshipsPage() {
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setApplied(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <StudentLayout title="Available Internships" subtitle="Apply for simulated developer internships with assigned mentors, weekly PR reviews, & verified credentials.">
      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 sm:p-10 space-y-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-[#30363D] pb-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-950/80 text-blue-300 border border-blue-500/30">
              FEATURED TRACK
            </span>
            <h2 className="text-3xl font-extrabold text-white">Full Stack Development Internship</h2>
            <p className="text-xs text-slate-300 font-mono">Simulated remote tech internship with 1-on-1 weekly code reviews.</p>
          </div>

          <button
            onClick={handleApply}
            disabled={applied}
            className={`px-8 py-3.5 rounded-xl font-bold text-xs transition-all shadow-lg flex items-center gap-2 ${
              applied
                ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-blue-600/30'
            }`}
          >
            <span>{applied ? 'Application Submitted ✓' : 'Apply Now'}</span>
            {!applied && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-1">
            <span className="text-slate-400 block text-[10px] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-blue-400" />
              <span>DURATION</span>
            </span>
            <span className="font-extrabold text-white text-sm">8 Weeks</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-1">
            <span className="text-slate-400 block text-[10px] flex items-center gap-1">
              <FolderGit2 className="w-3 h-3 text-blue-400" />
              <span>PROJECTS</span>
            </span>
            <span className="font-extrabold text-white text-sm">12 Capstones</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-1">
            <span className="text-slate-400 block text-[10px] flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-blue-400" />
              <span>MENTOR</span>
            </span>
            <span className="font-extrabold text-white text-sm">Assigned Lead</span>
          </div>

          <div className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-1">
            <span className="text-slate-400 block text-[10px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span>CREDENTIAL</span>
            </span>
            <span className="font-extrabold text-blue-400 text-sm">Verified Cert</span>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
