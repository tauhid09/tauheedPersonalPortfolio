import type { Testimonial } from '../../domain/entities.ts';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const items = testimonials.filter((t) => t.permissionToPublish).slice(0, 2);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
      {items.map((item) => (
        <blockquote
          key={item.id}
          className="border border-[#E5E5E0] bg-[#FAFAF9] p-6 sm:p-8"
        >
          <p className="text-sm sm:text-base text-[#333333] leading-relaxed italic">
            &ldquo;{item.quote}&rdquo;
          </p>
          <footer className="mt-4 pt-4 border-t border-[#E5E5E0]">
            <div className="font-display font-bold text-sm text-[#111111]">
              {item.author}
            </div>
            <div className="font-mono text-xs text-[#666666] mt-0.5">
              {item.role}, {item.company}
            </div>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
