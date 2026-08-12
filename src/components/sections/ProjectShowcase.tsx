'use client';

import React from 'react';
import { CONTENT } from '@/config/content';
import { TiltCard } from '../ui/TiltCard';
import { ShoppingCart, FileCheck, PieChart, BarChart3, Code2, Users, ArrowRight } from 'lucide-react';

interface ProjectShowcaseProps {
  onExploreProject: (title: string) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onExploreProject }) => {
  const getProjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingCart':
        return <ShoppingCart className="w-5 h-5 text-[#0E8C93]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#0E8C93]" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-[#0E8C93]" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-[#0E8C93]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#0E8C93]" />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-white border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] block">
              HANDS-ON STUDENT PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
              What Will I Actually Build?
            </h2>
            <p className="text-[#4B6072] text-base sm:text-lg">
              Students don't just want certificates. They want real, shippable projects for their GitHub & LinkedIn portfolios.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#0E8C93] bg-[#E4F3F3] px-4 py-2.5 rounded-full border-none shrink-0 shadow-xs">
            <Users className="w-4 h-4 text-[#0E8C93]" />
            <span>Over 50+ Production Projects Shipped</span>
          </div>
        </div>

        {/* 4 Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CONTENT.projects.map((proj) => (
            <TiltCard key={proj.id} className="h-full">
              <div
                onClick={() => onExploreProject(proj.title)}
                className="group relative rounded-xl border border-[#E1E8E8] overflow-hidden bg-white p-8 flex flex-col justify-between min-h-[340px] hover:border-[#7FC4C8] transition-all duration-300 shadow-sm cursor-pointer"
              >
                {/* Spotlight overlay button */}
                <div className="absolute inset-0 bg-[#0A1E33]/70 opacity-0 group-hover:opacity-100 backdrop-blur-xs transition-opacity duration-300 z-20 flex items-center justify-center">
                  <div className="px-6 py-3 rounded-lg bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium text-sm shadow-md flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <span>View Project Spec</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Top Bar Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-[#E4F3F3] group-hover:scale-105 transition-transform">
                      {getProjectIcon(proj.icon)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-semibold text-[#0A1E33] group-hover:text-[#0E8C93] transition-colors">
                        {proj.title}
                      </h3>
                      <span className="text-xs font-sans text-[#0E8C93] font-medium">
                        {proj.techStack}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-sans text-[#0B6E74] bg-[#E4F3F3] px-3 py-1 rounded-full font-medium">
                    {proj.studentsCount}
                  </span>
                </div>

                {/* Center Code Graphic Mockup */}
                <div className="my-6 p-4 rounded-lg bg-[#F4F8F8] border border-[#E1E8E8] font-mono text-xs text-[#0A1E33] space-y-2 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#E1E8E8] pb-2 text-[11px] text-[#4B6072]">
                    <span className="flex items-center gap-1.5 font-sans">
                      <span className="w-2 h-2 rounded-full bg-[#0E8C93]" />
                      {proj.title.toLowerCase().replace(/ /g, '-')}.ts
                    </span>
                    <span className="text-[#0E8C93] font-semibold">200 OK</span>
                  </div>
                  <p className="text-[#0B6E74] pt-1 leading-relaxed">
                    {proj.mockupSnippet}
                  </p>
                  <p className="text-[#4B6072] text-[11px] font-sans">
                    // {proj.outcome}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E1E8E8] z-10">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-[#E4F3F3] text-[#0B6E74] font-medium border-none"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Orange Text Link */}
                  <div className="text-xs font-semibold text-[#F2803A] hover:text-[#E06A24] flex items-center gap-1">
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
