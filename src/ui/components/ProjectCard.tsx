import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../domain/entities.ts';
import { navigate } from '../router.ts';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const handleCardClick = () => {
    navigate(`/projects/${project.slug}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="group flex flex-col justify-between border border-[#E5E5E0] bg-[#FAFAF9] p-6 sm:p-8 transition-colors duration-200 hover:border-[#111111] hover:bg-white cursor-pointer"
    >
      <div>
        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#111111] group-hover:text-[#D92D20] transition-colors">
          {project.title}
        </h3>

        {/* ONE-line description */}
        <p className="mt-3 text-sm text-[#555555] leading-relaxed line-clamp-1">
          {project.tagline}
        </p>

        {/* 3-4 tech tags */}
        <div className="mt-5 flex flex-wrap items-center gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="border border-[#E5E5E0] bg-white px-2.5 py-0.5 font-mono text-xs text-[#555555]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action: View case study link */}
      <div className="mt-6 pt-4 border-t border-[#F0F0EC] flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-[#111111] group-hover:text-[#D92D20] group-hover:underline flex items-center gap-1 font-medium">
          View case study
          <ArrowUpRight className="h-3.5 w-3.5 text-[#767676] group-hover:text-[#D92D20] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
