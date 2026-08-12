'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { Star, Quote } from 'lucide-react';

export const StudentStories: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#F4F8F8] border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-16"
        >
          <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] block">
            STUDENT WALL OF FAME
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
            What Students Say
          </h2>
          <p className="text-[#4B6072] text-base leading-relaxed">
            Real feedback from college students who built and deployed production code in our programs.
          </p>
        </motion.div>
      </div>

      {/* Continuous Horizontal Scrolling Wall of Fame */}
      <div className="relative overflow-hidden w-full py-4">
        {/* Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F4F8F8] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F4F8F8] to-transparent z-10" />

        <div className="animate-marquee-slow gap-6 px-4 flex">
          {CONTENT.testimonials.concat(CONTENT.testimonials).concat(CONTENT.testimonials).map((rev, index) => (
            <div
              key={`${rev.name}-${index}`}
              className="w-[340px] sm:w-[400px] p-8 rounded-xl bg-white border border-[#E1E8E8] shrink-0 flex flex-col justify-between space-y-6 shadow-sm"
            >
              <div className="space-y-4">
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#0E8C93]">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#0E8C93]" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-[#0E8C93]/60" />
                </div>

                {/* Quote */}
                <p className="text-[#0A1E33] font-display text-base font-medium leading-snug">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              {/* Student Footer */}
              <div className="pt-4 border-t border-[#E1E8E8] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-display font-semibold text-[#0A1E33]">{rev.name}</h4>
                  <p className="text-xs font-sans text-[#6E859B] mt-0.5">{rev.role}</p>
                </div>
                <span className="text-[11px] font-sans px-3 py-1 rounded-full bg-[#E4F3F3] text-[#0B6E74] border-none font-medium">
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
