'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { TiltCard } from '../ui/TiltCard';
import { ShoppingCart, FileCheck, PieChart, BarChart3, ExternalLink, Code2, Users, ArrowRight, Sparkles } from 'lucide-react';

interface ProjectShowcaseProps {
  onExploreProject: (title: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onExploreProject }) => {
  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingCart':
        return <ShoppingCart className="w-5 h-5 text-purple-400" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-cyan-400" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-emerald-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-pink-400" />;
      default:
        return <Code2 className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-[#07080d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-300 text-xs font-semibold uppercase tracking-wider">
              <span className="text-base">🏆</span>
              <span>Hands-on Student Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
              What Will I Actually Build?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Students don't just want certificates. They want real, shippable projects for their GitHub & LinkedIn portfolios.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-800 shrink-0 shadow-lg">
            <Users className="w-4 h-4 text-purple-400" />
            <span>Over 50+ Production Projects Shipped</span>
          </div>
        </div>

        {/* 4 Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CONTENT.projects.map((proj) => (
            <TiltCard key={proj.id} className="h-full">
              <div
                onClick={() => onExploreProject(proj.title)}
                className={`group relative rounded-3xl border border-slate-800 overflow-hidden bg-gradient-to-br ${proj.imageBg} p-8 flex flex-col justify-between min-h-[340px] hover:border-purple-500/60 transition-all duration-300 shadow-2xl cursor-pointer`}
              >
                {/* Spotlight hover effect overlay button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-300 z-20 flex items-center justify-center">
                  <div className="btn-glow px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-extrabold text-sm shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Top Bar Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
                      {getProjectIcon(proj.icon)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                        {proj.title}
                      </h3>
                      <span className="text-xs font-mono text-purple-300 font-semibold">
                        {proj.techStack}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 font-semibold">
                    {proj.studentsCount}
                  </span>
                </div>

                {/* Center Code Graphic Mockup */}
                <div className="my-6 p-4 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-md font-mono text-xs text-slate-300 space-y-2 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {proj.title.toLowerCase().replace(/ /g, '-')}.ts
                    </span>
                    <span className="text-emerald-400 font-bold">200 OK</span>
                  </div>
                  <p className="text-purple-300 pt-1 leading-relaxed">
                    {proj.mockupSnippet}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    // {proj.outcome}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10 z-10">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-black/60 text-slate-200 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-bold text-cyan-400 flex items-center gap-1 group-hover:underline">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
