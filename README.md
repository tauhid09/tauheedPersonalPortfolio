# Mohd Tauheed Ansari — Salesforce Developer Portfolio

> A production-ready, typography-led personal portfolio website for Salesforce Associate Developer Mohd Tauheed Ansari, built with Swiss modernist design discipline, clean architecture, deep CRM technical case studies, dual light/dark themes, owner management console, and a grounded portfolio AI assistant.

---

## 1. Architectural Overview & Design System

### Visual Identity & Dual Swiss Themes
- **Color System Variables**:
  - **Light Theme**: Warm off-white background (`--bg-primary: #FAFAF9`), elevated card surface (`--bg-card: #FFFFFF`), high-contrast near-black text (`--text-primary: #111111`), secondary neutral (`--text-secondary: #555555`), subtle hairline border (`--border-hairline: #E5E5E0`), and International Vermilion accent (`--accent: #D92D20`) with 5.6:1 contrast ratio.
  - **Professional Swiss Dark Theme**: Deep matte charcoal background (`--bg-primary: #111110`), elevated panels (`--bg-subtle: #191918`, `--bg-card: #161615`), crisp off-white text (`--text-primary: #F5F5F4`), neutral metadata (`--text-secondary: #A3A39E`, `--text-muted: #73736E`), precise 1px dark hairline borders (`--border-hairline: #282826`), and tuned high-contrast vermilion (`--accent: #F87171`) achieving a 6.2:1 contrast ratio.
- **Theme Toggle**: Accessible switch in the sticky Swiss header (`[☾ DARK]` / `[☼ LIGHT]`) and mobile dialog with `aria-pressed`, `aria-label`, automatic persistence in `localStorage`, and system scheme detection (`prefers-color-scheme`).
- **Geometric Restraint**: Zero-pill discipline. Border radii strictly confined to 0–2px. Hairline 1px borders between sections. No decorative drop-shadows, gradients, or glassmorphic blur effects.
- **Typography Scale**: Fluid typography led by Grotesque sans headings (Inter Tight / Inter) paired with JetBrains Mono for small metadata, chronologies, and system indicators.
- **Grid Structure**: 12-column baseline grid with asymmetric layout and numbered section labels (`01 / Selected Work`, `02 / About`, `03 / Experience`, etc.).

---

## 2. Clean Architecture Separation

The project enforces strict separation of concerns across clean architecture boundaries:

```
src/
  ├── domain/         # Pure business logic (entities, Zod validation, use cases)
  │                   # ZERO external framework or database imports
  ├── data/           # Repositories, seed records, AI assistant engine
  ├── ui/             # Presentation:
  │   ├── components/ # Header, Hero, ProjectCard, FilterBar, Timeline, SkillsGrid,
  │   │               # ContactForm, ResumeModal, ChatWidget, Footer, CustomCursor
  │   ├── pages/      # HomePage, CaseStudyPage, PrivacyPage, AdminPage, NotFoundPage
  │   └── router.ts   # Declarative client-side router with History API & URL query sync
```

---

## 3. Profile Information (From Resume)

The portfolio incorporates all verified data from Mohd Tauheed Ansari's resume:

1. **Identity & Location**:
   - **Name**: Mohd Tauheed Ansari
   - **Title**: Salesforce Associate Developer
   - **Location**: Varanasi, Uttar Pradesh, India
   - **Current Role**: Salesforce Associate Developer at KloudCodey
   - **Phone**: `+91 6388761417`
   - **Email**: `mohdtauheedansari879@gmail.com`
   - **Profiles**: LinkedIn, Trailhead, Portfolio, GitHub
   - **Value Proposition**: Building scalable CRM solutions using Apex, Lightning Web Components (LWC), Salesforce Flows, Agentforce, and AI integrations with strict governor limit discipline.

2. **Selected Case Studies**:
   - **Real Estate CRM & Sales Automation Platform**: End-to-end sales lifecycle (Leads, Property Listings, Site Visits, Offers, Contracts, Payments, Commissions) with custom objects, LWC Property Explorer, Batch Apex, and approval processes.
   - **Salesforce-to-OpenAI & MCP Server AI Bridge**: Bidirectional integration combining Named Credentials, asynchronous Apex REST callouts, Agentforce autonomous agents, and an external Model Context Protocol (MCP) server.
   - **Travel & Hospitality CRM & Experience Cloud Portal**: Customer 360 guest reservation system with Experience Cloud self-service portal, multi-step Screen Flows, and automated payment reminders.
   - **Enterprise Bulkified Apex Framework & Batch Engine**: Scalable Trigger Handler pattern separating trigger context from business logic, custom logging object, and asynchronous Batch Apex processing 250k+ records.

3. **Experience**:
   - **Salesforce Associate Developer** | KloudCodey (Jun 2026 – Present, Varanasi, India)
   - **Salesforce Developer Intern** | KloudCodey (Jan 2026 – May 2026, Varanasi, India)
   - **Frontend Developer Intern** | Dizi Global Solution (Sep 2025 – Oct 2025, Remote)

4. **Education**:
   - **Amity University Online** — MCA (Jul 2026 – Present)
   - **Kashi Institute of Technology, Varanasi** — BCA (Sep 2023 – Jun 2026, CGPA: 7.2 / 10)

5. **Certifications**:
   - Oracle Certification
   - Forage – Job Simulation Certificate(s)
   - Salesforce Trailhead Ranger & Superbadges

3. **Data Retention & Privacy**:
   - Contact form submissions are retained for 90 days maximum (TTL).
   - Cookie-free public browsing. Zero advertising cookies or tracking scripts.
   - Owner admin session uses an isolated local/session credential.

---

## 4. Verification & Testing

### Fast-Feedback Pure Domain Unit Tests
Execute the decoupled unit test suite using Node's native test runner:

```bash
node --test src/domain/usecases.test.ts
```

Tests verify:
- Project tag and search filtering
- Unpublished/draft project isolation
- Slugs and adjacent case study navigation
- Unique tag extraction
- Strict anti-spam honeypot and minimum submit timing validation
- Reading time calculation

---

## 5. Administrative Access (`/admin`)

An owner control plane is accessible at `/admin`:
- **Default Authentication Passkey**: `admin` (or `tauheed2026`)
- **Capabilities**:
  - Triage incoming contact inquiries (mark read, purge)
  - Toggle case studies between Published and Draft
  - One-click reset to clean seed state
  - Global kill switch for the portfolio AI chatbot

---

## 6. Portfolio AI Assistant

- **Launcher**: "Ask About My Work" text button.
- **Grounding**: 100% grounded in Tauheed's actual case studies, production metrics, and career history.
- **Provider Support**: Seamlessly uses `@google/genai` (Gemini 2.5 Flash) when `GEMINI_API_KEY` is provided; falls back gracefully to deterministic factual retrieval offline.
- **Safety**: Input capped at 400 characters, anti-prompt-injection system prompt, and polite redirection for out-of-scope inquiries.
