'use client';

import React from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';

export default function AchievementsPage() {
  const list = [
    { icon: '🏆', title: 'First Course', xp: '+250 XP' },
    { icon: '🔥', title: '7-Day Streak', xp: '+500 XP' },
    { icon: '💻', title: 'First Project', xp: '+400 XP' },
  ];

  return (
    <StudentLayout title="Student Achievements" subtitle="Earn XP counters and unlock badges through course completions and project code reviews.">
      <div className="space-y-6">
        <div className="card-glass-light p-8 flex justify-between items-center">
          <div>
            <span className="text-xs font-mono font-bold text-[#2563EB] uppercase">DEVELOPER RANK</span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] mt-1">Developer Level 7</h2>
          </div>
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-center font-mono">
            <span className="text-2xl font-bold text-[#0F172A]">1,840 XP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {list.map((a) => (
            <div key={a.title} className="card-glass-light p-6 flex items-center gap-4">
              <span className="text-3xl">{a.icon}</span>
              <div>
                <h3 className="font-extrabold text-sm text-[#0F172A]">{a.title}</h3>
                <span className="text-xs font-mono text-[#2563EB] font-bold">{a.xp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
