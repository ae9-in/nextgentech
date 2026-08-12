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
        return <Users className="w-5 h-5 text-[#0E8C93]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#0E8C93]" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-[#0E8C93]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#0E8C93]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#0E8C93]" />;
    }
  };

  return (
    <section className="py-14 bg-[#F4F8F8] border-b border-[#E1E8E8] relative overflow-hidden">
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
              className="group flex flex-col items-center text-center p-6 rounded-xl bg-white border border-[#E1E8E8] hover:border-[#7FC4C8] shadow-xs transition-all duration-300"
            >
              <div className="p-3 rounded-lg bg-[#E4F3F3] mb-4 group-hover:scale-105 transition-transform duration-300">
                {getIcon(stat.icon)}
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-display text-[#0A1E33] tracking-tight">
                <CountUp end={stat.number} suffix={stat.suffix} />
              </div>
              {/* Short Teal Underline Accent */}
              <div className="w-8 h-0.5 bg-[#0E8C93] rounded-full mx-auto mt-2" />
              <p className="text-[#4B6072] text-[11px] sm:text-xs font-semibold mt-2 uppercase tracking-[0.15em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Partner Logo Marquee */}
        <div className="mt-14 pt-8 border-t border-[#E1E8E8]">
          <p className="text-center text-[10px] font-semibold text-[#0E8C93] uppercase tracking-[0.2em] mb-6">
            TRUSTED BY STUDENTS & CLUBS AT TOP INSTITUTIONS
          </p>

          <div className="relative overflow-hidden w-full py-2">
            {/* Fade Masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#F4F8F8] to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#F4F8F8] to-transparent z-10" />

            <div className="animate-marquee-slow py-1 flex gap-4">
              {CONTENT.partnerLogos.concat(CONTENT.partnerLogos).concat(CONTENT.partnerLogos).map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] shrink-0 hover:border-[#7FC4C8] transition-all duration-300 cursor-pointer group/logo shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0E8C93]" />
                  <span className="text-sm font-semibold text-[#0A1E33]">
                    {partner.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#E4F3F3] text-[#0B6E74] font-sans font-medium">
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
