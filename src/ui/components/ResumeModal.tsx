import { useEffect, useRef } from 'react';
import { X, Printer, Download, Mail, MapPin, Globe } from 'lucide-react';
import type { PortfolioOwner, Experience, Education, Certification, SkillGroup } from '../../domain/entities.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  owner: PortfolioOwner;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skillGroups: SkillGroup[];
}

export function ResumeModal({
  isOpen,
  onClose,
  owner,
  experience,
  education,
  certifications,
  skillGroups,
}: ResumeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-4 sm:p-6 overflow-y-auto"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-[#E5E5E0] bg-[#FAFAF9] p-6 sm:p-10 shadow-2xl"
      >
        {/* Modal Controls Bar */}
        <div className="no-print mb-6 flex items-center justify-between border-b border-[#E5E5E0] pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-[#D92D20]" />
            <h2 id="resume-dialog-title" className="font-mono text-xs uppercase tracking-wider text-[#111111]">
              Curriculum Vitae — Official Technical Record
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 border border-[#111111] bg-white px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[#111111] hover:bg-[#111111] hover:text-[#FAFAF9]"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 border border-[#E5E5E0] hover:border-[#111111] text-[#111111]"
              aria-label="Close resume view"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div className="bg-white p-8 sm:p-12 border border-[#E5E5E0] text-[#111111]">
          {/* Header */}
          <header className="border-b-2 border-[#111111] pb-6">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111111]">
              {owner.name}
            </h1>
            <p className="mt-1 font-mono text-sm uppercase tracking-wider text-[#555555]">
              {owner.title}
            </p>

            <div className="mt-4 flex flex-wrap gap-y-2 gap-x-6 font-mono text-xs text-[#555555]">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#767676]" />
                {owner.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#767676]" />
                {owner.location}
              </span>
              <span className="flex items-center gap-1.5">
                <span>Phone:</span>
                <span className="text-[#111111]">+91 6388761417</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#767676]" />
                <span>Trailhead: mohdtauheedansari</span>
              </span>
            </div>
          </header>

          {/* Executive Summary */}
          <section className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#767676] border-b border-[#E5E5E0] pb-1">
              Executive Summary
            </h3>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#333333]">
              {owner.bioParagraph1} {owner.bioParagraph2}
            </p>
          </section>

          {/* Core Competencies */}
          <section className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#767676] border-b border-[#E5E5E0] pb-1">
              Core Technical Competencies
            </h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillGroups.map((sg) => (
                <div key={sg.id} className="border border-[#F0F0EC] p-2.5 bg-[#FAFAF9]">
                  <span className="font-mono font-medium text-[#111111] block mb-1">
                    {sg.category}
                  </span>
                  <p className="text-[#555555]">
                    {sg.skills.map((s) => s.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mt-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#767676] border-b border-[#E5E5E0] pb-1">
              Engineering Chronology
            </h3>
            <div className="mt-4 space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h4 className="font-display font-bold text-sm sm:text-base text-[#111111]">
                      {exp.role} — <span className="font-mono font-normal text-[#D92D20]">{exp.company}</span>
                    </h4>
                    <span className="font-mono text-xs text-[#767676]">{exp.period}</span>
                  </div>
                  <div className="font-mono text-[11px] text-[#767676]">{exp.location}</div>
                  <ul className="mt-2 space-y-1.5 text-xs text-[#333333]">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1 h-1 w-1 bg-[#111111] shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Certifications */}
          <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#E5E5E0] pt-4">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#767676] mb-2">
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="font-bold text-[#111111]">{edu.degree} in {edu.field}</div>
                  <div className="text-[#555555]">{edu.institution}</div>
                  <div className="font-mono text-[11px] text-[#767676]">{edu.period} • {edu.location}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#767676] mb-2">
                Certifications
              </h3>
              <ul className="space-y-1 text-xs">
                {certifications.map((c) => (
                  <li key={c.id}>
                    <span className="font-medium text-[#111111]">{c.title}</span>
                    <span className="font-mono text-[11px] text-[#767676] block">
                      {c.issuer} ({c.issueDate})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
