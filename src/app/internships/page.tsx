'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { InternshipSection } from '@/components/sections/InternshipSection';

export default function InternshipsPage() {
  const router = useRouter();

  const handleExploreTrack = (trackTitle?: string) => {
    const target = trackTitle || 'Web Development Internship';
    router.push(`/#register?program=${encodeURIComponent(target)}`);
  };

  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar onOpenJoinModal={() => handleExploreTrack('Web Development Internship')} />

      <main className="pt-20 pb-16">
        <InternshipSection onExploreInternships={handleExploreTrack} />
      </main>

      <Footer />
    </div>
  );
}
