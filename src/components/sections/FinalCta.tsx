'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { ArrowRight, ShieldCheck, Rocket } from 'lucide-react';

interface FinalCtaProps {
  onStartLearning: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onStartLearning }) => {
  return (
    <section className="py-28 relative overflow-hidden bg-white border-b border-[#E1E8E8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4F3F3] text-[#0B6E74] text-xs font-sans font-semibold uppercase tracking-[0.18em]"
        >
          <span>START BUILDING TODAY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight text-[#0A1E33] leading-[1.1]"
        >
          {CONTENT.finalCta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#4B6072] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-sans"
        >
          {CONTENT.finalCta.subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-2 flex flex-col items-center justify-center gap-4"
        >
          {/* Orange Primary Fill CTA */}
          <button
            onClick={onStartLearning}
            className="px-10 py-4 rounded-lg bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium text-base shadow-xs transition-all flex items-center justify-center gap-3 group"
          >
            <Rocket className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            <span>{CONTENT.finalCta.ctaText}</span>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-xs text-[#4B6072] font-sans flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0E8C93]" />
            <span>{CONTENT.finalCta.trustBadge}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
