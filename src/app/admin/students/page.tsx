'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiClient } from '@/lib/api-client';

export default function AdminStudentsPage() {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async (query = '') => {
    setLoading(true);
    try {
      const res = await apiClient.get('/api/v1/users', { role: 'STUDENT', search: query });
      setStudents(res.data || res || []);
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(search);
  }, [search]);

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
      await apiClient.patch(`/api/v1/users/${id}`, { status: newStatus });
      fetchStudents(search);
    } catch (err: any) {
      alert(err.message || 'Failed to update student status');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex justify-between items-center border-b border-[#30363D] pb-6">
            <h1 className="text-3xl font-extrabold text-[#F5F7FA]">Student Management</h1>
            <span className="text-xs font-mono font-semibold text-[#3B82F6] bg-[#161B22] px-3 py-1 rounded-md border border-[#30363D]">
              Database Synchronized
            </span>
          </div>

          <div className="card-glass-dark p-6 space-y-4 bg-[#161B22] border border-[#30363D]">
            <input
              type="text"
              placeholder="Search students in database..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs text-[#F5F7FA] max-w-xs"
            />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#30363D] text-slate-400">
                    <th className="py-2 px-3">Student</th>
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">College</th>
                    <th className="py-2 px-3">Course / Track</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363D]">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-slate-500">Loading database records...</td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-slate-500">No students found</td>
                    </tr>
                  ) : (
                    students.map((s) => (
                      <tr key={s._id}>
                        <td className="py-3 px-3 font-bold text-[#F5F7FA]">{s.name}</td>
                        <td className="py-3 px-3 text-slate-400">{s.email}</td>
                        <td className="py-3 px-3 text-slate-300">{s.college || 'N/A'}</td>
                        <td className="py-3 px-3 text-[#3B82F6]">{s.track || 'Full Stack Development'}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${s.status === 'ACTIVE' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-red-950/60 text-red-300 border border-red-800'}`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button onClick={() => toggleStatus(s._id, s.status)} className="btn-secondary px-2.5 py-1 text-[10px]">
                            {s.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
