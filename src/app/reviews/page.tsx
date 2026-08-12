'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StudentStories } from '@/components/sections/StudentStories';

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24 space-y-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              STUDENT FEEDBACK & REVIEWS
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
              Student Success Stories
            </h1>
            <p className="text-[#4B6072] text-base font-normal leading-relaxed">
              Read real feedback from students and professionals who transformed their careers across our 6 domain tracks.
            </p>
          </div>
        </div>

        <StudentStories />
      </main>

      <Footer />
    </div>
  );
}
