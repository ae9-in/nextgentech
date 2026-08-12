'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { TiltCard } from '../ui/TiltCard';
import { Code, Bot, PieChart, Palette, Clock, ArrowRight } from 'lucide-react';

interface OneDayExperiencesProps {
  onEnrollProgram: (programTitle: string) => void;
  showPrice?: boolean;
}

export const OneDayExperiences: React.FC<OneDayExperiencesProps> = ({ onEnrollProgram, showPrice = false }) => {
  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-[#0E8C93]" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-[#0E8C93]" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-[#0E8C93]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#0E8C93]" />;
      default:
        return <Code className="w-5 h-5 text-[#0E8C93]" />;
    }
  };

  return (
    <section id="one-day-experiences" className="py-24 bg-white border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] block">
            HIGH-VELOCITY 1-DAY EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
            Build Something Real Today.
          </h2>
          <p className="text-[#4B6072] text-base leading-relaxed">
            No endless theory modules. In just 1 day, write production code, deploy live to cloud, and earn a verified credential.
          </p>
        </div>

        {/* Methodology Process Section (Mirrors 01/02/03/04 Flow) */}
        <div className="mb-20 p-8 rounded-xl bg-[#F4F8F8] border border-[#E1E8E8]">
          <p className="text-center text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] mb-8">
            {CONTENT.oneDayExperiences.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {CONTENT.oneDayExperiences.steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative z-10 bg-white p-6 rounded-xl border border-[#E1E8E8] text-center shadow-xs"
              >
                <span className="text-5xl font-display font-semibold text-[#7FC4C8] opacity-70 select-none block mb-2">
                  0{step.number}
                </span>
                <h4 className="text-lg font-display font-semibold text-[#0A1E33] mb-1">{step.title}</h4>
                <p className="text-xs text-[#4B6072] leading-relaxed">{step.desc}</p>
                {/* Micro Timeline Label in Orange-600 */}
                <div className="mt-3 inline-block text-[11px] font-semibold text-[#E06A24] bg-[#FDE9DC] px-2.5 py-0.5 rounded-full">
                  Step 0{step.number} • Sprint
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.oneDayExperiences.programs.map((program) => (
            <TiltCard key={program.id} className="h-full">
              <div className={`h-full p-6 rounded-xl border flex flex-col justify-between relative overflow-hidden bg-white shadow-xs transition-all ${
                program.popular ? 'border-[#0E8C93] ring-1 ring-[#0E8C93]/20' : 'border-[#E1E8E8]'
              }`}>
                {program.popular && (
                  <div className="absolute top-0 right-0 bg-[#0E8C93] text-white text-[10px] font-semibold px-3 py-1 rounded-bl-lg font-sans uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-[#E4F3F3]">
                      {getProgramIcon(program.icon)}
                    </div>
                    <span className="text-[11px] font-sans px-2.5 py-0.5 rounded-full bg-[#E4F3F3] text-[#0B6E74] font-medium border-none">
                      {program.level}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-semibold text-[#0A1E33] leading-tight">
                      {program.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#4B6072] mt-2">
                      <Clock className="w-3.5 h-3.5 text-[#0E8C93]" />
                      <span>{program.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4B6072] leading-relaxed">
                    {program.outcome}
                  </p>

                  {/* Soft Teal Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {program.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#E4F3F3] text-[#0B6E74] font-medium border-none">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Orange CTA */}
                <div className="pt-6 mt-6 border-t border-[#E1E8E8] space-y-3">
                  <div className="flex items-baseline justify-between">
                    {showPrice ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-display font-semibold text-[#0A1E33]">{program.price}</span>
                        <span className="text-xs text-[#6E859B] line-through">{program.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-sans font-semibold text-[#0A1E33]">Live 1-Day Pass</span>
                    )}
                    <span className="text-[11px] text-[#0E8C93] font-semibold">Includes Certificate</span>
                  </div>

                  <button
                    onClick={() => onEnrollProgram(program.title)}
                    className="w-full py-3 px-4 rounded-lg bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 group shadow-xs"
                  >
                    <span>Reserve 1-Day Pass</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
