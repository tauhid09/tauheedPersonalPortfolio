import type {
  PortfolioOwner,
  Project,
  Experience,
  SkillGroup,
  Certification,
  Education,
  Testimonial,
  ContactMessage,
} from '../domain/entities.ts';
import {
  SEED_OWNER,
  SEED_PROJECTS,
  SEED_EXPERIENCE,
  SEED_SKILLS,
  SEED_CERTIFICATIONS,
  SEED_EDUCATION,
  SEED_TESTIMONIALS,
} from './portfolioSeed.ts';

const STORAGE_KEYS = {
  PROJECTS: 'tauheed_portfolio_projects_v6_salesforce',
  MESSAGES: 'tauheed_portfolio_messages_v6_salesforce',
  SETTINGS: 'tauheed_portfolio_settings_v6_salesforce',
  OWNER: 'tauheed_portfolio_owner_v6_salesforce',
};

export interface PortfolioSettings {
  aiChatbotEnabled: boolean;
  reducedMotionDefault: boolean;
  contactNotificationEmail: string;
}

const DEFAULT_SETTINGS: PortfolioSettings = {
  aiChatbotEnabled: true,
  reducedMotionDefault: false,
  contactNotificationEmail: 'mohdtauheedansari879@gmail.com',
};

class PortfolioRepository {
  private projects: Project[] = [];
  private owner: PortfolioOwner = SEED_OWNER;
  private experiences: Experience[] = SEED_EXPERIENCE;
  private skillGroups: SkillGroup[] = SEED_SKILLS;
  private certifications: Certification[] = SEED_CERTIFICATIONS;
  private education: Education[] = SEED_EDUCATION;
  private testimonials: Testimonial[] = SEED_TESTIMONIALS;
  private messages: ContactMessage[] = [];
  private settings: PortfolioSettings = DEFAULT_SETTINGS;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') {
      this.projects = [...SEED_PROJECTS];
      this.owner = { ...SEED_OWNER };
      return;
    }

    try {
      const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (storedProjects) {
        this.projects = JSON.parse(storedProjects);
      } else {
        this.projects = [...SEED_PROJECTS];
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(this.projects));
      }

      const storedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (storedMessages) {
        this.messages = JSON.parse(storedMessages);
      } else {
        // Seed 2 initial sample inquiries for admin inbox
        this.messages = [
          {
            id: 'msg-seed-1',
            name: 'Rohan Mehra',
            email: 'rohan.mehra@realtytech-solutions.com',
            company: 'RealtyTech Solutions',
            message:
              'Hi Mohd Tauheed, we reviewed your Real Estate CRM project built with LWC and Batch Apex. We are planning a multi-tenant Salesforce property management rollout and would like to discuss an opportunity on our Salesforce engineering team.',
            submittedAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
            read: false,
            starred: true,
          },
          {
            id: 'msg-seed-2',
            name: 'Priya Iyer',
            email: 'priya.iyer@cloudinnovators.org',
            company: 'Cloud Innovators Summit',
            message:
              'We were impressed by your Salesforce-to-OpenAI integration and MCP server architecture. Would you be interested in participating in a technical panel on Agentforce and AI integrations in Salesforce?',
            submittedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
            read: true,
            starred: false,
          },
        ];
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(this.messages));
      }

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) };
      }

      const storedOwner = localStorage.getItem(STORAGE_KEYS.OWNER);
      if (storedOwner) {
        this.owner = { ...SEED_OWNER, ...JSON.parse(storedOwner) };
      }
    } catch {
      this.projects = [...SEED_PROJECTS];
      this.owner = { ...SEED_OWNER };
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  // Projects
  public getProjects(): Project[] {
    return [...this.projects];
  }

  public getProjectBySlug(slug: string): Project | undefined {
    return this.projects.find((p) => p.slug === slug);
  }

  public toggleProjectPublished(id: string): void {
    this.projects = this.projects.map((p) => (p.id === id ? { ...p, published: !p.published } : p));
    this.saveProjects();
  }

  public updateProject(updated: Project): void {
    this.projects = this.projects.map((p) => (p.id === updated.id ? updated : p));
    this.saveProjects();
  }

  public resetProjectsToSeed(): void {
    this.projects = [...SEED_PROJECTS];
    this.saveProjects();
  }

  private saveProjects() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(this.projects));
    }
    this.notify();
  }

  // Owner info
  public getOwner(): PortfolioOwner {
    return { ...this.owner };
  }

  public updateOwner(updated: Partial<PortfolioOwner>): void {
    this.owner = { ...this.owner, ...updated };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.OWNER, JSON.stringify(this.owner));
    }
    this.notify();
  }

  // Experience, Skills, Certs, Education, Testimonials
  public getExperience(): Experience[] {
    return [...this.experiences];
  }

  public getSkillGroups(): SkillGroup[] {
    return [...this.skillGroups];
  }

  public getCertifications(): Certification[] {
    return [...this.certifications];
  }

  public getEducation(): Education[] {
    return [...this.education];
  }

  public getTestimonials(): Testimonial[] {
    return [...this.testimonials];
  }

  // Messages (Inbox)
  public getMessages(): ContactMessage[] {
    return [...this.messages].sort(
      (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  }

  public addMessage(msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'read' | 'starred'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      submittedAt: new Date().toISOString(),
      read: false,
      starred: false,
    };
    this.messages = [newMsg, ...this.messages];
    this.saveMessages();
    return newMsg;
  }

  public markMessageRead(id: string, read: boolean = true): void {
    this.messages = this.messages.map((m) => (m.id === id ? { ...m, read } : m));
    this.saveMessages();
  }

  public deleteMessage(id: string): void {
    this.messages = this.messages.filter((m) => m.id !== id);
    this.saveMessages();
  }

  private saveMessages() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(this.messages));
    }
    this.notify();
  }

  // Settings
  public getSettings(): PortfolioSettings {
    return { ...this.settings };
  }

  public updateSettings(partial: Partial<PortfolioSettings>): void {
    this.settings = { ...this.settings, ...partial };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    }
    this.notify();
  }
}

export const repository = new PortfolioRepository();
