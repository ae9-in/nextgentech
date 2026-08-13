'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Programs',
    links: [
      { label: '1-Day Experiences', href: '/programs' },
      { label: 'Developer Bootcamps', href: '/courses' },
      { label: 'Simulated Internships', href: '/internships' },
      { label: 'Capstone Projects', href: '/projects' },
      { label: 'Program Details & Syllabus', href: '/program-details' },
    ],
  },
  {
    title: 'Students',
    links: [
      { label: 'Student Dashboard', href: '/student/dashboard' },
      { label: 'My Courses', href: '/my-courses' },
      { label: 'My Certificates', href: '/my-certificates' },
      { label: 'Career Center', href: '/student/career' },
      { label: 'Login / Sign Up', href: '/login' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About NextGen Tech', href: '/about' },
      { label: 'Trainers & Mentors', href: '/trainers' },
      { label: 'For Colleges & TPOs', href: '/colleges' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Admin Console', href: '/admin' },
    ],
  },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #071321 0%, #060F1A 100%)' }}>
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#0E8C93]/50 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-[#0E8C93]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-[400px] h-[250px] bg-[#F2803A]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Footer Content */}
        <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Logo size="md" showTagline={true} />

            <p className="text-[#6E859B] text-sm leading-relaxed font-sans max-w-sm">
              Empowering the next generation of software engineers through hands-on, high-impact technical training, real-world projects, and simulated developer internship experiences.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <a href="mailto:hello@nextgentech.in" className="flex items-center gap-3 text-[#6E859B] hover:text-[#0E8C93] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-[#0E8C93]/10 group-hover:border-[#0E8C93]/30 transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-sans">hello@nextgentech.in</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-[#6E859B] hover:text-[#0E8C93] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-[#0E8C93]/10 group-hover:border-[#0E8C93]/30 transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-sans">+91 98765 43210</span>
              </a>
              <div className="flex items-center gap-3 text-[#6E859B]">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-sans">Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="lg:col-span-2 space-y-5">
              <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-5 h-px bg-gradient-to-r from-[#0E8C93] to-transparent" />
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1.5 text-[13px] text-[#6E859B] hover:text-white transition-all duration-200 font-sans"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-[#0E8C93] transition-all duration-300" />
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0 group-hover:opacity-50 group-hover:translate-y-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / CTA Column */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="w-5 h-px bg-gradient-to-r from-[#0E8C93] to-transparent" />
              Stay Updated
            </h4>
            <p className="text-[#6E859B] text-xs leading-relaxed font-sans">
              Get notified about new workshops, bootcamps & career opportunities.
            </p>
            <div className="space-y-2.5">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-[#4B6072] focus:border-[#0E8C93]/50 focus:ring-1 focus:ring-[#0E8C93]/20 outline-none transition-all font-sans"
              />
              <button className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0E8C93] to-[#0A6E74] text-white text-xs font-semibold hover:shadow-lg hover:shadow-[#0E8C93]/20 transition-all duration-300 hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-[#6E859B] hover:text-white hover:bg-[#0E8C93]/15 hover:border-[#0E8C93]/30 transition-all duration-200"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-[#4B6072] font-sans">
            <span>© {new Date().getFullYear()} NextGen Tech Inc.</span>
            <span className="text-[#1B3F60]">•</span>
            <span className="inline-flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-500/60 fill-red-500/60" /> in India
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#4B6072] font-sans">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
