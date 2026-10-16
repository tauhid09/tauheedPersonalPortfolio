import type { Certification, Education } from '../../domain/entities.ts';

interface EducationAndCertsProps {
  education: Education[];
  certifications: Certification[];
}

export function EducationAndCerts({ education, certifications }: EducationAndCertsProps) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
      {/* Education */}
      <div>
        <h3 className="font-display text-lg font-bold text-[#111111] mb-4">
          Education
        </h3>
        <ul className="space-y-4 list-none p-0">
          {education.map((edu) => (
            <li key={edu.id} className="text-sm">
              <span className="font-medium text-[#111111] block">
                {edu.degree}
              </span>
              <span className="text-[#666666] font-mono text-xs block mt-0.5">
                {edu.institution} • {edu.period}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="font-display text-lg font-bold text-[#111111] mb-4">
          Certifications
        </h3>
        <ul className="space-y-4 list-none p-0">
          {certifications.map((cert) => (
            <li key={cert.id} className="text-sm">
              <span className="font-medium text-[#111111] block">
                {cert.title}
              </span>
              <span className="text-[#666666] font-mono text-xs block mt-0.5">
                {cert.issuer}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
