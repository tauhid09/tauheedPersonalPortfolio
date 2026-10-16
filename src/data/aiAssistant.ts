import { repository } from './repository.ts';
import type { Project } from '../domain/entities.ts';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  referencedSlugs?: string[];
}

/**
 * Builds the comprehensive grounding context from current repository state
 */
export function buildGroundingContext(): string {
  const owner = repository.getOwner();
  const projects = repository.getProjects().filter((p) => p.published);
  const experience = repository.getExperience();
  const skills = repository.getSkillGroups();
  const certs = repository.getCertifications();
  const education = repository.getEducation();

  let context = `PORTFOLIO OWNER PROFILE:
Name: ${owner.name}
Title: ${owner.title}
Location: ${owner.location}
Current Role: ${owner.currentRole}
Value Proposition: ${owner.valueProposition}
Bio: ${owner.bioParagraph1} ${owner.bioParagraph2}
Email: ${owner.email}
Availability: ${owner.availabilityStatus}
LinkedIn: ${owner.linkedin}
GitHub: ${owner.github}

ACADEMIC EDUCATION:
${education.map((e) => `- ${e.degree} in ${e.field} from ${e.institution} (${e.period}) [${e.honors || ''}]`).join('\n')}

CORE PROJECTS & CASE STUDIES:
`;

  for (const p of projects) {
    context += `
- Project: ${p.title} (Slug: /projects/${p.slug})
  Year: ${p.year}
  Role: ${p.role}
  Client/Context: ${p.clientOrContext}
  Problem: ${p.problem}
  Approach: ${p.approach}
  Solution: ${p.solution}
  Stack: ${p.stack.join(', ')}
  Outcome: ${p.outcome}
  Metrics: ${p.metrics.map((m) => `${m.label}: ${m.value} (${m.context})`).join('; ')}
  Architecture Notes: ${p.architectureNotes ? p.architectureNotes.join('; ') : 'N/A'}
  Trade-offs: ${p.tradeOffs ? p.tradeOffs.join('; ') : 'N/A'}
`;
  }

  context += `
PROFESSIONAL EXPERIENCE:
`;
  for (const e of experience) {
    context += `
- ${e.role} at ${e.company} (${e.period}, ${e.location})
  Summary: ${e.description}
  Key Achievements: ${e.achievements.join(' ')}
  Stack: ${e.stack.join(', ')}
`;
  }

  context += `
SKILL DOMAINS:
`;
  for (const sg of skills) {
    context += `- ${sg.category}: ${sg.skills.map((s) => `${s.name} (${s.level})`).join(', ')}\n`;
  }

  context += `
CERTIFICATIONS:
${certs.map((c) => `- ${c.title} (${c.issuer}, ${c.issueDate})`).join('\n')}
`;

  return context;
}

/**
 * Deterministic semantic matcher when offline or without external Gemini API key.
 * Grounded 100% in Mohd Tauheed Ansari's exact Salesforce portfolio facts.
 */
