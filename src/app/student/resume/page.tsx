'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import confetti from 'canvas-confetti';
import { FileText, Download } from 'lucide-react';

export default function ResumeBuilderPage() {
  const [template, setTemplate] = useState('Developer Resume');
  const [fullName, setFullName] = useState('Sai Varshith');
  const [skills, setSkills] = useState('React 19, Node.js, Express, MongoDB, TypeScript, Tailwind CSS');

  const handleDownload = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    alert(`Downloading ${template} PDF for ${fullName}...`);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111827] selection:bg-[#2563EB] selection:text-white font-sans">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <div className="py-8 border-b border-[#E4E7EC] text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-[#0B1F33]">Resume Builder</h1>
            <p className="text-xs text-[#667085]">Generate ATS-friendly developer resumes populated with your verified projects.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 card-clean p-6 space-y-4">
              <h2 className="text-sm font-bold text-[#0B1F33]">Resume Form</h2>
              <div>
                <label className="block text-xs font-mono text-[#667085] mb-1">Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full px-4 py-2 rounded bg-[#F7F7F5] border border-[#E4E7EC] text-xs text-[#111827]" />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#667085] mb-1">Skills</label>
                <textarea rows={3} value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-4 py-2 rounded bg-[#F7F7F5] border border-[#E4E7EC] text-xs text-[#111827] resize-none" />
              </div>
              <button onClick={handleDownload} className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>

            <div className="lg:col-span-7 card-clean p-8 space-y-4 text-xs">
              <div className="border-b border-[#E4E7EC] pb-4 text-center">
                <h3 className="text-xl font-bold text-[#0B1F33]">{fullName}</h3>
                <p className="text-[#667085] font-mono">sai@college.edu • Bengaluru, IN</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#0B1F33]">Technical Skills</p>
                <p className="text-[#667085] bg-[#F7F7F5] p-3 rounded border border-[#E4E7EC]">{skills}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
