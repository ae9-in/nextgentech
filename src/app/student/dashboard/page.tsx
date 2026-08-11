'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { useUser } from '@/context/UserContext';
import { apiClient } from '@/lib/api-client';
import {
  BookOpen,
  Clock,
  TrendingUp,
} from 'lucide-react';

export default function StudentDashboardPage() {
  const { user, enrollCourse } = useUser();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await apiClient.get('/api/v1/student/dashboard');
        setDashboardData(data);
      } catch (err) {
        console.error('Failed to load live student dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const studentName = user?.name || dashboardData?.profile?.name || 'Student';
  const studentTrack = user?.track || dashboardData?.profile?.track || 'Full Stack Development';
  const enrolledCount = dashboardData?.stats?.enrolledCoursesCount ?? user?.enrolledCoursesCount ?? 0;
  const weeklyHours = dashboardData?.stats?.weeklyHours ?? user?.weeklyHours ?? 0;
  const aggregateScore = dashboardData?.stats?.aggregateScore ? `${dashboardData.stats.aggregateScore}%` : (user?.aggregateScore ? `${user.aggregateScore}%` : '0%');

  const activeCourse = dashboardData?.activeCourse || null;

  return (
    <StudentLayout
      title={`Welcome, ${studentName}! 👋`}
      subtitle={`Your personal student workspace for ${studentTrack}.`}
    >
      {/* Core Student Metrics Grid - LIVE DATA FROM DB */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="card-glass-dark p-6 space-y-2 bg-[#161B22] border border-[#30363D]">
          <div className="flex justify-between text-xs font-mono text-slate-400 font-bold">
            <span>ENROLLED COURSES</span>
            <BookOpen className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <p className="text-3xl font-extrabold text-[#F5F7FA]">{loading ? '...' : `${enrolledCount} ${enrolledCount === 1 ? 'Course' : 'Courses'}`}</p>
          <p className="text-xs text-slate-400 font-normal">
            {enrolledCount > 0 ? `${enrolledCount} Active Track In Progress` : 'No active enrollments yet'}
          </p>
        </div>

        <div className="card-glass-dark p-6 space-y-2 bg-[#161B22] border border-[#30363D]">
          <div className="flex justify-between text-xs font-mono text-slate-400 font-bold">
            <span>WEEKLY HOURS</span>
            <Clock className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <p className="text-3xl font-extrabold text-[#F5F7FA]">{loading ? '...' : `${weeklyHours.toFixed(1)} hrs`}</p>
          <p className="text-xs text-slate-400 font-normal">
            {weeklyHours > 0 ? 'Logged Learning Session' : 'Start learning to log hours'}
          </p>
        </div>

        <div className="card-glass-dark p-6 space-y-2 bg-[#161B22] border border-[#30363D]">
          <div className="flex justify-between text-[#3B82F6] text-xs font-mono font-bold">
            <span>AGGREGATE SCORE</span>
            <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <p className="text-3xl font-extrabold text-[#F5F7FA]">{loading ? '...' : aggregateScore}</p>
          <p className="text-xs text-slate-400 font-normal">
            {aggregateScore !== '0%' ? 'Personal Performance Rating' : 'Complete tests to calculate score'}
          </p>
        </div>
      </div>

      {/* Continue / Enroll Learning Box */}
      <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#30363D] pb-4">
          <div>
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase">Target Track • {studentTrack}</span>
            <h2 className="text-2xl font-extrabold text-[#F5F7FA] mt-1">{activeCourse?.courseTitle || `${studentTrack} Program`}</h2>
          </div>
          {enrolledCount > 0 ? (
            <Link href={`/student/course/${activeCourse?.courseId || 'c1'}`} className="btn-primary px-6 py-2.5 text-xs font-semibold shadow-md">
              Continue Learning →
            </Link>
          ) : (
            <button onClick={() => enrollCourse()} className="btn-primary px-6 py-2.5 text-xs font-semibold shadow-md">
              Enroll & Start Learning →
            </button>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs font-mono font-bold">
            <span className="text-slate-300">Module 1: Orientation & Tech Fundamentals</span>
            <span className="text-[#3B82F6]">{activeCourse ? `${activeCourse.progressPercentage}% Completed` : '0% Completed'}</span>
          </div>
          <div className="h-2 rounded-full bg-[#0D1117] border border-[#30363D] overflow-hidden">
            <div
              className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
              style={{ width: `${activeCourse?.progressPercentage || 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dashboard 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-6">
          <div className="card-glass-dark p-6 space-y-4 bg-[#161B22] border border-[#30363D]">
            <div className="flex justify-between items-center border-b border-[#30363D] pb-3">
              <h3 className="text-xs font-mono font-bold text-[#F5F7FA] uppercase">Upcoming Live Workshop</h3>
              <Link href="/student/live-classes" className="text-xs text-[#3B82F6] font-bold">View All</Link>
            </div>
            <div className="p-4 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs space-y-1">
              <p className="font-bold text-[#F5F7FA]">{studentTrack} Live Workshop</p>
              <p className="text-slate-400 font-mono">Scheduled @ 10:00 AM IST (Lead Mentor)</p>
            </div>
          </div>

          <div className="card-glass-dark p-6 space-y-4 bg-[#161B22] border border-[#30363D]">
            <div className="flex justify-between items-center border-b border-[#30363D] pb-3">
              <h3 className="text-xs font-mono font-bold text-[#F5F7FA] uppercase">Pending Assignments</h3>
              <Link href="/student/assignments" className="text-xs text-[#3B82F6] font-bold">View All</Link>
            </div>
            <div className="p-4 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs space-y-1">
              <p className="font-bold text-[#F5F7FA]">Module 1 Project Submission</p>
              <p className="text-slate-400 font-mono">
                {dashboardData?.pendingSubmissionsCount > 0 ? `${dashboardData.pendingSubmissionsCount} Pending Review` : 'Status: Ready to start'}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="card-glass-dark p-6 space-y-4 bg-[#161B22] border border-[#30363D]">
            <div className="flex justify-between items-center border-b border-[#30363D] pb-3">
              <h3 className="text-xs font-mono font-bold text-[#F5F7FA] uppercase">Internship Progress</h3>
              <Link href="/student/internship/1" className="text-xs text-[#3B82F6] font-bold">Open Workspace</Link>
            </div>
            <div className="p-4 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs space-y-1">
              <p className="font-bold text-[#F5F7FA]">{dashboardData?.activeInternship?.internshipTitle || `${studentTrack} Internship`}</p>
              <p className="text-slate-400 font-mono">
                {dashboardData?.activeInternship ? `Status: ${dashboardData.activeInternship.status}` : 'Assigned Project: Workspace (Week 0 / 8)'}
              </p>
            </div>
          </div>

          <div className="card-glass-dark p-6 space-y-4 bg-[#161B22] border border-[#30363D]">
            <div className="flex justify-between items-center border-b border-[#30363D] pb-3">
              <h3 className="text-xs font-mono font-bold text-[#F5F7FA] uppercase">Certificates & Achievements</h3>
              <Link href="/student/certificates" className="text-xs text-[#3B82F6] font-bold">View All</Link>
            </div>
            <div className="p-4 rounded-lg bg-[#0D1117] border border-[#30363D] text-xs space-y-1">
              <p className="font-bold text-[#F5F7FA]">{studentTrack} Credential</p>
              <p className="text-slate-400 font-mono">
                {dashboardData?.certificatesCount > 0 ? `${dashboardData.certificatesCount} Verified Credential(s) Issued` : 'Complete track to earn credential'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
