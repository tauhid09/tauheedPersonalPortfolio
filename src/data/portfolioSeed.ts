import type {
  PortfolioOwner,
  Project,
  Experience,
  SkillGroup,
  Certification,
  Education,
  Testimonial,
} from '../domain/entities.ts';

export const SEED_OWNER: PortfolioOwner = {
  name: 'Mohd Tauheed Ansari',
  title: 'Salesforce Associate Developer',
  location: 'Varanasi, Uttar Pradesh, India',
  currentRole: 'Salesforce Associate Developer at KloudCodey',
  valueProposition:
    'Building scalable Salesforce CRM architectures, custom Apex triggers, responsive LWC components, and automated Flows.',
  bioParagraph1:
    'Salesforce Associate Developer at KloudCodey specializing in bulkified Apex, responsive Lightning Web Components, and automated Flows. Focused on scalable CRM architectures and seamless enterprise integrations.',
  bioParagraph2:
    'Experienced with Salesforce custom objects, security models, REST callouts, and AI integrations.',
  email: 'mohdtauheedansari879@gmail.com',
  github: 'https://github.com/mohdtauheedansari',
  linkedin: 'https://linkedin.com/in/mohdtauheedansari',
  twitter: 'https://twitter.com/tauheedansari',
  availabilityStatus: 'Open for Salesforce Developer roles & enterprise CRM projects',
  yearsOfExperience: 2,
  openSourceContributions: 'Trailhead Ranger • Salesforce MCP Server Developer • Real Estate CRM Architect',
};

export const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    slug: 'real-estate-crm-salesforce',
    title: 'Real Estate CRM & Sales Automation',
    tagline: 'Sales lifecycle automation with LWC Property Explorer, Batch Apex, and approval workflows.',
    year: 2026,
    clientOrContext: 'KloudCodey',
    role: 'Salesforce Developer',
    problem:
      'Real estate brokers struggled with manual inquiries, scattered visit tracking, delayed approvals, and commission calculation errors.',
    approach:
      'Architected custom objects (Property, Unit, Viewing, Offer, Commission) and responsive LWC interfaces built on SLDS.',
    solution:
      'Engineered Property Explorer and Lead Explorer LWC modules, bulkified Apex triggers, Scheduled Batch Apex for commissions, and automated Flows.',
    stack: [
      'Apex',
      'LWC',
      'Salesforce Flows',
      'SOQL/SOSL',
      'Validation Rules',
      'Reports & Dashboards',
      'Experience Cloud',
      'Salesforce CLI',
    ],
    tags: ['Salesforce', 'Apex', 'LWC', 'Flows'],
    outcome:
      'Reduced scheduling turnaround by 65% and automated accurate commission calculations.',
    metrics: [
      { label: 'Scheduling', value: '+65% Faster', context: 'Lead conversion' },
      { label: 'Calculations', value: '100% Accurate', context: 'Batch Apex' },
    ],
    githubUrl: 'https://github.com/mohdtauheedansari/salesforce-real-estate-crm',
    liveUrl: 'https://trailblazer.me/id/mohdtauheedansari',
    featured: true,
    published: true,
    order: 1,
    architectureNotes: [
      'Bulkified trigger handler pattern preventing recursion and governor limit exceptions.',
      'LWC modules built with SLDS layout grids, wire services, and Lightning Message Service (LMS).',
    ],
    tradeOffs: [
      'Used Record-Triggered Flows for standard updates; reserved Apex for high-volume batch calculations.',
    ],
  },
  {
    id: 'proj-2',
    slug: 'salesforce-openai-mcp-agentforce',
    title: 'Salesforce-to-OpenAI & MCP AI Bridge',
    tagline: 'Exposing Salesforce CRM operations to AI models via Model Context Protocol and Agentforce.',
    year: 2026,
    clientOrContext: 'Innovation Lab',
    role: 'Salesforce Developer',
    problem:
      'Sales reps spent hours drafting email follow-ups, reviewing lead histories, and switching between external AI tools and CRM records.',
    approach:
      'Combined Salesforce Named Credentials and asynchronous Apex REST callouts with an external Model Context Protocol (MCP) server.',
    solution:
      'Built Apex callout services for sentiment analysis and meeting summaries, configured an authenticated MCP server for SOQL/CRUD tool calling, and deployed Agentforce CRM agents.',
    stack: [
      'Apex',
      'Named Credentials',
      'REST Callouts',
      'Agentforce',
      'OpenAI API',
      'MCP',
      'LWC',
      'JavaScript',
    ],
    tags: ['Salesforce', 'AI & Integrations', 'Apex', 'REST'],
    outcome:
      'Automated 80% of sales note logging and enabled natural language CRM query execution.',
    metrics: [
      { label: 'Meeting Prep', value: '3 min', context: 'Down from 25 min' },
      { label: 'Automated Notes', value: '80%', context: 'OpenAI synthesis' },
    ],
    githubUrl: 'https://github.com/mohdtauheedansari/salesforce-openai-mcp-server',
    featured: true,
    published: true,
    order: 2,
    architectureNotes: [
      'Secured external endpoints using Salesforce Named Credentials with automated OAuth token refresh.',
      'Asynchronous @future and Queueable Apex callouts preventing transaction locking.',
    ],
    tradeOffs: [
      'Enforced payload validation and rate limits in Apex before dispatching external callouts.',
    ],
  },
  {
    id: 'proj-3',
    slug: 'travel-hospitality-crm-portal',
    title: 'Travel & Hospitality Experience Portal',
    tagline: 'Guest reservation system with Experience Cloud, booking Flows, and itinerary tracking.',
    year: 2026,
    clientOrContext: 'Hospitality Client',
    role: 'Salesforce Developer',
    problem:
      'Agency operators experienced double-booked excursions, unorganized itinerary delivery, and manual payment verification.',
    approach:
      'Designed a unified data model connecting guest profiles, booking packages, itinerary milestones, and payments.',
    solution:
      'Built multi-step Screen Flows for reservation staff, automated Scheduled Flows for payment reminders, and launched an Experience Cloud guest portal with custom LWC cards.',
    stack: [
      'Salesforce Flows',
      'LWC',
      'Experience Cloud',
      'Apex',
      'Email Actions',
      'SOQL',
    ],
    tags: ['Salesforce', 'Experience Cloud', 'LWC', 'Flows'],
    outcome:
      'Zero double bookings across 15,000+ guest records and 42% faster balance collection.',
    metrics: [
      { label: 'Double Bookings', value: 'Zero', context: 'Validated via Flows' },
      { label: 'Payment Speed', value: '+42%', context: 'Scheduled Flows' },
    ],
    githubUrl: 'https://github.com/mohdtauheedansari/travel-hospitality-salesforce',
    featured: true,
    published: true,
    order: 3,
    architectureNotes: [
      'Screen Flows validate reservation dates in real time before record creation.',
      'Experience Cloud portal built with custom SLDS styling for seamless guest self-service.',
    ],
    tradeOffs: [
      'Used native Salesforce email services to maintain operations within a single org boundary.',
    ],
  },
];

