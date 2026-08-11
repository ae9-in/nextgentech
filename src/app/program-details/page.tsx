'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CONTENT } from '@/config/content';
import { JoinModal } from '@/components/modals/JoinModal';
import { PartnerModal } from '@/components/modals/PartnerModal';
import { LoginModal } from '@/components/modals/LoginModal';
import { Sparkles, CheckCircle2, Rocket, Calendar, ArrowRight } from 'lucide-react';

export default function ProgramDetailsPage() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const details = CONTENT.defaultProgramDetails;

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 selection:bg-purple-600 selection:text-white">
      <Navbar
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onOpenPartnerModal={() => setPartnerModalOpen(true)}
        onOpenLoginModal={() => setLoginModalOpen(true)}
      />

      <main className="pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Title */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Program Syllabus & Schedule</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
              🔥 {details.title}
            </h1>
            <p className="text-slate-400 text-base sm:text-lg">
              Everything you need to know about the 1-Day Experience curriculum and live schedule.
            </p>
          </div>

          {/* 5 Metadata Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-3xl bg-slate-900 border border-slate-800 text-sm">
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-800/60">
              <span className="text-xs text-slate-400 font-mono uppercase">Duration</span>
              <span className="font-bold text-cyan-300 mt-1">{details.duration}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-800/60">
              <span className="text-xs text-slate-400 font-mono uppercase">Mode</span>
              <span className="font-bold text-white mt-1">{details.mode}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-800/60">
              <span className="text-xs text-slate-400 font-mono uppercase">Certificate</span>
              <span className="font-bold text-emerald-400 mt-1">{details.certificate}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-800/60">
              <span className="text-xs text-slate-400 font-mono uppercase">Projects</span>
              <span className="font-bold text-purple-300 mt-1">{details.projects}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-800/60 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-400 font-mono uppercase">Level</span>
              <span className="font-bold text-amber-300 mt-1">{details.level}</span>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>What you'll learn</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {details.whatYoullLearn.map((skill) => (
                <div
                  key={skill}
                  className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-sm font-bold text-slate-200 flex items-center gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What You'll Build */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 to-slate-900 border border-purple-500/40 space-y-3 shadow-2xl">
            <span className="text-xs font-mono text-purple-300 uppercase tracking-wider block font-semibold">
              What you'll build:
            </span>
            <div className="flex items-center gap-3 text-2xl font-extrabold text-white">
              <Rocket className="w-7 h-7 text-cyan-400 shrink-0" />
              <span>{details.whatYoullBuild}</span>
            </div>
          </div>

          {/* Today's Schedule Table */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>Today's Schedule</span>
            </h3>
            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/60">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4">Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-200 font-medium">
                  {details.schedule.map((item) => (
                    <tr key={item.time} className="hover:bg-slate-800/40">
                      <td className="px-6 py-4 font-mono text-cyan-300 font-bold w-36">
                        {item.time}
                      </td>
                      <td className="px-6 py-4">{item.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA Box */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-purple-500/40 text-center space-y-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-white">Ready to Reserve Your Spot?</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Limited seats per batch to ensure live 1-on-1 mentor guidance and code reviews.
            </p>
            <button
              onClick={() => setJoinModalOpen(true)}
              className="btn-glow px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-extrabold text-base shadow-xl shadow-purple-600/30 hover:scale-105 transition-all inline-flex items-center gap-2 group"
            >
              <span>Reserve My Seat – {details.price}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        defaultProgram={details.title}
      />

      <PartnerModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}
