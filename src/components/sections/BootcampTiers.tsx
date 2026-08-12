'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { TiltCard } from '../ui/TiltCard';
import { Check, Sparkles, ArrowRight, ChevronRight } from 'lucide-react';

interface BootcampTiersProps {
  onSelectBootcamp: (bootcampName: string) => void;
  showPrice?: boolean;
}

export const BootcampTiers: React.FC<BootcampTiersProps> = ({ onSelectBootcamp, showPrice = false }) => {
  return (
    <section id="bootcamps" className="py-24 bg-[#F4F8F8] border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] block">
            INTENSIVE SKILL BOOTCAMPS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
            Detailed Bootcamp Tracks
          </h2>
          <p className="text-[#4B6072] text-base leading-relaxed">
            Immersive live learning modules. From beginner basics to building shippable production applications.
          </p>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {CONTENT.bootcamps.map((tier) => (
            <TiltCard key={tier.id} className="h-full">
              <div
                className={`h-full p-8 rounded-xl border flex flex-col justify-between relative overflow-hidden bg-white shadow-sm transition-all ${
                  tier.popular
                    ? 'border-[#0E8C93] ring-1 ring-[#0E8C93]/30'
                    : 'border-[#E1E8E8] hover:border-[#7FC4C8]'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-[#0E8C93] text-white text-[10px] font-semibold px-3.5 py-1 rounded-bl-lg font-sans uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    {/* Days badge in navy-300 text */}
                    <span className="text-xs font-sans font-medium text-[#6E859B] uppercase tracking-wider block">
                      {tier.duration} Track
                    </span>
                    <h3 className="text-2xl font-display font-semibold text-[#0A1E33] mt-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#0E8C93] mt-1">{tier.tagline}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F4F8F8] border border-[#E1E8E8] flex items-center justify-between text-xs font-sans">
                    <span className="text-[#4B6072]">Pace:</span>
                    <span className="font-semibold text-[#0A1E33]">{tier.intensity}</span>
                  </div>

                  {/* Module Flow Chain */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-[#0E8C93] uppercase tracking-wider block">
                      📚 Module Progression Path:
                    </span>
                    <div className="p-3 rounded-lg bg-[#F4F8F8] border border-[#E1E8E8] flex flex-wrap items-center gap-1.5 text-[11px] font-sans">
                      {tier.modules.map((mod, idx) => (
                        <React.Fragment key={mod}>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#E4F3F3] text-[#0B6E74] font-medium border-none">
                            {mod}
                          </span>
                          {idx < tier.modules.length - 1 && (
                            <ChevronRight className="w-3 h-3 text-[#0E8C93] shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Target Outcome */}
                  <div className="p-4 rounded-lg bg-[#E4F3F3] border border-[#7FC4C8]/40 text-xs text-[#0B6E74] leading-relaxed">
                    <strong className="text-[#0A1E33] block mb-1">Target Outcome:</strong>
                    {tier.outcome}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-semibold text-[#0A1E33] uppercase tracking-wider">
                      Includes:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4B6072]">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#0E8C93] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Orange Primary Fill */}
                <div className="pt-8 mt-8 border-t border-[#E1E8E8] space-y-4">
                  <div className="flex items-baseline justify-between">
                    {showPrice ? (
                      <div>
                        <span className="text-3xl font-display font-semibold text-[#0A1E33]">{tier.price}</span>
                        <span className="text-xs text-[#6E859B] line-through ml-2">{tier.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-sans font-semibold text-[#0E8C93]">Live Mentorship Sprint</span>
                    )}
                    <span className="text-xs text-[#0E8C93] font-semibold">Certificate Included</span>
                  </div>

                  <button
                    onClick={() => onSelectBootcamp(tier.name)}
                    className={`w-full py-3.5 px-6 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 group shadow-xs ${
                      tier.popular
                        ? 'bg-[#F2803A] hover:bg-[#E06A24] text-white'
                        : 'border border-[#0A1E33] text-[#0A1E33] hover:bg-[#0A1E33] hover:text-white'
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
