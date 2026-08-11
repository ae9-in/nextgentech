'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenJoinModal?: () => void;
  onOpenPartnerModal?: () => void;
  onOpenLoginModal?: () => void;
}

export function Navbar({ onOpenJoinModal, onOpenPartnerModal }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 15;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: '1-Day Experiences', href: '/programs' },
    { name: 'Bootcamps', href: '/bootcamps' },
    { name: 'Internships', href: '/internships' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 lg:px-8 transition-all duration-200">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-colors duration-200 px-4 sm:px-6 py-2.5 ${
          scrolled
            ? 'bg-[#161B22]/95 backdrop-blur-md border border-[#30363D] shadow-xl'
            : 'bg-[#0D1117]/90 backdrop-blur-md border border-[#30363D] shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Mark: Clean Tech Business Branding */}
          <Link href="/" prefetch={true} className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] text-white flex items-center justify-center font-extrabold text-sm tracking-tighter shadow-md shadow-blue-600/20">
              N
            </div>
            <span className="font-extrabold text-base text-[#F5F7FA] tracking-tight">
              NEXTGEN <span className="font-semibold text-slate-400">TECH</span>
            </span>
          </Link>

          {/* Desktop Navigation Links — Clean Business Bar */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[#161B22] p-1 rounded-full border border-[#30363D]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  className={`text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#3B82F6] text-white px-4 py-1.5 rounded-full font-bold shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-[#1F2937] px-4 py-1.5 rounded-full'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Business Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {onOpenJoinModal ? (
              <button
                onClick={onOpenJoinModal}
                className="px-5 py-1.5 text-xs font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-full transition-all border border-[#3B82F6] shadow-md shadow-blue-600/20 flex items-center gap-1.5"
              >
                <span>Book 1-Day Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="/programs"
                prefetch={true}
                className="px-5 py-1.5 text-xs font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-full transition-all border border-[#3B82F6] shadow-md shadow-blue-600/20 flex items-center gap-1.5"
              >
                <span>Book 1-Day Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-[#161B22] border border-[#30363D] text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto bg-[#161B22] border border-[#30363D] rounded-2xl p-5 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-[#1F2937] hover:text-white transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#30363D] flex flex-col gap-2">
            {onOpenJoinModal ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full text-center py-2.5 text-xs font-bold block rounded-full bg-[#3B82F6] text-white"
              >
                Book 1-Day Slot →
              </button>
            ) : (
              <Link
                href="/programs"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-bold block rounded-full bg-[#3B82F6] text-white"
              >
                Book 1-Day Slot →
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
