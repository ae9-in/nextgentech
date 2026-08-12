'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 bg-[#F4F8F8] border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] block">
            GOT QUESTIONS?
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
            Frequently Asked{' '}
            <span className="text-[#0E8C93]">Questions</span>
          </h2>
          <p className="text-[#4B6072] text-base sm:text-lg font-sans">
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
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#7FC4C8] shadow-sm'
                    : 'bg-white border-[#E1E8E8] hover:border-[#7FC4C8]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none group"
                >
                  <span className={`text-base sm:text-lg font-display font-semibold transition-colors ${isOpen ? 'text-[#0E8C93]' : 'text-[#0A1E33] group-hover:text-[#0E8C93]'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-lg border transition-all shrink-0 ${
                    isOpen
                      ? 'bg-[#0E8C93] text-white rotate-180 border-[#0E8C93]'
                      : 'bg-[#F4F8F8] text-[#4B6072] border-[#E1E8E8]'
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
                      <div className="px-6 pb-6 text-[#4B6072] text-sm leading-relaxed border-t border-[#E1E8E8] pt-4 font-sans">
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
