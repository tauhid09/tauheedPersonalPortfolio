/**
 * Domain Entities: Core business models with zero external dependencies.
 */

export interface MetricItem {
  label: string;
  value: string;
  context: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  year: number;
  clientOrContext: string;
  role: string;
  problem: string;
  approach: string;
  solution: string;
  stack: string[];
  tags: string[];
  outcome: string;
  metrics: MetricItem[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  published: boolean;
  architectureNotes?: string[];
  tradeOffs?: string[];
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  stack: string[];
  order: number;
}

export interface SkillItem {
  name: string;
  level: 'Expert' | 'Proficient' | 'Familiar';
  years: number;
}

export interface SkillGroup {
  id: string;
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  honors?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  permissionToPublish: boolean;
  relationship: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  submittedAt: string;
  read: boolean;
  starred: boolean;
}

export interface PortfolioOwner {
  name: string;
  title: string;
  location: string;
  currentRole: string;
  valueProposition: string;
  bioParagraph1: string;
  bioParagraph2: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  availabilityStatus: string;
  yearsOfExperience: number;
  openSourceContributions: string;
}
