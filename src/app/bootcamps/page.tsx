'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Code2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BootcampsPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              INTENSIVE TRACKS
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              Developer Bootcamps
            </h1>
            <p className="text-slate-400 text-base font-normal">
              Immersive, outcome-driven coding bootcamps designed to take you from foundational syntax to production deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#3B82F6] font-bold">FULL STACK TRACK</span>
                <span className="px-3 py-1 rounded bg-[#1F2937] border border-[#30363D] text-slate-300 font-bold">8 Weeks</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#F5F7FA]">MERN Stack Development</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Master React 19, Node.js, Express, MongoDB Atlas, TypeScript, and AWS deployment.
              </p>
              <div className="pt-4 border-t border-[#30363D]">
                <Link href="/login" className="btn-primary w-full py-3 text-xs text-center block font-semibold">
                  Enroll in MERN Bootcamp →
                </Link>
              </div>
            </div>

            <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#3B82F6] font-bold">AI ENGINEERING</span>
                <span className="px-3 py-1 rounded bg-[#1F2937] border border-[#30363D] text-slate-300 font-bold">4 Weeks</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#F5F7FA]">AI & LLM Application Builder</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Build production AI agents powered by OpenAI APIs, LangChain, vector databases, and Python.
              </p>
              <div className="pt-4 border-t border-[#30363D]">
                <Link href="/login" className="btn-primary w-full py-3 text-xs text-center block font-semibold">
                  Enroll in AI Bootcamp →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
