'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { TiltCard } from '../ui/TiltCard';
import { Code, Bot, PieChart, Palette, Clock, Award, ArrowRight, Zap, Check } from 'lucide-react';

interface OneDayExperiencesProps {
  onEnrollProgram: (programTitle: string) => void;
  showPrice?: boolean;
}

export const OneDayExperiences: React.FC<OneDayExperiencesProps> = ({ onEnrollProgram, showPrice = false }) => {
  const getProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-6 h-6 text-purple-400" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-cyan-400" />;
      case 'PieChart':
        return <PieChart className="w-6 h-6 text-pink-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-emerald-400" />;
      default:
        return <Code className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="one-day-experiences" className="py-24 bg-[#0a0b14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>High-Velocity 1-Day Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            Build Something Real Today.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No endless theory modules. In just 1 day, write production code, deploy live to cloud, and earn a verified credential.
          </p>
        </div>

        {/* Funnel Methodology Horizontal Step Tracker */}
        <div className="mb-20 p-8 rounded-3xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-md">
          <p className="text-center text-xs font-mono text-cyan-400 uppercase tracking-widest mb-8">
            {CONTENT.oneDayExperiences.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Desktop Connecting Line behind steps */}
            <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-400 -translate-y-6 z-0" />

            {CONTENT.oneDayExperiences.steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative z-10 bg-[#0f111d] p-5 rounded-2xl border border-slate-800 text-center hover:border-purple-500/50 transition-colors shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 text-white font-extrabold font-mono text-lg flex items-center justify-center mx-auto mb-3 shadow-md">
                  {step.number}
                </div>
                <h4 className="text-lg font-bold font-display text-white mb-1">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONTENT.oneDayExperiences.programs.map((program) => (
            <TiltCard key={program.id} className="h-full">
              <div className={`h-full p-6 rounded-2xl border flex flex-col justify-between relative overflow-hidden bg-[#0e101c] ${
                program.popular ? 'border-purple-500 shadow-xl shadow-purple-900/30' : 'border-slate-800/80 hover:border-slate-700'
              }`}>
                {program.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl font-mono uppercase tracking-wider">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                      {getProgramIcon(program.icon)}
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-purple-300 border border-slate-700">
                      {program.level}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-display text-white leading-tight">
                      {program.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{program.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {program.outcome}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {program.techStack.map((tech) => (
                      <span key={tech} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-baseline justify-between">
                    {showPrice ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold font-display text-white">{program.price}</span>
                        <span className="text-xs text-slate-500 line-through">{program.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono font-bold text-cyan-300">Live 1-Day Pass</span>
                    )}
                    <span className="text-[11px] text-emerald-400 font-semibold">Includes Certificate</span>
                  </div>

                  <button
                    onClick={() => onEnrollProgram(program.title)}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 text-white font-bold text-xs border border-slate-700 hover:border-transparent transition-all flex items-center justify-center gap-1.5 group"
                  >
                    <span>Reserve 1-Day Pass</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
