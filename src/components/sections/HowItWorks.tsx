'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { Compass, BookOpen, Rocket, Award, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const getStepIcon = (index: number) => {
    const icons = [
      <Compass key="c" className="w-6 h-6 text-purple-400" />,
      <BookOpen key="b" className="w-6 h-6 text-cyan-400" />,
      <Rocket key="r" className="w-6 h-6 text-pink-400" />,
      <Award key="a" className="w-6 h-6 text-emerald-400" />,
    ];
    return icons[index] || icons[0];
  };

  const getAccentColor = (index: number) => {
    const colors = ['purple', 'cyan', 'pink', 'emerald'];
    return colors[index] || 'purple';
  };

  return (
    <section className="py-28 bg-[#080910] relative overflow-hidden section-glow-top">
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-900/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-5 mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-[0.15em]">
            Simple 4-Step Journey
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white">
            How It{' '}
            <span className="text-gradient-accent">Works</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            From picking your domain to shipping live code and getting certified in record time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-14 left-24 right-24 h-px bg-gradient-to-r from-purple-600/50 via-cyan-500/50 to-emerald-400/50 z-0" />

          {CONTENT.howItWorks.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="relative z-10 group"
            >
              <div className="bg-[#0c0e19] p-7 rounded-2xl border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 flex flex-col justify-between h-full card-hover-lift">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] group-hover:scale-110 transition-transform duration-300">
                      {getStepIcon(idx)}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-white/[0.06] flex items-center justify-center">
                      <span className="text-lg font-extrabold font-mono text-white/40 group-hover:text-white/80 transition-colors">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-1 text-[11px] text-purple-400/60 font-mono">
                    <ArrowRight className="w-3 h-3" />
                    <span>Next step</span>
                  </div>
                )}
                {idx === 3 && (
                  <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-bold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Certificate Earned ✓</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
