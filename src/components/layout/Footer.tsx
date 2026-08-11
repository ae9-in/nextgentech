'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0D1117] text-[#F5F7FA] pt-16 pb-12 border-t border-[#30363D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#30363D]">

          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#3B82F6] text-white flex items-center justify-center font-extrabold text-sm">
                N
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#F5F7FA]">
                NEXTGEN TECH
              </span>
            </div>

            <p className="text-slate-400 text-xs max-w-sm leading-relaxed font-normal">
              Practical technology training, real-world projects, and simulated developer internship experiences for college students.
            </p>

            <p className="text-xs text-slate-500 font-mono">
              © 2026 NextGen Tech Inc. All rights reserved.
            </p>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider font-mono">Programs</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><Link href="/programs" className="hover:text-[#3B82F6] transition-colors">1-Day Experience</Link></li>
              <li><Link href="/courses" className="hover:text-[#3B82F6] transition-colors">Developer Bootcamps</Link></li>
              <li><Link href="/internships" className="hover:text-[#3B82F6] transition-colors">Simulated Internships</Link></li>
              <li><Link href="/projects" className="hover:text-[#3B82F6] transition-colors">Capstone Projects</Link></li>
            </ul>
          </div>

          {/* Col 3: Students */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider font-mono">Students</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><Link href="/student/dashboard" className="hover:text-[#3B82F6] transition-colors">Student Dashboard</Link></li>
              <li><Link href="/student/projects" className="hover:text-[#3B82F6] transition-colors">Projects</Link></li>
              <li><Link href="/student/certificates" className="hover:text-[#3B82F6] transition-colors">Certificates</Link></li>
              <li><Link href="/student/career" className="hover:text-[#3B82F6] transition-colors">Career Center</Link></li>
            </ul>
          </div>

          {/* Col 4: For Colleges & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider font-mono">For Colleges</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li><Link href="/colleges" className="hover:text-[#3B82F6] transition-colors">Workshops</Link></li>
              <li><Link href="/colleges" className="hover:text-[#3B82F6] transition-colors">Partnerships</Link></li>
              <li><Link href="/about" className="hover:text-[#3B82F6] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#3B82F6] transition-colors">Contact & FAQ</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>NextGen Tech • Developer Career Readiness Ecosystem</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-[#F5F7FA]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#F5F7FA]">Terms of Service</Link>
            <Link href="/contact" className="hover:text-[#F5F7FA]">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
