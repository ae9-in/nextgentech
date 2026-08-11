'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { Star, GraduationCap, Quote } from 'lucide-react';

export const StudentStories: React.FC = () => {
  return (
    <section id="testimonials" className="py-28 bg-[#07080d] relative overflow-hidden section-glow-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-5 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-[0.15em]">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>Student Wall of Fame</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white">
            What Students{' '}
            <span className="text-gradient-gold">Say</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Real feedback from college students who built and deployed production code in our programs.
          </p>
        </motion.div>
      </div>

      {/* Continuous Horizontal Scrolling Wall of Fame */}
      <div className="relative overflow-hidden w-full py-4">
        {/* Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#07080d] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#07080d] to-transparent z-10" />

        <div className="animate-marquee-slow gap-6 px-4">
          {CONTENT.testimonials.concat(CONTENT.testimonials).concat(CONTENT.testimonials).map((rev, index) => (
            <div
              key={`${rev.name}-${index}`}
              className="w-[340px] sm:w-[400px] p-8 rounded-3xl bg-[#0c0e19] border border-white/[0.06] hover:border-purple-500/40 transition-all duration-300 shrink-0 flex flex-col justify-between space-y-6 cursor-pointer group card-hover-lift"
            >
              <div className="space-y-5">
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-purple-500/30 group-hover:text-purple-400/60 transition-colors" />
                </div>

                {/* Quote */}
                <p className="text-slate-200 font-display text-lg font-bold leading-snug group-hover:text-white transition-colors">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Student Footer */}
              <div className="pt-5 border-t border-white/[0.05] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold font-display text-white">{rev.name}</h4>
                  <p className="text-xs font-mono text-purple-300/80 mt-0.5">{rev.role}</p>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.03] text-cyan-300/70 border border-white/[0.06]">
                  {rev.program}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
