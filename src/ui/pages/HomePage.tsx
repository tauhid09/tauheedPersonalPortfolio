import { useState, useEffect } from 'react';
import { repository } from '../../data/repository.ts';
import { Hero } from '../components/Hero.tsx';
import { ProjectCard } from '../components/ProjectCard.tsx';
import { Timeline } from '../components/Timeline.tsx';
import { SkillsGrid } from '../components/SkillsGrid.tsx';
import { EducationAndCerts } from '../components/EducationAndCerts.tsx';
import { Testimonials } from '../components/Testimonials.tsx';
import { ContactForm } from '../components/ContactForm.tsx';

interface HomePageProps {
  onOpenResume: () => void;
  onOpenChat: () => void;
}

export function HomePage({ onOpenResume, onOpenChat }: HomePageProps) {
  const [projects, setProjects] = useState(() => repository.getProjects());
  const [owner, setOwner] = useState(() => repository.getOwner());
  const [experience, setExperience] = useState(() => repository.getExperience());
  const [education, setEducation] = useState(() => repository.getEducation());
  const [certifications, setCertifications] = useState(() => repository.getCertifications());
  const [testimonials, setTestimonials] = useState(() => repository.getTestimonials());

  useEffect(() => {
    document.title = `${owner.name} | Salesforce Associate Developer`;
    const unsubscribe = repository.subscribe(() => {
      setProjects(repository.getProjects());
      setOwner(repository.getOwner());
      setExperience(repository.getExperience());
      setEducation(repository.getEducation());
      setCertifications(repository.getCertifications());
      setTestimonials(repository.getTestimonials());
    });
    return () => unsubscribe();
  }, [owner.name]);

  // Show 3 projects only as required
  const displayedProjects = projects.slice(0, 3);

  return (
    <div id="main-content" className="bg-[#FAFAF9] text-[#111111]">
      {/* Hero */}
      <Hero owner={owner} onOpenChat={onOpenChat} />

      {/* Selected Work */}
      <section id="work" className="border-b border-[#E5E5E0] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[#E5E5E0] pb-4 mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#111111]">
              Selected Work
            </h2>
            <p className="mt-1 text-sm text-[#666666]">
              Salesforce CRM solutions and enterprise implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-[#E5E5E0] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[#E5E5E0] pb-4 mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#111111]">
              About
            </h2>
          </div>

          <div className="max-w-3xl space-y-3">
            <p className="text-base sm:text-lg text-[#333333] leading-relaxed">
              Salesforce Associate Developer at KloudCodey specializing in bulkified Apex, responsive Lightning Web Components, and automated Flows. Focused on scalable CRM architectures and seamless enterprise integrations.
            </p>
            <p className="font-mono text-xs text-[#767676]">
              Based in {owner.location}.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-b border-[#E5E5E0] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[#E5E5E0] pb-4 mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#111111]">
              Experience
            </h2>
          </div>

          <Timeline experiences={experience} />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-b border-[#E5E5E0] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[#E5E5E0] pb-4 mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#111111]">
              Skills
            </h2>
          </div>

          <SkillsGrid />
        </div>
      </section>

      {/* Education & Certifications */}
      <section id="education" className="border-b border-[#E5E5E0] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[#E5E5E0] pb-4 mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#111111]">
              Education &amp; Certifications
            </h2>
          </div>

          <EducationAndCerts education={education} certifications={certifications} />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="border-b border-[#E5E5E0] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[#E5E5E0] pb-4 mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#111111]">
              Testimonials
            </h2>
          </div>

          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[#E5E5E0] pb-4 mb-8">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#111111]">
              Contact
            </h2>
          </div>

          <ContactForm owner={owner} onOpenResume={onOpenResume} />
        </div>
      </section>
    </div>
  );
}
