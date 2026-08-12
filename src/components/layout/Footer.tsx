'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0A1E33] text-white pt-16 pb-12 border-t border-[#0F2A45]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#1B3F60]/60">

          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#0E8C93] text-white flex items-center justify-center font-display font-semibold text-sm">
                N
              </div>
              <span className="font-display font-semibold text-base tracking-tight text-white">
                NEXTGEN TECH
              </span>
            </div>

            <p className="text-[#6E859B] text-xs max-w-sm leading-relaxed font-sans font-normal">
              Practical technology training, real-world projects, and simulated developer internship experiences for college students.
            </p>

            <p className="text-xs text-[#6E859B]/70 font-mono">
              © 2026 NextGen Tech Inc. All rights reserved.
            </p>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#7FC4C8] uppercase tracking-[0.15em]">Programs</h4>
            <ul className="space-y-2 text-xs text-[#6E859B] font-sans">
              <li><Link href="/programs" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">1-Day Experience</Link></li>
              <li><Link href="/courses" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Developer Bootcamps</Link></li>
              <li><Link href="/internships" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Simulated Internships</Link></li>
              <li><Link href="/projects" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Capstone Projects</Link></li>
            </ul>
          </div>

          {/* Col 3: Students */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#7FC4C8] uppercase tracking-[0.15em]">Students</h4>
            <ul className="space-y-2 text-xs text-[#6E859B] font-sans">
              <li><Link href="/student/dashboard" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Student Dashboard</Link></li>
              <li><Link href="/student/projects" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Projects</Link></li>
              <li><Link href="/student/certificates" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Certificates</Link></li>
              <li><Link href="/student/career" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Career Center</Link></li>
            </ul>
          </div>

          {/* Col 4: For Colleges & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#7FC4C8] uppercase tracking-[0.15em]">For Colleges</h4>
            <ul className="space-y-2 text-xs text-[#6E859B] font-sans">
              <li><Link href="/colleges" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Workshops</Link></li>
              <li><Link href="/colleges" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Partnerships</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline decoration-[#0E8C93] transition-colors">Contact & FAQ</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E859B]/80 font-sans">
          <p>NextGen Tech • Developer Career Readiness Ecosystem</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
