'use client';

import React from 'react';
import { ShieldCheck, Target, Award, Users, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const AboutUsSection: React.FC = () => {
  const pillars = [
    {
      icon: <Zap className="w-5 h-5 text-[#0E8C93]" />,
      title: 'Practical Project Sprints',
      desc: 'Skip passive video lectures. Work in active sprints to build real-world deliverables, production applications, and client campaigns.',
    },
    {
      icon: <Users className="w-5 h-5 text-[#0E8C93]" />,
      title: 'Senior Industry Mentorship',
      desc: 'Receive direct 1-on-1 guidance, live reviews, and career coaching from seasoned domain professionals.',
    },
    {
      icon: <Award className="w-5 h-5 text-[#0E8C93]" />,
      title: 'Verified Credentials & LOR',
      desc: 'Earn verifiable digital certificates, letters of recommendation, and a portfolio ready for GitHub & LinkedIn.',
    },
    {
      icon: <Target className="w-5 h-5 text-[#F2803A]" />,
      title: '6 Official Specialized Tracks',
      desc: 'Focused training across Web Development, HR, BDE, Corporate Sales, Digital Marketing, and IT Services.',
    },
  ];

  const stats = [
    { label: 'Specialized Domains', value: '6 Tracks' },
    { label: 'Hands-on Projects', value: '50+ Built' },
    { label: 'Campus Partners', value: '100+ Colleges' },
    { label: 'Student Satisfaction', value: '98%' },
  ];

  return (
    <section id="about-us" className="py-20 bg-[#F4F8F8]/60 relative overflow-hidden border-b border-[#E1E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Story & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E4F3F3]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0E8C93]" />
                <span>ABOUT NEXTGEN TECH</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-[#0A1E33] leading-tight">
                Bridging Academic Learning & Real Corporate Execution.
              </h2>
            </div>

            <p className="text-[#4B6072] text-sm sm:text-base leading-relaxed font-sans">
              NextGen Tech is an industry-aligned learning platform dedicated to empowering students and career aspirants with practical, shippable skills across <strong className="text-[#0A1E33] font-semibold">6 core professional domains</strong>: Web Development, HR Operations, Business Development, Corporate Sales, Digital Marketing, and IT Client Services.
            </p>

            <div className="space-y-3 pt-2 font-sans">
              {[
                'Work on simulated corporate sprint deliverables',
                'Get line-by-line feedback from active senior industry leads',
                'Build shippable capstone projects for your professional portfolio',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-xs sm:text-sm text-[#0A1E33] font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#0E8C93] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="/#register"
                className="px-6 py-3 rounded-xl bg-[#F2803A] hover:bg-[#E06A24] text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Join NextGen Tech Today</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Pillars Cards Grid */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-5 rounded-2xl bg-white border border-[#E1E8E8] shadow-xs hover:border-[#0E8C93] hover:shadow-md transition-all space-y-2 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E4F3F3] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <h3 className="text-base font-display font-semibold text-[#0A1E33]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#4B6072] leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Stats Banner */}
            <div className="p-5 rounded-2xl bg-white border border-[#E1E8E8] shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-display font-bold text-[#0A1E33]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[#0E8C93] font-semibold uppercase tracking-wider font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
