import { useState, useEffect } from 'react';
import { useRouter } from './ui/router.ts';
import { repository } from './data/repository.ts';
import { Header } from './ui/components/Header.tsx';
import { Footer } from './ui/components/Footer.tsx';
import { CustomCursor } from './ui/components/CustomCursor.tsx';
import { ResumeModal } from './ui/components/ResumeModal.tsx';
import { ChatWidget } from './ui/components/ChatWidget.tsx';
import { HomePage } from './ui/pages/HomePage.tsx';
import { CaseStudyPage } from './ui/pages/CaseStudyPage.tsx';
import { PrivacyPage } from './ui/pages/PrivacyPage.tsx';
import { AdminPage } from './ui/pages/AdminPage.tsx';
import { NotFoundPage } from './ui/pages/NotFoundPage.tsx';
import { LoadingScreen } from './ui/components/LoadingScreen.tsx';

export default function App() {
  const { route } = useRouter();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const [owner, setOwner] = useState(() => repository.getOwner());
  const [experience, setExperience] = useState(() => repository.getExperience());
  const [skillGroups, setSkillGroups] = useState(() => repository.getSkillGroups());
  const [education, setEducation] = useState(() => repository.getEducation());
  const [certifications, setCertifications] = useState(() => repository.getCertifications());

  useEffect(() => {
    const unsub = repository.subscribe(() => {
      setOwner(repository.getOwner());
      setExperience(repository.getExperience());
      setSkillGroups(repository.getSkillGroups());
      setEducation(repository.getEducation());
      setCertifications(repository.getCertifications());
    });
    return () => unsub();
  }, []);

  // IntersectionObserver for tracking active section on Home
  useEffect(() => {
    if (route.path !== '/') return;

    const sections = ['work', 'about', 'experience', 'skills', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [route.path]);

  const isHome = route.path === '/';
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)] transition-colors duration-150">
      {/* Precision Swiss Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Precision Follower Cursor */}
      <CustomCursor />

      {/* Sticky Minimal Swiss Header */}
      <Header
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
        isHome={isHome}
      />

      {/* Main View Switcher */}
      <main id="content-root">
        {route.path === '/' && (
          <HomePage
            onOpenResume={() => setIsResumeOpen(true)}
            onOpenChat={() => setIsChatOpen(true)}
          />
        )}

        {route.path === '/projects/:slug' && (
          <CaseStudyPage slug={route.params.slug} />
        )}

        {route.path === '/privacy' && <PrivacyPage />}

        {route.path === '/admin' && <AdminPage />}

        {route.path === '404' && <NotFoundPage />}
      </main>

      {/* Minimal Footer */}
      <Footer owner={owner} />

      {/* Printable / Downloadable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        owner={owner}
        experience={experience}
        education={education}
        certifications={certifications}
        skillGroups={skillGroups}
      />

      {/* Grounded Portfolio AI Assistant */}
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
      />
    </div>
  );
}
