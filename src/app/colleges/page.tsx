'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CollegesPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              INSTITUTION PARTNERSHIPS
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              For Colleges & Universities
            </h1>
            <p className="text-slate-400 text-base font-normal">
              Empower your campus students with hands-on 1-day workshops, simulated internships, and industry capstone projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
              <h3 className="text-2xl font-extrabold text-[#F5F7FA]">Campus Hackathons & Workshops</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Bring 8-hour live coding experiences directly to your engineering college campus with certified mentors.
              </p>
              <Link href="/contact" className="btn-primary inline-flex px-6 py-2.5 text-xs font-semibold">
                Schedule Campus Workshop →
              </Link>
            </div>

            <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
              <h3 className="text-2xl font-extrabold text-[#F5F7FA]">Institutional Placement Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Track student cohort progress, project scores, and verified developer credentials through dedicated institutional portals.
              </p>
              <Link href="/contact" className="btn-primary inline-flex px-6 py-2.5 text-xs font-semibold">
                Partner With Us →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
