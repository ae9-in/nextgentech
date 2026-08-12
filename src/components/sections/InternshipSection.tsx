'use client';

import React from 'react';
import { CONTENT } from '@/config/content';
import { TiltCard } from '../ui/TiltCard';
import { Award, ArrowRight, Code, Layers, Terminal, BarChart3, Layout, Sparkles, Clock, UserCheck, Briefcase } from 'lucide-react';

interface InternshipSectionProps {
  onExploreInternships: (trackTitle?: string) => void;
}

export const InternshipSection: React.FC<InternshipSectionProps> = ({ onExploreInternships }) => {
  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-[#0E8C93]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#0E8C93]" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-[#0E8C93]" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-[#0E8C93]" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#0E8C93]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#0E8C93]" />;
      default:
        return <Briefcase className="w-5 h-5 text-[#0E8C93]" />;
    }
  };

  return (
    <section id="internships" className="pt-6 pb-20 bg-[#F4F8F8]/60 relative overflow-hidden border-b border-[#E1E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="space-y-6 mb-12 text-center">
          <div className="space-y-2">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              CAREER-READY INTERNSHIP TRACKS
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-[#0A1E33]">
              Explore Industry Internships
            </h3>
            <p className="text-[#4B6072] text-xs sm:text-sm max-w-xl mx-auto">
              Work directly with senior industry leaders on production projects across 6 specialized domains.
            </p>
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {CONTENT.internship.tracks.map((track) => (
            <TiltCard key={track.id} className="h-full">
              <div className="h-full p-6 rounded-2xl border border-[#E1E8E8] hover:border-[#0E8C93] bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Gradient Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 z-20 bg-gradient-to-r from-[#0E8C93] via-[#7FC4C8] to-[#F2803A]" />

                <div className="space-y-6">
                  {/* Full-Bleed Top Image Header */}
                  {track.image && (
                    <div className="relative -mx-6 -mt-6 h-44 sm:h-48 overflow-hidden bg-slate-900 border-b border-[#E1E8E8]">
                      <img
                        src={track.image}
                        alt={track.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E33]/70 via-transparent to-black/20" />

                      {/* Floating Badge Pill */}
                      <span className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0B6E74] font-sans text-[11px] font-bold tracking-wide shadow-md border border-white/80">
                        {track.badge}
                      </span>
                    </div>
                  )}

                  {/* Title & Duration */}
                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-xl font-display font-bold text-[#0A1E33] group-hover:text-[#0E8C93] transition-colors leading-tight">
                      {track.title}
                    </h4>
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#4B6072] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#0E8C93]" />
                      <span>Duration: <strong className="text-[#0A1E33]">{track.duration}</strong></span>
                    </div>
                  </div>

                  {/* Highlight Project Card */}
                  <div className="p-3.5 rounded-xl bg-[#F4F8F8] border-l-4 border-l-[#0E8C93] border-y border-r border-[#E1E8E8] space-y-1">
                    <span className="text-[10px] font-sans text-[#0E8C93] uppercase font-bold tracking-wider block">
                      Production Capstone Project:
                    </span>
                    <p className="text-[#0A1E33] text-xs font-semibold leading-snug">
                      {track.project}
                    </p>
                  </div>

                  {/* Skills Stack Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-sans text-[#4B6072] uppercase font-bold tracking-wider block">
                      Target Skills & Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {track.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded-lg bg-[#E4F3F3] text-[#0B6E74] font-sans text-[10px] font-medium transition-colors hover:bg-[#0E8C93] hover:text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metadata Bullet Info */}
                  <div className="space-y-1.5 pt-2 text-xs border-t border-[#E1E8E8]/70">
                    <div className="flex items-center gap-2 text-[#0B6E74] text-xs font-medium">
                      <Award className="w-4 h-4 text-[#0E8C93] shrink-0" />
                      <span>Certificate: <strong className="text-[#0A1E33]">{track.certificate}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4B6072] text-xs font-medium">
                      <UserCheck className="w-4 h-4 text-[#0E8C93] shrink-0" />
                      <span>Mentor: <strong className="text-[#0A1E33]">{track.mentor}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <div className="pt-4 mt-5">
                  <button
                    onClick={() => onExploreInternships(`${track.title} Internship`)}
                    className="w-full py-3 px-5 rounded-xl bg-[#F2803A] hover:bg-[#E06A24] text-white font-semibold text-xs shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>{CONTENT.internship.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-white" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
