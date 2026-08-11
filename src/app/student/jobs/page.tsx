'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import confetti from 'canvas-confetti';
import { Briefcase, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function StudentJobBoardPage() {
  const [applied, setApplied] = useState<Set<string>>(new Set());

  const jobs = [
    { id: 'j1', title: 'Junior Full Stack Developer', company: 'TechSprint Incubator Labs', location: 'Bengaluru / Remote', skills: ['React', 'Node.js', 'MongoDB'], salary: '₹6.5 - ₹8.0 LPA' },
    { id: 'j2', title: 'Frontend React Developer', company: 'Vercel Ecosystem Partner', location: 'Hyderabad', skills: ['React 19', 'TypeScript', 'Tailwind CSS'], salary: '₹6.0 - ₹7.5 LPA' },
  ];

  const handleApply = (id: string) => {
    const next = new Set(applied);
    next.add(id);
    setApplied(next);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111827] selection:bg-[#2563EB] selection:text-white font-sans">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="py-8 border-b border-[#E4E7EC] text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-[#0B1F33]">Job Board</h1>
            <p className="text-xs text-[#667085]">Curated entry-level software developer roles matched with your skills.</p>
          </div>

          <div className="space-y-4">
            {jobs.map((j) => {
              const isApplied = applied.has(j.id);
              return (
                <div key={j.id} className="card-clean p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#2563EB]">{j.company} • {j.salary}</span>
                    <h2 className="text-xl font-bold text-[#0B1F33]">{j.title}</h2>
                    <p className="text-xs text-[#667085] font-mono">{j.location}</p>
                  </div>
                  <button onClick={() => handleApply(j.id)} disabled={isApplied} className={`px-6 py-2.5 text-xs ${isApplied ? 'btn-secondary text-emerald-700' : 'btn-primary'}`}>
                    {isApplied ? 'Applied ✓' : 'Apply Now →'}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
