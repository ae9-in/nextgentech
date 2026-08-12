'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenJoinModal?: () => void;
  onOpenPartnerModal?: () => void;
  onOpenLoginModal?: () => void;
}

export function Navbar({ onOpenJoinModal }: NavbarProps = {}) {
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
    <header className="fixed top-0 left-0 right-0 z-50 py-2.5 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-2.5 backdrop-blur-xl border ${
          scrolled
            ? 'bg-[#0A1E33]/90 border-[#0E8C93]/40 shadow-2xl text-white'
            : 'bg-[#0A1E33]/45 border-white/25 shadow-xl text-white'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo Mark: Glass Signal Brand */}
          <Link href="/" prefetch={true} className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8.5 h-8.5 rounded-xl bg-[#0E8C93] text-white flex items-center justify-center font-display font-bold text-sm tracking-tight shadow-md border border-white/20">
              N
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">
              NEXTGEN <span className="text-[#7FC4C8] font-sans font-medium text-sm">TECH</span>
            </span>
          </Link>

          {/* Desktop Navigation Links — Frosted Glass Bar */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/15">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  className={`text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#F2803A] text-white px-4 py-1.5 rounded-lg font-semibold shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/15 px-4 py-1.5 rounded-lg'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Business Action CTAs — Orange Glass Button */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {onOpenJoinModal ? (
              <button
                onClick={onOpenJoinModal}
                className="px-5 py-2 text-xs font-medium text-white bg-[#F2803A] hover:bg-[#E06A24] rounded-xl transition-all shadow-md flex items-center gap-1.5 border border-[#F2803A]"
              >
                <span>Book 1-Day Slot</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            ) : (
              <Link
                href="/#register"
                prefetch={true}
                className="px-5 py-2 text-xs font-medium text-white bg-[#F2803A] hover:bg-[#E06A24] rounded-xl transition-all shadow-md flex items-center gap-1.5 border border-[#F2803A]"
              >
                <span>Book 1-Day Slot</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 border border-white/20 text-white backdrop-blur-md"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto bg-[#0A1E33]/95 backdrop-blur-xl border border-white/20 rounded-2xl p-5 space-y-3 shadow-2xl text-white">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/15 flex flex-col gap-2">
            {onOpenJoinModal ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full text-center py-2.5 text-xs font-medium block rounded-xl bg-[#F2803A] hover:bg-[#E06A24] text-white shadow-md"
              >
                Book 1-Day Slot →
              </button>
            ) : (
              <Link
                href="/#register"
                prefetch={true}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-medium block rounded-xl bg-[#F2803A] hover:bg-[#E06A24] text-white shadow-md"
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
