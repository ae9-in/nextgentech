'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LayoutDashboard, BookOpen, Award, Rocket, Clock, ArrowRight, Bell, Settings, User } from 'lucide-react';

const enrolledPrograms = [
  { title: '1-Day Full Stack Development', status: 'In Progress', progress: 45, date: 'Aug 10, 2026' },
  { title: 'MERN Stack Bootcamp', status: 'Upcoming', progress: 0, date: 'Aug 18, 2026' },
  { title: 'AI & Python Workshop', status: 'Completed', progress: 100, date: 'Jul 28, 2026' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Banner */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0d0f1c] to-cyan-950/30 border border-purple-500/20 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-sm text-purple-300 font-mono mb-2">👋 Welcome back,</p>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">Rahul Sharma</h1>
                <p className="text-slate-400 text-sm mt-2">Continue building your tech career.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white transition-all"><Bell className="w-5 h-5" /></button>
                <button className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white transition-all"><Settings className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <BookOpen className="w-5 h-5 text-purple-400" />, label: 'Enrolled', value: '3' },
              { icon: <Clock className="w-5 h-5 text-cyan-400" />, label: 'In Progress', value: '1' },
              { icon: <Award className="w-5 h-5 text-emerald-400" />, label: 'Certificates', value: '1' },
              { icon: <Rocket className="w-5 h-5 text-pink-400" />, label: 'Projects', value: '2' },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 rounded-2xl bg-[#0c0e19] border border-white/[0.06] text-center card-hover-lift">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit mx-auto mb-3">{stat.icon}</div>
                <p className="text-2xl font-extrabold font-display text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Enrolled Programs */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-purple-400" />
              Your Programs
            </h2>
            {enrolledPrograms.map((prog, idx) => (
              <motion.div key={prog.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} className="p-6 rounded-2xl bg-[#0c0e19] border border-white/[0.06] hover:border-purple-500/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{prog.title}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border ${
                      prog.status === 'Completed' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20' :
                      prog.status === 'In Progress' ? 'bg-purple-950/40 text-purple-400 border-purple-500/20' :
                      'bg-slate-900 text-slate-400 border-slate-700'
                    }`}>{prog.status}</span>
                    <span className="text-xs text-slate-500">{prog.date}</span>
                  </div>
                  {prog.progress > 0 && prog.progress < 100 && (
                    <div className="mt-3 w-full max-w-xs h-2 rounded-full bg-white/[0.04] overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${prog.progress}%` }} />
                    </div>
                  )}
                </div>
                <button className="px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm font-bold text-slate-300 hover:text-white hover:border-purple-500/30 transition-all flex items-center gap-2 group/btn">
                  <span>{prog.status === 'Completed' ? 'View Certificate' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
