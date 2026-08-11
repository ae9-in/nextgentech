'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { CountUp } from '../ui/CountUp';
import { Users, BookOpen, Rocket, Award, Building2 } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-5 h-5 text-purple-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-pink-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-emerald-400" />;
      default:
        return <Building2 className="w-5 h-5 text-purple-400" />;
    }
  };

  const getGlowColor = (iconName: string) => {
    switch (iconName) {
      case 'Users': return 'group-hover:shadow-purple-500/20';
      case 'BookOpen': return 'group-hover:shadow-cyan-500/20';
      case 'Rocket': return 'group-hover:shadow-pink-500/20';
      case 'Award': return 'group-hover:shadow-emerald-500/20';
      default: return '';
    }
  };

  return (
    <section className="py-14 bg-[#080910] relative overflow-hidden section-glow-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4 Stat Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.trustStats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`group flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 transition-all duration-300 card-hover-lift ${getGlowColor(stat.icon)}`}
            >
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4 group-hover:scale-110 transition-transform duration-300">
                {getIcon(stat.icon)}
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
                <CountUp end={stat.number} suffix={stat.suffix} />
              </div>
              <p className="text-slate-500 text-[11px] sm:text-xs font-semibold mt-2 uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partner Logo Marquee */}
        <div className="mt-14 pt-8 border-t border-white/[0.04]">
          <p className="text-center text-[10px] font-semibold text-slate-600 uppercase tracking-[0.2em] mb-6">
            TRUSTED BY STUDENTS & CLUBS AT TOP INSTITUTIONS
          </p>

          <div className="relative overflow-hidden w-full py-2">
            {/* Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#080910] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#080910] to-transparent z-10" />

            <div className="animate-marquee-slow py-1">
              {CONTENT.partnerLogos.concat(CONTENT.partnerLogos).concat(CONTENT.partnerLogos).map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/[0.025] border border-white/[0.06] shrink-0 hover:border-purple-500/30 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer group/logo"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
                  <span className="text-sm font-semibold text-slate-300 group-hover/logo:text-white transition-colors">
                    {partner.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-500 font-mono">
                    {partner.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
