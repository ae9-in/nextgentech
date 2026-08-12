'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-semibold text-[#0A1E33]">Contact & Support</h1>
            <p className="text-[#4B6072] text-xs font-normal">Have questions about our 6 domain programs, student LMS, or campus partnerships?</p>
          </div>

          <div className="bg-white p-8 space-y-6 border border-[#E1E8E8] rounded-xl shadow-sm">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
              <div>
                <label className="block text-xs font-sans font-medium text-[#4B6072] mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Patel"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-xs text-[#0A1E33] focus:outline-none focus:border-[#0E8C93]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#4B6072] mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-xs text-[#0A1E33] focus:outline-none focus:border-[#0E8C93]"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-[#4B6072] mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#E1E8E8] text-xs text-[#0A1E33] focus:outline-none focus:border-[#0E8C93]"
                />
              </div>

              <button type="submit" className="w-full py-3 text-xs font-medium bg-[#F2803A] hover:bg-[#E06A24] text-white rounded-lg transition-colors">
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
