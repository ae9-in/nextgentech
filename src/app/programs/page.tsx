'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { InternshipSection } from '@/components/sections/InternshipSection';

export default function ProgramsPage() {
  const router = useRouter();

  const handleOpenBooking = (programTitle?: string) => {
    const targetProgram = programTitle || 'Web Development Internship';
    router.push(`/#register?program=${encodeURIComponent(targetProgram)}`);
  };

  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar onOpenJoinModal={() => handleOpenBooking('Web Development Internship')} />

      <main className="pt-16">
        {/* Simulated Internships Component (Renders 6 Domain Internship Tracks) */}
        <InternshipSection onExploreInternships={(title) => handleOpenBooking(title)} />
      </main>

      <Footer />
    </div>
  );
}
