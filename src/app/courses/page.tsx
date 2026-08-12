'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiClient } from '@/lib/api-client';
import { Search } from 'lucide-react';

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
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              EXPLORE CURRICULUM
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#0A1E33]">
              Developer Courses
            </h1>
            <p className="text-[#4B6072] text-base font-normal leading-relaxed">
              Production-ready technology courses built with real project repositories, quizzes, and mentor evaluations.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F4F8F8] p-4 rounded-xl border border-[#E1E8E8] shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#6E859B] absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-[#E1E8E8] text-xs text-[#0A1E33] focus:outline-none focus:border-[#0E8C93]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {['All', 'Web Development', 'HR', 'BDE', 'Sales', 'Marketing', 'Services'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                    category === cat
                      ? 'bg-[#0A1E33] text-white'
                      : 'bg-white text-[#4B6072] border border-[#E1E8E8] hover:text-[#0A1E33]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          {loading ? (
            <div className="p-12 text-center text-xs font-sans text-[#4B6072]">Loading courses from database...</div>
          ) : courses.length === 0 ? (
            <div className="p-12 text-center text-xs font-sans text-[#4B6072] bg-white rounded-xl border border-[#E1E8E8]">
              No courses found for your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course._id} className="bg-white p-6 space-y-4 flex flex-col justify-between border border-[#E1E8E8] rounded-xl shadow-sm hover:border-[#7FC4C8] transition-all">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-sans text-[#4B6072]">
                      <span className="text-[#0E8C93] font-semibold uppercase tracking-[0.18em] text-[11px]">{course.category}</span>
                      <span className="font-sans text-[11px] font-medium">{course.duration || '7 Days'}</span>
                    </div>

                    <h3 className="text-xl font-display font-semibold text-[#0A1E33] leading-snug">{course.title}</h3>
                    <p className="text-xs text-[#4B6072] leading-relaxed font-normal">{course.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {(course.tags || ['Next.js', 'React', 'Node.js']).map((tag: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-full bg-[#E4F3F3] text-[#0B6E74] border-none text-[11px] font-sans font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E1E8E8] flex items-center justify-between">
                    <span className="text-xs font-sans text-[#4B6072]">
                      Mentor: <strong className="text-[#0A1E33] font-semibold">{course.trainerName || 'Senior Engineer'}</strong>
                    </span>

                    <Link
                      href="/student/courses"
                      className="px-4 py-2 text-xs font-medium bg-[#F2803A] hover:bg-[#E06A24] text-white rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <span>Enroll →</span>
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
