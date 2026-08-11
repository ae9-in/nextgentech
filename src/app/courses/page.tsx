'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiClient } from '@/lib/api-client';
import { BookOpen, Search, Clock, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      try {
        const params: any = {};
        if (search) params.search = search;
        if (category !== 'All') params.category = category;
        const res = await apiClient.get('/api/v1/courses', params);
        setCourses(res.data || res || []);
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, [search, category]);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              EXPLORE CURRICULUM
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              Developer Courses
            </h1>
            <p className="text-slate-400 text-base font-normal">
              Production-ready technology courses built with real project repositories, quizzes, and mentor evaluations.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161B22] p-4 rounded-2xl border border-[#30363D]">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs text-[#F5F7FA] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['All', 'Development', 'AI', 'Data', 'Design'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    category === cat
                      ? 'bg-[#3B82F6] text-white'
                      : 'bg-[#0D1117] text-slate-400 border border-[#30363D] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          {loading ? (
            <div className="p-12 text-center text-xs font-mono text-slate-400">Loading courses from database...</div>
          ) : courses.length === 0 ? (
            <div className="p-12 text-center text-xs font-mono text-slate-400 bg-[#161B22] rounded-2xl border border-[#30363D]">
              No courses found for your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course._id} className="card-glass-dark p-6 space-y-4 flex flex-col justify-between bg-[#161B22] border border-[#30363D]">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span className="text-[#3B82F6] font-bold">{course.category}</span>
                      <span>{course.duration || '7 Days'}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#F5F7FA] leading-snug">{course.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">{course.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {(course.techStack || []).map((t: string, idx: number) => (
                        <span key={idx} className="tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#30363D] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-slate-400 block">Price</span>
                      <span className="text-lg font-extrabold text-[#F5F7FA]">₹{course.price}</span>
                    </div>
                    <Link href="/login" className="btn-primary px-5 py-2 text-xs font-semibold">
                      Enroll Now →
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
