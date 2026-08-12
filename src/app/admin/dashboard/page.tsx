'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  Trash2,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
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

  // Guard ref: when true, polling skips re-fetching (set after "Clear Student Data")
  const isClearedRef = useRef(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const loadAllAdminData = useCallback(async () => {
    // If data was just cleared, skip this fetch to prevent stale data from reappearing
    if (isClearedRef.current) return;

    setLoading(true);
    try {
      const timestamp = Date.now();
      const [appRes, userRes, certRes] = await Promise.all([
        fetch(`/api/v1/applications?t=${timestamp}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`/api/v1/users?role=STUDENT&t=${timestamp}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ data: [] })),
        fetch(`/api/v1/certificates?t=${timestamp}`, { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ data: [] })),
      ]);

      // Double-check the guard after async calls complete
      if (isClearedRef.current) return;

      // Read any locally submitted applications stored in browser localStorage
      let localApps: any[] = [];
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem('nxtgen_local_applications');
          if (raw) localApps = JSON.parse(raw);
        } catch (e) {}
      }

      let fetchedApps: any[] = [];
      if (appRes?.data) fetchedApps = appRes.data;
      else if (Array.isArray(appRes)) fetchedApps = appRes;

      // Merge API applications with localStorage applications (unique by email or ticketId)
      const mergedApps = [...fetchedApps, ...localApps].filter(
        (v, i, a) => a.findIndex((t) => (t.ticketId && t.ticketId === v.ticketId) || (t.email && t.email === v.email)) === i
      );

      setApplications(mergedApps);

      if (userRes?.data) setStudents(userRes.data);
      else if (Array.isArray(userRes)) setStudents(userRes);

      if (certRes?.data) setIssuedCertificates(certRes.data);
      else if (Array.isArray(certRes)) setIssuedCertificates(certRes);
    } catch (err) {
      console.error('Failed to load admin dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isUnlocked) {
      loadAllAdminData();
      // Poll every 6 seconds for new live chatbot / website registrations
      pollingRef.current = setInterval(() => {
        loadAllAdminData();
      }, 6000);
    }
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [isUnlocked, loadAllAdminData]);

  // Combined Students List (Users + Applicants) so all student names are available
  const combinedStudentsList = [
    ...students.map((s) => ({ id: s._id, name: s.name, email: s.email, college: s.college, track: s.track, status: s.status })),
    ...applications.map((a) => ({ id: a._id, name: a.fullName, email: a.email, college: a.college, track: a.programTrack, status: a.status })),
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
      // 1. Set the guard so polling cannot refetch stale data
      isClearedRef.current = true;

      // 2. Stop the polling interval immediately
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }

      // 3. Clear client-side localStorage backup
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('nxtgen_local_applications');
        } catch (e) {}
      }

      // 4. Set state to empty immediately for instant visual feedback
      setApplications([]);
      setStudents([]);
      setIssuedCertificates([]);

      // 5. Call the server to clear MongoDB
      await fetch('/api/v1/admin/clear-students', { method: 'POST', cache: 'no-store' }).then((r) => r.json());

      triggerMessage(`🗑️ System Wiped Clean: All student accounts and slot applications cleared!`);

      // 6. Wait 3 seconds for MongoDB deletions to propagate, then lift the guard and resume polling
      setTimeout(() => {
        isClearedRef.current = false;
        loadAllAdminData();
        pollingRef.current = setInterval(() => {
          loadAllAdminData();
        }, 6000);
      }, 3000);
    } catch (err: any) {
      // On error, lift the guard so polling can resume
      isClearedRef.current = false;
      alert(err.message || 'Failed to wipe student data');
    }
  };

  // IF LOCKED: Display Password Security Gateway Screen
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#071321] text-white flex items-center justify-center p-4 selection:bg-[#0E8C93] selection:text-white font-sans relative overflow-hidden">
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0E8C93]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#F2803A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-[#0A1E33]/90 backdrop-blur-xl border border-[#0E8C93]/30 rounded-2xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0E8C93] via-[#38BDF8] to-[#F2803A]" />

          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0E8C93] to-[#0A6E74] text-white flex items-center justify-center mx-auto border border-white/20 shadow-lg shadow-[#0E8C93]/30">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              NextGen Admin Console
            </h1>
            <p className="text-xs text-slate-300 font-sans">
              Enter master administrator password to unlock console.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-sans font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleUnlockAdmin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Admin Password *
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#0E8C93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter password..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#071321]/80 border border-[#0E8C93]/40 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]/40 text-white text-sm outline-none transition-all placeholder:text-slate-500 font-sans"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F2803A] to-[#E06A24] hover:from-[#E06A24] hover:to-[#F2803A] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F2803A]/25 border border-white/10"
            >
              <span>Unlock Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <Link
              href="/"
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter lists based on search query
  const filteredApplications = applications.filter((app) =>
    (app.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (app.phone || '').includes(searchQuery) ||
    (app.programTrack || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = combinedStudentsList.filter((s) =>
    (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.college || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCertificates = issuedCertificates.filter((c) =>
    (c.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.certificateId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.programName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // IF UNLOCKED: Render Full Admin Dashboard Console
  return (
    <div className="min-h-screen bg-[#071321] text-white selection:bg-[#0E8C93] selection:text-white font-sans flex">
      {/* Sidebar Admin Navigation */}
      <aside className="w-64 bg-[#0A1E33]/95 border-r border-[#0E8C93]/20 flex flex-col justify-between p-6 shrink-0 hidden md:flex backdrop-blur-xl">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E8C93] to-[#0A6E74] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#0E8C93]/30 border border-white/10">
              N
            </div>
            <div>
              <h2 className="font-bold text-white text-sm tracking-tight">Admin Portal</h2>
              <p className="text-[11px] text-[#7FC4C8]">NextGen Control Hub</p>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-[#0E8C93] to-[#0A6E74] text-white font-bold shadow-md shadow-[#0E8C93]/25 border border-white/15'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-[#38BDF8]" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'applications'
                  ? 'bg-gradient-to-r from-[#0E8C93] to-[#0A6E74] text-white font-bold shadow-md shadow-[#0E8C93]/25 border border-white/15'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4 text-[#38BDF8]" />
                <span>Slot Applications</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] text-[10px] font-bold border border-[#38BDF8]/30">
                {applications.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-[#0E8C93] to-[#0A6E74] text-white font-bold shadow-md shadow-[#0E8C93]/25 border border-white/15'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4 text-[#38BDF8]" />
              <span>Student Roster</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'certificates'
                  ? 'bg-gradient-to-r from-[#0E8C93] to-[#0A6E74] text-white font-bold shadow-md shadow-[#0E8C93]/25 border border-white/15'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Certificates Hub</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-2">
          <button
            onClick={handleLockConsole}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/10 rounded-xl transition-colors text-left border border-amber-500/30"
          >
            <Lock className="w-4 h-4 shrink-0 text-amber-400" />
            <span>Lock Admin Console</span>
          </button>

          <Link
            href="/"
            className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Return to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>SUPER ADMIN CONTROL PANEL</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">Platform Administration</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              onClick={() => {
                loadAllAdminData();
                triggerMessage('🔄 Live data refreshed from MongoDB database!');
              }}
              className="px-4 py-2 rounded-xl bg-[#0E8C93]/20 hover:bg-[#0E8C93]/40 text-[#38BDF8] border border-[#0E8C93]/40 font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="Fetch latest registrations from MongoDB"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Live Data</span>
            </button>

            <button
              onClick={handleWipeAllStudentData}
              className="px-4 py-2 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30 font-semibold flex items-center gap-2 transition-all shadow-sm"
              title="Clear all test student data from database"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
              <span>Clear Student Data</span>
            </button>

            <button
              onClick={handleLockConsole}
              className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Lock Console</span>
            </button>

            <span className="px-4 py-2 rounded-xl bg-[#0A1E33] text-emerald-400 border border-[#0E8C93]/30 font-semibold flex items-center gap-2 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MongoDB Connected</span>
            </span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students, applications, ticket IDs, or certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0A1E33]/70 border border-[#0E8C93]/30 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8]/30 text-white text-xs outline-none transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {actionSuccessMsg && (
          <div className="p-4 rounded-xl bg-[#0E8C93]/20 border border-[#0E8C93]/40 text-white text-xs font-semibold shadow-md flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionSuccessMsg}</span>
          </div>
        )}

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-2 border-b border-white/10 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-[#0E8C93] text-white font-bold' : 'bg-[#0A1E33] text-slate-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap ${
              activeTab === 'applications' ? 'bg-[#0E8C93] text-white font-bold' : 'bg-[#0A1E33] text-slate-300'
            }`}
          >
            Applications ({applications.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap ${
              activeTab === 'students' ? 'bg-[#0E8C93] text-white font-bold' : 'bg-[#0A1E33] text-slate-300'
            }`}
          >
            Students ({combinedStudentsList.length})
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap ${
              activeTab === 'certificates' ? 'bg-[#0E8C93] text-white font-bold' : 'bg-[#0A1E33] text-slate-300'
            }`}
          >
            Certificates ({issuedCertificates.length})
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards Grid — Sleek Dark Glass Aesthetics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stat Card 1 */}
              <div className="p-6 rounded-2xl bg-[#0A1E33]/90 border border-[#0E8C93]/30 shadow-xl space-y-3 relative overflow-hidden group hover:border-[#0E8C93] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">1-Day Applications</span>
                  <div className="w-9 h-9 rounded-xl bg-[#0E8C93]/20 text-[#38BDF8] flex items-center justify-center">
                    <Inbox className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">
                    {loading ? '...' : applications.length}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> Live
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Live Form Submissions</p>
              </div>

              {/* Stat Card 2 */}
              <div className="p-6 rounded-2xl bg-[#0A1E33]/90 border border-[#0E8C93]/30 shadow-xl space-y-3 relative overflow-hidden group hover:border-[#0E8C93] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Total Students</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">
                    {loading ? '...' : combinedStudentsList.length}
                  </span>
                  <span className="text-[11px] font-semibold text-[#38BDF8]">Registered Roster</span>
                </div>
                <p className="text-[11px] text-slate-400">Active Learners</p>
              </div>

              {/* Stat Card 3 */}
              <div className="p-6 rounded-2xl bg-[#0A1E33]/90 border border-[#0E8C93]/30 shadow-xl space-y-3 relative overflow-hidden group hover:border-[#0E8C93] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Certificates Issued</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-amber-400">
                    {loading ? '...' : issuedCertificates.length}
                  </span>
                  <span className="text-[11px] font-semibold text-amber-300">Verified Credentials</span>
                </div>
                <p className="text-[11px] text-slate-400">QR Verified Links</p>
              </div>

              {/* Stat Card 4 */}
              <div className="p-6 rounded-2xl bg-[#0A1E33]/90 border border-[#0E8C93]/30 shadow-xl space-y-3 relative overflow-hidden group hover:border-[#0E8C93] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Total Revenue</span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">
                    {loading ? '...' : data?.stats?.totalRevenue ?? '₹0.0L'}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400">Verified Receipts</span>
                </div>
                <p className="text-[11px] text-slate-400">Platform Payments</p>
              </div>
            </div>

            {/* CUSTOM CERTIFICATE GENERATOR & PREVIEW */}
            <div className="p-8 rounded-2xl bg-[#0A1E33]/90 border border-[#0E8C93]/30 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                    <Award className="w-6 h-6 text-amber-400 shrink-0" />
                    <span>Instant Custom Certificate Generator</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Select a student name and program details to generate a verified NextGen Tech credential.
                  </p>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30">
                  Auto-Generated Pass ID
                </span>
              </div>

              <form onSubmit={handleGenerateCertificate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs font-sans">
                <div className="space-y-2">
                  <label className="block text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                    1. Select Registered Student OR Type Name
                  </label>
                  <select
                    value={certStudentName}
                    onChange={(e) => setCertStudentName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#071321] border border-[#0E8C93]/40 text-white focus:border-[#38BDF8] outline-none transition-all text-xs font-sans"
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
                    placeholder="Or type custom name (e.g. Rahul Sharma)..."
                    value={certStudentName}
                    onChange={(e) => setCertStudentName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#071321] border border-[#0E8C93]/40 text-white placeholder:text-slate-500 focus:border-[#38BDF8] outline-none transition-all text-xs font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                    2. Program / Track Title
                  </label>
                  <select
                    value={certProgramName}
                    onChange={(e) => setCertProgramName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#071321] border border-[#0E8C93]/40 text-white focus:border-[#38BDF8] outline-none transition-all text-xs font-sans"
                  >
                    <option value="1-Day Full Stack MERN Experience">1-Day Full Stack MERN Experience</option>
                    <option value="1-Day AI Agent & LLM Builder">1-Day AI Agent & LLM Builder</option>
                    <option value="Simulated Engineering Internship Track">Simulated Engineering Internship Track</option>
                    <option value="7-Day Intensive Web Development Bootcamp">7-Day Intensive Web Development Bootcamp</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Custom track name..."
                    value={certProgramName}
                    onChange={(e) => setCertProgramName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#071321] border border-[#0E8C93]/40 text-white focus:border-[#38BDF8] outline-none transition-all text-xs font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
                    3. Certificate Type & Date
                  </label>
                  <select
                    value={certType}
                    onChange={(e) => setCertType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#071321] border border-[#0E8C93]/40 text-white focus:border-[#38BDF8] outline-none transition-all text-xs font-sans"
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
                    className="w-full px-4 py-3 rounded-xl bg-[#071321] border border-[#0E8C93]/40 text-white focus:border-[#38BDF8] outline-none transition-all text-xs font-sans"
                  />
                </div>

                <div className="md:col-span-2 lg:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F2803A] to-[#E06A24] hover:from-[#E06A24] hover:to-[#F2803A] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F2803A]/25 border border-white/10"
                  >
                    <Award className="w-4 h-4 text-amber-200" />
                    <span>Generate & Issue Certificate →</span>
                  </button>
                </div>
              </form>

              {/* LIVE GENERATED CERTIFICATE PREVIEW CARD */}
              {generatedCert && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
                      <FileCheck className="w-4 h-4" />
                      <span>LIVE CERTIFICATE GENERATED (SAVED IN DATABASE)</span>
                    </span>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 flex items-center gap-2 transition-all"
                    >
                      <Printer className="w-4 h-4 text-[#38BDF8]" />
                      <span>Print / Download Certificate PDF</span>
                    </button>
                  </div>

                  {/* PREMIUM CERTIFICATE CARD DISPLAY */}
                  <div className="p-8 rounded-2xl bg-[#071321] border-2 border-amber-500/50 text-center space-y-6 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />

                    <div className="flex justify-between items-center border-b border-amber-500/20 pb-4 text-xs font-mono">
                      <span className="font-bold text-white flex items-center gap-2 tracking-wider">
                        <div className="w-6 h-6 rounded bg-[#0E8C93] text-white flex items-center justify-center font-extrabold text-xs">N</div>
                        NEXTGEN TECH CERTIFICATION AUTHORITY
                      </span>
                      <span className="text-amber-400 font-bold">PASS ID: {generatedCert.certificateId}</span>
                    </div>

                    <div className="space-y-2 py-4">
                      <p className="text-xs uppercase tracking-widest text-slate-400 font-mono">THIS CERTIFIES THAT</p>
                      <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-serif">
                        {generatedCert.studentName}
                      </h2>
                      <p className="text-xs text-slate-300 max-w-lg mx-auto pt-2">
                        has successfully completed the intensive hands-on technical requirements for
                      </p>
                      <h3 className="text-xl font-bold text-[#38BDF8] pt-1">
                        {generatedCert.programName}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono pt-1">
                        Credential Type: {generatedCert.certificateType}
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-amber-500/20 pt-6 text-xs text-slate-400">
                      <div className="text-left space-y-1 font-mono">
                        <p className="text-[10px] text-slate-500">DATE OF ISSUANCE</p>
                        <p className="text-white font-bold">{new Date(generatedCert.issueDate).toLocaleDateString()}</p>
                      </div>

                      <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
                        <Award className="w-9 h-9" />
                      </div>

                      <div className="text-right space-y-1 font-mono">
                        <p className="text-[10px] text-slate-500">VERIFIED AUTHORITY SIGNATURE</p>
                        <p className="text-amber-300 font-bold italic">{generatedCert.customSignature}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recent Live Applications Table */}
            <div className="p-8 rounded-2xl bg-[#0A1E33]/90 border border-[#0E8C93]/30 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-[#38BDF8]" />
                  <span>Latest 1-Day Slot Applications (MongoDB)</span>
                </h2>
                <button
                  onClick={() => setActiveTab('applications')}
                  className="text-xs font-semibold text-[#38BDF8] hover:underline flex items-center gap-1"
                >
                  <span>View All ({applications.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[11px]">
                      <th className="py-3 px-4">Ticket ID</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Slot Date</th>
                      <th className="py-3 px-4">Track</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredApplications.slice(0, 5).map((app: any) => (
                      <tr key={app._id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">{app.ticketId || 'N/A'}</td>
                        <td className="py-3.5 px-4 font-bold text-white">{app.fullName}</td>
                        <td className="py-3.5 px-4 text-slate-300">{app.email}</td>
                        <td className="py-3.5 px-4 text-slate-400">{app.phone}</td>
                        <td className="py-3.5 px-4 text-slate-300">{app.slotDate || 'Upcoming Saturday'}</td>
                        <td className="py-3.5 px-4 text-[#38BDF8] font-semibold">{app.programTrack}</td>
                      </tr>
                    ))}
                    {filteredApplications.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 font-mono">
                          No applications match your search.
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
          <div className="p-8 rounded-2xl bg-[#0A1E33]/90 border border-[#0E8C93]/30 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">All 1-Day Slot Applications & Leads</h2>
                <p className="text-xs text-slate-300 mt-1">
                  Student applications submitted via &quot;Book 1-Day Slot&quot; modal.
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#0E8C93]/30 text-[#38BDF8] text-xs font-bold border border-[#0E8C93]/40">
                Total: {filteredApplications.length} Applicants
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[11px]">
                    <th className="py-3 px-4">Ticket Pass</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Phone</th>
                    <th className="py-3 px-4">College</th>
                    <th className="py-3 px-4">Slot Date</th>
                    <th className="py-3 px-4">Track</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredApplications.map((app: any) => (
                    <tr key={app._id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">{app.ticketId || 'N/A'}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{app.fullName}</td>
                      <td className="py-3.5 px-4 text-slate-300">{app.email}</td>
                      <td className="py-3.5 px-4 text-slate-400">{app.phone}</td>
                      <td className="py-3.5 px-4 text-slate-300">{app.college}</td>
                      <td className="py-3.5 px-4 text-slate-300">{app.slotDate || 'Upcoming Saturday'}</td>
                      <td className="py-3.5 px-4 text-[#38BDF8] font-semibold">{app.programTrack}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                          {app.status || 'CONFIRMED_SLOT'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredApplications.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400 font-mono">
                        No slot applications found.
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
          <div className="p-8 rounded-2xl bg-[#0A1E33]/90 border border-[#0E8C93]/30 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Manage Student Roster</h2>
                <p className="text-xs text-slate-300 mt-1">
                  Full control over active student accounts and status toggles.
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-[#0E8C93]/30 text-[#38BDF8] text-xs font-bold border border-[#0E8C93]/40">
                Total: {filteredStudents.length} Students
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[11px]">
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">College</th>
                    <th className="py-3 px-4">Track</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredStudents.map((s: any, idx: number) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">{s.name}</td>
                      <td className="py-3.5 px-4 text-slate-300">{s.email}</td>
                      <td className="py-3.5 px-4 text-slate-300">{s.college || 'N/A'}</td>
                      <td className="py-3.5 px-4 text-[#38BDF8] font-semibold">{s.track || 'Full Stack Development'}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] ${
                            s.status === 'SUSPENDED'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30 font-bold'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                          }`}
                        >
                          {s.status || 'ACTIVE'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleToggleStudentStatus(s.id, s.status || 'ACTIVE')}
                          className="px-3 py-1.5 text-[11px] rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 font-semibold transition-colors"
                        >
                          {s.status === 'SUSPENDED' ? 'Activate' : 'Suspend'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 font-mono">
                        No student accounts found matching your query.
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
          <div className="p-8 rounded-2xl bg-[#0A1E33]/90 border border-[#0E8C93]/30 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">All Issued Certificates & Credentials</h2>
                <p className="text-xs text-slate-300 mt-1">
                  Verified certificates stored in database with instant verification URLs.
                </p>
              </div>
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                Total: {filteredCertificates.length} Certificates
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[11px]">
                    <th className="py-3 px-4">Certificate Pass ID</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Program Track</th>
                    <th className="py-3 px-4">Certificate Type</th>
                    <th className="py-3 px-4">Issue Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredCertificates.map((c: any) => (
                    <tr key={c._id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-amber-400 font-mono">{c.certificateId}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{c.studentName}</td>
                      <td className="py-3.5 px-4 text-[#38BDF8] font-semibold">{c.programName}</td>
                      <td className="py-3.5 px-4 text-slate-300">{c.certificateType || '1-Day Experience Credential'}</td>
                      <td className="py-3.5 px-4 text-slate-400">{new Date(c.issueDate).toLocaleDateString()}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                          {c.status || 'ISSUED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredCertificates.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400 font-mono">
                        No issued certificates found.
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
