'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Download } from 'lucide-react';

export default function PaymentsPage() {
  const orders = [
    { id: 'ORD-8821', item: '1-Day Full Stack Development Experience', date: 'Aug 10, 2026', amount: '₹0 (Free Trial)' },
    { id: 'ORD-7192', item: 'MERN Stack Bootcamp (7 Days)', date: 'Aug 02, 2026', amount: '₹4,999' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#111827] selection:bg-[#2563EB] selection:text-white font-sans">
      <Navbar onOpenJoinModal={() => {}} onOpenPartnerModal={() => {}} onOpenLoginModal={() => {}} />

      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="py-8 border-b border-[#E4E7EC] text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-[#0B1F33]">Payments & Billing</h1>
            <p className="text-xs text-[#667085]">View order receipts and download PDF invoices.</p>
          </div>

          <div className="card-clean p-6 space-y-4">
            <h2 className="text-sm font-bold text-[#0B1F33] uppercase font-mono">Order Receipts</h2>
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="p-4 rounded bg-[#F7F7F5] border border-[#E4E7EC] flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-[#0B1F33]">{o.item}</p>
                    <p className="text-[#667085] font-mono mt-0.5">{o.id} • {o.date}</p>
                  </div>
                  <span className="font-bold font-mono text-[#0B1F33]">{o.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
