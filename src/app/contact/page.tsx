'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl font-extrabold text-[#F5F7FA]">Contact & Support</h1>
            <p className="text-slate-400 text-xs font-normal">Have questions about our programs, student LMS, or campus partnerships?</p>
          </div>

          <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Patel"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs text-[#F5F7FA]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs text-[#F5F7FA]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-400 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs text-[#F5F7FA]"
                />
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-xs font-semibold">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