function generateDeterministicGroundedResponse(
  query: string,
  projects: Project[]
): { text: string; slugs: string[] } {
  const q = query.toLowerCase();
  const slugs: string[] = [];

  // Check for Real Estate CRM project
  if (
    q.includes('real estate') ||
    q.includes('property') ||
    q.includes('commission') ||
    q.includes('explorer') ||
    q.includes('site visit') ||
    q.includes('acquisition')
  ) {
    slugs.push('real-estate-crm-salesforce');
    return {
      text: `Mohd Tauheed Ansari architected an end-to-end Real Estate CRM & Sales Automation Platform on Salesforce.

Key Highlights:
• Automated complete sales lifecycle: Lead Management, Property Listings, Site Visits, Offers, Contracts, Payments, and Commissions.
• Engineered custom objects (Property, Property Unit, Property Acquisition, Viewing, Offer, Contract, Payment, Commission).
• Developed custom LWC modules (Property Explorer, Lead Explorer, Property Finder) with SLDS layout grids.
• Implemented bulkified Apex Triggers (Trigger Handler pattern) and Scheduled Batch Apex to eliminate commission calculation errors.
• Configured Record-Triggered Flows, Dynamic Forms on Lightning Record Pages, and executive Dashboards.

You can inspect the full case study under /projects/real-estate-crm-salesforce.`,
      slugs,
    };
  }

  // Check for AI / OpenAI / MCP / Agentforce project
  if (
    q.includes('ai') ||
    q.includes('openai') ||
    q.includes('mcp') ||
    q.includes('model context') ||
    q.includes('agentforce') ||
    q.includes('callout') ||
    q.includes('rest')
  ) {
    slugs.push('salesforce-openai-mcp-agentforce');
    return {
      text: `At KloudCodey, Mohd Tauheed engineered a bidirectional Salesforce-to-OpenAI integration and built an MCP (Model Context Protocol) server.

Key Highlights:
• Integrated Salesforce Named Credentials with asynchronous Apex REST callouts to OpenAI for automated meeting prep and note synthesis.
• Built an MCP server that securely exposes Salesforce CRUD operations (Leads, Opportunities, Accounts) as structured tools for AI agents.
• Configured Salesforce Agentforce autonomous agents to augment CRM sales workflows with context-aware lead insights.
• Adheres to 100% enterprise security compliance with TLS 1.3 and zero API key exposure in client-side code.

Explore the architecture breakdown under /projects/salesforce-openai-mcp-agentforce.`,
      slugs,
    };
  }

  // Check for Travel & Hospitality CRM
  if (
    q.includes('travel') ||
    q.includes('hospitality') ||
    q.includes('booking') ||
    q.includes('experience cloud') ||
    q.includes('itinerary') ||
    q.includes('reservation')
  ) {
    slugs.push('travel-hospitality-crm-portal');
    return {
      text: `Mohd Tauheed delivered a Customer 360 Travel & Hospitality CRM and Experience Cloud portal.

Key Highlights:
• Engineered custom booking objects and multi-step Screen Flows for reservation staff.
• Automated payment milestone verification and scheduled email reminders via Salesforce Flows, boosting on-time payments by 42%.
• Built a customer-facing Experience Cloud self-service portal with custom LWC itinerary cards, achieving zero double-booking incidents across 15,000+ bookings.

Read the details in the case study under /projects/travel-hospitality-crm-portal.`,
      slugs,
    };
  }

  // Check for Apex framework & batch processing
  if (
    q.includes('apex') ||
    q.includes('trigger') ||
    q.includes('batch') ||
    q.includes('governor') ||
    q.includes('framework') ||
    q.includes('bulk') ||
    q.includes('soql')
  ) {
    slugs.push('enterprise-apex-trigger-framework');
    return {
      text: `Mohd Tauheed specializes in writing clean, bulkified Apex adhering strictly to Salesforce governor limits.

Key Highlights:
• Engineered an Enterprise Trigger Handler pattern separating trigger context from business logic, preventing recursion.
• Designed asynchronous Batch and Queueable Apex capable of processing 250,000+ records without hitting SOQL 101 or heap limits.
• Maintains 94%+ test code coverage with assertive test factories and mock callouts.
• Deep expertise in SOQL/SOSL indexing, relationship queries, and transaction management.

Review the architecture in the case study under /projects/enterprise-apex-trigger-framework.`,
      slugs,
    };
  }

  // Check for Experience & Career history
  if (
    q.includes('experience') ||
    q.includes('career') ||
    q.includes('kloudcodey') ||
    q.includes('dizi') ||
    q.includes('background') ||
    q.includes('where')
  ) {
    return {
      text: `Mohd Tauheed Ansari's professional experience includes:
• Salesforce Associate Developer at KloudCodey (Varanasi, India | Jun 2026 – Present): End-to-end CRM solutions, Apex architecture, LWC, Agentforce, and OpenAI MCP integrations.
• Salesforce Developer Intern at KloudCodey (Jan 2026 – May 2026): Custom object design, Apex Triggers & Batch Apex, Salesforce Flows, Profiles/Permission Sets security, and SOQL tuning.
• Frontend Developer Intern at Dizi Global Solution (Sep 2025 – Oct 2025): Developed landing pages and widgets in React.js, Tailwind CSS, HTML5, and JavaScript.`,
      slugs,
    };
  }

  // Check for Skills / Tech Stack
  if (
    q.includes('stack') ||
    q.includes('skills') ||
    q.includes('lwc') ||
    q.includes('flow') ||
    q.includes('tools') ||
    q.includes('technologies')
  ) {
    return {
      text: `Mohd Tauheed's technical stack spans:
• Languages & Frameworks: Apex, Lightning Web Components (LWC), Visualforce, JavaScript (ES6+), HTML5, CSS3, SOQL/SOSL.
• Salesforce Tools: Flow Builder, Process Builder, Agentforce, Named Credentials, Data Loader, Salesforce CLI (sf).
• Admin & Security: Profiles, Roles, OWD, Validation Rules, Approval Processes, Sharing Rules.
• Integrations: REST/SOAP Callouts, OpenAI API Integration, MCP Server, MuleSoft (familiarity).
• Modern Web: React.js, Tailwind CSS, Git, VS Code.`,
      slugs,
    };
  }

  // Check for Education & Certifications
  if (
    q.includes('education') ||
    q.includes('degree') ||
    q.includes('college') ||
    q.includes('cert') ||
    q.includes('oracle') ||
    q.includes('trailhead') ||
    q.includes('forage') ||
    q.includes('mca') ||
    q.includes('bca')
  ) {
    return {
      text: `Mohd Tauheed's education and certifications:
• Education:
  - MCA (Master of Computer Applications) @ Amity University Online (Jul 2026 – Present)
  - BCA (Bachelor of Computer Applications) @ Kashi Institute of Technology, Varanasi (Sep 2023 – Jun 2026, CGPA: 7.2 / 10)
• Certifications:
  - Oracle Certification
  - Forage – Job Simulation Certificate(s)
  - Salesforce Trailhead Ranger with Superbadges in Apex Specialist, Process Automation Specialist, and Lightning Experience Specialist.`,
      slugs,
    };
  }

  // Contact & Hiring
  if (
    q.includes('hire') ||
    q.includes('contact') ||
    q.includes('available') ||
    q.includes('email') ||
    q.includes('phone') ||
    q.includes('consulting')
  ) {
    return {
      text: `Mohd Tauheed Ansari is available for full-time Salesforce Developer roles and enterprise CRM consulting.
• Email: mohdtauheedansari879@gmail.com
• Phone: +91 6388761417
• Location: Varanasi, Uttar Pradesh, India
• Direct contact form available on this portfolio website.`,
      slugs,
    };
  }

  // General fallback grounded in Mohd Tauheed's profile
  return {
    text: `Mohd Tauheed Ansari is a Salesforce Associate Developer at KloudCodey based in Varanasi, India. He builds scalable CRM solutions using Apex, Lightning Web Components (LWC), Salesforce Flows, Agentforce, and third-party AI integrations.

Feel free to ask about his specific case studies:
• Real Estate CRM & Sales Automation (LWC Property Explorer, Batch Apex)
• Salesforce-to-OpenAI & MCP Server (Agentforce, AI Tooling)
• Travel & Hospitality CRM (Experience Cloud, Customer 360)
• Enterprise Apex Trigger Framework (Bulkified Governor Limits Safe Architecture)

Or inquire about his skills, experience at KloudCodey, or contact details.`,
    slugs,
  };
}

