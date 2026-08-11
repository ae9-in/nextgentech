'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { Building2, ArrowRight, ShieldCheck, GraduationCap, Laptop, Trophy, Rocket, Briefcase, Sparkles, Code2, CheckCircle2 } from 'lucide-react';

interface CollegePartnersProps {
  onPartnerClick: () => void;
}

export const CollegePartners: React.FC<CollegePartnersProps> = ({ onPartnerClick }) => {
  const getOfferingIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-cyan-400" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-purple-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-emerald-400" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-pink-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-blue-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-teal-400" />;
      default:
        return <Building2 className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="for-colleges" className="py-24 bg-gradient-to-b from-[#090b14] via-[#0d0f1f] to-[#07080d] relative overflow-hidden border-y border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-8 sm:p-14 backdrop-blur-2xl relative overflow-hidden space-y-12">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>{CONTENT.collegePartners.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white leading-tight">
                {CONTENT.collegePartners.headline}
              </h2>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {CONTENT.collegePartners.subtext}
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={onPartnerClick}
                className="btn-glow px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-extrabold text-base shadow-xl shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-2 group shrink-0"
              >
                <span>{CONTENT.collegePartners.ctaText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 7 College Offerings Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-300">
              Campus Partnership Offerings:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTENT.collegePartners.offerings.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-[#070914] border border-slate-800 hover:border-cyan-500/40 transition-colors space-y-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 w-fit group-hover:scale-110 transition-transform">
                    {getOfferingIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-normal mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* B2B Contact Highlight Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-900 border border-purple-500/30 flex flex-col justify-between space-y-3 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider">
                    Institutional MOU
                  </span>
                  <h4 className="text-base font-bold text-white">Custom Campus Proposal</h4>
                  <p className="text-xs text-slate-300">
                    Get co-branded certificates, NBA/NAAC support & dedicated lab mentors.
                  </p>
                </div>
                <button
                  onClick={onPartnerClick}
                  className="text-xs font-bold text-cyan-300 hover:text-white flex items-center justify-center sm:justify-start gap-1 group/link"
                >
                  <span>Request MOU Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
