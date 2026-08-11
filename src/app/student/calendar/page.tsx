'use client';

import React from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { Calendar, Clock, Tag } from 'lucide-react';

export default function StudentCalendarPage() {
  const events = [
    { day: 10, month: 'AUG', title: 'React Advanced Workshop', type: 'Live class', badge: 'bg-purple-950/80 text-purple-300 border-purple-500/30' },
    { day: 12, month: 'AUG', title: 'Build React Login Page', type: 'Assignment', badge: 'bg-blue-950/80 text-blue-300 border-blue-500/30' },
    { day: 14, month: 'AUG', title: 'Python Data Analysis Exam', type: 'Exam', badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' },
    { day: 15, month: 'AUG', title: 'API Integration Review', type: 'Internship task', badge: 'bg-amber-950/80 text-amber-300 border-amber-500/30' },
    { day: 18, month: 'AUG', title: 'Portfolio Website Deadline', type: 'Deadline', badge: 'bg-red-950/80 text-red-300 border-red-500/30' },
  ];

  return (
    <StudentLayout title="Student Calendar" subtitle="Track live classes, assignment submission deadlines, module exams, & internship milestones.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.title}
            className="bg-[#161B22] border border-[#30363D] hover:border-[#3B82F6]/50 transition-all rounded-2xl p-6 space-y-4 shadow-xl group"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-extrabold text-white font-mono flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>{evt.month} {evt.day}</span>
              </span>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${evt.badge}`}>
                {evt.type}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white group-hover:text-blue-300 transition-colors">
              {evt.title}
            </h3>
          </div>
        ))}
      </div>
    </StudentLayout>
  );
}
