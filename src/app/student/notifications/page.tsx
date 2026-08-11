'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Bell, Clock, Award, Radio } from 'lucide-react';

export default function NotificationsPage() {
  const notifications = [
    { title: 'Assignment deadline tomorrow', sub: 'Build React Login Page due Aug 12', time: '1h ago' },
    { title: 'Certificate generated', sub: 'Full Stack Development Experience credential issued', time: '3h ago' },
    { title: 'New React class added', sub: 'React Advanced Workshop starting Today at 10:00 AM', time: '5h ago' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111827] selection:bg-[#2563EB] selection:text-white font-sans">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="py-8 border-b border-[#E4E7EC] text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-[#0B1F33]">Notifications</h1>
            <p className="text-xs text-[#667085]">Stay updated on class reminders, assignments, and certificates.</p>
          </div>

          <div className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="card-clean p-4 flex justify-between items-center text-xs">
                <div>
                  <p className="font-bold text-[#0B1F33]">{n.title}</p>
                  <p className="text-[#667085] mt-0.5">{n.sub}</p>
                </div>
                <span className="text-[#667085] font-mono">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
