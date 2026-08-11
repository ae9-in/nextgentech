'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import confetti from 'canvas-confetti';
import { Building2, CheckCircle2, Send } from 'lucide-react';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    designation: 'TPO / Placement Head',
    email: '',
    phone: '',
    estimatedStudents: '100-300 Students',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#8b5cf6', '#10b981'],
      });
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Partner With NextGen Tech">
      {submitted ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-2xl font-bold font-display text-white">Partnership Request Sent!</h4>
          <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
            Thank you, <strong className="text-cyan-400">{formData.name}</strong> ({formData.designation} at {formData.collegeName}). Our Institutional Partnerships Lead will reach out to you within 4 business hours.
          </p>
          <button
            onClick={handleReset}
            className="w-full mt-4 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Close Window
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-3">
            <Building2 className="w-5 h-5 text-cyan-400 shrink-0" />
            <p className="text-xs text-cyan-200">
              Transform campus placements with industry accredited technical bootcamps & 1-day workshops.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="Dr. Rajesh Kumar / Prof. Sarah Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                College / Institution Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. National Institute of Technology"
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Designation *
              </label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 text-sm"
              >
                <option value="TPO / Placement Head">TPO / Placement Head</option>
                <option value="HOD / Faculty Head">HOD / Faculty Head</option>
                <option value="Dean / Director">Dean / Director</option>
                <option value="Student Tech Club Lead">Student Tech Club Lead</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Official Email *
              </label>
              <input
                type="email"
                required
                placeholder="r.kumar@college.ac.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 987-6543"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Estimated Student Batch Size
            </label>
            <select
              value={formData.estimatedStudents}
              onChange={(e) => setFormData({ ...formData, estimatedStudents: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 text-sm"
            >
              <option value="50-100 Students">50 - 100 Students</option>
              <option value="100-300 Students">100 - 300 Students</option>
              <option value="300-500 Students">300 - 500 Students</option>
              <option value="500+ Campus-Wide">500+ Campus-Wide Batch</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Message / Specific Training Needs
            </label>
            <textarea
              rows={3}
              placeholder="e.g., Looking for a 1-day React & Full Stack workshop for 3rd-year CS students before placements."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>Submit Proposal Request</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}
    </Modal>
  );
};
