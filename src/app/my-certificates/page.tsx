'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Award, ShieldCheck, Download, Share2, Linkedin, CheckCircle2, QrCode, ExternalLink } from 'lucide-react';

const myCertificates = [
  {
    id: 'NXGT-2026-8841',
    title: '1-Day Full Stack Development Experience',
    issueDate: 'August 10, 2026',
    issuer: 'NextGen Tech Academy',
    verified: true,
    skills: ['React 19', 'Node.js', 'Vercel Deploy', 'REST APIs'],
  },
  {
    id: 'NXGT-2026-7129',
    title: 'AI Resume Analyzer & Python Workshop',
    issueDate: 'July 28, 2026',
    issuer: 'NextGen Tech Academy',
    verified: true,
    skills: ['Python', 'OpenAI API', 'PDF Parsing', 'Streamlit'],
  },
];

export default function MyCertificatesPage() {
  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="py-12 bg-gradient-to-b from-purple-950/30 via-[#0a0b14] to-[#07080d] border-b border-purple-500/20 text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Student Credentials Vault</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white">
              My <span className="text-gradient-accent">Certificates</span>
            </h1>
            <p className="text-slate-400 text-base max-w-2xl mx-auto">
              Download high-res PDF credentials and instantly add verified badges to your LinkedIn profile.
            </p>
          </div>

          {/* Certificate Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {myCertificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12 }}
                className="p-8 rounded-3xl bg-[#0c0e19] border border-white/[0.06] hover:border-purple-500/30 relative overflow-hidden flex flex-col justify-between space-y-6 card-hover-lift group"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400" />

                <div className="space-y-4">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Badge</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">ID: {cert.id}</span>
                  </div>

                  {/* Title & Issuer */}
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">Issued by {cert.issuer} • {cert.issueDate}</p>
                  </div>

                  {/* Verified Skills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.03] text-cyan-400 border border-white/[0.06]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-6 border-t border-white/[0.04] grid grid-cols-2 gap-3">
                  <button className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button className="py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-200 font-bold text-xs border border-white/[0.06] transition-all flex items-center justify-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>Share to LinkedIn</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
