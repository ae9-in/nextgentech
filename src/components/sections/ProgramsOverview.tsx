'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { TiltCard } from '../ui/TiltCard';
import { Zap, GitBranch, Rocket, ArrowRight, Sparkles } from 'lucide-react';

interface ProgramsOverviewProps {
  onExploreCategory: (targetAnchor: string, categoryTitle: string) => void;
  showPrice?: boolean;
}

export const ProgramsOverview: React.FC<ProgramsOverviewProps> = ({ onExploreCategory, showPrice = false }) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#0E8C93]" />;
      case 'GitBranch':
        return <GitBranch className="w-6 h-6 text-[#0E8C93]" />;
      case 'Rocket':
        return <Rocket className="w-6 h-6 text-[#0E8C93]" />;
      default:
        return <Zap className="w-6 h-6 text-[#0E8C93]" />;
    }
  };

  return (
    <section id="programs" className="py-28 bg-white border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-20"
        >
          <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] block">
            PROGRAMS OVERVIEW
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-[#0A1E33] leading-tight">
            Choose Your{' '}
            <span className="text-[#0E8C93]">Learning Experience</span>
          </h2>
          <p className="text-[#4B6072] text-base sm:text-lg max-w-2xl mx-auto font-sans">
            Whether you want a quick 1-day sprint, a realistic developer internship, or a job-ready bootcamp track.
          </p>
        </motion.div>

        {/* 3 Major Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {CONTENT.programCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
            >
              <TiltCard className="h-full">
                <div className="h-full p-8 rounded-xl border border-[#E1E8E8] hover:border-[#7FC4C8] bg-white flex flex-col justify-between relative overflow-hidden group shadow-sm transition-all duration-300">
                  <div className="space-y-6 relative">
                    {/* Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-lg bg-[#E4F3F3] group-hover:scale-105 transition-transform">
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <span className="text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-[#E4F3F3] text-[#0B6E74] border-none">
                        {cat.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-[#0A1E33] group-hover:text-[#0E8C93] transition-colors duration-300">
                        {cat.title}
                      </h3>
                      {showPrice ? (
                        <div className="mt-3 inline-block px-4 py-1.5 rounded-lg bg-[#E4F3F3] text-xl font-display font-semibold text-[#0B6E74]">
                          {cat.priceRange}
                        </div>
                      ) : (
                        <div className="mt-3 inline-flex items-center gap-2 text-xs font-sans font-semibold text-[#0E8C93] px-3 py-1.5 rounded-full bg-[#E4F3F3]">
                          <Sparkles className="w-3.5 h-3.5 text-[#F2803A]" />
                          <span>Live Hands-on Build</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-[#4B6072] text-sm leading-relaxed font-sans">
                      {cat.description}
                    </p>
                  </div>

                  {/* Explore Button — Orange Primary Fill */}
                  <div className="pt-8 mt-8 border-t border-[#E1E8E8] relative">
                    <button
                      onClick={() => onExploreCategory(cat.targetAnchor, cat.title)}
                      className="w-full py-3.5 px-6 rounded-lg bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium text-sm shadow-xs transition-all duration-200 flex items-center justify-between group/btn"
                    >
                      <span>Explore Programs</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
