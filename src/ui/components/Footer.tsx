import { Github, Linkedin, Mail } from 'lucide-react';
import type { PortfolioOwner } from '../../domain/entities.ts';

interface FooterProps {
  owner: PortfolioOwner;
}

export function Footer({ owner }: FooterProps) {
  return (
    <footer className="border-t border-[#E5E5E0] bg-[#FAFAF9] py-8 text-[#111111]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-[#666666]">
          {/* Name & Copyright */}
          <div>
            <span className="font-semibold text-[#111111]">{owner.name}</span>
            <span className="mx-2">•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* 3 Social Links */}
          <div className="flex items-center gap-5">
            <a
              href={owner.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={owner.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${owner.email}`}
              className="flex items-center gap-1.5 hover:text-[#111111] transition-colors"
              aria-label="Email"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
