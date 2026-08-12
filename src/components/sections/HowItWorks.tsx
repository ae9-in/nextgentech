'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { Compass, BookOpen, Rocket, Award, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const getStepIcon = (index: number) => {
    const icons = [
      <Compass key="c" className="w-6 h-6 text-[#0E8C93]" />,
      <BookOpen key="b" className="w-6 h-6 text-[#0E8C93]" />,
      <Rocket key="r" className="w-6 h-6 text-[#0E8C93]" />,
      <Award key="a" className="w-6 h-6 text-[#0E8C93]" />,
    ];
    return icons[index] || icons[0];
  };

  return (
    <section className="py-28 bg-[#F4F8F8] border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-20"
        >
          <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] block">
            SIMPLE 4-STEP JOURNEY
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-[#0A1E33]">
            How It{' '}
            <span className="text-[#0E8C93]">Works</span>
          </h2>
          <p className="text-[#4B6072] text-base sm:text-lg font-sans">
            From picking your domain to shipping live code and getting certified in record time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-14 left-24 right-24 h-0.5 bg-[#E1E8E8] z-0" />

          {CONTENT.howItWorks.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="relative z-10 group"
            >
              <div className="bg-white p-7 rounded-xl border border-[#E1E8E8] hover:border-[#7FC4C8] transition-all duration-300 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-lg bg-[#E4F3F3] group-hover:scale-105 transition-transform">
                      {getStepIcon(idx)}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#E4F3F3] border border-[#7FC4C8]/40 flex items-center justify-center">
                      <span className="text-lg font-display font-semibold text-[#0B6E74]">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-[#0A1E33] mb-3 group-hover:text-[#0E8C93] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#4B6072] leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                {idx < 3 && (
                  <div className="mt-6 pt-4 border-t border-[#E1E8E8] flex items-center gap-1 text-[11px] text-[#0E8C93] font-sans font-medium">
                    <ArrowRight className="w-3 h-3 text-[#0E8C93]" />
                    <span>Next step</span>
                  </div>
                )}
                {idx === 3 && (
                  <div className="mt-6 pt-4 border-t border-[#E1E8E8] flex items-center gap-1.5 text-[11px] text-[#0B6E74] font-sans font-semibold">
                    <Award className="w-3.5 h-3.5 text-[#0E8C93]" />
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
