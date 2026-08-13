'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CONTENT } from '@/config/content';
import {
  Award, ArrowRight, Code, Layers, Terminal, BarChart3, Layout,
  Sparkles, Clock, UserCheck, Briefcase, TrendingUp, Zap, Star,
  Users
} from 'lucide-react';

interface InternshipSectionProps {
  onExploreInternships: (trackTitle?: string) => void;
}

const BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Highest Demand':        { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-500/40' },
  'Core Domain':           { bg: 'bg-sky-500/15',     text: 'text-sky-300',     border: 'border-sky-500/40' },
  'High Growth':           { bg: 'bg-purple-500/15',  text: 'text-purple-300',  border: 'border-purple-500/40' },
  'High Revenue':          { bg: 'bg-amber-500/15',   text: 'text-amber-300',   border: 'border-amber-500/40' },
  'Creative & Analytics':  { bg: 'bg-pink-500/15',    text: 'text-pink-300',    border: 'border-pink-500/40' },
  'Operational Excellence':{ bg: 'bg-cyan-500/15',    text: 'text-cyan-300',    border: 'border-cyan-500/40' },
};

export const InternshipSection: React.FC<InternshipSectionProps> = ({ onExploreInternships }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const getTrackIcon = (iconName: string, className: string = 'w-5 h-5') => {
    const icons: Record<string, React.ReactNode> = {
      Code: <Code className={className} />,
      Layers: <Layers className={className} />,
      Terminal: <Terminal className={className} />,
      BarChart3: <BarChart3 className={className} />,
      Layout: <Layout className={className} />,
      Sparkles: <Sparkles className={className} />,
      Users: <Users className={className} />,
      TrendingUp: <TrendingUp className={className} />,
      Briefcase: <Briefcase className={className} />,
    };
    return icons[iconName] || <Briefcase className={className} />;
  };

  return (
    <section
      id="internships"
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #071321 0%, #0A1E33 50%, #071321 100%)' }}
    >
      {/* Ambient Orbs */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-[#0E8C93]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[350px] bg-[#F2803A]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#38BDF8]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E8C93]/15 border border-[#0E8C93]/35 backdrop-blur-md shadow-lg shadow-[#0E8C93]/10"
          >
            <Briefcase className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-xs font-semibold text-[#38BDF8] uppercase tracking-[0.18em]">
              Career-Ready Internship Tracks
            </span>
          </motion.div>

          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            Explore Industry{' '}
            <span className="bg-gradient-to-r from-[#0E8C93] via-[#38BDF8] to-[#0E8C93] bg-clip-text text-transparent">
              Internships
            </span>
          </h3>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Work directly with senior industry leaders on production projects across 6 specialized domains.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONTENT.internship.tracks.map((track, idx) => {
            const badgeStyle = BADGE_COLORS[track.badge] || BADGE_COLORS['Highest Demand'];

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + idx * 0.08, duration: 0.5 }}
                className="group relative flex"
              >
                <div className="w-full rounded-2xl border border-[#0E8C93]/30 bg-[#0A1E33]/90 backdrop-blur-xl overflow-hidden hover:bg-[#0E2845] hover:border-[#0E8C93]/60 transition-all duration-400 flex flex-col shadow-xl shadow-black/30 group-hover:shadow-2xl group-hover:shadow-[#0E8C93]/15">

                  {/* Top Gradient Border Accent */}
                  <div className="h-1 w-full bg-gradient-to-r from-[#0E8C93] via-[#38BDF8] to-[#F2803A]" />

                  {/* Image Header */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={track.image}
                      alt={track.title}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E33] via-[#0A1E33]/50 to-transparent" />

                    {/* Badge */}
                    <span className={`absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide backdrop-blur-md border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border} shadow-md`}>
                      <span className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 fill-current" />
                        {track.badge}
                      </span>
                    </span>

                    {/* Domain Icon Floating Badge */}
                    <div className="absolute bottom-3.5 right-3.5 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E8C93] to-[#0B6E74] flex items-center justify-center shadow-lg border border-white/20 text-white">
                      {getTrackIcon(track.icon, 'w-5 h-5 text-white')}
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="flex-1 p-6 flex flex-col space-y-5">
                    {/* Title & Duration */}
                    <div className="space-y-1.5">
                      <h4 className="text-xl font-display font-bold text-white group-hover:text-[#38BDF8] transition-colors leading-tight">
                        {track.title}
                      </h4>
                      <div className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Duration: <strong className="text-white font-semibold">{track.duration}</strong></span>
                      </div>
                    </div>

                    {/* Capstone Project Box */}
                    <div className="p-4 rounded-xl bg-[#071728] border border-[#0E8C93]/30 space-y-1.5 shadow-inner">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#F2803A]" />
                        <span className="text-[10px] text-[#F2803A] uppercase font-bold tracking-wider">
                          CAPSTONE PROJECT
                        </span>
                      </div>
                      <p className="text-white text-xs font-semibold leading-snug">
                        {track.project}
                      </p>
                    </div>

                    {/* Skills & Stack */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                        SKILLS & STACK
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {track.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-[#0F2A45] border border-[#1B3F60] text-sky-200 text-[11px] font-medium hover:bg-[#0E8C93]/20 hover:text-white hover:border-[#0E8C93]/50 transition-all cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certificate & Mentor Meta Info */}
                    <div className="space-y-2.5 pt-3 border-t border-[#1B3F60]/60 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                          <Award className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-slate-200 font-medium truncate">{track.certificate}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                          <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                        </div>
                        <span className="text-slate-300 font-medium truncate">{track.mentor}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 mt-auto">
                      <button
                        onClick={() => onExploreInternships(`${track.title} Internship`)}
                        className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#0E8C93] via-[#0A6E74] to-[#0E8C93] hover:from-[#0B6E74] hover:to-[#085357] text-white font-semibold text-sm shadow-lg shadow-[#0E8C93]/20 hover:shadow-xl hover:shadow-[#0E8C93]/35 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 group/btn border border-[#38BDF8]/30"
                      >
                        <span>{CONTENT.internship.ctaText}</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
