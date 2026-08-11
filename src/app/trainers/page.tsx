'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TiltCard } from '@/components/ui/TiltCard';
import { Award, Briefcase, Code2, Star, Linkedin, Github } from 'lucide-react';

const mentors = [
  { name: 'Arjun Mehta', role: 'Full Stack Lead', expertise: 'React, Node.js, MongoDB', exp: '8+ Years', color: 'purple' },
  { name: 'Priya Sharma', role: 'AI/ML Engineer', expertise: 'Python, TensorFlow, OpenAI', exp: '6+ Years', color: 'cyan' },
  { name: 'Karthik Reddy', role: 'Cloud Architect', expertise: 'AWS, Docker, DevOps', exp: '10+ Years', color: 'emerald' },
  { name: 'Sneha Gupta', role: 'UI/UX Designer', expertise: 'Figma, Design Systems', exp: '5+ Years', color: 'pink' },
  { name: 'Rahul Verma', role: 'Data Engineer', expertise: 'Power BI, SQL, Python', exp: '7+ Years', color: 'amber' },
];

export default function TrainersPage() {
  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-24">
        <div className="py-20 bg-gradient-to-b from-purple-950/30 via-[#0a0b14] to-[#07080d] relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-cyan-600/8 rounded-full blur-[180px] pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-[0.15em]">
              <Award className="w-3.5 h-3.5" />
              <span>Expert Mentors</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold font-display text-white">
              Meet Our <span className="text-gradient-accent">Trainers</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Industry professionals with years of real-world experience guiding you through every step.
            </p>
          </div>
        </div>

        <section className="py-20 bg-[#07080d]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor, idx) => (
                <motion.div
                  key={mentor.name}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <TiltCard className="h-full">
                    <div className="h-full p-8 rounded-2xl bg-[#0c0e19] border border-white/[0.06] hover:border-purple-500/30 transition-all group flex flex-col justify-between">
                      <div className="space-y-5">
                        {/* Avatar Placeholder */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600/30 to-cyan-500/30 border border-white/[0.08] flex items-center justify-center text-2xl font-extrabold font-display text-white group-hover:scale-110 transition-transform">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">{mentor.name}</h3>
                          <p className="text-sm text-purple-400 font-semibold mt-0.5">{mentor.role}</p>
                        </div>

                        <p className="text-sm text-slate-400">{mentor.expertise}</p>

                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
                            {mentor.exp}
                          </span>
                          <span className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="text-[11px] font-mono">4.9</span>
                          </span>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center gap-3">
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:border-purple-500/30 transition-all">
                          <Linkedin className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:border-purple-500/30 transition-all">
                          <Github className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
