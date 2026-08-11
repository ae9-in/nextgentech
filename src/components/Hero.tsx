'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  CheckCircle2,
  Play,
  Award,
  Users,
  GraduationCap,
  Zap,
  ExternalLink,
  ShieldCheck,
  Flame,
  Sparkles,
  Layers,
  Cpu,
  Globe,
} from 'lucide-react';

interface HeroProps {
  onExplorePrograms?: () => void;
  onBookSlot?: () => void;
}

export function Hero({ onExplorePrograms, onBookSlot }: HeroProps) {
  const [activeVisualTab, setActiveVisualTab] = useState<'app' | 'cert' | 'growth'>('app');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center border-b border-[#30363D] bg-[#0D1117] overflow-hidden text-[#F5F7FA] pt-24 pb-12">
      {/* Ambient Depth Background Wash */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d15_1px,transparent_1px),linear-gradient(to_bottom,#30363d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Copy & Action CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-4 text-left"
          >
            {/* Eyebrow Pill */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161B22] border border-[#30363D] text-[#3B82F6] text-[11px] font-mono font-semibold shadow-sm">
                <Code2 className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>1-DAY TECH EXPERIENCES</span>
              </div>
            </motion.div>

            {/* Headline H1 — Perfectly Proportioned */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-4xl lg:text-4xl xl:text-4xl font-extrabold text-[#F5F7FA] tracking-tight leading-[1.15] font-sans"
            >
              IT Training, Internships & Bootcamps — Delivered in a{' '}
              <span className="text-[#3B82F6]">Single Day.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg font-normal"
            >
              Hands-on tech experiences for students, built to fit into one day — no long commitments, real skills.
            </motion.p>

            {/* CTAs Button Group */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
              {onExplorePrograms ? (
                <button
                  onClick={onExplorePrograms}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 group"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <Link
                  href="/programs"
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 group"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}

              {onBookSlot ? (
                <button
                  onClick={onBookSlot}
                  className="bg-[#161B22] hover:bg-[#1F2937] text-[#F5F7FA] border border-[#30363D] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all"
                >
                  Book a 1-Day Slot
                </button>
              ) : (
                <Link
                  href="/bootcamps"
                  className="bg-[#161B22] hover:bg-[#1F2937] text-[#F5F7FA] border border-[#30363D] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all"
                >
                  Book a 1-Day Slot
                </Link>
              )}
            </motion.div>

            {/* Trust Indicators Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2.5 pt-2 text-[11px] font-mono text-slate-300"
            >
              <div className="flex items-center gap-1.5 bg-[#161B22] px-3 py-1.5 rounded-lg border border-[#30363D]">
                <Users className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>
                  <strong className="text-white font-bold">500+</strong> Students Trained
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#161B22] px-3 py-1.5 rounded-lg border border-[#30363D]">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  <strong className="text-white font-bold">50+</strong> Colleges Partnered
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#161B22] px-3 py-1.5 rounded-lg border border-[#30363D]">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  <strong className="text-white font-bold">1 Day.</strong> Real Skills.
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: VIBRANT INTERACTIVE STUDENT CAPSTONE SHOWCASE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-5 shadow-2xl space-y-4 relative z-10">
              {/* Interactive Visual Header Bar */}
              <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-mono text-xs font-bold">
                    STUDENT OUTCOME SHOWCASE
                  </span>
                </div>

                {/* Tab Switchers */}
                <div className="flex items-center gap-1 bg-[#0D1117] p-1 rounded-xl border border-[#30363D]">
                  <button
                    onClick={() => setActiveVisualTab('app')}
                    className={`px-3 py-1.5 rounded-lg text-[10.5px] font-mono font-bold transition-all flex items-center gap-1 ${
                      activeVisualTab === 'app'
                        ? 'bg-[#2563EB] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>Live Capstone</span>
                  </button>

                  <button
                    onClick={() => setActiveVisualTab('cert')}
                    className={`px-3 py-1.5 rounded-lg text-[10.5px] font-mono font-bold transition-all flex items-center gap-1 ${
                      activeVisualTab === 'cert'
                        ? 'bg-[#2563EB] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Award className="w-3 h-3" />
                    <span>Certificate</span>
                  </button>

                  <button
                    onClick={() => setActiveVisualTab('growth')}
                    className={`px-3 py-1.5 rounded-lg text-[10.5px] font-mono font-bold transition-all flex items-center gap-1 ${
                      activeVisualTab === 'growth'
                        ? 'bg-[#2563EB] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>Growth</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Visual Content Box */}
              <div className="bg-[#0D1117] p-5 rounded-xl border border-[#30363D] text-left space-y-4 min-h-[210px] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

                {activeVisualTab === 'app' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-mono text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Deployed in 1 Day</span>
                      </span>
                      <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5 text-blue-400" />
                        <span>Full Stack + AI Track</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-white leading-tight">
                        AI Resume Analyzer & Autonomous Agent
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        Built & shipped by Student Sai Varshith during 1-Day Experience.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {['Next.js 14', 'TypeScript', 'OpenAI API', 'LangChain', 'Tailwind'].map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md bg-[#161B22] text-slate-300 border border-[#30363D] text-[10px] font-mono font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeVisualTab === 'cert' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/30 font-mono text-[10px] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        <span>Cryptographically Verified</span>
                      </span>
                      <span className="text-slate-400 font-mono text-[10px] font-bold">
                        ID: NXT-FSD-9812
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#161B22] border border-[#30363D] space-y-1">
                      <h3 className="text-sm font-extrabold text-white">
                        Full Stack Software Engineer Credential
                      </h3>
                      <p className="text-xs text-slate-300 font-mono">
                        Issued to: <strong className="text-blue-400">Sai Varshith</strong> • Verified Aug 2026
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                      <span>✓ Direct LinkedIn One-Click Share</span>
                      <span className="text-emerald-400 font-bold">100% Industry Recognized</span>
                    </div>
                  </div>
                )}

                {activeVisualTab === 'growth' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-lg bg-[#161B22] border border-[#30363D] space-y-1">
                        <span className="text-slate-400 text-[10px]">TOTAL XP EARNED</span>
                        <p className="text-lg font-extrabold text-blue-400">1,450 XP</p>
                        <span className="text-[10px] text-emerald-400">Level 5 Developer Rank</span>
                      </div>

                      <div className="p-3 rounded-lg bg-[#161B22] border border-[#30363D] space-y-1">
                        <span className="text-slate-400 text-[10px]">MENTOR PR SCORE</span>
                        <p className="text-lg font-extrabold text-emerald-400">98 / 100</p>
                        <span className="text-[10px] text-slate-300">Grade: A+ (Passed)</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>1-Day Sprint Completion</span>
                        <span className="text-blue-400 font-bold">100%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#161B22] border border-[#30363D] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 w-full" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-[#30363D] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Real 1-Day Capstone Output</span>
                  </div>

                  <Link
                    href="/student/courses"
                    className="px-3 py-1.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-md"
                  >
                    <span>Try Student Workspace</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Verified Badge Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-white font-bold">Real Student Capstone & Verified Certificate</span>
                </div>
                <span className="text-slate-500 font-mono">Build Time: &lt; 24 Hrs</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
