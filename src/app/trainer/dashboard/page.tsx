'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiClient } from '@/lib/api-client';

export default function TrainerDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrainerDashboard() {
      try {
        const res = await apiClient.get('/api/v1/trainer/dashboard');
        setData(res);
      } catch (err) {
        console.error('Failed to load trainer dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTrainerDashboard();
  }, []);

  const handleGrade = async (assignmentId: string, studentId: string) => {
    try {
      await apiClient.patch(`/api/v1/assignments/${assignmentId}/submissions?studentId=${studentId}`, {
        score: 95,
        feedback: 'Excellent clean code & database integration!',
        status: 'APPROVED',
      });
      alert('Submission graded successfully! Student dashboard updated.');
      const res = await apiClient.get('/api/v1/trainer/dashboard');
      setData(res);
    } catch (err: any) {
      alert(err.message || 'Failed to grade submission');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="border-b border-[#30363D] pb-6 flex justify-between items-center">
            <div>
              <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase">LEAD INSTRUCTOR WORKSPACE</span>
              <h1 className="text-3xl font-extrabold text-[#F5F7FA] mt-1">Trainer Dashboard</h1>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-400 bg-[#161B22] px-3 py-1 rounded-md border border-[#30363D]">
              ✓ Database Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-glass-dark p-6 space-y-3 bg-[#161B22] border border-[#30363D]">
              <h2 className="text-sm font-bold text-[#F5F7FA] font-mono">Assigned Courses (Database)</h2>
              {loading ? (
                <p className="text-xs text-slate-400 font-mono">Loading courses...</p>
              ) : (data?.assignedCourses || []).length === 0 ? (
                <p className="text-xs text-slate-400 font-mono">No assigned courses</p>
              ) : (
                (data?.assignedCourses || []).map((c: any) => (
                  <div key={c._id} className="p-3 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs">
                    <p className="font-bold text-[#F5F7FA]">{c.title}</p>
                    <p className="text-slate-400 font-mono">{c.studentsEnrolled} Students Enrolled</p>
                  </div>
                ))
              )}
            </div>

            <div className="card-glass-dark p-6 space-y-3 bg-[#161B22] border border-[#30363D]">
              <h2 className="text-sm font-bold text-[#F5F7FA] font-mono">Pending Grading Queue (Database)</h2>
              {loading ? (
                <p className="text-xs text-slate-400 font-mono">Loading queue...</p>
              ) : (data?.pendingGradingQueue || []).length === 0 ? (
                <p className="text-xs text-slate-400 font-mono">No pending submissions to grade 🎉</p>
              ) : (
                (data?.pendingGradingQueue || []).map((s: any) => (
                  <div key={s._id} className="p-3 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs space-y-2">
                    <p className="font-bold text-[#F5F7FA]">{s.studentName} • {s.assignmentTitle}</p>
                    <button
                      onClick={() => handleGrade(s.assignmentId, s.studentId)}
                      className="btn-primary px-3 py-1 text-[10px]"
                    >
                      Grade Submission (95/100)
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="card-glass-dark p-6 space-y-3 bg-[#161B22] border border-[#30363D]">
              <h2 className="text-sm font-bold text-[#F5F7FA] font-mono">Upcoming Live Stream</h2>
              <div className="p-3 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs space-y-2">
                <p className="font-bold text-red-400">🔴 React Advanced Workshop</p>
                <button className="btn-primary px-3 py-1 text-[10px]">Start Stream</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
