'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiClient } from '@/lib/api-client';
import { Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

export default function InternshipsPage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInternships() {
      try {
        const res = await apiClient.get('/api/v1/internships');
        setInternships(res.data || res || []);
      } catch (err) {
        console.error('Failed to load internships:', err);
      } finally {
        setLoading(false);
      }
    }
    loadInternships();
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              DEVELOPER INTERNSHIPS
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              Simulated Internships
            </h1>
            <p className="text-slate-400 text-base font-normal">
              Work in simulated Agile sprints with weekly pull requests, code reviews, and assigned senior mentor feedback.
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-slate-400">Loading internships...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {internships.map((item) => (
                <div key={item._id} className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#3B82F6] font-bold uppercase">{item.track}</span>
                    <span className="px-2.5 py-1 rounded bg-[#1F2937] border border-[#30363D] text-slate-300 font-bold">{item.duration}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-[#F5F7FA]">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">{item.description}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono text-slate-400 font-bold uppercase">Required Skills:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(item.skills || []).map((skill: string, idx: number) => (
                        <span key={idx} className="tech-pill">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#30363D] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-slate-400 block">Mentor</span>
                      <span className="text-sm font-bold text-[#F5F7FA]">{item.mentorName || 'Senior Engineer'}</span>
                    </div>
                    <Link href="/login" className="btn-primary px-6 py-2.5 text-xs font-semibold">
                      Apply Now →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
