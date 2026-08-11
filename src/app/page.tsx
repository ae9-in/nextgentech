'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/Hero';
import { JoinModal } from '@/components/modals/JoinModal';
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Award,
  Code2,
  Star,
  Building2,
  GraduationCap,
} from 'lucide-react';

export default function HomePage() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleExplorePrograms = () => {
    const curriculumSection = document.getElementById('curriculum');
    if (curriculumSection) {
      curriculumSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/programs';
    }
  };

  const handleBookSlot = () => {
    setIsJoinModalOpen(true);
  };

  const reviews = [
    {
      name: 'Sai Varshith',
      college: 'VIT University',
      role: 'Full Stack Student',
      rating: 5,
      comment:
        'The 1-Day Experience opened my eyes to real production MERN stack setup. The mentor code review was extremely valuable!',
    },
    {
      name: 'Ananya Patel',
      college: 'BITS Pilani',
      role: 'AI Track Student',
      rating: 5,
      comment:
        'Building autonomous OpenAI agents and LangChain pipelines gave me a massive edge in campus placements.',
    },
    {
      name: 'Vikram Singh',
      college: 'IIT Delhi',
      role: 'Full Stack Student',
      rating: 5,
      comment:
        'The simulated internship workflow with GitHub PR reviews felt exactly like working at a top tier software company.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar onOpenJoinModal={handleBookSlot} />

      {/* HERO SECTION — Fully Connected Action Callbacks */}
      <Hero onExplorePrograms={handleExplorePrograms} onBookSlot={handleBookSlot} />

      {/* "WHY NEXTGEN TECH" SECTION — MINIMAL DARK CARDS */}
      <section className="py-24 bg-[#0D1117] border-b border-[#30363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-widest bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              PRACTICAL LEARNING
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              LEARNING SHOULD LEAD TO SOMETHING.
            </h2>
            <p className="text-base text-slate-400 font-normal">
              Go beyond videos and certificates. Build skills you can demonstrate in technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glass-light p-8 space-y-5 bg-[#161B22] border border-[#30363D]">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-extrabold text-[#3B82F6] font-mono">01</span>
                <div className="p-2.5 rounded-lg bg-[#1F2937] border border-[#30363D] text-[#3B82F6]">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#F5F7FA]">1-Day Experiences</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Intensive 1-day workshops covering core full-stack web development, AI integration, and cloud concepts.
              </p>
            </div>

            <div className="card-glass-light p-8 space-y-5 bg-[#161B22] border border-[#30363D]">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-extrabold text-[#3B82F6] font-mono">02</span>
                <div className="p-2.5 rounded-lg bg-[#1F2937] border border-[#30363D] text-[#3B82F6]">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#F5F7FA]">Simulated Internships</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Work in simulated Agile sprints with weekly pull requests, code reviews, and assigned senior mentor feedback.
              </p>
            </div>

            <div className="card-glass-light p-8 space-y-5 bg-[#161B22] border border-[#30363D]">
              <div className="flex justify-between items-center">
                <span className="text-3xl font-extrabold text-[#3B82F6] font-mono">03</span>
                <div className="p-2.5 rounded-lg bg-[#1F2937] border border-[#30363D] text-[#3B82F6]">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#F5F7FA]">Verified Credentials</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Earn cryptographic, verified certificates with unique credential IDs shareable directly on LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TRACKS */}
      <section id="curriculum" className="py-24 bg-[#161B22] border-b border-[#30363D] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#30363D] pb-8">
            <div>
              <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-widest block mb-2">
                CURRICULUM
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA]">
                Featured Learning Tracks
              </h2>
            </div>
            <Link
              href="/courses"
              className="text-xs font-mono font-bold text-[#3B82F6] hover:underline flex items-center gap-1"
            >
              <span>View All Courses →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'MERN Stack Development Bootcamp',
                category: 'Full Stack',
                duration: '7 Days',
                tech: ['MongoDB', 'Express', 'React', 'Node.js'],
                desc: 'Master full-stack web development with MongoDB, Express, React, and Node.js.',
              },
              {
                title: 'AI Application & LLM Agent Builder',
                category: 'Artificial Intelligence',
                duration: '14 Days',
                tech: ['Python', 'OpenAI API', 'LangChain', 'PyTorch'],
                desc: 'Build autonomous AI agents powered by OpenAI APIs, LangChain, and modern LLM pipelines.',
              },
              {
                title: 'HTML5 & CSS Grid Layout Mastery',
                category: 'Frontend',
                duration: '1 Day',
                tech: ['HTML5', 'CSS Grid', 'Flexbox', 'Accessibility'],
                desc: 'Master modern HTML5 semantics and CSS Grid/Flexbox layouts with clean, accessible design.',
              },
            ].map((track, i) => (
              <div
                key={i}
                className="card-glass-light p-6 space-y-4 flex flex-col justify-between bg-[#0D1117] border border-[#30363D]"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                    <span className="text-[#3B82F6] font-bold">{track.category}</span>
                    <span>{track.duration}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#F5F7FA] leading-snug">{track.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">{track.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {track.tech.map((t, idx) => (
                      <span key={idx} className="tech-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-[#30363D]">
                  <button
                    onClick={handleBookSlot}
                    className="btn-primary w-full py-2.5 text-xs text-center block font-semibold"
                  >
                    Enroll Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STATS — METRICS SECTION */}
      <section className="py-16 bg-[#0D1117] text-[#F5F7FA] border-b border-[#30363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#30363D] text-center">
            <div className="p-2 space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">500+</p>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Students Trained
              </p>
            </div>

            <div className="p-2 space-y-1 pt-6 lg:pt-2">
              <p className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">12+</p>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Programs
              </p>
            </div>

            <div className="p-2 space-y-1 pt-6 lg:pt-2">
              <p className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">25+</p>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Real-world Projects
              </p>
            </div>

            <div className="p-2 space-y-1 pt-6 lg:pt-2">
              <p className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA]">15+</p>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Expert Mentors
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT REVIEWS SECTION — EMBEDDED DIRECTLY ON LANDING PAGE */}
      <section id="reviews" className="py-24 bg-[#0D1117] border-b border-[#30363D] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              STUDENT FEEDBACK
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              What Our Students Say
            </h2>
            <p className="text-base text-slate-400 font-normal">
              Real feedback from students who completed 1-day experiences and simulated internships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="card-glass-dark p-6 space-y-4 bg-[#161B22] border border-[#30363D] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">&ldquo;{r.comment}&rdquo;</p>
                </div>
                <div className="pt-4 border-t border-[#30363D]">
                  <h4 className="text-sm font-bold text-[#F5F7FA]">{r.name}</h4>
                  <p className="text-[11px] font-mono text-slate-400">
                    {r.college} • {r.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTITUTION PARTNERSHIPS */}
      <section className="py-24 bg-[#161B22] border-b border-[#30363D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#0D1117] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              INSTITUTION PARTNERSHIPS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F7FA]">
              For Colleges & Universities
            </h2>
            <p className="text-slate-400 text-base font-normal">
              Empower your campus students with hands-on 1-day workshops, simulated internships, and industry capstone projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-glass-dark p-8 space-y-6 bg-[#0D1117] border border-[#30363D]">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-[#3B82F6]" />
                <h3 className="text-2xl font-extrabold text-[#F5F7FA]">Campus Workshops & Hackathons</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Bring 8-hour live coding experiences directly to your engineering college campus with certified senior mentors.
              </p>
              <Link href="/contact" className="btn-primary inline-flex px-6 py-2.5 text-xs font-semibold">
                Schedule Campus Workshop →
              </Link>
            </div>

            <div className="card-glass-dark p-8 space-y-6 bg-[#0D1117] border border-[#30363D]">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-[#3B82F6]" />
                <h3 className="text-2xl font-extrabold text-[#F5F7FA]">Institutional Placement Support</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Track student cohort progress, project scores, and verified developer credentials through dedicated institutional portals.
              </p>
              <Link href="/contact" className="btn-primary inline-flex px-6 py-2.5 text-xs font-semibold">
                Partner With Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1-DAY SLOT BOOKING MODAL */}
      <JoinModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />

      <Footer />
    </div>
  );
}
