import type { Experience } from '../../domain/entities.ts';

interface TimelineProps {
  experiences: Experience[];
}

export function Timeline({ experiences }: TimelineProps) {
  const sorted = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-10 sm:space-y-12">
      {sorted.map((exp) => (
        <div
          key={exp.id}
          className="border-b border-[#E5E5E0] pb-8 last:border-b-0 last:pb-0"
        >
          {/* Role, Company, Dates */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h3 className="font-display text-xl font-bold tracking-tight text-[#111111]">
              {exp.role} <span className="text-[#666666] font-normal">at</span> <span className="text-[#D92D20]">{exp.company}</span>
            </h3>
            <span className="font-mono text-xs text-[#767676] shrink-0">
              {exp.period}
            </span>
          </div>

          {/* Max 2 one-line bullet points */}
          <ul className="mt-4 space-y-2 list-none p-0">
            {exp.achievements.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-[#444444]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#111111]" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
