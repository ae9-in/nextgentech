'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JoinModal } from '@/components/modals/JoinModal';
import {
  BookOpen,
  Briefcase,
  Award,
  CheckCircle2,
  ArrowRight,
  Code2,
  Zap,
} from 'lucide-react';

export default function ProgramsPage() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('Full Stack App in 1 Day');

  const handleOpenBooking = (programTitle: string) => {
    setSelectedProgram(programTitle);
    setIsJoinModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar onOpenJoinModal={() => handleOpenBooking('Full Stack App in 1 Day')} />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              OUR TECH EXPERIENCES
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#F5F7FA]">
              NextGen Tech 1-Day Experiences & Training
            </h1>
            <p className="text-slate-400 text-base font-normal">
              Practical technology experiences built around shipping production code, 1-on-1 mentor guidance, and earning verified developer credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D] flex flex-col justify-between rounded-2xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span className="px-3 py-1 rounded bg-[#3B82F6] text-white font-bold">1 Day</span>
                  <span>Intensive Workshop</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F5F7FA]">1-Day Full Stack Experience</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  8-hour intensive live training with real project build, code deployment, & verified credential.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="tech-pill">React 19</span>
                  <span className="tech-pill">Next.js</span>
                  <span className="tech-pill">Live Deployment</span>
                </div>
              </div>
              <div className="pt-6 border-t border-[#30363D]">
                <button
                  onClick={() => handleOpenBooking('1-Day Full Stack Experience')}
                  className="btn-primary w-full py-3 text-xs text-center block font-semibold rounded-xl"
                >
                  Book 1-Day Slot →
                </button>
              </div>
            </div>

            <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D] flex flex-col justify-between rounded-2xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span className="px-3 py-1 rounded bg-[#3B82F6] text-white font-bold">1 Day</span>
                  <span>AI Specialization</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F5F7FA]">1-Day AI Agent Builder</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Build autonomous OpenAI agents, RAG PDF audit pipelines, and LangChain tools in a single session.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="tech-pill">Python</span>
                  <span className="tech-pill">OpenAI API</span>
                  <span className="tech-pill">LangChain</span>
                </div>
              </div>
              <div className="pt-6 border-t border-[#30363D]">
                <button
                  onClick={() => handleOpenBooking('1-Day AI Agent Builder')}
                  className="btn-primary w-full py-3 text-xs text-center block font-semibold rounded-xl"
                >
                  Book 1-Day Slot →
                </button>
              </div>
            </div>

            <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D] flex flex-col justify-between rounded-2xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <span className="px-3 py-1 rounded bg-[#3B82F6] text-white font-bold">Simulated</span>
                  <span>Internship Track</span>
                </div>
                <h3 className="text-2xl font-bold text-[#F5F7FA]">Simulated Engineering Internship</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Work in simulated Agile sprints with weekly pull requests, GitHub code reviews, and senior mentor feedback.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="tech-pill">Agile Sprints</span>
                  <span className="tech-pill">GitHub PRs</span>
                  <span className="tech-pill">Mentor Reviews</span>
                </div>
              </div>
              <div className="pt-6 border-t border-[#30363D]">
                <button
                  onClick={() => handleOpenBooking('Simulated Engineering Internship')}
                  className="btn-primary w-full py-3 text-xs text-center block font-semibold rounded-xl"
                >
                  Apply for Internship →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        defaultProgram={selectedProgram}
      />

      <Footer />
    </div>
  );
}
