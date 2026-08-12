'use client';

import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { apiClient } from '@/lib/api-client';
import { CheckCircle2, XCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-white text-[#0A1E33] selection:bg-[#0E8C93] selection:text-white font-sans">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em]">
              PUBLIC CREDENTIAL VERIFICATION PORTAL
            </span>
            <h1 className="text-3xl font-display font-semibold text-[#0A1E33]">Certificate Verification</h1>
          </div>

          {loading ? (
            <div className="p-8 text-center text-xs font-sans text-[#4B6072]">Verifying credential against database...</div>
          ) : error ? (
            <div className="bg-white p-8 text-center space-y-3 border border-red-300 text-red-700 rounded-xl shadow-sm">
              <XCircle className="w-12 h-12 text-red-600 mx-auto" />
              <h2 className="text-xl font-display font-semibold">Unverified Certificate</h2>
              <p className="text-xs">{error}</p>
            </div>
          ) : (
            <div className="bg-white p-8 space-y-6 border border-[#E1E8E8] rounded-xl shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#E1E8E8] pb-4">
                <CheckCircle2 className="w-8 h-8 text-[#0E8C93]" />
                <div>
                  <span className="text-xs font-sans text-[#0E8C93] font-semibold block uppercase tracking-wider">VERIFIED CREDENTIAL</span>
                  <h2 className="text-xl font-display font-semibold text-[#0A1E33]">{cert.certificateId}</h2>
                </div>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div className="flex justify-between py-1.5 border-b border-[#E1E8E8]">
                  <span className="text-[#4B6072]">Candidate Name:</span>
                  <span className="font-semibold text-[#0A1E33]">{cert.studentName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E1E8E8]">
                  <span className="text-[#4B6072]">Program Title:</span>
                  <span className="font-semibold text-[#0A1E33]">{cert.programTitle}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E1E8E8]">
                  <span className="text-[#4B6072]">Issue Date:</span>
                  <span className="font-mono text-[#0A1E33]">{new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#E1E8E8]">
                  <span className="text-[#4B6072]">Issuing Body:</span>
                  <span className="font-semibold text-[#0A1E33]">NextGen Tech Certification Engine</span>
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
