'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { Code2, Sparkles, BarChart3, Layout, Cloud, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TrackSelectorProps {
  onSelectTrack: (trackName: string) => void;
}

export const TrackSelector: React.FC<TrackSelectorProps> = ({ onSelectTrack }) => {
  const [activeTrackId, setActiveTrackId] = useState(CONTENT.trackCategories[0].id);

  const activeTrack = CONTENT.trackCategories.find((t) => t.id === activeTrackId) || CONTENT.trackCategories[0];

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#0E8C93]" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-[#0E8C93]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#0E8C93]" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#0E8C93]" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-[#0E8C93]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#0E8C93]" />;
    }
  };

  return (
    <section id="learn" className="py-24 bg-white border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] block">
            COURSES & TECHNOLOGIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
            Master Job-Ready Technologies
          </h2>
          <p className="text-[#4B6072] text-base sm:text-lg">
            Pick a technology category to explore industry-aligned workshops, internships, and bootcamps.
          </p>
        </div>

        {/* 5 Category Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {CONTENT.trackCategories.map((track) => {
            const isActive = track.id === activeTrackId;
            return (
              <button
                key={track.id}
                onClick={() => setActiveTrackId(track.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 relative group flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-[#0A1E33] text-white border-[#0A1E33] shadow-md scale-[1.02]'
                    : 'bg-white border-[#E1E8E8] hover:border-[#7FC4C8] text-[#0A1E33]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-[#1B3F60]' : 'bg-[#E4F3F3]'}`}>
                    {getTrackIcon(track.icon)}
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-medium ${
                    isActive ? 'bg-[#1B3F60] text-white' : 'bg-[#E4F3F3] text-[#0B6E74]'
                  }`}>
                    {track.badge}
                  </span>
                </div>
                <span className={`font-display font-semibold text-base ${isActive ? 'text-white' : 'text-[#0A1E33]'}`}>
                  {track.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Courses Preview Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl bg-[#F4F8F8] p-6 sm:p-10 border border-[#E1E8E8] relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-[#E4F3F3]">
                    {getTrackIcon(activeTrack.icon)}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[#0A1E33]">
                      {activeTrack.title} Technologies
                    </h3>
                    <p className="text-[#0E8C93] text-xs font-sans font-semibold">{activeTrack.badge}</p>
                  </div>
                </div>

                <p className="text-[#4B6072] text-base leading-relaxed font-sans">
                  {activeTrack.description}
                </p>

                <div className="p-4 rounded-lg bg-white border border-[#E1E8E8] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0E8C93] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[#0A1E33] font-sans">
                    <strong className="text-[#0E8C93]">Practical Learning Outcome: </strong>
                    {activeTrack.highlight}
                  </p>
                </div>

                {/* Courses / Technologies Badges */}
                <div className="pt-2">
                  <p className="text-xs font-semibold text-[#0A1E33] uppercase tracking-wider mb-3">
                    Available Courses & Tools in {activeTrack.title}:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {activeTrack.courses.map((course) => (
                      <button
                        key={course}
                        onClick={() => onSelectTrack(`${course} Course`)}
                        className="px-4 py-2 rounded-full bg-[#E4F3F3] hover:bg-[#0E8C93] hover:text-white border-none text-xs font-medium text-[#0B6E74] transition-all flex items-center gap-1.5 group/chip shadow-xs"
                      >
                        <span>{course}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/chip:opacity-100 group-hover/chip:translate-x-0.5 transition-all text-white" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Side Card — Orange Primary Fill */}
              <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-[#E1E8E8] space-y-4 text-center shadow-xs">
                <div className="w-12 h-12 rounded-full bg-[#E4F3F3] text-[#0E8C93] flex items-center justify-center mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-display font-semibold text-[#0A1E33]">Ready to Learn {activeTrack.title}?</h4>
                <p className="text-xs text-[#4B6072] font-sans">
                  Select any course above or enroll directly in our upcoming {activeTrack.title} sprint.
                </p>
                <button
                  onClick={() => onSelectTrack(`${activeTrack.title} Track`)}
                  className="w-full py-3 px-6 rounded-lg bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium text-sm shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore {activeTrack.title} Courses</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
