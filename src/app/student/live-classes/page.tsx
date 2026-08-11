'use client';

import React from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { Video, Calendar, User, Clock, ArrowRight } from 'lucide-react';

export default function LiveClassesPage() {
  return (
    <StudentLayout title="Live Classes & Workshops" subtitle="Join live interactive workshops on Google Meet/Zoom, ask questions, and review recordings.">
      <div className="space-y-8">
        {/* Live Banner */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>🔴 LIVE NOW</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">React Advanced Workshop</h2>
              <p className="text-xs text-slate-300 font-mono">Trainer: Arjun Mehta • Platform: Google Meet</p>
            </div>

            <a
              href="https://meet.google.com/nxt-tech-react"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-red-600/30 shrink-0"
            >
              <Video className="w-4 h-4" />
              <span>Join Class Now</span>
            </a>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span>Upcoming Sessions</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Node.js API Development', date: 'Tomorrow, Aug 11 • 06:00 PM IST', trainer: 'Arjun Mehta' },
              { title: 'SQL & Database Optimization', date: 'Aug 12 • 11:00 AM IST', trainer: 'Rahul Verma' },
            ].map((s) => (
              <div key={s.title} className="bg-[#161B22] border border-[#30363D] hover:border-[#3B82F6]/50 transition-all rounded-2xl p-6 space-y-3 shadow-xl group">
                <span className="text-xs font-mono text-blue-400 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{s.date}</span>
                </span>
                <h3 className="text-base font-extrabold text-white group-hover:text-blue-300 transition-colors">{s.title}</h3>
                <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Trainer: {s.trainer}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
