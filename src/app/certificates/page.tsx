'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Award, ShieldCheck, Linkedin, QrCode, Download, CheckCircle2, Globe } from 'lucide-react';

export default function CertificatesPage() {
  const features = [
    { icon: <QrCode className="w-5 h-5 text-cyan-400" />, title: 'QR Verification', desc: 'Each certificate has a unique QR code for instant online verification.' },
    { icon: <Linkedin className="w-5 h-5 text-blue-400" />, title: 'LinkedIn Badge', desc: 'Add your credential directly to your LinkedIn profile with one click.' },
    { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, title: 'Industry Recognized', desc: 'Our certificates are backed by industry mentors and verified by employers.' },
    { icon: <Globe className="w-5 h-5 text-purple-400" />, title: 'Digital & Downloadable', desc: 'Access your certificate anytime online or download a high-res PDF.' },
  ];

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-24">
        <div className="py-20 bg-gradient-to-b from-purple-950/30 via-[#0a0b14] to-[#07080d] relative overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-emerald-600/8 rounded-full blur-[180px] pointer-events-none" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-[0.15em]">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Credentials</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold font-display text-white">
              Your <span className="text-gradient-accent">Certificate</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every program comes with a verified, industry-recognized certificate to boost your resume and LinkedIn.
            </p>
          </div>
        </div>

        {/* Certificate Preview */}
        <section className="py-20 bg-[#07080d]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-10 rounded-3xl bg-gradient-to-br from-[#0f1120] via-[#0c0e1a] to-[#0a0c16] border border-purple-500/20 shadow-2xl shadow-purple-900/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400" />
              <div className="text-center space-y-6 py-8">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 bg-purple-950/40 px-4 py-2 rounded-full border border-purple-500/20">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>CERTIFICATE OF COMPLETION</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">NextGen Tech</h2>
                <p className="text-slate-400 text-lg">This certifies that</p>
                <p className="text-2xl font-bold font-display text-gradient-cyan">[Your Name]</p>
                <p className="text-slate-400">has successfully completed the</p>
                <p className="text-xl font-bold text-white">1-Day Full Stack Development Experience</p>
                <div className="flex items-center justify-center gap-8 pt-4 text-sm text-slate-500">
                  <span>Date: August 2026</span>
                  <span>ID: NXGT-2026-XXXX</span>
                </div>
                <div className="pt-4 flex items-center justify-center gap-2 text-emerald-400 text-sm font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified & Authentic</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-[#080910] section-glow-top">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold font-display text-white text-center mb-12">Certificate Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, idx) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="p-7 rounded-2xl bg-[#0c0e19] border border-white/[0.06] hover:border-purple-500/30 transition-all card-hover-lift group flex items-start gap-5">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] shrink-0 group-hover:scale-110 transition-transform">{f.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-white mb-1">{f.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
