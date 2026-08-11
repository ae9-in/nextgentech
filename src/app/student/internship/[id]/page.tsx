'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Building2, CheckCircle2, Clock, ExternalLink, Github, Code2, Users, TrendingUp } from 'lucide-react';

export default function MyInternshipWorkspacePage() {
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Setup Repository & Environment', done: true },
    { id: 't2', title: 'Build Authentication & JWT Flow', done: true },
    { id: 't3', title: 'Create Dashboard & UI Layout', done: true },
    { id: 't4', title: 'API Integration & State Management', done: false },
    { id: 't5', title: 'Production Deployment to Vercel & Render', done: false },
  ]);

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111827] selection:bg-[#2563EB] selection:text-white font-sans">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <div className="card-clean p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-[#E4E7EC] pb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-1 rounded">
                  LIVE WORKSPACE • WEEK 6 / 8
                </span>
                <h1 className="text-3xl font-extrabold text-[#0B1F33] mt-2">Full Stack Development Internship</h1>
              </div>

              <div className="flex items-center gap-3">
                <a href="https://github.com/sai/employee-management-system" target="_blank" rel="noopener noreferrer" className="btn-secondary px-4 py-2 text-xs flex items-center gap-2">
                  <Github className="w-4 h-4" /> GitHub Repo
                </a>
                <a href="https://employee-system.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-primary px-4 py-2 text-xs flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#667085]">Overall Internship Completion</span>
                <span className="text-[#0B1F33] font-bold">82%</span>
              </div>
              <div className="h-3 rounded-full bg-[#F7F7F5] border border-[#E4E7EC] overflow-hidden">
                <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 card-clean p-6 space-y-4">
              <h2 className="text-xs font-mono font-bold text-[#0B1F33] uppercase border-b border-[#E4E7EC] pb-3">Sprint Tasks</h2>
              <div className="space-y-2 text-xs font-mono">
                {tasks.map((t) => (
                  <div key={t.id} className={`p-3 rounded border flex items-center gap-2 ${t.done ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-[#F7F7F5] text-[#111827] border-[#E4E7EC]'}`}>
                    <CheckCircle2 className={`w-4 h-4 ${t.done ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className={t.done ? 'line-through' : ''}>{t.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 card-clean p-6 space-y-4">
              <h2 className="text-xs font-mono font-bold text-[#0B1F33] uppercase border-b border-[#E4E7EC] pb-3">Assigned Project</h2>
              <p className="font-bold text-sm text-[#0B1F33]">Employee Management System</p>
              <p className="text-xs text-[#667085] leading-relaxed">Full-stack company ERP platform for employee attendance, leave requests, and payroll analytics.</p>
              <div className="pt-2 text-xs font-mono text-[#667085]">Mentor: <strong className="text-[#0B1F33]">Rahul Kumar</strong></div>
            </div>

            <div className="lg:col-span-4 card-clean p-6 space-y-4">
              <h2 className="text-xs font-mono font-bold text-[#0B1F33] uppercase border-b border-[#E4E7EC] pb-3">Weekly Evaluation</h2>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#F7F7F5] border border-[#E4E7EC] flex justify-between"><span>Week 1</span><span className="font-bold text-emerald-700">90%</span></div>
                <div className="p-2.5 rounded bg-[#F7F7F5] border border-[#E4E7EC] flex justify-between"><span>Week 2</span><span className="font-bold text-emerald-700">85%</span></div>
                <div className="p-2.5 rounded bg-[#F7F7F5] border border-[#E4E7EC] flex justify-between"><span>Week 3</span><span className="font-bold text-emerald-700">92%</span></div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
