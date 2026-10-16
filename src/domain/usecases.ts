import type { Project } from './entities.ts';
import { ContactFormSchema, type ContactFormData } from './validation.ts';

/**
 * Filter projects by tag and optional text search query.
 */
export function filterProjects(
  projects: Project[],
  selectedTag: string,
  searchQuery: string = ''
): Project[] {
  const normTag = selectedTag.toLowerCase().trim();
  const normSearch = searchQuery.toLowerCase().trim();

  return projects
    .filter((project) => project.published)
    .filter((project) => {
      // Tag filter
      if (normTag && normTag !== 'all') {
        const hasTag = project.tags.some((t) => t.toLowerCase() === normTag);
        const hasStack = project.stack.some((s) => s.toLowerCase() === normTag);
        if (!hasTag && !hasStack) return false;
      }

      // Search filter
      if (normSearch) {
        const matchesTitle = project.title.toLowerCase().includes(normSearch);
        const matchesTagline = project.tagline.toLowerCase().includes(normSearch);
        const matchesSolution = project.solution.toLowerCase().includes(normSearch);
        const matchesStack = project.stack.some((s) => s.toLowerCase().includes(normSearch));
        if (!matchesTitle && !matchesTagline && !matchesSolution && !matchesStack) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => a.order - b.order);
}

/**
 * Get project by slug
 */
export function getProjectBySlug(projects: Project[], slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Get previous and next project for case-study navigation
 */
export function getAdjacentProjects(
  projects: Project[],
  currentSlug: string
): { prev?: Project; next?: Project } {
  const published = projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
  const index = published.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return {};

  const prev = index > 0 ? published[index - 1] : undefined;
  const next = index < published.length - 1 ? published[index + 1] : undefined;

  return { prev, next };
}

/**
 * Extract distinct tags across all published projects
 */
export function extractUniqueTags(projects: Project[]): string[] {
  const tagsSet = new Set<string>();
  for (const project of projects) {
    if (!project.published) continue;
    for (const tag of project.tags) {
      tagsSet.add(tag);
    }
  }
  return Array.from(tagsSet).sort();
}

/**
 * Validate contact submission using pure domain validator
 */
export function validateContactSubmission(input: unknown): {
  success: boolean;
  data?: ContactFormData;
  errors?: Record<string, string>;
} {
  const result = ContactFormSchema.safeParse(input);
  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] ? String(issue.path[0]) : 'general';
      errors[field] = issue.message;
    }
    return { success: false, errors };
  }
  return { success: true, data: result.data };
}

/**
 * Estimate reading time for deep-dive case studies
 */
export function estimateReadingTimeMinutes(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
