import type { SkillGroup } from '../../domain/entities.ts';

interface SkillsGridProps {
  skillGroups?: SkillGroup[];
}

export function SkillsGrid({}: SkillsGridProps) {
  const groups = [
    {
      title: 'Apex & Backend',
      tags: [
        'Apex Classes',
        'Apex Triggers',
        'Batch & Queueable Apex',
        'SOQL & SOSL',
        'Unit Testing',
      ],
    },
    {
      title: 'LWC & Frontend',
      tags: [
        'Lightning Web Components (LWC)',
        'SLDS',
        'JavaScript (ES6+)',
        'React.js',
        'Tailwind CSS',
      ],
    },
    {
      title: 'Automation & Security',
      tags: [
        'Salesforce Flows',
        'OWD & Permission Sets',
        'Validation Rules',
        'Approval Processes',
        'Reports & Dashboards',
      ],
    },
    {
      title: 'Integrations & AI/Tools',
      tags: [
        'REST APIs',
        'Named Credentials',
        'Agentforce',
        'MCP Server',
        'Salesforce CLI (sf)',
        'Git & CI/CD',
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
      {groups.map((group) => (
        <div key={group.title} className="space-y-3">
          <h3 className="font-display text-lg font-bold tracking-tight text-[#111111]">
            {group.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.tags.map((tag) => (
              <span
                key={tag}
                className="border border-[#E5E5E0] bg-[#FAFAF9] px-3 py-1 font-mono text-xs text-[#333333]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
