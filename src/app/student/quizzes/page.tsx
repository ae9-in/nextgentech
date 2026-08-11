'use client';

import React, { useState } from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import confetti from 'canvas-confetti';
import { Award, HelpCircle, Clock, CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export default function QuizzesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeQuiz, setActiveQuiz] = useState<any | null>(null);
  const [testFinished, setTestFinished] = useState(false);

  const categories = ['All', 'Course quizzes', 'Module tests', 'Mock interviews', 'Final assessment'];

  const quizzes = [
    { id: 'q1', title: 'React Fundamentals', category: 'Course quizzes', questions: 20, time: 30 },
    { id: 'q2', title: 'HTML & CSS Layout Mastery', category: 'Module tests', questions: 15, time: 20 },
    { id: 'q3', title: 'Full Stack Developer Mock Interview', category: 'Mock interviews', questions: 25, time: 45 },
  ];

  const filteredQuizzes = quizzes.filter(
    (q) => activeCategory === 'All' || q.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const handleStart = (q: any) => {
    setActiveQuiz(q);
    setTestFinished(false);
  };

  const handleFinish = () => {
    setTestFinished(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <StudentLayout title="Quizzes & Exams" subtitle="Test knowledge, complete module certifications, and practice interview questions.">
      {activeQuiz ? (
        <div className="space-y-6 max-w-3xl mx-auto">
          <button
            onClick={() => setActiveQuiz(null)}
            className="px-4 py-2 rounded-xl bg-[#161B22] border border-[#30363D] hover:bg-[#1F2937] text-white text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Back to Quizzes</span>
          </button>

          {testFinished ? (
            <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 text-center space-y-6 shadow-xl">
              <Award className="w-12 h-12 text-blue-400 mx-auto" />
              <h2 className="text-2xl font-extrabold text-white">Test Complete! 🎉</h2>
              <div className="p-6 rounded-xl bg-[#0D1117] border border-[#30363D] space-y-2">
                <p className="text-xs text-slate-400 font-mono font-bold">Final Score</p>
                <p className="text-4xl font-extrabold text-white">17 / 20 (85%)</p>
                <p className="text-xs text-emerald-400 font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Passed & Certification Eligible</span>
                </p>
              </div>
              <button
                onClick={() => setActiveQuiz(null)}
                className="px-8 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25"
              >
                Return to Portal
              </button>
            </div>
          ) : (
            <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 space-y-6 shadow-xl">
              <div className="flex justify-between border-b border-[#30363D] pb-4 text-xs font-mono">
                <span className="font-bold text-white text-base">{activeQuiz.title}</span>
                <span className="text-blue-400 font-bold bg-[#0D1117] px-3 py-1 rounded-full border border-[#30363D] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Time Remaining: 21:45</span>
                </span>
              </div>

              <p className="text-base font-bold text-white leading-relaxed">
                Q1. What Hook should be used for side-effects in React applications?
              </p>

              <div className="space-y-3 text-xs">
                {['useState()', 'useEffect()', 'useContext()'].map((opt, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-[#30363D] bg-[#0D1117] hover:border-[#3B82F6] hover:bg-[#1F2937] text-white cursor-pointer font-mono transition-all flex items-center justify-between"
                  >
                    <span>{opt}</span>
                    <span className="w-4 h-4 rounded-full border border-[#30363D]" />
                  </div>
                ))}
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25"
              >
                Submit Test Answers
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Categories Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[#30363D]">
            {categories.map((c) => {
              const isActive = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-600/25 border border-[#3B82F6]'
                      : 'bg-[#161B22] text-slate-400 hover:text-white border border-[#30363D] hover:bg-[#1F2937]'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredQuizzes.map((q) => (
              <div
                key={q.id}
                className="bg-[#161B22] border border-[#30363D] hover:border-[#3B82F6]/50 transition-all rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-xl group"
              >
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-950/60 text-blue-300 border border-blue-500/30">
                    {q.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-blue-300 transition-colors leading-tight">
                    {q.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                    <span>{q.questions} Questions • {q.time} Mins</span>
                  </p>
                </div>

                <button
                  onClick={() => handleStart(q)}
                  className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Start Test</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </StudentLayout>
  );
}
