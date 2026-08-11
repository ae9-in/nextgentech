'use client';

import React, { useState } from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import confetti from 'canvas-confetti';
import { Code2, Play, CheckCircle2, Terminal, Sparkles } from 'lucide-react';

export default function CodeLabPage() {
  const [tech, setTech] = useState('JavaScript');
  const [code, setCode] = useState('function reverseString(str) {\n  return str.split("").reverse().join("");\n}');
  const [results, setResults] = useState<any[] | null>(null);

  const handleRun = () => {
    setResults([
      { id: 1, text: 'reverseString("hello") === "olleh"', passed: true },
      { id: 2, text: 'reverseString("world") === "dlrow"', passed: true },
      { id: 3, text: 'reverseString("") === ""', passed: true },
    ]);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <StudentLayout title="Online Code Lab" subtitle="Practice algorithm challenges & test code live against automated test runner cases.">
      <div className="space-y-6">
        {/* Language Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#30363D] pb-3">
          {['JavaScript', 'Python', 'React', 'SQL', 'HTML/CSS', 'Node.js'].map((t) => {
            const isActive = tech === t;
            return (
              <button
                key={t}
                onClick={() => setTech(t)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-600/25 border border-[#3B82F6]'
                    : 'bg-[#161B22] text-slate-400 hover:text-white border border-[#30363D] hover:bg-[#1F2937]'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Challenge Info */}
          <div className="lg:col-span-5 bg-[#161B22] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold">
              <Code2 className="w-4 h-4" />
              <span>Challenge #104</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Reverse String</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Write a function <code className="bg-[#0D1117] text-blue-400 px-1.5 py-0.5 rounded font-mono">reverseString(str)</code> that takes a string argument and returns the string in reversed order.
            </p>
            <div className="p-4 rounded-xl bg-[#0D1117] border border-[#30363D] text-xs font-mono space-y-2">
              <p className="text-slate-300 font-bold">Test Case 1: reverseString("hello")</p>
              <p className="text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Expected Output: "olleh"</span>
              </p>
            </div>
          </div>

          {/* Right Editor & Console */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[#0D1117] border border-[#30363D] p-5 font-mono text-xs text-slate-100 rounded-2xl shadow-xl space-y-2">
              <div className="flex items-center justify-between pb-3 border-b border-[#30363D] text-[11px] text-slate-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>solution.js</span>
                </span>
                <span className="text-slate-500">UTF-8 • JavaScript</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                className="w-full bg-transparent focus:outline-none resize-none text-emerald-300 font-mono text-xs leading-relaxed"
              />
            </div>

            <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>Output Console</span>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleRun}
                    className="px-4 py-2 rounded-xl bg-[#1F2937] hover:bg-[#374151] text-white border border-[#30363D] text-xs font-semibold transition-colors"
                  >
                    Run Tests
                  </button>
                  <button
                    onClick={handleRun}
                    className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Submit Solution</span>
                  </button>
                </div>
              </div>

              {results && (
                <div className="space-y-2 font-mono text-xs">
                  {results.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-xl bg-emerald-950/50 text-emerald-300 border border-emerald-500/30 flex justify-between items-center"
                    >
                      <span>Test {r.id}: {r.text}</span>
                      <span className="font-bold text-emerald-400">PASSED ✓</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
