'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Users,
  GraduationCap,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  onExplorePrograms?: () => void;
  onBookSlot?: () => void;
}

export function Hero({ onExplorePrograms, onBookSlot }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center border-b border-[#0A1E33] bg-[#0A1E33] overflow-hidden text-white pt-20 pb-12">
      {/* High-Resolution Team Workspace Background Image & Navy Ambient Glass */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero-bg.jpg"
          alt="NextGen Tech Student Team Workspace"
          className="w-full h-full object-cover object-center opacity-80 filter saturate-110 contrast-105 scale-105"
        />
        {/* Navy Gradient Glass Overlays for Maximum Richness & Ultra-High Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E33] via-[#0A1E33]/92 to-[#0A1E33]/75 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E33]/80 via-transparent to-[#0A1E33]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(#0E8C93_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Copy & Action CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Eyebrow Label — Signal Teal Badge */}
            <motion.div variants={itemVariants}>
              <span className="text-xs tracking-[0.18em] uppercase text-white font-bold font-sans inline-flex items-center gap-2 bg-[#0E8C93]/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/25 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>1-DAY TECH EXPERIENCES</span>
              </span>
            </motion.div>

            {/* Headline H1 — Crisp White Title with Razor-Sharp Contrast */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.08] [text-shadow:_0_2px_16px_rgba(0,0,0,0.8)]"
            >
              IT Training, Internships & Bootcamps — Delivered in a{' '}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#2DD4BF] to-[#34D399] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] underline decoration-[#2DD4BF] decoration-4 underline-offset-6">
                Single Day.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-slate-100 text-base sm:text-lg leading-relaxed max-w-lg font-sans font-medium [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)]"
            >
              Hands-on tech experiences for students, built to fit into one day — no long commitments, real corporate skills.
            </motion.p>

            {/* CTAs Button Group — Vibrant Primary Fill */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
              {onExplorePrograms ? (
                <button
                  onClick={onExplorePrograms}
                  className="bg-[#F2803A] hover:bg-[#E06A24] text-white font-sans font-medium text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#F2803A]/25 transition-all flex items-center gap-2 group border border-[#F2803A]"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <Link
                  href="/programs"
                  className="bg-[#F2803A] hover:bg-[#E06A24] text-white font-sans font-medium text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#F2803A]/25 transition-all flex items-center gap-2 group border border-[#F2803A]"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {onBookSlot ? (
                <button
                  onClick={onBookSlot}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-sans font-medium text-sm px-6 py-3.5 rounded-xl transition-all backdrop-blur-md shadow-sm"
                >
                  Book a 1-Day Slot
                </button>
              ) : (
                <Link
                  href="/bootcamps"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-sans font-medium text-sm px-6 py-3.5 rounded-xl transition-all backdrop-blur-md shadow-sm"
                >
                  Book a 1-Day Slot
                </Link>
              )}
            </motion.div>

            {/* Trust Indicators Row — Glass Chips */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-4 text-xs text-[#B0C4D6]"
            >
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-xs">
                <Users className="w-3.5 h-3.5 text-[#7FC4C8]" />
                <span>
                  <strong className="text-white font-semibold">500+</strong> Students Trained
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#7FC4C8]" />
                <span>
                  <strong className="text-white font-semibold">50+</strong> Colleges Partnered
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shadow-xs">
                <Zap className="w-3.5 h-3.5 text-[#F2803A]" />
                <span>
                  <strong className="text-white font-semibold">1 Day.</strong> Real Skills.
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: PREMIUM FROSTED GLASS 6 DOMAIN SHOWCASE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            <div className="bg-white/12 backdrop-blur-xl border border-white/25 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5 relative z-10 text-white">
              {/* Header Badge & Title */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7FC4C8] animate-pulse" />
                  <span className="text-white/90 font-sans text-xs font-semibold uppercase tracking-[0.15em]">
                    OFFICIAL LEARNING TRACKS
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#0E8C93]/30 text-[#7FC4C8] border border-[#0E8C93]/50 font-sans text-[11px] font-semibold">
                  6 Core Domains
                </span>
              </div>

              {/* Course Title & Intro */}
              <div className="space-y-1.5">
                <h3 className="text-2xl font-display font-semibold text-white leading-snug">
                  Our 6 Core Professional Programs
                </h3>
                <p className="text-xs text-[#B0C4D6] leading-relaxed font-sans">
                  Practical, project-based training designed for college students and career aspirants across 6 in-demand industry domains.
                </p>
              </div>

              {/* 6 Courses Grid List — Glass Cards with Glow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 font-sans">
                {[
                  { name: '1. Web Development', desc: 'React, Node.js, REST APIs & Cloud Deployment' },
                  { name: '2. HR (Human Resources)', desc: 'Talent Sourcing, ATS Tools & HR Operations' },
                  { name: '3. BDE (Business Development)', desc: 'B2B Prospecting, Client Pitching & Proposals' },
                  { name: '4. Sales', desc: 'Corporate Pipelines, CRM & Deal Closing' },
                  { name: '5. Marketing', desc: 'Meta & Google Ads, SEO & Analytics Funnels' },
                  { name: '6. Services (IT Services)', desc: 'Client Operations, SLA Governance & Support' },
                ].map((course) => (
                  <div
                    key={course.name}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[#7FC4C8]/50 transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-display font-semibold text-white group-hover:text-[#7FC4C8] transition-colors">
                        {course.name}
                      </h4>
                    </div>
                    <p className="text-[10px] text-[#B0C4D6] leading-normal">
                      {course.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Action Strip */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#B0C4D6]">
                  <ShieldCheck className="w-4 h-4 text-[#7FC4C8]" />
                  <span className="font-medium text-white">Verified Certificate Included</span>
                </div>

                {onBookSlot ? (
                  <button
                    onClick={onBookSlot}
                    className="px-4 py-2 rounded-xl bg-[#F2803A] hover:bg-[#E06A24] text-white text-xs font-medium transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg"
                  >
                    <span>Reserve Your Seat</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                ) : (
                  <Link
                    href="/#register"
                    className="px-4 py-2 rounded-xl bg-[#F2803A] hover:bg-[#E06A24] text-white text-xs font-medium transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg"
                  >
                    <span>Reserve Your Seat</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
