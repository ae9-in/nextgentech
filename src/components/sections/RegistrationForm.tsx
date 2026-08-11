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
        colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981', '#fbbf24'],
      });
    }, 1000);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 text-sm transition-all duration-300 hover:border-white/[0.12]";
  const labelClass = "block text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5";
  const selectClass = "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 text-sm transition-all duration-300 hover:border-white/[0.12] appearance-none";

  return (
    <section id="register" className="py-28 bg-[#080910] relative overflow-hidden section-glow-top">
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-900/8 rounded-full blur-[160px] pointer-events-none" />

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-950/40 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-[0.15em] mb-6">
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Register Now</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold font-display text-white leading-tight">
                Reserve Your{' '}
                <span className="text-gradient-cyan">Seat</span>{' '}
                Today
              </h2>

              <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
                Fill in your details and we&apos;ll get you started on your tech journey. No payment required to register.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-4">
              {[
                { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, text: 'No payment required to reserve', sub: 'Pay only when you confirm' },
                { icon: <Award className="w-5 h-5 text-purple-400" />, text: 'Certificate included', sub: 'Industry-verified credential' },
                { icon: <Users className="w-5 h-5 text-cyan-400" />, text: 'Small batch size', sub: 'Personalized attention guaranteed' },
                { icon: <Zap className="w-5 h-5 text-yellow-400" />, text: 'Instant confirmation', sub: 'Get onboarding details via email' },
              ].map((badge, idx) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] shrink-0 group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{badge.text}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{badge.sub}</p>
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
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0c0e19] border border-white/[0.06] shadow-2xl shadow-purple-900/10 relative overflow-hidden">
              {/* Top Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 opacity-60" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-5"
                >
                  <div className="w-20 h-20 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-extrabold font-display text-white">Seat Reserved! 🎉</h3>
                  <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto">
                    Welcome, <strong className="text-purple-400">{formData.name}</strong>! We&apos;ve sent confirmation details to{' '}
                    <span className="text-cyan-400">{formData.email}</span>. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold hover:scale-[1.02] transition-all"
                  >
                    Register Another Student
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 mb-2">
                    <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
                    <p className="text-xs text-purple-200">
                      Fill in your details to <strong className="text-white">reserve your seat</strong> — no payment needed right now.
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
                      <option value="1-Day Full Stack Development">1-Day Full Stack Development</option>
                      <option value="1-Day AI & Python">1-Day AI & Python</option>
                      <option value="1-Day Data Analytics">1-Day Data Analytics</option>
                      <option value="1-Day UI/UX Design">1-Day UI/UX Design</option>
                      <option value="MERN Stack Bootcamp">MERN Stack Bootcamp (7 Days)</option>
                      <option value="AI Builder Bootcamp">AI Builder Bootcamp (14 Days)</option>
                      <option value="Full Stack Internship">Full Stack Internship</option>
                      <option value="Python Development Internship">Python Development Internship</option>
                      <option value="Data Analytics Internship">Data Analytics Internship</option>
                      <option value="UI/UX Internship">UI/UX Internship</option>
                      <option value="AI & ML Internship">AI & ML Internship</option>
                    </select>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white font-extrabold text-base shadow-xl shadow-purple-600/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {loading ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <span>Reserve Your Seat</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
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
