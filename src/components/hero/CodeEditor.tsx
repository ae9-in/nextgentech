'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, Play, Copy, Sparkles, Cpu, Layers } from 'lucide-react';

export const CodeEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'app' | 'agent' | 'terminal'>('app');
  const [typedTextIndex, setTypedTextIndex] = useState(0);
  const [terminalStatus, setTerminalStatus] = useState<'idle' | 'building' | 'deployed'>('idle');

  const appCodeLines = [
    '// NextGen Tech 1-Day Full Stack Build',
    'import { useState } from "react";',
    'import { deployToVercel } from "@nextgen/cloud";',
    '',
    'export default function StudentApp() {',
    '  const [status, setStatus] = useState("building");',
    '  ',
    '  const handleDeploy = async () => {',
    '    const url = await deployToVercel();',
    '    setStatus(`Shipped live to ${url}`);',
    '  };',
    '',
    '  return <NextGenCard status={status} onDeploy={handleDeploy} />;',
    '}',
  ];

  const agentCodeLines = [
    '# NextGen AI Agent Builder Sprint',
    'import openai',
    'from langchain.agents import initialize_agent',
    '',
    'class AutonomousCoder:',
    '    def __init__(self, model="gpt-4o"):',
    '        self.agent = initialize_agent(model=model)',
    '        ',
    '    def auto_fix_bugs(self, repo_url):',
    '        return self.agent.run(f"Audit {repo_url}")',
    '',
    'print("🚀 AI Agent Live in 1-Day Workshop")'
  ];

  // Auto-typing simulator for IDE
  useEffect(() => {
    const timer = setInterval(() => {
      setTypedTextIndex((prev) => (prev < appCodeLines.length ? prev + 1 : prev));
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const runDeploySimulation = () => {
    setActiveTab('terminal');
    setTerminalStatus('building');
    setTimeout(() => {
      setTerminalStatus('deployed');
    }, 1800);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Floating Tech Orbit Badges */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-200 text-xs font-mono shadow-xl backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-bold text-white">React 19</span> + Next.js 14
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-6 -right-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 text-xs font-mono shadow-xl backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Deployed in <strong className="text-white">1 Day</strong></span>
      </motion.div>

      {/* Main IDE Window */}
      <div className="rounded-2xl border border-purple-500/30 bg-[#0b0d17]/95 shadow-2xl shadow-purple-900/20 overflow-hidden backdrop-blur-2xl">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0f1120] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
              nextgen-tech-workspace
            </span>
          </div>

          {/* File Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('app')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                activeTab === 'app' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              App.tsx
            </button>
            <button
              onClick={() => setActiveTab('agent')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                activeTab === 'agent' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              agent.py
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1 text-xs font-mono rounded-md transition-colors flex items-center gap-1 ${
                activeTab === 'terminal' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>Terminal</span>
            </button>
          </div>

          {/* Run / Deploy Button */}
          <button
            onClick={runDeploySimulation}
            className="px-3 py-1 text-xs font-bold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1 transition-all shadow-md shadow-cyan-400/20"
          >
            <Play className="w-3 h-3 fill-slate-900" />
            <span className="hidden sm:inline">Deploy</span>
          </button>
        </div>

        {/* Code Content Area */}
        <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm min-h-[260px] max-h-[320px] overflow-y-auto leading-relaxed text-slate-300">
          {activeTab === 'app' && (
            <div className="space-y-1">
              {appCodeLines.slice(0, typedTextIndex).map((line, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">{idx + 1}</span>
                  <span className={line.startsWith('//') ? 'text-slate-500 italic' : line.includes('import') ? 'text-purple-400' : line.includes('return') || line.includes('export') ? 'text-cyan-400' : 'text-slate-200'}>
                    {line}
                  </span>
                </div>
              ))}
              {typedTextIndex < appCodeLines.length && (
                <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-9" />
              )}
            </div>
          )}

          {activeTab === 'agent' && (
            <div className="space-y-1">
              {agentCodeLines.map((line, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-slate-600 select-none w-5 text-right">{idx + 1}</span>
                  <span className={line.startsWith('#') ? 'text-emerald-400 italic' : line.includes('import') || line.includes('from') ? 'text-purple-400' : 'text-slate-200'}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'terminal' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-cyan-400 font-bold">$</span>
                <span>npm run deploy --production</span>
              </div>

              {terminalStatus === 'idle' && (
                <p className="text-slate-500 italic">Click "Deploy" button above to test build execution...</p>
              )}

              {terminalStatus === 'building' && (
                <div className="space-y-1 text-purple-300 animate-pulse">
                  <p>⚡ Compiling NextGen TypeScript modules...</p>
                  <p>📦 Bundling Tailwind CSS & Framer Motion assets...</p>
                  <p>🔒 Running automated security tests...</p>
                </div>
              )}

              {terminalStatus === 'deployed' && (
                <div className="space-y-2">
                  <div className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Build succeed in 1.18s! Zero errors.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                    <p className="text-xs text-slate-400">Live URL Created:</p>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-cyan-400 font-bold underline hover:text-cyan-300 flex items-center gap-1 mt-0.5"
                    >
                      <span>https://student-app.nextgentech.dev</span>
                      <Sparkles className="w-3 h-3 text-purple-400" />
                    </a>
                  </div>
                  <p className="text-slate-400 text-[11px]">🎉 Certificate badge automatically attached to student portal.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom IDE Footer Bar */}
        <div className="px-4 py-2 bg-[#0c0e18] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Server Ready
            </span>
            <span className="hidden sm:inline">UTF-8</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>NextGen Engine v4.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
