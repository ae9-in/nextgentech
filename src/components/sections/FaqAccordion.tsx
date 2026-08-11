'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 bg-[#07080d] relative overflow-hidden section-glow-top">
      {/* Ambient */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-5 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-[0.15em]">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-white">
            Frequently Asked{' '}
            <span className="text-gradient-cyan">Questions</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to know about NextGen Tech workshops, internships, and bootcamps.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {CONTENT.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0d0f1c] border-purple-500/30 shadow-lg shadow-purple-900/10'
                    : 'bg-white/[0.015] border-white/[0.06] hover:border-white/[0.1]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none group"
                >
                  <span className={`text-base sm:text-lg font-bold font-display transition-colors duration-300 ${isOpen ? 'text-cyan-300' : 'text-white group-hover:text-slate-200'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl border transition-all duration-300 shrink-0 ${
                    isOpen
                      ? 'bg-purple-600 text-white rotate-180 border-purple-400 shadow-md shadow-purple-600/30'
                      : 'bg-white/[0.03] text-slate-500 border-white/[0.06]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-white/[0.04] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
