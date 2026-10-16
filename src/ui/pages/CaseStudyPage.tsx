import { useEffect } from 'react';
import { repository } from '../../data/repository.ts';
import { getProjectBySlug, getAdjacentProjects, estimateReadingTimeMinutes } from '../../domain/usecases.ts';
import { navigate } from '../router.ts';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Calendar,
  User,
  Building,
  CheckCircle2,
  Clock,
  Layers,
  Terminal,
  Cpu,
} from 'lucide-react';

interface CaseStudyPageProps {
  slug: string;
}

export function CaseStudyPage({ slug }: CaseStudyPageProps) {
  const projects = repository.getProjects();
  const project = getProjectBySlug(projects, slug);
  const { prev, next } = getAdjacentProjects(projects, slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (project) {
      document.title = `${project.title} | Tauheed Ansari`;
    }
  }, [slug, project]);

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 text-center">
        <span className="font-mono text-xs uppercase text-[#D92D20]">404 Not Found</span>
        <h1 className="mt-4 font-display text-3xl font-bold text-[#111111]">
          Case Study &ldquo;{slug}&rdquo; Not Found
        </h1>
        <p className="mt-4 text-sm text-[#555555]">
          The project record you requested has either been moved or remains restricted in draft status.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#FAFAF9]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Work Index</span>
        </button>
      </div>
    );
  }

  const fullText = `${project.problem} ${project.approach} ${project.solution} ${project.outcome} ${
    project.architectureNotes?.join(' ') || ''
  }`;
  const readingTime = estimateReadingTimeMinutes(fullText);

  return (
    <article className="min-h-screen bg-[#FAFAF9] pb-24 text-[#111111]">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-[#E5E5E0] bg-white sticky top-16 z-30">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 font-mono text-xs">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#555555] hover:text-[#111111] focus:outline-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="uppercase tracking-wider">Back to Portfolio Index</span>
          </button>

          <div className="flex items-center gap-4 text-[#767676]">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              <span>{readingTime} min read</span>
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline text-[#111111] font-medium">{project.year}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        {/* Case Study Header */}
        <header className="border-b border-[#E5E5E0] pb-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#767676] mb-4">
            <span className="text-[#D92D20] font-semibold">CASE STUDY #{String(project.order).padStart(2, '0')}</span>
            <span>•</span>
            <span>{project.clientOrContext}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111111] leading-[1.1]">
            {project.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#444444] font-normal leading-relaxed max-w-3xl">
            {project.tagline}
          </p>

          {/* Project Metadata Matrix */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#E5E5E0] pt-6 sm:grid-cols-4 font-mono text-xs">
            <div>
              <span className="uppercase text-[#767676] block mb-1">Role</span>
              <span className="text-[#111111] font-medium">{project.role}</span>
            </div>
            <div>
              <span className="uppercase text-[#767676] block mb-1">Timeline</span>
              <span className="text-[#111111] font-medium">{project.year}</span>
            </div>
            <div>
              <span className="uppercase text-[#767676] block mb-1">Domain</span>
              <span className="text-[#111111] font-medium">{project.tags[0]}</span>
            </div>
            <div>
              <span className="uppercase text-[#767676] block mb-1">Links</span>
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#111111] underline hover:text-[#D92D20]"
                  >
                    <Github className="h-3 w-3" />
                    <span>Source</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[#111111] underline hover:text-[#D92D20]"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Verified Production Benchmarks Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="my-12">
            <span className="font-mono text-xs uppercase tracking-widest text-[#767676] block mb-4">
              Validated Telemetry &amp; Production Benchmarks
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="border border-[#E5E5E0] bg-white p-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#767676] block">
                    {m.label}
                  </span>
                  <div className="mt-2 font-display text-3xl font-bold tracking-tight text-[#111111]">
                    {m.value}
                  </div>
                  <p className="mt-1 font-mono text-xs text-[#555555]">
                    {m.context}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deep Dive Content Sections */}
        <div className="space-y-12 text-[#222222]">
          {/* Problem Statement */}
          <section className="border-t border-[#E5E5E0] pt-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#767676] block mb-2">
              01 / The Architectural Challenge
            </span>
            <h2 className="font-display text-2xl font-bold text-[#111111] mb-4">
              The Problem Space
            </h2>
            <div className="prose max-w-none text-base leading-relaxed text-[#333333]">
              <p>{project.problem}</p>
            </div>
          </section>

          {/* Approach & Methodology */}
          <section className="border-t border-[#E5E5E0] pt-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#767676] block mb-2">
              02 / Engineering Approach
            </span>
            <h2 className="font-display text-2xl font-bold text-[#111111] mb-4">
              Methodology &amp; Invariants
            </h2>
            <div className="prose max-w-none text-base leading-relaxed text-[#333333]">
              <p>{project.approach}</p>
            </div>
          </section>

          {/* Solution & Implementation */}
          <section className="border-t border-[#E5E5E0] pt-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#767676] block mb-2">
              03 / Delivered Architecture
            </span>
            <h2 className="font-display text-2xl font-bold text-[#111111] mb-4">
              The Technical Solution
            </h2>
            <div className="prose max-w-none text-base leading-relaxed text-[#333333]">
              <p>{project.solution}</p>
            </div>

            {/* Architecture Notes list */}
            {project.architectureNotes && project.architectureNotes.length > 0 && (
              <div className="mt-6 border border-[#E5E5E0] bg-white p-6">
                <span className="font-mono text-xs uppercase tracking-wider text-[#767676] block mb-3">
                  Key Technical Invariants &amp; Kernel Optimizations
                </span>
                <ul className="space-y-3 font-mono text-xs text-[#333333]">
                  {project.architectureNotes.map((note, nIdx) => (
                    <li key={nIdx} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 bg-[#D92D20] shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Trade-offs & Engineering Decisions */}
          {project.tradeOffs && project.tradeOffs.length > 0 && (
            <section className="border-t border-[#E5E5E0] pt-8">
              <span className="font-mono text-xs uppercase tracking-widest text-[#767676] block mb-2">
                04 / Architectural Trade-offs
              </span>
              <h2 className="font-display text-2xl font-bold text-[#111111] mb-4">
                Deliberate Compromises
              </h2>
              <div className="border-l-2 border-[#111111] pl-6 py-2 bg-[#F4F4F0] p-4 text-xs sm:text-sm text-[#444444] space-y-3">
                {project.tradeOffs.map((trade, tIdx) => (
                  <p key={tIdx}>&bull; {trade}</p>
                ))}
              </div>
            </section>
          )}

          {/* Business & System Outcome */}
          <section className="border-t border-[#E5E5E0] pt-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#767676] block mb-2">
              05 / Production Impact
            </span>
            <h2 className="font-display text-2xl font-bold text-[#111111] mb-4">
              Outcome &amp; Verification
            </h2>
            <div className="border border-emerald-300 bg-emerald-50/50 p-6 text-sm text-[#111111] leading-relaxed">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-700 shrink-0" />
                <div>
                  <p className="font-medium">{project.outcome}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Matrix */}
          <section className="border-t border-[#E5E5E0] pt-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#767676] block mb-4">
              06 / Applied Technology Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="border border-[#E5E5E0] bg-white px-3 py-1 font-mono text-xs text-[#222222]"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Adjacent Project Navigation */}
        <nav
          aria-label="Previous and Next Case Studies"
          className="mt-16 border-t-2 border-[#111111] pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {prev ? (
            <button
              onClick={() => navigate(`/projects/${prev.slug}`)}
              className="group flex flex-col items-start p-4 border border-[#E5E5E0] bg-white text-left hover:border-[#111111] transition-colors"
            >
              <span className="flex items-center gap-1.5 font-mono text-xs text-[#767676] mb-1">
                <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                <span>PREVIOUS CASE STUDY</span>
              </span>
              <span className="font-display font-bold text-base text-[#111111] group-hover:text-[#D92D20]">
                {prev.title}
              </span>
            </button>
          ) : (
            <div />
          )}

          {next ? (
            <button
              onClick={() => navigate(`/projects/${next.slug}`)}
              className="group flex flex-col items-end p-4 border border-[#E5E5E0] bg-white text-right hover:border-[#111111] transition-colors"
            >
              <span className="flex items-center gap-1.5 font-mono text-xs text-[#767676] mb-1">
                <span>NEXT CASE STUDY</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-display font-bold text-base text-[#111111] group-hover:text-[#D92D20]">
                {next.title}
              </span>
            </button>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </article>
  );
}
