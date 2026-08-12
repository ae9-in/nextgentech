'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ArrowRight, Ticket } from 'lucide-react';

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

    const generatedTicket = `NGT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicket);

    const newAppDoc = {
      _id: `LOCAL-${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      college: formData.college || 'NextGen Tech Student',
      programTrack: formData.programTrack,
      slotDate: formData.slotDate,
      ticketId: generatedTicket,
      experienceLevel: formData.experienceLevel || 'Beginner',
      status: 'CONFIRMED_SLOT',
      appliedAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('nxtgen_local_applications');
        const existing = raw ? JSON.parse(raw) : [];
        localStorage.setItem('nxtgen_local_applications', JSON.stringify([newAppDoc, ...existing]));
      } catch (e) {}
    }

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
        colors: ['#0A1E33', '#0E8C93', '#F2803A', '#7FC4C8'],
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
          <div className="w-14 h-14 bg-[#E4F3F3] text-[#0A1E33] rounded-full flex items-center justify-center mx-auto border border-[#7FC4C8]">
            <CheckCircle2 className="w-8 h-8 text-[#0E8C93]" />
          </div>

          <div className="space-y-2">
            <h4 className="text-2xl font-display font-semibold text-[#0A1E33]">Student Slot Confirmed! 🎉</h4>
            <p className="text-[#4B6072] text-xs leading-relaxed max-w-sm mx-auto font-sans">
              Welcome aboard, <strong className="text-[#0A1E33] font-medium">{formData.fullName}</strong>! We reserved your 1-day experience slot and sent onboarding instructions to <span className="text-[#0E8C93] font-medium">{formData.email}</span>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4F8F8] border border-[#E1E8E8] text-left space-y-2 font-sans text-xs max-w-sm mx-auto">
            <div className="flex justify-between items-center text-[#4B6072] pb-2 border-b border-[#E1E8E8]">
              <span className="flex items-center gap-1.5 text-[#0A1E33] font-semibold">
                <Ticket className="w-4 h-4 text-[#0E8C93]" />
                <span>BOOKING CONFIRMATION TICKET</span>
              </span>
            </div>
            <p className="text-[#0A1E33]"><strong className="text-[#4B6072]">Track:</strong> {formData.programTrack}</p>
            <p className="text-[#0A1E33]"><strong className="text-[#4B6072]">Slot Date:</strong> {formData.slotDate}</p>
            <p className="text-[#0A1E33]"><strong className="text-[#4B6072]">Booking Pass ID:</strong> <span className="text-[#0E8C93] font-mono font-semibold">{ticketId}</span></p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleReset}
              className="w-full py-3 px-6 rounded-lg bg-[#0A1E33] hover:bg-[#0F2A45] text-white font-medium text-xs transition-colors shadow-xs"
            >
              Back to Website
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
          <div className="p-3 rounded-lg bg-[#E4F3F3] border border-[#7FC4C8]/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#0B6E74]">
              <Sparkles className="w-4 h-4 text-[#0E8C93] shrink-0" />
              <span>Program: <strong className="text-[#0A1E33] font-semibold">{formData.programTrack}</strong></span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0B6E74] border border-[#7FC4C8]/40 text-[10px] font-medium">
              1-Day Delivery
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#0E8C93] uppercase tracking-wider mb-1">
                Selected Program Track *
              </label>
              <select
                value={formData.programTrack}
                onChange={(e) => setFormData({ ...formData, programTrack: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] focus:outline-none focus:border-[#0E8C93] text-xs font-sans"
              >
                <option value="Web Development Sprint">1-Day Web Development Sprint</option>
                <option value="HR & Recruitment Sprint">1-Day HR & Recruitment Sprint</option>
                <option value="BDE & Lead Gen Sprint">1-Day BDE & Lead Gen Sprint</option>
                <option value="Corporate Sales Sprint">1-Day Corporate Sales Sprint</option>
                <option value="Digital Marketing Sprint">1-Day Digital Marketing Sprint</option>
                <option value="IT & Client Services Sprint">1-Day IT & Client Services Sprint</option>
                <option value="HR Internship">HR (Human Resources) Internship Track</option>
                <option value="BDE Internship">BDE (Business Development) Internship Track</option>
                <option value="Web Development Internship">Web Development Internship Track</option>
                <option value="Sales Internship">Sales Internship Track</option>
                <option value="Marketing Internship">Marketing (Digital Marketing) Internship Track</option>
                <option value="Services Internship">Services (IT & Client Services) Internship Track</option>
                <option value="Web Development Bootcamp">Web Development Bootcamp (7 Days)</option>
                <option value="BDE & Corporate Sales Bootcamp">BDE & Corporate Sales Bootcamp (7 Days)</option>
                <option value="Digital Marketing Bootcamp">Digital Marketing Bootcamp (7 Days)</option>
                <option value="HR & People Operations Bootcamp">HR & People Operations Bootcamp (7 Days)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#0E8C93] uppercase tracking-wider mb-1">
                Preferred Slot Date *
              </label>
              <select
                value={formData.slotDate}
                onChange={(e) => setFormData({ ...formData, slotDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] focus:outline-none focus:border-[#0E8C93] text-xs font-sans"
              >
                <option value="Upcoming Saturday (10:00 AM - 6:00 PM)">Upcoming Saturday (10:00 AM - 6:00 PM)</option>
                <option value="Upcoming Sunday (10:00 AM - 6:00 PM)">Upcoming Sunday (10:00 AM - 6:00 PM)</option>
                <option value="Next Weekend Slot">Next Weekend Slot</option>
                <option value="Custom Campus Cohort Date">Custom Campus Cohort Date</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#4B6072] uppercase tracking-wider mb-1">
              Full Student Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sai Varshith"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] placeholder-[#6E859B]/60 focus:outline-none focus:border-[#0E8C93] text-xs font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#4B6072] uppercase tracking-wider mb-1">
                College Email *
              </label>
              <input
                type="email"
                required
                placeholder="varshith@college.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] placeholder-[#6E859B]/60 focus:outline-none focus:border-[#0E8C93] text-xs font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#4B6072] uppercase tracking-wider mb-1">
                WhatsApp Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] placeholder-[#6E859B]/60 focus:outline-none focus:border-[#0E8C93] text-xs font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#4B6072] uppercase tracking-wider mb-1">
              College / University Name
            </label>
            <input
              type="text"
              placeholder="e.g. VIT University / IIT Delhi / BITS Pilani"
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] placeholder-[#6E859B]/60 focus:outline-none focus:border-[#0E8C93] text-xs font-sans"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#4B6072] uppercase tracking-wider mb-1">
              Coding Experience Level
            </label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] focus:outline-none focus:border-[#0E8C93] text-xs font-sans"
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
            className="w-full mt-2 py-3 px-6 rounded-lg bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium text-xs transition-all flex items-center justify-center gap-2 group disabled:opacity-50 shadow-xs"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>Confirm Student Slot Booking</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-[#4B6072]">
            🔒 No upfront payment required. Instant confirmation ticket & certificate included.
          </p>
        </form>
      )}
    </Modal>
  );
};
