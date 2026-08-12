'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FaqAccordion } from '@/components/sections/FaqAccordion';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <FaqAccordion />
      </main>

      <Footer />
    </div>
  );
}
