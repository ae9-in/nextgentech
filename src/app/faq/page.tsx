'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function FAQPage() {
  const faqs = [
    { q: 'What is a 1-Day Experience?', a: 'It is an 8-hour live coding workshop where you build a production project from scratch, deploy it live, and earn a verified credential.' },
    { q: 'How do simulated internships work?', a: 'You are assigned real Jira tickets, submit pull requests on GitHub, receive code review feedback from senior engineers, and complete 8-week Agile sprints.' },
    { q: 'Are certificates shareable on LinkedIn?', a: 'Yes! Every certificate issued has a cryptographic hash and unique verification ID that can be verified publicly on our portal.' },
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h1 className="text-3xl font-extrabold text-[#F5F7FA]">FAQ & Knowledge Base</h1>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card-glass-dark p-6 space-y-2 bg-[#161B22] border border-[#30363D]">
                <h3 className="text-base font-bold text-[#F5F7FA]">{faq.q}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