export const SEED_EXPERIENCE: Experience[] = [
  {
    id: 'exp-1',
    company: 'KloudCodey',
    role: 'Salesforce Associate Developer',
    location: 'Varanasi, India',
    period: 'Jun 2026 – Present',
    startDate: '2026-06',
    endDate: 'Present',
    description: 'Designing custom Salesforce CRM architectures and automations.',
    achievements: [
      'Architect custom objects, fields, and automated Flows for client CRM implementations.',
      'Build bulkified Apex triggers, dynamic LWC modules, and secure REST integrations.',
    ],
    stack: ['Apex', 'LWC', 'Salesforce Flows', 'Agentforce', 'SOQL'],
    order: 1,
  },
  {
    id: 'exp-2',
    company: 'KloudCodey',
    role: 'Salesforce Developer Intern',
    location: 'Varanasi, India',
    period: 'Jan 2026 – May 2026',
    startDate: '2026-01',
    endDate: '2026-05',
    description: 'Developed custom Salesforce solutions and automated workflows.',
    achievements: [
      'Developed Apex classes, trigger handlers, and Batch Apex within governor limits.',
      'Built responsive Lightning Web Components and automated business workflows via Flows.',
    ],
    stack: ['Apex', 'LWC', 'Flows', 'SOQL/SOSL', 'Data Loader'],
    order: 2,
  },
  {
    id: 'exp-3',
    company: 'Dizi Global Solution',
    role: 'Frontend Developer Intern',
    location: 'Varanasi, India',
    period: 'Sep 2025 – Oct 2025',
    startDate: '2025-09',
    endDate: '2025-10',
    description: 'Developed responsive web interfaces using React.js and modern frontend tooling.',
    achievements: [
      'Developed responsive web interfaces and reusable UI components using React.js and Tailwind CSS.',
      'Applied component-driven frontend architecture principles directly to LWC development.',
    ],
    stack: ['React.js', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3'],
    order: 3,
  },
];

export const SEED_SKILLS: SkillGroup[] = [
  {
    id: 'sg-apex-backend',
    category: 'Apex & Backend',
    description: 'Server-side Salesforce development',
    skills: [
      { name: 'Apex Classes', level: 'Expert', years: 2 },
      { name: 'Apex Triggers & Handlers', level: 'Expert', years: 2 },
      { name: 'Batch & Queueable Apex', level: 'Expert', years: 2 },
      { name: 'SOQL & SOSL Optimization', level: 'Expert', years: 2 },
      { name: 'Unit Testing & Test Data', level: 'Expert', years: 2 },
    ],
  },
  {
    id: 'sg-lwc-frontend',
    category: 'LWC & Frontend',
    description: 'Modern component-driven UI',
    skills: [
      { name: 'Lightning Web Components (LWC)', level: 'Expert', years: 2 },
      { name: 'Salesforce Lightning Design System (SLDS)', level: 'Expert', years: 2 },
      { name: 'JavaScript (ES6+)', level: 'Expert', years: 2 },
      { name: 'React.js & Tailwind CSS', level: 'Proficient', years: 1 },
      { name: 'Experience Cloud', level: 'Proficient', years: 1 },
    ],
  },
  {
    id: 'sg-automation-security',
    category: 'Automation & Security',
    description: 'Declarative tools and access controls',
    skills: [
      { name: 'Salesforce Flows (Screen, Record-Triggered)', level: 'Expert', years: 2 },
      { name: 'Security Architecture (OWD, Profiles, Perm Sets)', level: 'Expert', years: 2 },
      { name: 'Validation Rules & Approvals', level: 'Expert', years: 2 },
      { name: 'Reports & Dashboards', level: 'Expert', years: 2 },
      { name: 'Data Loader & Migration', level: 'Expert', years: 2 },
    ],
  },
  {
    id: 'sg-integrations-tools',
    category: 'Integrations & Tools',
    description: 'External APIs, AI, and developer workflow',
    skills: [
      { name: 'REST & SOAP Callouts', level: 'Expert', years: 2 },
      { name: 'Named Credentials & Auth', level: 'Expert', years: 2 },
      { name: 'Agentforce & MCP Server', level: 'Proficient', years: 1 },
      { name: 'Salesforce CLI (sf / sfdx)', level: 'Expert', years: 2 },
      { name: 'Git & Version Control', level: 'Expert', years: 2 },
    ],
  },
];

export const SEED_EDUCATION: Education[] = [
  {
    id: 'edu-mca',
    degree: 'Master of Computer Applications (MCA)',
    field: 'Computer Applications',
    institution: 'Amity University Online',
    location: 'India',
    period: '2024 – Present',
    honors: '',
  },
  {
    id: 'edu-bca',
    degree: 'Bachelor of Computer Applications (BCA)',
    field: 'Computer Applications',
    institution: 'Kashi Institute of Technology',
    location: 'Varanasi, India',
    period: '2021 – 2024',
    honors: '',
  },
];

export const SEED_CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'Oracle Certified Associate: Java SE Programmer',
    issuer: 'Oracle',
    issueDate: '2024',
    credentialId: '9821-OCA-JAVA-CERT',
    credentialUrl: 'https://www.oracle.com/certification/',
  },
  {
    id: 'cert-2',
    title: 'Developer Job Simulation Credential',
    issuer: 'Forage',
    issueDate: '2024',
    credentialId: 'FORAGE-DEV-SIM-2024',
    credentialUrl: 'https://www.theforage.com/',
  },
  {
    id: 'cert-3',
    title: 'Salesforce Trailhead Ranger',
    issuer: 'Salesforce',
    issueDate: 'Active',
    credentialId: 'mohdtauheedansari',
    credentialUrl: 'https://www.salesforce.com/trailblazer/mohdtauheedansari',
  },
];

export const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Amitabh Sharma',
    role: 'Lead Technical Architect',
    company: 'KloudCodey',
    quote:
      'Tauheed’s bulkified Apex, clean LWC modules, and engineering discipline deliver reliable, scalable CRM solutions.',
    permissionToPublish: true,
    relationship: 'Practice Lead',
    date: '2026',
  },
  {
    id: 'test-2',
    author: 'Pooja Verma',
    role: 'Senior Engineering Lead',
    company: 'Dizi Global Solution',
    quote:
      'Tauheed has a sharp eye for modular UI design, translating React fundamentals seamlessly into high-performance LWC.',
    permissionToPublish: true,
    relationship: 'Engineering Lead',
    date: '2025',
  },
];
