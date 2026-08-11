'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { TiltCard } from '../ui/TiltCard';
import { Check, Zap, Sparkles, ArrowRight, Layers, ChevronRight } from 'lucide-react';

interface BootcampTiersProps {
  onSelectBootcamp: (bootcampName: string) => void;
  showPrice?: boolean;
}

export const BootcampTiers: React.FC<BootcampTiersProps> = ({ onSelectBootcamp, showPrice = false }) => {
  return (
    <section id="bootcamps" className="py-24 bg-[#07080d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>Intensive Skill Bootcamps</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            ⚡ Detailed Bootcamp Tracks
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Immersive live learning modules. From beginner basics to building shippable production applications.
          </p>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CONTENT.bootcamps.map((tier) => (
            <TiltCard key={tier.id} className="h-full">
              <div
                className={`h-full p-8 rounded-3xl border flex flex-col justify-between relative overflow-hidden bg-[#0d0f1b] ${
                  tier.popular
                    ? 'border-purple-500 shadow-2xl shadow-purple-900/40 ring-1 ring-purple-500 scale-[1.02]'
                    : 'border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 via-purple-500 to-cyan-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-2xl font-mono tracking-wider flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                      {tier.duration} Track
                    </span>
                    <h3 className="text-2xl font-extrabold font-display text-white mt-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400 mt-1">{tier.tagline}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">Pace:</span>
                    <span className="font-bold text-white font-mono">{tier.intensity}</span>
                  </div>

                  {/* Module Flow Chain */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-wider block">
                      📚 Module Progression Path:
                    </span>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-cyan-300">
                      {tier.modules.map((mod, idx) => (
                        <React.Fragment key={mod}>
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-white border border-slate-800">
                            {mod}
                          </span>
                          {idx < tier.modules.length - 1 && (
                            <ChevronRight className="w-3 h-3 text-purple-400 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Target Outcome */}
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 leading-relaxed">
                    <strong className="text-white block mb-1">Target Outcome:</strong>
                    {tier.outcome}
                  </div>

                  {/* Feature Checklist (Includes) */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Includes:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-8 mt-8 border-t border-slate-800 space-y-4">
                  <div className="flex items-baseline justify-between">
                    {showPrice ? (
                      <div>
                        <span className="text-3xl font-extrabold font-display text-white">{tier.price}</span>
                        <span className="text-xs text-slate-500 line-through ml-2">{tier.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono font-bold text-cyan-300">Live Mentorship Sprint</span>
                    )}
                    <span className="text-xs text-emerald-400 font-mono font-semibold">Certificate Included</span>
                  </div>

                  <button
                    onClick={() => onSelectBootcamp(tier.name)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group ${
                      tier.popular
                        ? 'btn-glow bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 hover:scale-[1.02]'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-purple-500/40'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
