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
        return <Zap className="w-7 h-7 text-yellow-400" />;
      case 'GitBranch':
        return <GitBranch className="w-7 h-7 text-cyan-400" />;
      case 'Rocket':
        return <Rocket className="w-7 h-7 text-purple-400" />;
      default:
        return <Zap className="w-7 h-7 text-yellow-400" />;
    }
  };

  const getGradient = (idx: number) => {
    const gradients = [
      'from-purple-600/20 via-transparent to-transparent',
      'from-cyan-600/20 via-transparent to-transparent',
      'from-pink-600/20 via-transparent to-transparent',
    ];
    return gradients[idx % gradients.length];
  };

  return (
    <section id="programs" className="py-28 bg-[#07080d] relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-purple-900/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-5 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-[0.15em]">
            <span className="text-base">🎓</span>
            <span>Programs Overview</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-tight">
            Choose Your{' '}
            <span className="text-gradient-cyan">Learning Experience</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
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
                <div className="h-full p-8 rounded-3xl border border-white/[0.06] hover:border-purple-500/40 bg-[#0c0e19] flex flex-col justify-between relative overflow-hidden group shadow-xl card-hover-lift">
                  {/* Top Gradient Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${getGradient(idx)} opacity-50 group-hover:opacity-80 transition-opacity pointer-events-none`} />

                  <div className="space-y-6 relative">
                    {/* Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] group-hover:scale-110 group-hover:bg-white/[0.06] transition-all duration-300">
                        {getCategoryIcon(cat.icon)}
                      </div>
                      <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-500/20">
                        {cat.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-2xl font-extrabold font-display text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {cat.title}
                      </h3>
                      {showPrice ? (
                        <div className="mt-3 inline-block px-4 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-xl font-bold font-display text-emerald-400">
                          {cat.priceRange}
                        </div>
                      ) : (
                        <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-300 px-3 py-1.5 rounded-xl bg-cyan-950/30 border border-cyan-500/15">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                          <span>Live Hands-on Build</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Explore Button */}
                  <div className="pt-8 mt-8 border-t border-white/[0.04] relative">
                    <button
                      onClick={() => onExploreCategory(cat.targetAnchor, cat.title)}
                      className="w-full py-4 px-6 rounded-xl bg-white/[0.03] hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 text-white font-bold text-sm border border-white/[0.06] hover:border-transparent transition-all duration-300 flex items-center justify-between group/btn"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform text-cyan-400 group-hover/btn:text-white" />
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
