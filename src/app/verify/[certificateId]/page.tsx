'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiClient } from '@/lib/api-client';
import { Award, CheckCircle2, XCircle } from 'lucide-react';

export default function CertificateVerificationPage({ params }: { params: { certificateId: string } }) {
  const [cert, setCert] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        const res = await apiClient.get(`/api/v1/certificates/verify/${params.certificateId}`);
        setCert(res);
      } catch (err: any) {
        setError(err.message || 'Invalid certificate credential ID');
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, [params.certificateId]);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F5F7FA] selection:bg-[#3B82F6] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-semibold text-[#3B82F6] uppercase bg-[#161B22] px-3.5 py-1.5 rounded-md border border-[#30363D]">
              VERIFICATION PORTAL
            </span>
            <h1 className="text-3xl font-extrabold text-[#F5F7FA]">Certificate Verification</h1>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-slate-400">Verifying credential against database...</div>
          ) : error ? (
            <div className="card-glass-dark p-8 text-center space-y-3 bg-[#161B22] border border-red-900 text-red-300">
              <XCircle className="w-12 h-12 text-red-500 mx-auto" />
              <h2 className="text-xl font-bold">Unverified Certificate</h2>
              <p className="text-xs">{error}</p>
            </div>
          ) : (
            <div className="card-glass-dark p-8 space-y-6 bg-[#161B22] border border-[#30363D]">
              <div className="flex items-center gap-3 border-b border-[#30363D] pb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold block">VERIFIED CREDENTIAL</span>
                  <h2 className="text-xl font-bold text-[#F5F7FA]">{cert.certificateId}</h2>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#30363D]">
                  <span className="text-slate-400">Student Name:</span>
                  <span className="font-bold text-[#F5F7FA]">{cert.studentName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#30363D]">
                  <span className="text-slate-400">Program Completed:</span>
                  <span className="font-bold text-[#3B82F6]">{cert.programName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#30363D]">
                  <span className="text-slate-400">Issue Date:</span>
                  <span className="text-slate-300">{new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#30363D]">
                  <span className="text-slate-400">Verification Hash:</span>
                  <span className="text-[10px] text-slate-400 font-mono overflow-ellipsis">{cert.verificationHash}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
