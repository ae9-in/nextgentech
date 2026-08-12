'use client';

import React from 'react';
import { CONTENT } from '@/config/content';
import { Building2, ArrowRight, GraduationCap, Laptop, Trophy, Rocket, Briefcase, Sparkles, Code2 } from 'lucide-react';

interface CollegePartnersProps {
  onPartnerClick: () => void;
}

export const CollegePartners: React.FC<CollegePartnersProps> = ({ onPartnerClick }) => {
  const getOfferingIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-[#0E8C93]" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-[#0E8C93]" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-[#0E8C93]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#0E8C93]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-[#0E8C93]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#0E8C93]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#0E8C93]" />;
      default:
        return <Building2 className="w-5 h-5 text-[#0E8C93]" />;
    }
  };

  return (
    <section id="for-colleges" className="py-24 bg-[#F4F8F8] border-b border-[#E1E8E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-xl bg-white border border-[#E1E8E8] p-8 sm:p-12 shadow-sm relative overflow-hidden space-y-12">

          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4F3F3] text-[#0B6E74] text-xs font-sans font-semibold">
                <Building2 className="w-4 h-4 text-[#0E8C93]" />
                <span>{CONTENT.collegePartners.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-display font-semibold text-[#0A1E33] leading-tight">
                {CONTENT.collegePartners.headline}
              </h2>

              <p className="text-[#4B6072] text-base sm:text-lg leading-relaxed max-w-2xl">
                {CONTENT.collegePartners.subtext}
              </p>
            </div>

            {/* Orange Primary Fill CTA */}
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={onPartnerClick}
                className="px-7 py-3.5 rounded-lg bg-[#F2803A] hover:bg-[#E06A24] text-white font-medium text-sm shadow-xs transition-all flex items-center gap-2 group shrink-0"
              >
                <span>{CONTENT.collegePartners.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
              </button>
            </div>
          </div>

          {/* 7 College Offerings Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0E8C93]">
              Campus Partnership Offerings:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CONTENT.collegePartners.offerings.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-[#F4F8F8] border border-[#E1E8E8] hover:border-[#7FC4C8] transition-colors space-y-3 group"
                >
                  <div className="p-2.5 rounded-lg bg-[#E4F3F3] w-fit group-hover:scale-105 transition-transform">
                    {getOfferingIcon(item.icon)}
                  </div>
                  <div>
                    <h4 className="text-base font-display font-semibold text-[#0A1E33] group-hover:text-[#0E8C93] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#4B6072] leading-normal mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* B2B Contact Highlight Card */}
              <div className="p-5 rounded-xl bg-[#E4F3F3] border border-[#7FC4C8]/50 flex flex-col justify-between space-y-3 text-center sm:text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-sans text-[#0B6E74] uppercase tracking-wider font-semibold">
                    Institutional MOU
                  </span>
                  <h4 className="text-base font-display font-semibold text-[#0A1E33]">Custom Campus Proposal</h4>
                  <p className="text-xs text-[#4B6072]">
                    Get co-branded certificates, NBA/NAAC support & dedicated lab mentors.
                  </p>
                </div>
                <button
                  onClick={onPartnerClick}
                  className="text-xs font-semibold text-[#F2803A] hover:text-[#E06A24] flex items-center justify-center sm:justify-start gap-1 group/link"
                >
                  <span>Request MOU Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
