'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CONTENT } from '@/config/content';
import { apiClient } from '@/lib/api-client';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await apiClient.get('/api/v1/projects');
        const data = res.data || res || [];
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(CONTENT.projects);
        }
      } catch (err) {
        console.error('Failed to load projects, rendering fallback projects:', err);
        setProjects(CONTENT.projects);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              REAL-WORLD DOMAIN PORTFOLIO
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
              Capstone Projects
            </h1>
            <p className="text-[#4B6072] text-base font-normal leading-relaxed">
              Build production deliverables across our 6 core domains with milestone tracking, repository/deck submissions, and mentor evaluations.
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs font-sans text-[#4B6072]">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id || project._id || project.title} className="bg-white p-8 space-y-6 border border-[#E1E8E8] rounded-xl shadow-sm hover:border-[#7FC4C8] transition-all">
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-[#0E8C93] font-semibold uppercase tracking-[0.18em]">{project.category || project.techStack}</span>
                    <span className="px-3 py-1 rounded-full bg-[#E4F3F3] text-[#0B6E74] text-[11px] font-medium">
                      {project.studentsCount || '20+ built'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-semibold text-[#0A1E33]">{project.title}</h3>
                    <p className="text-xs text-[#4B6072] leading-relaxed font-normal">{project.outcome || project.description}</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-sans text-[#0E8C93] font-semibold uppercase tracking-wider">Skills & Tools:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {(project.tags || ['Strategy', 'Execution']).map((tag: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-full bg-[#E4F3F3] text-[#0B6E74] border-none text-[11px] font-sans font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E1E8E8] flex items-center justify-end">
                    <Link
                      href="/#register"
                      className="px-4 py-2 text-xs font-medium bg-[#F2803A] hover:bg-[#E06A24] text-white rounded-lg transition-colors block text-center"
                    >
                      Enroll to Build →
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
