'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BarChart3 } from 'lucide-react';

export default function StudentProgressPage() {
  const metrics = [
    { label: 'Courses', score: 88 },
    { label: 'Assignments', score: 76 },
    { label: 'Projects', score: 91 },
    { label: 'Quizzes', score: 84 },
    { label: 'Attendance', score: 96 },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111827] selection:bg-[#2563EB] selection:text-white font-sans">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="py-8 border-b border-[#E4E7EC] text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-[#0B1F33]">Performance & Progress</h1>
            <p className="text-xs text-[#667085]">Real-time breakdown of course completion, quiz scores, and live class attendance.</p>
          </div>

          <div className="card-clean p-8 flex justify-between items-center">
            <div>
              <span className="text-xs font-mono font-bold text-[#2563EB] uppercase">Aggregate Index</span>
              <h2 className="text-3xl font-extrabold text-[#0B1F33]">Overall Progress</h2>
            </div>
            <div className="p-4 rounded bg-[#F7F7F5] border border-[#E4E7EC] text-center font-mono">
              <span className="text-3xl font-extrabold text-[#2563EB]">82%</span>
            </div>
          </div>

          <div className="card-clean p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#0B1F33] uppercase font-mono">Component Breakdown</h3>
            <div className="space-y-4">
              {metrics.map((m) => (
                <div key={m.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="font-bold text-[#0B1F33]">{m.label}</span>
                    <span className="text-[#2563EB] font-bold">{m.score}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-[#F7F7F5] border border-[#E4E7EC] overflow-hidden">
                    <div className="h-full bg-[#2563EB]" style={{ width: `${m.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
