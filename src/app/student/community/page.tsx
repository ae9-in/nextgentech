'use client';

import React from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { MessageSquare, ThumbsUp, MessageCircle, User } from 'lucide-react';

export default function CommunityPage() {
  const posts = [
    { id: 'p1', author: 'Rahul Sharma', category: 'React', title: 'How do you optimize re-renders in large React 19 forms?', content: 'Is useMemo or React Compiler enough for multi-step forms?', likes: 18, replies: 7 },
    { id: 'p2', author: 'Ananya Patel', category: 'AI', title: 'LangChain vs OpenAI Assistants API for RAG PDF auditing?', content: 'Which has better latency for 50+ page technical documents?', likes: 24, replies: 12 },
  ];

  return (
    <StudentLayout title="Student Community" subtitle="Ask technical questions, share project breakthroughs, and collaborate with mentors.">
      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="bg-[#161B22] border border-[#30363D] hover:border-[#3B82F6]/50 transition-all rounded-2xl p-6 space-y-3 shadow-xl group">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>{p.author}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/30 font-bold">
                {p.category}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white group-hover:text-blue-300 transition-colors">{p.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{p.content}</p>
            <div className="flex gap-4 pt-2 text-xs font-mono text-slate-400 border-t border-[#30363D]">
              <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                <ThumbsUp className="w-3.5 h-3.5" /> {p.likes} Likes
              </span>
              <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                <MessageCircle className="w-3.5 h-3.5" /> {p.replies} Replies
              </span>
            </div>
          </div>
        ))}
      </div>
    </StudentLayout>
  );
}
