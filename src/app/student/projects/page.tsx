'use client';

import React, { useState } from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { Code, CheckCircle2, Clock, ExternalLink, Github, Award, Layers } from 'lucide-react';

export default function StudentProjectsPage() {
  const [selectedId, setSelectedId] = useState('p1');

  const projects = [
    {
      id: 'p1',
      title: 'E-Commerce Platform',
      status: 'In Progress',
      progress: 80,
      desc: 'Full-stack marketplace with Stripe payments, MongoDB data pipelines, and JWT authorization.',
      score: 'Under Review',
      github: 'https://github.com/user/ecommerce-app',
      demo: 'https://ecommerce-demo.nxtgentech.app',
    },
    {
      id: 'p2',
      title: 'Portfolio Website',
      status: 'Completed',
      progress: 100,
      desc: 'Next.js portfolio with glassmorphism, responsive Tailwind CSS layouts, and smooth micro-animations.',
      score: '98 / 100 (Grade: A+)',
      github: 'https://github.com/user/nextjs-portfolio',
      demo: 'https://portfolio.nxtgentech.app',
    },
  ];

  const current = projects.find((p) => p.id === selectedId) || projects[0];

  return (
    <StudentLayout title="My Projects" subtitle="Track capstone milestone progress, GitHub repos, live demo links, and mentor review scores.">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Projects List */}
        <div className="lg:col-span-5 bg-[#161B22] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#30363D] pb-4">
            <h2 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-400" />
              <span>Projects Overview</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1F2937] text-blue-400 text-[10px] font-mono font-bold border border-[#30363D]">
              {projects.length} Total
            </span>
          </div>

          <div className="space-y-3">
            {projects.map((p) => {
              const isSelected = p.id === selectedId;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[#2563EB] text-white border-[#3B82F6] shadow-lg shadow-blue-600/20'
                      : 'bg-[#0D1117] text-slate-200 border-[#30363D] hover:border-[#3B82F6]/50 hover:bg-[#1F2937]'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className={`font-extrabold ${isSelected ? 'text-white' : 'text-slate-100'}`}>{p.title}</span>
                    <span className={`font-mono font-bold ${isSelected ? 'text-blue-100' : 'text-blue-400'}`}>{p.progress}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-black/20 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isSelected ? 'bg-white' : 'bg-blue-500'}`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 bg-[#161B22] border border-[#30363D] rounded-2xl p-8 space-y-6 shadow-xl">
          <div className="border-b border-[#30363D] pb-4 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white">{current.title}</h2>
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-mono font-extrabold border ${
                  current.status === 'Completed'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                    : 'bg-blue-950/80 text-blue-300 border-blue-500/30'
                }`}
              >
                {current.status}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">{current.desc}</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono space-y-1">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Mentor Evaluation Score</span>
            </div>
            <p className="text-white text-base font-extrabold pl-6">{current.score}</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={current.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#0D1117] hover:bg-[#1F2937] text-white border border-[#30363D] text-xs font-bold font-mono transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4 text-slate-400" />
              <span>Repository</span>
            </a>
            <a
              href={current.demo}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Live Demo</span>
            </a>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
