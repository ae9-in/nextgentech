'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Rocket } from 'lucide-react';

interface FinalCtaProps {
  onStartLearning: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onStartLearning }) => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Rich Multi-Layer Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080d] via-[#120c28] to-[#07080d]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-purple-600/15 via-cyan-500/15 to-pink-500/15 rounded-full blur-[200px] pointer-events-none animate-pulse-ring" />
      
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-bold shadow-xl backdrop-blur-xl"
        >
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>START BUILDING TODAY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.1]"
        >
          {CONTENT.finalCta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          {CONTENT.finalCta.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-4 flex flex-col items-center justify-center gap-5"
        >
          <button
            onClick={onStartLearning}
            className="btn-glow px-12 py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-extrabold text-lg sm:text-xl shadow-2xl shadow-purple-600/30 hover:scale-[1.04] transition-all flex items-center justify-center gap-3 group"
          >
            <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span>{CONTENT.finalCta.ctaText}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>

          <p className="text-sm text-slate-500 font-mono flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{CONTENT.finalCta.trustBadge}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
