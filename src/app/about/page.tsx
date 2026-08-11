'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              OUR MISSION
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              About NextGen Tech
            </h1>
            <p className="text-slate-400 text-base font-normal leading-relaxed">
              NextGen Tech was founded to bridge the gap between academic theory and production software engineering. We empower students with hands-on 1-day workshops, capstone projects, and simulated internships.
            </p>
          </div>

          <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
            <h2 className="text-xl font-bold text-[#F5F7FA]">Why We Built NextGen Tech</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Traditional courses focus on watching passive videos. Real software engineering happens when you write code, hit bugs, debug stack traces, and submit pull requests for peer review. Our platform is built to simulate real tech company engineering practices.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
