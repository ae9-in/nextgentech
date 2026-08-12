'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CollegePartners } from '@/components/sections/CollegePartners';
import { PartnerModal } from '@/components/modals/PartnerModal';

export default function CollegesPage() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24 space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              CAMPUS & INSTITUTION PARTNERSHIPS
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
              For Colleges & Universities
            </h1>
            <p className="text-[#4B6072] text-base font-normal leading-relaxed">
              Empower your campus students with hands-on 1-day workshops, simulated domain internships, and institutional placement support.
            </p>
          </div>
        </div>

        <CollegePartners onPartnerClick={() => setIsPartnerModalOpen(true)} />
      </main>

      <PartnerModal isOpen={isPartnerModalOpen} onClose={() => setIsPartnerModalOpen(false)} />

      <Footer />
    </div>
  );
}
