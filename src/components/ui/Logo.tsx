'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  href?: string;
}

export function Logo({ size = 'md', showTagline = false, className = '', href = '/' }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs rounded-lg',
    md: 'w-9 h-9 text-sm rounded-xl',
    lg: 'w-11 h-11 text-base rounded-2xl',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const techBadgeSizes = {
    sm: 'text-[10px] px-1.5 py-0.2',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-sm px-2.5 py-0.5',
  };

  const content = (
    <div className={`flex items-center gap-3 group shrink-0 ${className}`}>
      {/* Emblem Icon — High-Tech Glass Badge with Gradient & Pulse */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center font-display font-black text-white bg-gradient-to-br from-[#0E8C93] via-[#0A6E74] to-[#0A1E33] border border-[#38BDF8]/40 shadow-lg shadow-[#0E8C93]/30 group-hover:shadow-[#38BDF8]/40 group-hover:scale-105 transition-all duration-300 overflow-hidden`}
      >
        {/* Glow backdrop pulse */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#38BDF8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 font-extrabold tracking-tighter drop-shadow-sm">N</span>

        {/* Small corner tech accent light */}
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-extrabold text-white tracking-tight ${textSizes[size]}`}>
            NEXTGEN
          </span>
          <span
            className={`font-sans font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#2DD4BF] to-[#34D399] bg-[#0E8C93]/20 border border-[#0E8C93]/40 rounded-md shadow-xs ${techBadgeSizes[size]}`}
          >
            TECH
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] text-[#7FC4C8] font-sans font-medium tracking-wide">
            Modern Tech Education
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} prefetch={true} className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
}
