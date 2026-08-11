'use client';

import React, { useState } from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';

export default function AiAssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', sender: 'ai', text: '👋 Hi Sai! Ask me anything about React, code errors, or interview practice.' },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), sender: 'user', text: input }]);
    setInput('');
  };

  return (
    <StudentLayout title="AI Learning Assistant" subtitle="Instant code debugging, concept explanations, and practice quiz generators.">
      <div className="card-glass-light p-6 space-y-4 min-h-[400px] flex flex-col justify-between max-w-4xl mx-auto">
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`p-4 rounded-xl text-xs leading-relaxed font-medium max-w-lg ${m.sender === 'user' ? 'bg-[#0F172A] text-white ml-auto shadow-md' : 'bg-white border border-[#E2E8F0] text-[#0F172A]'}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-4 border-t border-[#E2E8F0]">
          <input type="text" placeholder="Ask AI tutor..." value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-xs text-[#0F172A]" />
          <button onClick={handleSend} className="btn-primary px-6 py-2.5 text-xs shadow-md">Send</button>
        </div>
      </div>
    </StudentLayout>
  );
}
