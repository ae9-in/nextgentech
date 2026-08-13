'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CONTENT } from '@/config/content';
import {
  Award, ArrowRight, Code, Layers, Terminal, BarChart3, Layout,
  Sparkles, Clock, UserCheck, Briefcase, TrendingUp, Zap, Star,
  CheckCircle2, Users
} from 'lucide-react';

interface InternshipSectionProps {
  onExploreInternships: (trackTitle?: string) => void;
}

const BADGE_COLORS: Record<string, { bg: string; text: string; glow: string; border: string }> = {
  'Highest Demand':       { bg: 'bg-emerald-500/15', text: 'text-emerald-400', glow: 'shadow-emerald-500/20', border: 'border-emerald-500/30' },
  'Core Domain':          { bg: 'bg-blue-500/15',    text: 'text-blue-400',    glow: 'shadow-blue-500/20',    border: 'border-blue-500/30' },
  'High Growth':          { bg: 'bg-purple-500/15',   text: 'text-purple-400',  glow: 'shadow-purple-500/20',  border: 'border-purple-500/30' },
  'High Revenue':         { bg: 'bg-amber-500/15',    text: 'text-amber-400',   glow: 'shadow-amber-500/20',   border: 'border-amber-500/30' },
  'Creative & Analytics': { bg: 'bg-pink-500/15',     text: 'text-pink-400',    glow: 'shadow-pink-500/20',    border: 'border-pink-500/30' },
  'Operational Excellence':{ bg: 'bg-cyan-500/15',    text: 'text-cyan-400',    glow: 'shadow-cyan-500/20',    border: 'border-cyan-500/30' },
};

const GRADIENT_ACCENTS = [
  'from-emerald-500 to-teal-600',
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-violet-600',
  'from-amber-500 to-orange-600',
  'from-pink-500 to-rose-600',
  'from-cyan-500 to-sky-600',
];

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
      {/* Ambient orbs */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[400px] bg-[#0E8C93]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[350px] bg-[#F2803A]/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#6366F1]/3 rounded-full blur-[150px] pointer-events-none" />

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E8C93]/10 border border-[#0E8C93]/25 backdrop-blur-sm"
          >
            <Briefcase className="w-4 h-4 text-[#0E8C93]" />
            <span className="text-xs font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              Career-Ready Internship Tracks
            </span>
          </motion.div>

          <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            Explore Industry{' '}
            <span className="bg-gradient-to-r from-[#0E8C93] via-[#38BDF8] to-[#0E8C93] bg-clip-text text-transparent">
              Internships
            </span>
          </h3>
          <p className="text-[#8FA3B8] text-base sm:text-lg max-w-2xl mx-auto font-sans">
            Work directly with senior industry leaders on production projects across 6 specialized domains.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONTENT.internship.tracks.map((track, idx) => {
            const badgeStyle = BADGE_COLORS[track.badge] || BADGE_COLORS['Highest Demand'];
            const gradient = GRADIENT_ACCENTS[idx % GRADIENT_ACCENTS.length];

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + idx * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="h-full rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-md overflow-hidden hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 flex flex-col">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={track.image}
                      alt={track.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071321] via-[#071321]/40 to-transparent" />

                    {/* Badge */}
                    <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide backdrop-blur-md border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                      <span className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 fill-current" />
                        {track.badge}
                      </span>
                    </span>

                    {/* Price tag */}
                    <div className="absolute bottom-4 left-4 flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{track.price}</span>
                      <span className="text-xs text-white/50">/ program</span>
                    </div>

                    {/* Icon badge */}
                    <div className={`absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                      {getTrackIcon(track.icon, 'w-5 h-5 text-white')}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col space-y-5">
                    {/* Title & Duration */}
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-[#0E8C93] transition-colors leading-tight">
                        {track.title}
                      </h4>
                      <div className="inline-flex items-center gap-1.5 text-xs text-[#6E859B]">
                        <Clock className="w-3.5 h-3.5 text-[#0E8C93]" />
                        <span>Duration: <strong className="text-white/80">{track.duration}</strong></span>
                      </div>
                    </div>

                    {/* Capstone Project */}
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/8 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#F2803A]" />
                        <span className="text-[10px] text-[#F2803A] uppercase font-bold tracking-wider">
                          Capstone Project
                        </span>
                      </div>
                      <p className="text-white/80 text-xs font-medium leading-snug">
                        {track.project}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-[#6E859B] uppercase font-bold tracking-wider">
                        Skills & Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {track.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-[#8FA3B8] text-[10px] font-medium hover:bg-[#0E8C93]/15 hover:text-[#0E8C93] hover:border-[#0E8C93]/30 transition-all cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-2.5 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-2.5 text-xs">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <Award className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-[#6E859B]">{track.certificate}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs">
                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="text-[#6E859B]">{track.mentor}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2 mt-auto">
                      <button
                        onClick={() => onExploreInternships(`${track.title} Internship`)}
                        className={`w-full py-3.5 px-5 rounded-xl bg-gradient-to-r ${gradient} text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 group/btn`}
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
