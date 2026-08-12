'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/sections/TrustStrip';
import { AboutUsSection } from '@/components/sections/AboutUsSection';
import { InternshipSection } from '@/components/sections/InternshipSection';
import { StudentStories } from '@/components/sections/StudentStories';
import { CollegePartners } from '@/components/sections/CollegePartners';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { RegistrationForm } from '@/components/sections/RegistrationForm';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { FinalCta } from '@/components/sections/FinalCta';
import { JoinModal } from '@/components/modals/JoinModal';
import { PartnerModal } from '@/components/modals/PartnerModal';

export default function HomePage() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const handleBookSlot = () => {
    setIsJoinModalOpen(true);
  };

  const handlePartnerClick = () => {
    setIsPartnerModalOpen(true);
  };

  const handleExploreCategory = (targetAnchor: string) => {
    const targetElement = document.querySelector(targetAnchor);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsJoinModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar onOpenJoinModal={handleBookSlot} />

      <main>
        <Hero onExplorePrograms={() => handleExploreCategory('#programs')} onBookSlot={handleBookSlot} />
        <TrustStrip />
        <AboutUsSection />
        <InternshipSection onExploreInternships={() => handleBookSlot()} />
        <StudentStories />
        <CollegePartners onPartnerClick={handlePartnerClick} />
        <HowItWorks />
        <RegistrationForm />
        <FaqAccordion />
        <FinalCta onStartLearning={handleBookSlot} />
      </main>

      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
      <PartnerModal isOpen={isPartnerModalOpen} onClose={() => setIsPartnerModalOpen(false)} />

      <Footer />
    </div>
  );
}
