'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  const reviews = [
    { name: 'Sai Varshith', college: 'VIT University', role: 'Full Stack Student', rating: 5, comment: 'The 1-Day Experience opened my eyes to real production MERN stack setup. The mentor code review was extremely valuable!' },
    { name: 'Ananya Patel', college: 'BITS Pilani', role: 'AI Track Student', rating: 5, comment: 'Building autonomous OpenAI agents and LangChain pipelines gave me a massive edge in campus placements.' },
    { name: 'Vikram Singh', college: 'IIT Delhi', role: 'Full Stack Student', rating: 5, comment: 'The simulated internship workflow with GitHub PR reviews felt exactly like working at a top tier software company.' },
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              STUDENT FEEDBACK
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              Student Reviews
            </h1>
            <p className="text-slate-400 text-base font-normal">
              Read real feedback from college students who transformed their technical careers through NextGen Tech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div key={idx} className="card-glass-dark p-8 space-y-4 bg-[#161B22] border border-[#30363D]">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal italic">&quot;{rev.comment}&quot;</p>
                <div className="pt-4 border-t border-[#30363D] text-xs">
                  <p className="font-bold text-[#F5F7FA]">{rev.name}</p>
                  <p className="text-slate-400 font-mono text-[11px]">{rev.college} • {rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
