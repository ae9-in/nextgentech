'use client';

import React, { useState } from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { useUser } from '@/context/UserContext';
import confetti from 'canvas-confetti';
import { Send, FileText, CheckCircle2, Clock, Award, Github } from 'lucide-react';

export default function AssignmentsPage() {
  const [selectedId, setSelectedId] = useState<string>('a1');
  const [githubUrl, setGithubUrl] = useState('');
  const { addXP, incrementStreak } = useUser();

  const mockAssignments = [
    {
      id: 'a1',
      title: 'Build React Login Page',
      dueDate: 'Aug 12, 2026',
      status: 'Pending',
      instructions: 'Build a responsive dark-mode Login & Signup authentication form using React 19, Tailwind CSS, and custom client-side validation hooks.',
    },
    {
      id: 'a2',
      title: 'Python Data Analysis',
      dueDate: 'Aug 14, 2026',
      status: 'Submitted',
      score: 'Under Review',
      instructions: 'Clean and analyze student cohort datasets using Pandas & NumPy. Export automated metrics for pass percentages.',
    },
    {
      id: 'a3',
      title: 'Portfolio Website',
      dueDate: 'Aug 18, 2026',
      status: 'Reviewed',
      score: '95 / 100 (Grade: A+)',
      mentorFeedback: 'Outstanding glassmorphic UI design and smooth entrance animations!',
      instructions: 'Develop a personal developer portfolio showcasing your 1-Day Experience capstones, certificates, and skills matrix.',
    },
  ];

  const selected = mockAssignments.find((a) => a.id === selectedId) || mockAssignments[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    selected.status = 'Submitted';
    
    // Real-time Streak and XP Increment
    addXP(150);
    incrementStreak();
  };

  return (
    <StudentLayout title="Assignments" subtitle="Submit GitHub repository links, track mentor PR evaluations, and earn assignment scores in real-time.">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Assignments List */}
        <div className="lg:col-span-5 bg-[#161B22] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#30363D] pb-4">
            <h2 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Assigned Tasks</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1F2937] text-blue-400 text-[10px] font-mono font-bold border border-[#30363D]">
              {mockAssignments.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {mockAssignments.map((a) => {
              const isSelected = a.id === selectedId;

              return (
                <div
                  key={a.id}
                  onClick={() => setSelectedId(a.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-[#2563EB] text-white border-[#3B82F6] shadow-lg shadow-blue-600/20'
                      : 'bg-[#0D1117] text-slate-200 border-[#30363D] hover:border-[#3B82F6]/50 hover:bg-[#1F2937]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-sm font-extrabold ${isSelected ? 'text-white' : 'text-slate-100'}`}>
                        {a.title}
                      </h3>
                      <p className={`text-[11px] font-mono mt-0.5 font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        Due: {a.dueDate}
                      </p>
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                      a.status === 'Reviewed'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
                        : a.status === 'Submitted'
                        ? 'bg-blue-950/80 text-blue-300 border-blue-500/30'
                        : 'bg-amber-950/80 text-amber-300 border-amber-500/30'
                    }`}>
                      {a.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-7 bg-[#161B22] border border-[#30363D] rounded-2xl p-8 space-y-6 shadow-xl">
          <div className="flex justify-between items-center border-b border-[#30363D] pb-4">
            <h2 className="text-2xl font-extrabold text-white">{selected.title}</h2>
            <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1.5 bg-[#0D1117] px-3 py-1 rounded-full border border-[#30363D]">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Due: {selected.dueDate}</span>
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Instructions:</h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#0D1117] p-4 rounded-xl border border-[#30363D] font-medium">
              {selected.instructions}
            </p>
          </div>

          {selected.mentorFeedback && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Mentor Review • {selected.score}</span>
              </div>
              <p className="text-slate-300 italic pl-6">&ldquo;{selected.mentorFeedback}&rdquo;</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-[#30363D]">
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Github className="w-4 h-4 text-blue-400" />
              <span>Submission Link:</span>
            </h3>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1.5">GitHub Repository URL *</label>
              <input
                type="url"
                required
                placeholder="https://github.com/user/repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] focus:border-[#3B82F6] text-xs text-white placeholder-slate-500 outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40"
            >
              <Send className="w-4 h-4" />
              <span>Submit Assignment & Boost Streak (+150 XP)</span>
            </button>
          </form>
        </div>
      </div>
    </StudentLayout>
  );
}