/**
 * Dispatch assistant query. Connects to @google/genai if an active API key is set,
 * otherwise falls back seamlessly to the grounded deterministic engine.
 */
export async function askPortfolioAssistant(query: string): Promise<{ text: string; referencedSlugs: string[] }> {
  const settings = repository.getSettings();
  if (!settings.aiChatbotEnabled) {
    return {
      text: 'The portfolio AI assistant is currently paused by the administrator. Please use the contact form for inquiries.',
      referencedSlugs: [],
    };
  }

  const projects = repository.getProjects();
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY);

  // If a valid non-placeholder API key is configured, use Gemini API
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10) {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const context = buildGroundingContext();

      const systemInstruction = `You are the personal portfolio assistant for Mohd Tauheed Ansari, a Salesforce Associate Developer at KloudCodey based in Varanasi, India.
Answer the user's inquiry concisely, with confident Swiss-style clarity.
GROUNDING RULES:
1. Only answer based on Mohd Tauheed Ansari's verified skills, projects, experience at KloudCodey, education (MCA at Amity, BCA at Kashi Institute of Technology), and background provided in the context.
2. If asked about something unrelated (e.g. poetry, general programming questions, unrelated trivia), politely decline and redirect to Tauheed's Salesforce work or contact form.
3. Whenever relevant, mention project paths like /projects/real-estate-crm-salesforce, /projects/salesforce-openai-mcp-agentforce, /projects/travel-hospitality-crm-portal, or /projects/enterprise-apex-trigger-framework.
4. Keep responses crisp and under 180 words.
5. End with an invitation to use the contact form for hiring or Salesforce consulting inquiries.

CONTEXT:
${context}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: query,
        config: {
          systemInstruction,
          temperature: 0.2,
          maxOutputTokens: 300,
        },
      });

      const text = response.text || '';
      const referencedSlugs = projects
        .filter((p) => p.published && text.toLowerCase().includes(p.slug.toLowerCase()))
        .map((p) => p.slug);

      return { text, referencedSlugs };
    } catch {
      // Fallback seamlessly to the grounded deterministic engine
      const res = generateDeterministicGroundedResponse(query, projects);
      return { text: res.text, referencedSlugs: res.slugs };
    }
  }

  // Seamless deterministic grounded fallback
  await new Promise((resolve) => setTimeout(resolve, 200));
  const res = generateDeterministicGroundedResponse(query, projects);
  return { text: res.text, referencedSlugs: res.slugs };
}
