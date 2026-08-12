'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function BootcampsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              INTENSIVE CAREER TRACKS
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
              Professional Bootcamps
            </h1>
            <p className="text-[#4B6072] text-base font-normal leading-relaxed">
              Immersive, outcome-driven bootcamps designed to take you from foundational concepts to real-world corporate execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Web Development */}
            <div className="bg-white p-8 space-y-6 border border-[#E1E8E8] rounded-xl shadow-sm hover:border-[#7FC4C8] transition-all">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-[#0E8C93] font-semibold uppercase tracking-[0.18em]">WEB DEVELOPMENT</span>
                <span className="px-3 py-1 rounded-full bg-[#E4F3F3] text-[#0B6E74] font-medium border-none">7 Days</span>
              </div>
              <h3 className="text-2xl font-display font-semibold text-[#0A1E33]">Web Development Bootcamp</h3>
              <p className="text-xs text-[#4B6072] leading-relaxed font-normal">
                Master React, Node.js, Express, MongoDB Atlas, HTML5/CSS3, and cloud deployment in an intensive sprint.
              </p>
              <div className="pt-4 border-t border-[#E1E8E8]">
                <Link href="/#register?program=Web%20Development%20Bootcamp" className="w-full py-3 text-xs text-center block font-medium bg-[#F2803A] hover:bg-[#E06A24] text-white rounded-lg transition-colors">
                  Enroll in Web Dev Bootcamp →
                </Link>
              </div>
            </div>

            {/* BDE & Sales */}
            <div className="bg-white p-8 space-y-6 border border-[#E1E8E8] rounded-xl shadow-sm hover:border-[#7FC4C8] transition-all">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-[#0E8C93] font-semibold uppercase tracking-[0.18em]">BDE & SALES</span>
                <span className="px-3 py-1 rounded-full bg-[#E4F3F3] text-[#0B6E74] font-medium border-none">7 Days</span>
              </div>
              <h3 className="text-2xl font-display font-semibold text-[#0A1E33]">BDE & Corporate Sales Bootcamp</h3>
              <p className="text-xs text-[#4B6072] leading-relaxed font-normal">
                Master B2B lead generation, consultative sales, corporate pitching, HubSpot CRM, and high-ticket deal closing.
              </p>
              <div className="pt-4 border-t border-[#E1E8E8]">
                <Link href="/#register?program=BDE%20%26%20Corporate%20Sales%20Bootcamp" className="w-full py-3 text-xs text-center block font-medium bg-[#F2803A] hover:bg-[#E06A24] text-white rounded-lg transition-colors">
                  Enroll in BDE & Sales Bootcamp →
                </Link>
              </div>
            </div>

            {/* Digital Marketing */}
            <div className="bg-white p-8 space-y-6 border border-[#E1E8E8] rounded-xl shadow-sm hover:border-[#7FC4C8] transition-all">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-[#0E8C93] font-semibold uppercase tracking-[0.18em]">DIGITAL MARKETING</span>
                <span className="px-3 py-1 rounded-full bg-[#E4F3F3] text-[#0B6E74] font-medium border-none">7 Days</span>
              </div>
              <h3 className="text-2xl font-display font-semibold text-[#0A1E33]">Digital Marketing & Performance Bootcamp</h3>
              <p className="text-xs text-[#4B6072] leading-relaxed font-normal">
                Master Meta/Google Ads, SEO keyword strategy, landing page conversion funnels, and marketing analytics.
              </p>
              <div className="pt-4 border-t border-[#E1E8E8]">
                <Link href="/#register?program=Digital%20Marketing%20Bootcamp" className="w-full py-3 text-xs text-center block font-medium bg-[#F2803A] hover:bg-[#E06A24] text-white rounded-lg transition-colors">
                  Enroll in Marketing Bootcamp →
                </Link>
              </div>
            </div>

            {/* HR Operations */}
            <div className="bg-white p-8 space-y-6 border border-[#E1E8E8] rounded-xl shadow-sm hover:border-[#7FC4C8] transition-all">
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-[#0E8C93] font-semibold uppercase tracking-[0.18em]">HR & PEOPLE OPS</span>
                <span className="px-3 py-1 rounded-full bg-[#E4F3F3] text-[#0B6E74] font-medium border-none">7 Days</span>
              </div>
              <h3 className="text-2xl font-display font-semibold text-[#0A1E33]">HR Operations & Recruitment Bootcamp</h3>
              <p className="text-xs text-[#4B6072] leading-relaxed font-normal">
                Master talent acquisition, candidate screening with ATS tools, HR policy frameworks, and employee lifecycle.
              </p>
              <div className="pt-4 border-t border-[#E1E8E8]">
                <Link href="/#register?program=HR%20%26%20People%20Operations%20Bootcamp" className="w-full py-3 text-xs text-center block font-medium bg-[#F2803A] hover:bg-[#E06A24] text-white rounded-lg transition-colors">
                  Enroll in HR Bootcamp →
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
