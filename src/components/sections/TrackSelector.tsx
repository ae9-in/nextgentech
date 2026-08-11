'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { Code2, Sparkles, BarChart3, Layout, Cloud, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TrackSelectorProps {
  onSelectTrack: (trackName: string) => void;
}

export const TrackSelector: React.FC<TrackSelectorProps> = ({ onSelectTrack }) => {
  const [activeTrackId, setActiveTrackId] = useState(CONTENT.trackCategories[0].id);

  const activeTrack = CONTENT.trackCategories.find((t) => t.id === activeTrackId) || CONTENT.trackCategories[0];

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-purple-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-pink-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-emerald-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-amber-400" />;
      default:
        return <Code2 className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="learn" className="py-24 bg-[#07080d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <span className="text-base">💻</span>
            <span>Courses & Technologies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
            Master Job-Ready Technologies
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
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
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative group flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-gradient-to-b from-purple-900/50 to-slate-900 border-purple-500 shadow-xl shadow-purple-900/30 scale-[1.03]'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl border ${isActive ? 'bg-purple-900/80 border-purple-400' : 'bg-slate-800 border-slate-700'}`}>
                    {getTrackIcon(track.icon)}
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {track.badge}
                  </span>
                </div>
                <span className={`font-bold font-display text-base ${isActive ? 'text-white' : 'text-slate-300'}`}>
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
            className="rounded-3xl glass-panel p-6 sm:p-10 border border-purple-500/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/40">
                    {getTrackIcon(activeTrack.icon)}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      {activeTrack.title} Technologies
                    </h3>
                    <p className="text-purple-300 text-xs font-mono">{activeTrack.badge}</p>
                  </div>
                </div>

                <p className="text-slate-300 text-base leading-relaxed">
                  {activeTrack.description}
                </p>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-emerald-200">
                    <strong className="text-white">Practical Learning Outcome: </strong>
                    {activeTrack.highlight}
                  </p>
                </div>

                {/* Courses / Technologies Badges */}
                <div className="pt-2">
                  <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                    Available Courses & Tools in {activeTrack.title}:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {activeTrack.courses.map((course) => (
                      <button
                        key={course}
                        onClick={() => onSelectTrack(`${course} Course`)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 border border-slate-700 hover:border-transparent text-xs font-bold text-cyan-300 hover:text-white transition-all shadow-md flex items-center gap-1.5 group/chip"
                      >
                        <span>{course}</span>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/chip:opacity-100 group-hover/chip:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Side Card */}
              <div className="lg:col-span-4 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Ready to Learn {activeTrack.title}?</h4>
                <p className="text-xs text-slate-400">
                  Select any course above or enroll directly in our upcoming {activeTrack.title} sprint.
                </p>
                <button
                  onClick={() => onSelectTrack(`${activeTrack.title} Track`)}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore {activeTrack.title} Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
