'use client';

import React from 'react';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { User, Mail, Save } from 'lucide-react';

export default function StudentSettingsPage() {
  return (
    <StudentLayout title="Account Settings" subtitle="Manage profile details, security password, and notification preferences.">
      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-8 space-y-6 shadow-xl">
        <div className="space-y-4">
          <h2 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 border-b border-[#30363D] pb-3">
            <User className="w-4 h-4 text-blue-400" />
            <span>Profile Information</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Full Name</label>
              <input
                type="text"
                defaultValue="Sai Varshith"
                className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] focus:border-[#3B82F6] text-xs text-white outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Email Address</label>
              <input
                type="email"
                defaultValue="sai@college.edu"
                className="w-full px-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] focus:border-[#3B82F6] text-xs text-white outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <button className="px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/25 flex items-center gap-2">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </StudentLayout>
  );
}
