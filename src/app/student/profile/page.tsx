'use client';

import React from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { useUser } from '@/context/UserContext';

export default function StudentProfilePage() {
  const { user } = useUser();

  const currentUser = user || {
    name: 'Student Developer',
    email: 'student@nxtgentech.com',
    college: 'Tech University',
    track: 'Full Stack Engineering',
    xp: 0,
    level: 1,
  };

  const initials = (currentUser.name || 'Student Developer')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const username = (currentUser.name || 'student').toLowerCase().replace(/\s+/g, '-');

  return (
    <StudentLayout title="Student Profile" subtitle="Public developer profile, verified skills matrix, & academic background.">
      <div className="card-glass-light p-8 space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-extrabold text-2xl shadow-lg">
            {initials || 'SV'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-[#0F172A]">{currentUser.name}</h2>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Verified Developer
              </span>
            </div>
            <p className="text-xs font-mono text-[#2563EB] font-bold">nxtgentech.com/u/{username}</p>
            <p className="text-xs text-slate-500 font-medium">{currentUser.college} • {currentUser.track}</p>
            <p className="text-xs text-slate-400 font-mono">{currentUser.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center font-mono border-t border-[#E2E8F0] pt-4">
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
            <p className="text-xl font-bold text-[#0F172A]">{currentUser.xp} XP</p>
            <p className="text-[10px] text-slate-500">Total XP</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
            <p className="text-xl font-bold text-[#0F172A]">Level {currentUser.level}</p>
            <p className="text-[10px] text-slate-500">Rank</p>
          </div>
          <div className="p-3 rounded-xl bg-white border border-[#E2E8F0]">
            <p className="text-xl font-bold text-[#0F172A]">95/100</p>
            <p className="text-[10px] text-slate-500">Avg Score</p>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
