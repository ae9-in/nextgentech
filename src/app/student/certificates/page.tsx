'use client';

import React from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { Download, ExternalLink, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function StudentCertificatesPage() {
  const certId = 'TS-FSD-928173';

  return (
    <StudentLayout title="My Certificates" subtitle="Download verified credentials or share verified completion certificates directly to LinkedIn.">
      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#30363D] pb-6">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Credential</span>
            </span>
            <h2 className="text-2xl font-extrabold text-white">Full Stack Development</h2>
            <p className="text-xs text-slate-300 font-mono">Issued Aug 10, 2026 • NXTGen Tech Academy</p>
          </div>

          <span className="px-3 py-1.5 rounded-xl bg-[#0D1117] text-slate-300 text-xs font-mono font-bold border border-[#30363D]">
            ID: {certId}
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href={`/verify/${certId}`}
            className="px-5 py-2.5 rounded-xl bg-[#0D1117] hover:bg-[#1F2937] text-white border border-[#30363D] text-xs font-bold font-mono transition-colors flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4 text-blue-400" />
            <span>View Verification Page</span>
          </Link>
          <button className="px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Download PDF Certificate</span>
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
