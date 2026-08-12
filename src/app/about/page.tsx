'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              OUR MISSION & DOMAINS
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
              About NextGen Tech
            </h1>
            <p className="text-[#4B6072] text-base font-normal leading-relaxed">
              NextGen Tech bridges the gap between academic theory and corporate execution across 6 core professional domains: Web Development, HR, BDE, Sales, Marketing, and IT Services.
            </p>
          </div>

          <div className="bg-white p-8 space-y-6 border border-[#E1E8E8] rounded-xl shadow-sm">
            <h2 className="text-xl font-display font-semibold text-[#0A1E33]">Why NextGen Tech</h2>
            <p className="text-xs text-[#4B6072] leading-relaxed font-normal">
              Traditional training relies on passive video lectures. Professional competency is built through live hands-on execution, real project deliverables, mentor evaluations, and simulated corporate workflows.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
