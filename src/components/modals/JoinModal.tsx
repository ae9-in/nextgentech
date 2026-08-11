'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ArrowRight, Calendar, BookOpen, Clock, Ticket } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
}

export const JoinModal: React.FC<JoinModalProps> = ({
  isOpen,
  onClose,
  defaultProgram = '1-Day Full Stack Experience',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    programTrack: defaultProgram,
    slotDate: 'Upcoming Saturday (10:00 AM - 6:00 PM)',
    experienceLevel: 'Beginner',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const generatedTicket = `NXT-SLOT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);

    try {
      await fetch('/api/v1/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ticketId: generatedTicket }),
      });

      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#06b6d4', '#8b5cf6', '#10b981'],
      });
    } catch (err) {
      console.error('Failed to post slot application:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Book Your Student Slot">
      {submitted ? (
        <div className="text-center py-6 space-y-5">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h4 className="text-2xl font-extrabold text-white">Student Slot Confirmed! 🎉</h4>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto font-mono">
              Welcome aboard, <strong className="text-blue-400">{formData.fullName}</strong>! We reserved your 1-day experience slot and sent onboarding instructions to <span className="text-cyan-400">{formData.email}</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#161B22] border border-[#30363D] text-left space-y-2 font-mono text-xs max-w-sm mx-auto">
            <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-[#30363D]">
              <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Ticket className="w-4 h-4" />
                <span>BOOKING CONFIRMATION TICKET</span>
              </span>
            </div>
            <p className="text-slate-300"><strong className="text-slate-400">Track:</strong> {formData.programTrack}</p>
            <p className="text-slate-300"><strong className="text-slate-400">Slot Date:</strong> {formData.slotDate}</p>
            <p className="text-slate-300"><strong className="text-slate-400">Booking Pass ID:</strong> <span className="text-emerald-400 font-bold">{ticketId}</span></p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="w-full py-3 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-colors shadow-lg shadow-blue-600/20"
            >
              Back to Website
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left font-mono">
          <div className="p-3 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-[#3B82F6] shrink-0" />
              <span>Program: <strong className="text-white font-bold">{formData.programTrack}</strong></span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              1-Day Delivery
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Selected Program Track *
              </label>
              <select
                value={formData.programTrack}
                onChange={(e) => setFormData({ ...formData, programTrack: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white focus:outline-none focus:border-[#3B82F6] text-xs font-sans"
              >
                <option value="1-Day Full Stack Experience">1-Day Full Stack MERN Experience</option>
                <option value="1-Day AI Agent Builder">1-Day AI Agent & LLM Builder</option>
                <option value="Simulated Engineering Internship">Simulated Engineering Internship Track</option>
                <option value="Weekend MERN Bootcamp">7-Day Intensive Web Development Bootcamp</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Preferred Slot Date *
              </label>
              <select
                value={formData.slotDate}
                onChange={(e) => setFormData({ ...formData, slotDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white focus:outline-none focus:border-[#3B82F6] text-xs font-sans"
              >
                <option value="Upcoming Saturday (10:00 AM - 6:00 PM)">Upcoming Saturday (10:00 AM - 6:00 PM)</option>
                <option value="Upcoming Sunday (10:00 AM - 6:00 PM)">Upcoming Sunday (10:00 AM - 6:00 PM)</option>
                <option value="Next Weekend Slot">Next Weekend Slot</option>
                <option value="Custom Campus Cohort Date">Custom Campus Cohort Date</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Full Student Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sai Varshith"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] text-xs font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                College Email *
              </label>
              <input
                type="email"
                required
                placeholder="varshith@college.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] text-xs font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                WhatsApp Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] text-xs font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
              College / University Name
            </label>
            <input
              type="text"
              placeholder="e.g. VIT University / IIT Delhi / BITS Pilani"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] text-xs font-sans"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Coding Experience Level
            </label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white focus:outline-none focus:border-[#3B82F6] text-xs font-sans"
            >
              <option value="Absolute Beginner">Absolute Beginner (Never written code)</option>
              <option value="Beginner">Beginner (Know basic HTML/Python)</option>
              <option value="Intermediate">Intermediate (Built small projects)</option>
              <option value="Advanced">Advanced (Looking for internship level)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 group disabled:opacity-50 shadow-lg shadow-blue-600/20"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>Confirm Student Slot Booking</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-slate-400">
            🔒 No upfront payment required. Instant confirmation ticket & certificate included.
          </p>
        </form>
      )}
    </Modal>
  );
};
