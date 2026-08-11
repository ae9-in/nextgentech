'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import confetti from 'canvas-confetti';
import { apiClient } from '@/lib/api-client';
import {
  Users,
  BookOpen,
  LogOut,
  LayoutDashboard,
  UserCheck,
  Award,
  Plus,
  Sparkles,
  ShieldCheck,
  Inbox,
  Phone,
  GraduationCap,
  Lock,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Printer,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const pathname = usePathname();

  // Admin Security Password Lock State
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard Data States
  const [data, setData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [issuedCertificates, setIssuedCertificates] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'students' | 'certificates'>('overview');
  const [loading, setLoading] = useState(true);

  // Custom Certificate Generation Form State
  const [certStudentName, setCertStudentName] = useState('');
  const [certProgramName, setCertProgramName] = useState('1-Day Full Stack Experience');
  const [certType, setCertType] = useState('1-Day Experience Credential');
  const [certIssueDate, setCertIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [certSignature, setCertSignature] = useState('NextGen Tech Certification Authority');
  const [generatedCert, setGeneratedCert] = useState<any>(null);

  // Quick Form States for Admin Actions
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState('Development');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');

  // Check existing session authentication on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPass = sessionStorage.getItem('nxtgen_admin_passcode');
      if (storedPass === 'Nextgentech') {
        setIsUnlocked(true);
      }
    }
  }, []);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [appRes, userRes, dashRes, certRes] = await Promise.all([
        fetch('/api/v1/applications').then((r) => r.json()).catch(() => ({ data: [] })),
        fetch('/api/v1/users?role=STUDENT').then((r) => r.json()).catch(() => ({ data: [] })),
        apiClient.get('/api/v1/admin/dashboard').catch(() => null),
        fetch('/api/v1/certificates').then((r) => r.json()).catch(() => ({ data: [] })),
      ]);

      if (appRes?.data) setApplications(appRes.data);
      else if (Array.isArray(appRes)) setApplications(appRes);

      if (userRes?.data) setStudents(userRes.data);
      else if (Array.isArray(userRes)) setStudents(userRes);

      if (certRes?.data) setIssuedCertificates(certRes.data);
      else if (Array.isArray(certRes)) setIssuedCertificates(certRes);

      if (dashRes) setData(dashRes);
    } catch (err) {
      console.error('Failed to load admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      loadAllAdminData();
    }
  }, [isUnlocked]);

  // Combined Students List (Users + Applicants) so all student names are available
  const combinedStudentsList = [
    ...students.map((s) => ({ id: s._id, name: s.name, email: s.email, college: s.college })),
    ...applications.map((a) => ({ id: a._id, name: a.fullName, email: a.email, college: a.college })),
  ].filter((v, i, a) => a.findIndex((t) => t.email === v.email) === i);

  // Handle Password Authentication
  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'Nextgentech') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('nxtgen_admin_passcode', 'Nextgentech');
      }
      setIsUnlocked(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect admin passcode. Access denied.');
      setPasscode('');
    }
  };

  const handleLockConsole = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('nxtgen_admin_passcode');
    }
    setIsUnlocked(false);
    setPasscode('');
  };

  const triggerMessage = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(''), 4000);
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    try {
      await apiClient.post('/api/v1/courses', {
        title: newCourseTitle,
        category: newCourseCategory,
        level: 'Beginner',
        price: 999,
        published: true,
      });
      setNewCourseTitle('');
      triggerMessage(`✅ Course "${newCourseTitle}" created and published live!`);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to create course');
    }
  };

  // Generate & Issue Custom Certificate
  const handleGenerateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalStudentName = certStudentName.trim();
    if (!finalStudentName) {
      alert('Please select or type a student name');
      return;
    }

    try {
      const res = await fetch('/api/v1/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: finalStudentName,
          programName: certProgramName,
          certificateType: certType,
          issueDate: certIssueDate,
          customSignature: certSignature,
        }),
      }).then((r) => r.json());

      if (res.data) {
        setGeneratedCert(res.data);
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        triggerMessage(`📜 Certificate ${res.data.certificateId} generated for ${finalStudentName}!`);
        loadAllAdminData();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to generate certificate');
    }
  };

  const handleToggleStudentStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
      await apiClient.patch(`/api/v1/users/${id}`, { status: newStatus });
      triggerMessage(`Updated student status to ${newStatus}`);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to update student status');
    }
  };

  const handleWipeAllStudentData = async () => {
    if (!confirm('Are you sure you want to permanently clear all student accounts, slot applications, and test certificates?')) {
      return;
    }
    try {
      const res = await fetch('/api/v1/admin/clear-students', { method: 'POST' }).then((r) => r.json());
      triggerMessage(`🗑️ Database Wiped Clean: Cleared ${res.data?.deletedUsersCount || 0} students and ${res.data?.deletedLeadsCount || 0} applications!`);
      loadAllAdminData();
    } catch (err: any) {
      alert(err.message || 'Failed to wipe student data');
    }
  };

  // IF LOCKED: Display Password Security Gateway Screen
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] flex items-center justify-center p-4 selection:bg-[#3B82F6] selection:text-white font-sans">
        <div className="max-w-md w-full bg-[#161B22] border border-[#30363D] rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#3B82F6]" />

          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#1F2937] text-[#3B82F6] flex items-center justify-center mx-auto border border-[#30363D] shadow-inner">
              <ShieldCheck className="w-7 h-7 text-[#3B82F6]" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Admin Portal Security
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Enter master administrator password to unlock console.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-mono font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlockAdmin} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[11px] font-mono font-semibold text-slate-300 uppercase tracking-wider">
                Admin Password *
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter password..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0D1117] border border-[#30363D] focus:border-[#3B82F6] text-white text-sm outline-none transition-colors font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <span>Unlock Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#30363D] text-center">
            <Link
              href="/"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // IF UNLOCKED: Render Full Admin Dashboard Console
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans flex">
      {/* Sidebar Admin Navigation */}
      <aside className="w-64 bg-[#161B22] border-r border-[#30363D] flex flex-col justify-between p-6 shrink-0 hidden md:flex">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center font-bold text-lg">
              N
            </div>
            <div>
              <h2 className="font-extrabold text-[#F5F7FA] text-sm tracking-tight">Admin Portal</h2>
              <p className="text-[10px] font-mono text-slate-400">NextGen Control Hub</p>
            </div>
          </div>

          <nav className="space-y-1 font-mono text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors text-left ${
                activeTab === 'overview'
                  ? 'bg-[#3B82F6] text-white font-bold'
                  : 'text-slate-400 hover:bg-[#1F2937] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors text-left justify-between ${
                activeTab === 'applications'
                  ? 'bg-[#3B82F6] text-white font-bold'
                  : 'text-slate-400 hover:bg-[#1F2937] hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Slot Applications</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-900/80 text-blue-200 text-[10px] font-bold">
                {applications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors text-left ${
                activeTab === 'students'
                  ? 'bg-[#3B82F6] text-white font-bold'
                  : 'text-slate-400 hover:bg-[#1F2937] hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Student Roster</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors text-left ${
                activeTab === 'certificates'
                  ? 'bg-[#3B82F6] text-white font-bold'
                  : 'text-slate-400 hover:bg-[#1F2937] hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Certificates Hub</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#30363D] space-y-2">
          <button
            onClick={handleLockConsole}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-mono text-amber-400 hover:bg-amber-950/40 rounded-lg transition-colors text-left font-bold border border-amber-500/30"
          >
            <Lock className="w-4 h-4 shrink-0" />
            <span>Lock Admin Console</span>
          </button>

          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Return to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#30363D] pb-6">
          <div>
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase tracking-widest">
              SUPER ADMIN DASHBOARD
            </span>
            <h1 className="text-3xl font-extrabold text-[#F5F7FA] mt-2">Platform Administration</h1>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={handleWipeAllStudentData}
              className="px-3.5 py-1.5 rounded-lg bg-red-950/70 text-red-300 hover:bg-red-900 border border-red-800 font-bold flex items-center gap-1.5 transition-colors"
              title="Clear all test student data from database"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Clear Student Data</span>
            </button>

            <button
              onClick={handleLockConsole}
              className="px-3.5 py-1.5 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800 font-bold flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Lock Console</span>
            </button>

            <span className="px-3.5 py-1.5 rounded-lg bg-[#161B22] text-emerald-400 border border-[#30363D] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MongoDB Connected</span>
            </span>
          </div>
        </div>

        {actionSuccessMsg && (
          <div className="p-4 rounded-lg bg-[#161B22] border border-[#30363D] text-[#F5F7FA] text-xs font-mono font-bold shadow-md">
            {actionSuccessMsg}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div className="card-glass-dark p-6 space-y-2 bg-[#161B22] border border-[#30363D]">
                <p className="text-xs font-mono text-slate-400 uppercase">1-Day Applications</p>
                <p className="text-3xl font-extrabold text-blue-400">
                  {loading ? '...' : applications.length}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">Live Form Submissions</p>
              </div>

              <div className="card-glass-dark p-6 space-y-2 bg-[#161B22] border border-[#30363D]">
                <p className="text-xs font-mono text-slate-400 uppercase">Total Students</p>
                <p className="text-3xl font-extrabold text-[#F5F7FA]">
                  {loading ? '...' : combinedStudentsList.length}
                </p>
                <p className="text-[11px] text-[#3B82F6] font-mono">Registered Roster</p>
              </div>

              <div className="card-glass-dark p-6 space-y-2 bg-[#161B22] border border-[#30363D]">
                <p className="text-xs font-mono text-slate-400 uppercase">Certificates Issued</p>
                <p className="text-3xl font-extrabold text-amber-400">
                  {loading ? '...' : issuedCertificates.length}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">Verified Credentials</p>
              </div>

              <div className="card-glass-dark p-6 space-y-2 bg-[#161B22] border border-[#30363D]">
                <p className="text-xs font-mono text-slate-400 uppercase">Total Revenue</p>
                <p className="text-3xl font-extrabold text-[#F5F7FA]">
                  {loading ? '...' : data?.stats?.totalRevenue ?? '₹0.0L'}
                </p>
                <p className="text-[11px] text-[#3B82F6] font-mono">Verified Receipts</p>
              </div>
            </div>

            {/* CUSTOM CERTIFICATE GENERATOR & PREVIEW */}
            <div className="card-glass-dark p-8 bg-[#161B22] border border-[#30363D] rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#30363D] pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-[#F5F7FA] flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Instant Custom Certificate Generator</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Enter student name and details to automatically generate and issue a verified NextGen Tech credential.
                  </p>
                </div>
                <span className="px-3 py-1 rounded bg-amber-950/80 text-amber-300 text-xs font-mono font-bold border border-amber-800">
                  Auto-Generated Pass ID
                </span>
              </div>

              <form onSubmit={handleGenerateCertificate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    1. Select Registered Student OR Type Name
                  </label>
                  <div className="space-y-2">
                    <select
                      value={certStudentName}
                      onChange={(e) => setCertStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white focus:outline-none focus:border-[#3B82F6]"
                    >
                      <option value="">-- Pick from Registered Students --</option>
                      {combinedStudentsList.map((s, idx) => (
                        <option key={idx} value={s.name}>
                          {s.name} ({s.email})
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Or type custom name (e.g. Sai Varshith)..."
                      value={certStudentName}
                      onChange={(e) => setCertStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    2. Program / Track Title
                  </label>
                  <select
                    value={certProgramName}
                    onChange={(e) => setCertProgramName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white focus:outline-none focus:border-[#3B82F6] mb-2"
                  >
                    <option value="1-Day Full Stack MERN Experience">1-Day Full Stack MERN Experience</option>
                    <option value="1-Day AI Agent & LLM Builder">1-Day AI Agent & LLM Builder</option>
                    <option value="Simulated Engineering Internship">Simulated Engineering Internship Track</option>
                    <option value="7-Day Intensive Web Development Bootcamp">7-Day Intensive Web Development Bootcamp</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Custom track name..."
                    value={certProgramName}
                    onChange={(e) => setCertProgramName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider text-[11px]">
                    3. Certificate Type & Date
                  </label>
                  <select
                    value={certType}
                    onChange={(e) => setCertType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white focus:outline-none focus:border-[#3B82F6] mb-2"
                  >
                    <option value="1-Day Experience Credential">1-Day Experience Credential</option>
                    <option value="Certificate of Excellence">Certificate of Excellence</option>
                    <option value="Simulated Internship Completion">Simulated Internship Completion</option>
                    <option value="Full Stack Bootcamp Credential">Full Stack Bootcamp Credential</option>
                  </select>

                  <input
                    type="date"
                    value={certIssueDate}
                    onChange={(e) => setCertIssueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-[#30363D] text-white focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3 pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    <Award className="w-4 h-4 text-amber-300" />
                    <span>Generate & Issue Certificate →</span>
                  </button>
                </div>
              </form>

              {/* LIVE GENERATED CERTIFICATE PREVIEW CARD */}
              {generatedCert && (
                <div className="pt-6 border-t border-[#30363D] space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-2">
                      <FileCheck className="w-4 h-4" />
                      <span>LIVE CERTIFICATE GENERATED (SAVED IN DATABASE)</span>
                    </span>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-1.5 rounded-lg bg-[#1F2937] hover:bg-[#374151] text-white text-xs font-mono font-bold border border-[#30363D] flex items-center gap-2"
                    >
                      <Printer className="w-3.5 h-3.5 text-blue-400" />
                      <span>Print / Download Certificate PDF</span>
                    </button>
                  </div>

                  {/* PREMIUM CERTIFICATE CARD DISPLAY */}
                  <div className="p-8 rounded-2xl bg-[#0D1117] border-2 border-amber-500/40 text-center space-y-6 relative overflow-hidden shadow-2xl font-serif">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

                    <div className="flex justify-between items-center border-b border-amber-500/20 pb-4 font-mono text-xs">
                      <span className="font-extrabold tracking-widest text-[#F5F7FA] flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#3B82F6] text-white flex items-center justify-center font-extrabold text-xs">N</div>
                        NEXTGEN TECH CERTIFICATION AUTHORITY
                      </span>
                      <span className="text-amber-400 font-bold">PASS ID: {generatedCert.certificateId}</span>
                    </div>

                    <div className="space-y-2 py-4">
                      <p className="text-xs uppercase font-mono tracking-widest text-slate-400">THIS CERTIFIES THAT</p>
                      <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-serif">
                        {generatedCert.studentName}
                      </h2>
                      <p className="text-xs text-slate-300 font-sans max-w-lg mx-auto pt-2">
                        has successfully completed the intensive hands-on technical requirements for
                      </p>
                      <h3 className="text-xl font-bold text-blue-400 font-sans pt-1">
                        {generatedCert.programName}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono pt-1">
                        Credential Type: {generatedCert.certificateType}
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-amber-500/20 pt-6 font-mono text-xs text-slate-400">
                      <div className="text-left space-y-1">
                        <p className="text-[10px] text-slate-500">DATE OF ISSUANCE</p>
                        <p className="text-white font-bold">{new Date(generatedCert.issueDate).toLocaleDateString()}</p>
                      </div>

                      <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
                        <Award className="w-9 h-9" />
                      </div>

                      <div className="text-right space-y-1">
                        <p className="text-[10px] text-slate-500">VERIFIED AUTHORITY SIGNATURE</p>
                        <p className="text-amber-300 font-bold italic">{generatedCert.customSignature}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Live Applications Table */}
            <div className="card-glass-dark p-8 space-y-4 bg-[#161B22] border border-[#30363D]">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-[#F5F7FA] flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-blue-400" />
                  <span>Latest 1-Day Slot Applications (Stored in MongoDB)</span>
                </h2>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs font-mono text-blue-400 hover:underline"
                >
                  View All ({applications.length}) →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#30363D] text-slate-400">
                      <th className="py-2.5 px-3">Ticket ID</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Email</th>
                      <th className="py-2.5 px-3">Phone</th>
                      <th className="py-2.5 px-3">Slot Date</th>
                      <th className="py-2.5 px-3">Track</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#30363D]">
                    {applications.slice(0, 5).map((app: any) => (
                      <tr key={app._id}>
                        <td className="py-3 px-3 font-bold text-emerald-400">{app.ticketId || 'N/A'}</td>
                        <td className="py-3 px-3 font-bold text-[#F5F7FA]">{app.fullName}</td>
                        <td className="py-3 px-3 text-slate-300">{app.email}</td>
                        <td className="py-3 px-3 text-slate-400">{app.phone}</td>
                        <td className="py-3 px-3 text-slate-300">{app.slotDate || 'Upcoming Saturday'}</td>
                        <td className="py-3 px-3 text-blue-400 font-bold">{app.programTrack}</td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-slate-500 font-mono">
                          No slot applications received yet. Submit one from the website modal to view here!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-[#F5F7FA]">All 1-Day Slot Applications & Leads</h2>
                <p className="text-xs text-slate-400 font-mono">
                  Student applications submitted via &quot;Book 1-Day Slot&quot; modal.
                </p>
              </div>
              <span className="px-3 py-1 rounded bg-blue-900/60 text-blue-300 text-xs font-mono font-bold border border-blue-700">
                Total: {applications.length} Applicants
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#30363D] text-slate-400">
                    <th className="py-2.5 px-3">Ticket Pass</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Phone</th>
                    <th className="py-2.5 px-3">College</th>
                    <th className="py-2.5 px-3">Slot Date</th>
                    <th className="py-2.5 px-3">Track</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363D]">
                  {applications.map((app: any) => (
                    <tr key={app._id}>
                      <td className="py-3 px-3 font-bold text-emerald-400">{app.ticketId || 'N/A'}</td>
                      <td className="py-3 px-3 font-bold text-[#F5F7FA]">{app.fullName}</td>
                      <td className="py-3 px-3 text-slate-300">{app.email}</td>
                      <td className="py-3 px-3 text-slate-400">{app.phone}</td>
                      <td className="py-3 px-3 text-slate-300">{app.college}</td>
                      <td className="py-3 px-3 text-slate-300">{app.slotDate || 'Upcoming Saturday'}</td>
                      <td className="py-3 px-3 text-blue-400 font-bold">{app.programTrack}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-bold">
                          {app.status || 'CONFIRMED_SLOT'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500 font-mono">
                        No applications in database yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Student Accounts Tab */}
        {activeTab === 'students' && (
          <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
            <h2 className="text-lg font-bold text-[#F5F7FA]">Manage All Student Accounts (Full Control)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#30363D] text-slate-400">
                    <th className="py-2 px-3">Student Name</th>
                    <th className="py-2 px-3">Email</th>
                    <th className="py-2 px-3">College</th>
                    <th className="py-2 px-3">Track</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363D]">
                  {combinedStudentsList.map((s: any, idx: number) => (
                    <tr key={idx}>
                      <td className="py-3 px-3 font-bold text-[#F5F7FA]">{s.name}</td>
                      <td className="py-3 px-3 text-slate-400">{s.email}</td>
                      <td className="py-3 px-3 text-slate-300">{s.college || 'N/A'}</td>
                      <td className="py-3 px-3 text-[#3B82F6]">{s.track || 'Full Stack Development'}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            s.status === 'SUSPENDED'
                              ? 'bg-red-950/60 text-red-300 border border-red-800 font-bold'
                              : 'bg-emerald-950/60 text-emerald-300 border border-emerald-800 font-bold'
                          }`}
                        >
                          {s.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => handleToggleStudentStatus(s.id, s.status || 'ACTIVE')}
                          className="px-2.5 py-1 text-[10px] rounded bg-[#1F2937] hover:bg-[#374151] text-slate-200 border border-[#30363D] font-mono font-semibold transition-colors"
                        >
                          {s.status === 'SUSPENDED' ? 'Activate' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {combinedStudentsList.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 font-mono">
                        No registered student accounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Certificates Hub Tab */}
        {activeTab === 'certificates' && (
          <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-[#F5F7FA]">All Issued Certificates & Credentials</h2>
                <p className="text-xs text-slate-400 font-mono">
                  Verified certificates stored in database.
                </p>
              </div>
              <span className="px-3 py-1 rounded bg-amber-950/60 text-amber-300 text-xs font-mono font-bold border border-amber-800">
                Total: {issuedCertificates.length} Issued
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#30363D] text-slate-400">
                    <th className="py-2.5 px-3">Certificate Pass ID</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Program Track</th>
                    <th className="py-2.5 px-3">Certificate Type</th>
                    <th className="py-2.5 px-3">Issue Date</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#30363D]">
                  {issuedCertificates.map((c: any) => (
                    <tr key={c._id}>
                      <td className="py-3 px-3 font-bold text-amber-400">{c.certificateId}</td>
                      <td className="py-3 px-3 font-bold text-[#F5F7FA]">{c.studentName}</td>
                      <td className="py-3 px-3 text-blue-400 font-bold">{c.programName}</td>
                      <td className="py-3 px-3 text-slate-300">{c.certificateType || '1-Day Experience Credential'}</td>
                      <td className="py-3 px-3 text-slate-400">{new Date(c.issueDate).toLocaleDateString()}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-bold">
                          {c.status || 'ISSUED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {issuedCertificates.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500 font-mono">
                        No certificates issued yet. Generate one above!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
