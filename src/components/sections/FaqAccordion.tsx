'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { ChevronDown, MessageCircleQuestion, Sparkles, BookOpen, Award, Laptop, Briefcase, Headphones, CreditCard, Rocket } from 'lucide-react';

const CATEGORY_CONFIG: Record<string, { icon: React.ElementType; color: string; gradient: string }> = {
  Programs:      { icon: BookOpen,    color: '#0E8C93', gradient: 'from-[#0E8C93] to-[#0A6E74]' },
  Certificates:  { icon: Award,      color: '#F2803A', gradient: 'from-[#F2803A] to-[#D96A28]' },
  Prerequisites: { icon: Laptop,     color: '#6366F1', gradient: 'from-[#6366F1] to-[#4F46E5]' },
  Internships:   { icon: Briefcase,  color: '#10B981', gradient: 'from-[#10B981] to-[#059669]' },
  Support:       { icon: Headphones, color: '#EC4899', gradient: 'from-[#EC4899] to-[#DB2777]' },
  Pricing:       { icon: CreditCard, color: '#F59E0B', gradient: 'from-[#F59E0B] to-[#D97706]' },
  Placements:    { icon: Rocket,     color: '#8B5CF6', gradient: 'from-[#8B5CF6] to-[#7C3AED]' },
};

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const faqs = CONTENT.faqs as Array<{ category?: string; question: string; answer: string }>;

  const categories = useMemo(() => {
    const cats = Array.from(new Set(faqs.map((f) => f.category || 'General')));
    return ['All', ...cats];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'All') return faqs;
    return faqs.filter((f) => (f.category || 'General') === activeCategory);
  }, [faqs, activeCategory]);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #071321 0%, #0A1E33 50%, #071321 100%)' }}>
      {/* Ambient background orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-[#0E8C93]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-[#F2803A]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#6366F1]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 mb-14"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E8C93]/10 border border-[#0E8C93]/25 backdrop-blur-sm"
          >
            <MessageCircleQuestion className="w-4 h-4 text-[#0E8C93]" />
            <span className="text-xs font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              Got Questions?
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            Frequently Asked{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#0E8C93] via-[#38BDF8] to-[#0E8C93] bg-clip-text text-transparent">
                Questions
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0E8C93] via-[#38BDF8] to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </h2>

          <p className="text-[#8FA3B8] text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Everything you need to know about our workshops, internships, bootcamps, certifications, and career support.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2.5 mb-12"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const cfg = cat !== 'All' ? CATEGORY_CONFIG[cat] : null;
            const IconComp = cfg?.icon || Sparkles;

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(0);
                }}
                className={`group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#0E8C93] text-white border-[#0E8C93] shadow-lg shadow-[#0E8C93]/25'
                    : 'bg-white/5 text-[#8FA3B8] border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* FAQ Cards */}
        <div className="space-y-3.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3.5"
            >
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const cat = faq.category || 'General';
                const cfg = CATEGORY_CONFIG[cat] || CATEGORY_CONFIG['Programs'];
                const accentColor = cfg.color;

                return (
                  <motion.div
                    key={`${activeCategory}-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                    className={`group rounded-2xl border backdrop-blur-md transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-white/[0.07] border-white/15 shadow-xl shadow-black/20'
                        : 'bg-white/[0.03] border-white/8 hover:bg-white/[0.06] hover:border-white/12'
                    }`}
                    style={isOpen ? { borderColor: `${accentColor}30` } : {}}
                  >
                    {/* Accent bar at top when open */}
                    <div
                      className="h-[2px] transition-all duration-300"
                      style={{
                        background: isOpen
                          ? `linear-gradient(90deg, ${accentColor}, ${accentColor}80, transparent)`
                          : 'transparent',
                      }}
                    />

                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-5 text-left flex items-start gap-4 focus:outline-none"
                    >
                      {/* Number badge */}
                      <div
                        className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 mt-0.5 ${
                          isOpen ? 'text-white shadow-lg' : 'text-white/60 bg-white/8'
                        }`}
                        style={
                          isOpen
                            ? { background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`, boxShadow: `0 4px 15px ${accentColor}40` }
                            : {}
                        }
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Category pill */}
                        {activeCategory === 'All' && (
                          <span
                            className="inline-block text-[10px] font-bold uppercase tracking-widest mb-1.5 px-2 py-0.5 rounded-full"
                            style={{
                              color: accentColor,
                              background: `${accentColor}15`,
                            }}
                          >
                            {cat}
                          </span>
                        )}
                        <span
                          className={`block text-[15px] sm:text-base font-semibold leading-snug transition-colors duration-200 ${
                            isOpen ? 'text-white' : 'text-[#C8D6E0] group-hover:text-white'
                          }`}
                        >
                          {faq.question}
                        </span>
                      </div>

                      {/* Chevron */}
                      <div
                        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 mt-0.5 ${
                          isOpen
                            ? 'bg-white/10 rotate-180'
                            : 'bg-white/5 group-hover:bg-white/10'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 text-white/70" />
                      </div>
                    </button>

                    {/* Answer panel */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <div className="px-6 pb-6 pl-[4.25rem]">
                            <div
                              className="h-px mb-4 opacity-30"
                              style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
                            />
                            <p className="text-[#8FA3B8] text-sm sm:text-[15px] leading-relaxed font-sans">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
