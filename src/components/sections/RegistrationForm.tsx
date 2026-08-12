'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck, Users, Award, Zap, Send } from 'lucide-react';

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    year: '',
    program: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const prog = searchParams.get('program');
      if (prog) {
        setFormData((prev) => ({ ...prev, program: prog }));
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0A1E33', '#0E8C93', '#F2803A', '#7FC4C8'],
      });
    }, 1000);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] placeholder-[#6E859B]/60 focus:outline-none focus:border-[#0E8C93] text-sm transition-all duration-200 font-sans";
  const labelClass = "block text-[11px] font-semibold text-[#0E8C93] uppercase tracking-wider mb-1.5 font-sans";
  const selectClass = "w-full px-4 py-3 rounded-lg bg-white border border-[#E1E8E8] text-[#0A1E33] focus:outline-none focus:border-[#0E8C93] text-sm transition-all duration-200 font-sans appearance-none";

  return (
    <section id="register" className="py-28 bg-[#F4F8F8] border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Engaging Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4F3F3] text-[#0B6E74] text-xs font-sans font-semibold mb-6">
                <Send className="w-3.5 h-3.5 text-[#0E8C93]" />
                <span>Register Now</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-display font-semibold text-[#0A1E33] leading-tight">
                Reserve Your{' '}
                <span className="text-[#0E8C93]">Seat</span>{' '}
                Today
              </h2>

              <p className="text-[#4B6072] text-base sm:text-lg mt-4 leading-relaxed font-sans">
                Fill in your details and we&apos;ll get you started on your tech journey. No payment required to register.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-4">
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-[#0E8C93]" />, text: 'No payment required to reserve', sub: 'Pay only when you confirm' },
                { icon: <Award className="w-5 h-5 text-[#0E8C93]" />, text: 'Certificate included', sub: 'Industry-verified credential' },
                { icon: <Users className="w-5 h-5 text-[#0E8C93]" />, text: 'Small batch size', sub: 'Personalized attention guaranteed' },
                { icon: <Zap className="w-5 h-5 text-[#F2803A]" />, text: 'Instant confirmation', sub: 'Get onboarding details via email' },
              ].map((badge, idx) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E1E8E8] shadow-xs hover:border-[#7FC4C8] transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-[#E4F3F3] shrink-0 group-hover:scale-105 transition-transform">
                    {badge.icon}
                  </div>
                  <div>
                    <p className="text-sm font-display font-semibold text-[#0A1E33]">{badge.text}</p>
                    <p className="text-xs text-[#4B6072] mt-0.5 font-sans">{badge.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Registration Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-xl bg-white border border-[#E1E8E8] shadow-sm relative overflow-hidden">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#0E8C93]" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-5"
                >
                  <div className="w-20 h-20 bg-[#E4F3F3] text-[#0E8C93] rounded-full flex items-center justify-center mx-auto border border-[#7FC4C8]">
                    <CheckCircle2 className="w-12 h-12 text-[#0E8C93]" />
                  </div>
                  <h3 className="text-3xl font-display font-semibold text-[#0A1E33]">Seat Reserved! 🎉</h3>
                  <p className="text-[#4B6072] text-sm leading-relaxed max-w-md mx-auto font-sans">
                    Welcome, <strong className="text-[#0A1E33] font-medium">{formData.name}</strong>! We&apos;ve sent confirmation details to{' '}
                    <span className="text-[#0E8C93] font-semibold">{formData.email}</span>. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 rounded-lg bg-[#0A1E33] text-white font-medium hover:bg-[#0F2A45] transition-all"
                  >
                    Register Another Student
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-[#E4F3F3] border border-[#7FC4C8]/40 mb-2">
                    <Sparkles className="w-5 h-5 text-[#0E8C93] shrink-0" />
                    <p className="text-xs text-[#0B6E74] font-sans">
                      Fill in your details to <strong className="text-[#0A1E33] font-semibold">reserve your seat</strong> — no payment needed right now.
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone *</label>
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

                  {/* College */}
                  <div>
                    <label className={labelClass}>College / University *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. VIT University"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  {/* Course + Year */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Course *</label>
                      <select
                        required
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Select Course</option>
                        <option value="B.Tech">B.Tech</option>
                        <option value="B.E.">B.E.</option>
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="B.Sc CS">B.Sc Computer Science</option>
                        <option value="M.Tech">M.Tech</option>
                        <option value="BBA">BBA</option>
                        <option value="MBA">MBA</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Year *</label>
                      <select
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className={selectClass}
                      >
                        <option value="">Select Year</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                        <option value="Graduated">Graduated</option>
                      </select>
                    </div>
                  </div>

                  {/* Interested Program */}
                  <div>
                    <label className={labelClass}>Interested Program *</label>
                    <select
                      required
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className={selectClass}
                    >
                      <option value="">Select Program</option>
                      <optgroup label="1-Day Sprints">
                        <option value="1-Day Web Development Sprint">1-Day Web Development Sprint</option>
                        <option value="1-Day HR & Recruitment Sprint">1-Day HR & Recruitment Sprint</option>
                        <option value="1-Day BDE & Lead Gen Sprint">1-Day BDE & Lead Gen Sprint</option>
                        <option value="1-Day Corporate Sales Sprint">1-Day Corporate Sales Sprint</option>
                        <option value="1-Day Digital Marketing Sprint">1-Day Digital Marketing Sprint</option>
                        <option value="1-Day IT & Client Services Sprint">1-Day IT & Client Services Sprint</option>
                      </optgroup>
                      <optgroup label="Simulated Internships">
                        <option value="HR (Human Resources) Internship">HR (Human Resources) Internship</option>
                        <option value="BDE (Business Development Executive) Internship">BDE (Business Development Executive) Internship</option>
                        <option value="Web Development Internship">Web Development Internship</option>
                        <option value="Sales Internship">Sales Internship</option>
                        <option value="Marketing (Digital Marketing) Internship">Marketing (Digital Marketing) Internship</option>
                        <option value="Services (IT & Client Services) Internship">Services (IT & Client Services) Internship</option>
                      </optgroup>
                      <optgroup label="Intensive Bootcamps">
                        <option value="Web Development Bootcamp">Web Development Bootcamp (7 Days)</option>
                        <option value="BDE & Corporate Sales Bootcamp">BDE & Corporate Sales Bootcamp (7 Days)</option>
                        <option value="Digital Marketing Bootcamp">Digital Marketing Bootcamp (7 Days)</option>
                        <option value="HR & People Operations Bootcamp">HR & People Operations Bootcamp (7 Days)</option>
                      </optgroup>
                    </select>
                  </div>

                  {/* Submit — Orange Primary Fill */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 py-4 px-6 rounded-lg bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium text-base shadow-xs transition-all flex items-center justify-center gap-2.5 group disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <span>Reserve Your Seat</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-white" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#4B6072] font-sans">
                    🔒 Your data is secure. No spam, no payment required now.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
