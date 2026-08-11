'use client';

import React from 'react';
import { Modal } from '../ui/Modal';
import { CONTENT } from '@/config/content';
import { Clock, Monitor, Award, Layers, Sparkles, CheckCircle2, Rocket, ArrowRight, Calendar } from 'lucide-react';

interface ProgramDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReserveSeat: (programTitle: string) => void;
  programTitle?: string;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  isOpen,
  onClose,
  onReserveSeat,
  programTitle = CONTENT.defaultProgramDetails.title,
}) => {
  const details = CONTENT.defaultProgramDetails;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6 text-left max-h-[80vh] overflow-y-auto pr-1">
        {/* Header Title */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curriculum & Program Syllabus</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white leading-tight">
            {programTitle}
          </h3>
        </div>

        {/* 5 Metadata Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-800/60">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Duration</span>
            <span className="font-bold text-cyan-300 mt-0.5">{details.duration}</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-800/60">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Mode</span>
            <span className="font-bold text-white mt-0.5">{details.mode}</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-800/60">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Certificate</span>
            <span className="font-bold text-emerald-400 mt-0.5">{details.certificate}</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-800/60">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Projects</span>
            <span className="font-bold text-purple-300 mt-0.5">{details.projects}</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-800/60 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-mono uppercase">Level</span>
            <span className="font-bold text-amber-300 mt-0.5">{details.level}</span>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>What You'll Learn</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {details.whatYoullLearn.map((skill) => (
              <div
                key={skill}
                className="px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What You'll Build */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-slate-900 border border-purple-500/30 space-y-2">
          <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
            Hands-on Portfolio Capstone:
          </span>
          <div className="flex items-center gap-2 text-base font-bold text-white">
            <Rocket className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>{details.whatYoullBuild}</span>
          </div>
        </div>

        {/* Today's Schedule Table */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>Today's Schedule</span>
          </h4>
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono uppercase">
                <tr>
                  <th className="px-4 py-2.5">Time</th>
                  <th className="px-4 py-2.5">Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {details.schedule.map((item) => (
                  <tr key={item.time} className="hover:bg-slate-800/40">
                    <td className="px-4 py-2.5 font-mono text-cyan-300 font-semibold w-28">
                      {item.time}
                    </td>
                    <td className="px-4 py-2.5 font-medium">{item.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onReserveSeat(programTitle);
            }}
            className="btn-glow w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-extrabold text-base shadow-xl shadow-purple-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Reserve My Seat – {details.price}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
