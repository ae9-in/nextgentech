'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import confetti from 'canvas-confetti';
import { Building2, CheckCircle2, Send, ArrowRight } from 'lucide-react';

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
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0A1E33', '#0E8C93', '#F2803A', '#7FC4C8'],
      });
    }, 700);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const inputClass = "w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] placeholder-[#6E859B]/60 focus:outline-none focus:border-[#0E8C93] text-xs font-sans transition-all";
  const labelClass = "block text-[11px] font-semibold text-[#0E8C93] uppercase tracking-wider mb-1 font-sans";
  const selectClass = "w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] focus:outline-none focus:border-[#0E8C93] text-xs font-sans transition-all";

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="Partner With NextGen Tech">
      {submitted ? (
        <div className="text-center py-6 space-y-4 font-sans">
          <div className="w-16 h-16 bg-[#E4F3F3] text-[#0E8C93] rounded-full flex items-center justify-center mx-auto border border-[#7FC4C8]">
            <CheckCircle2 className="w-9 h-9 text-[#0E8C93]" />
          </div>
          <h4 className="text-2xl font-semibold font-display text-[#0A1E33]">Partnership Request Sent! 🎉</h4>
          <p className="text-[#4B6072] text-xs leading-relaxed max-w-sm mx-auto">
            Thank you, <strong className="text-[#0A1E33] font-medium">{formData.name}</strong> ({formData.designation} at <span className="text-[#0E8C93] font-semibold">{formData.collegeName}</span>). Our Institutional Partnerships Lead will reach out to you within 4 business hours.
          </p>
          <button
            onClick={handleReset}
            className="w-full mt-4 py-3 px-6 rounded-lg bg-[#0A1E33] hover:bg-[#0F2A45] text-white font-medium text-xs transition-colors shadow-xs"
          >
            Close Window
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans">
          <div className="p-3 rounded-lg bg-[#E4F3F3] border border-[#7FC4C8]/40 flex items-center gap-3">
            <Building2 className="w-5 h-5 text-[#0E8C93] shrink-0" />
            <p className="text-xs text-[#0B6E74]">
              Transform campus placements with industry accredited technical bootcamps & 1-day workshops.
            </p>
          </div>

          <div>
            <label className={labelClass}>
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="Dr. Rajesh Kumar / Prof. Sarah Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                College / Institution Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. National Institute of Tech"
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Designation *
              </label>
              <select
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className={selectClass}
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
              <label className={labelClass}>
                Official Email *
              </label>
              <input
                type="email"
                required
                placeholder="r.kumar@college.ac.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>
              Estimated Student Batch Size
            </label>
            <select
              value={formData.estimatedStudents}
              onChange={(e) => setFormData({ ...formData, estimatedStudents: e.target.value })}
              className={selectClass}
            >
              <option value="50-100 Students">50 - 100 Students</option>
              <option value="100-300 Students">100 - 300 Students</option>
              <option value="300-500 Students">300 - 500 Students</option>
              <option value="500+ Campus-Wide">500+ Campus-Wide Batch</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Message / Specific Training Needs
            </label>
            <textarea
              rows={3}
              placeholder="e.g., Looking for a 1-day Web Development & Full Stack workshop for 3rd-year CS students before placements."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] placeholder-[#6E859B]/60 focus:outline-none focus:border-[#0E8C93] text-xs font-sans resize-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 rounded-lg bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium text-xs shadow-xs transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <>
                <span>Submit Proposal Request</span>
                <Send className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}
    </Modal>
  );
};
