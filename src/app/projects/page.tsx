'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiClient } from '@/lib/api-client';
import { Code2, ArrowRight } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await apiClient.get('/api/v1/projects');
        setProjects(res.data || res || []);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              REAL-WORLD PORTFOLIO
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              Capstone Projects
            </h1>
            <p className="text-slate-400 text-base font-normal">
              Build production software with milestone tracking, repository submissions, and mentor code evaluations.
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-slate-400">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project._id} className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-[#3B82F6] font-bold">{project.techStack}</span>
                    <span className="px-2.5 py-1 rounded bg-[#1F2937] text-slate-300 font-bold border border-[#30363D]">
                      {(project.milestones || []).length} Milestones
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-extrabold text-[#F5F7FA]">{project.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">{project.description}</p>
                  </div>

                  <div className="pt-4 border-t border-[#30363D]">
                    <Link href="/login" className="btn-primary w-full py-2.5 text-xs text-center block font-semibold">
                      Start Capstone Project →
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
