'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '@/config/content';
import { TiltCard } from '../ui/TiltCard';
import { CheckSquare, GitCommit, MessageSquare, Award, ArrowRight, ShieldCheck, GitBranch, Code, Layers, Terminal, BarChart3, Layout, Sparkles, Clock, UserCheck, Briefcase } from 'lucide-react';

interface InternshipSectionProps {
  onExploreInternships: (trackTitle?: string) => void;
}

export const InternshipSection: React.FC<InternshipSectionProps> = ({ onExploreInternships }) => {
  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-6 h-6 text-purple-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-emerald-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-pink-400" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-amber-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-blue-400" />;
      default:
        return <Briefcase className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="internships" className="py-28 bg-[#06070b] relative overflow-hidden border-y border-purple-500/20">
      {/* Background Visual Mesh */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-mesh-grid" />
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
            <GitBranch className="w-4 h-4 text-cyan-400" />
            <span>{CONTENT.internship.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-tight">
            "{CONTENT.internship.headline}"
          </h2>

          <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
            {CONTENT.internship.subtext}
          </p>
        </div>

        {/* Developer Workflow Visual Mockup (Kanban + PR Reviews) */}
        <div className="mb-20 rounded-3xl bg-[#0d0f1b] border border-purple-500/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold">Sprint #4 Kanban Board</span>
              <span className="bg-purple-950 px-2 py-0.5 rounded text-purple-300">4 Active Engineers</span>
            </div>
            <span className="hidden sm:inline text-cyan-400">NextGen Internship Portal</span>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            {/* Column 1 */}
            <div className="bg-[#090a12] p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-slate-400 font-bold">
                <span>IN PROGRESS (2)</span>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-purple-300">
                  <span>NG-104</span>
                  <span>Assignee: You</span>
                </div>
                <p className="text-white font-sans text-xs font-semibold">Integrate OAuth 2.0 Supabase Auth</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300">PR Open</span>
                  <span>2 Reviews Pending</span>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="bg-[#090a12] p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-slate-400 font-bold">
                <span>SENIOR CODE REVIEW (1)</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-cyan-300">
                  <span>NG-102</span>
                  <span>Mentor: Senior Dev</span>
                </div>
                <p className="text-white font-sans text-xs font-semibold">Optimize Database Indexing & Caching</p>
                <p className="text-[11px] text-emerald-400 italic">"Great job! Clean TypeScript interfaces."</p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="bg-[#090a12] p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-slate-400 font-bold">
                <span>MERGED & DEPLOYED (4)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-emerald-300">
                  <span>NG-99</span>
                  <span>Merged v1.4</span>
                </div>
                <p className="text-white font-sans text-xs font-semibold">Setup AWS S3 File Upload Endpoint</p>
                <div className="text-[10px] text-emerald-400 font-bold">✔ Live in Production</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Premium Internship Track Cards Grid */}
        <div className="space-y-8 mb-16">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-4xl font-bold font-display text-white">
              Explore Internship Tracks
            </h3>
            <p className="text-slate-400 text-sm">
              Work under senior industry mentors on real client-grade projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {CONTENT.internship.tracks.map((track) => (
              <TiltCard key={track.id} className="h-full">
                <div className="h-full p-8 rounded-3xl border border-slate-800 hover:border-purple-500/60 bg-[#0d0f1c] flex flex-col justify-between relative overflow-hidden group shadow-xl transition-all duration-300">
                  {/* Top Glowing Edge */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 opacity-70 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                        {getTrackIcon(track.icon)}
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 font-semibold">
                        {track.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                        {track.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Duration: <strong className="text-white">{track.duration}</strong></span>
                      </p>
                    </div>

                    {/* Metadata Specs: Project, Skills, Certificate, Mentor */}
                    <div className="space-y-3 pt-2 text-xs">
                      {/* Project */}
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold block">
                          🚀 Project You'll Build:
                        </span>
                        <p className="text-slate-200 font-semibold leading-normal">
                          {track.project}
                        </p>
                      </div>

                      {/* Skills */}
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block mb-1.5">
                          🛠️ Target Skills & Stack:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {track.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 font-mono text-[10px]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certificate */}
                      <div className="flex items-center gap-2 text-emerald-300 text-[11px] font-medium pt-1">
                        <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Certificate: <strong>{track.certificate}</strong></span>
                      </div>

                      {/* Mentor */}
                      <div className="flex items-center gap-2 text-purple-300 text-[11px] font-medium">
                        <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />
                        <span>Mentor: <strong>{track.mentor}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Action */}
                  <div className="pt-6 mt-6 border-t border-slate-800/80">
                    <button
                      onClick={() => onExploreInternships(`${track.title} Internship`)}
                      className="btn-glow w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      <span>{CONTENT.internship.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
