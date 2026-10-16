import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navigate } from '../router.ts';
import { useTheme } from '../theme.ts';
import { Menu, X, ArrowUpRight, FileText, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onOpenResume: () => void;
  activeSection?: string;
  isHome?: boolean;
}

export function Header({ onOpenResume, activeSection = '', isHome = true }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (!isHome) {
      navigate('/' + href);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* WCAG Skip to Main Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#111111] focus:text-[#FAFAF9] focus:px-4 focus:py-2 focus:text-xs focus:font-mono focus:uppercase focus:tracking-wider focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
          scrolled
            ? 'bg-[#FAFAF9]/95 backdrop-blur-sm border-b border-[#E5E5E0]'
            : 'bg-[#FAFAF9] border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo / Monogram */}
          <button
            onClick={() => {
              if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
            }}
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="Mohd Tauheed Ansari home"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-[#111111] bg-[#111111] text-xs font-mono font-medium text-[#FAFAF9] transition-transform group-hover:scale-105">
              TA
            </span>
            <div className="flex flex-col">
              <span className="font-display text-sm font-semibold tracking-tight text-[#111111]">
                Mohd Tauheed Ansari
              </span>
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-[#767676]">
                Salesforce Associate Developer
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`group relative flex items-center gap-1.5 py-1 text-xs font-mono tracking-wider uppercase transition-colors ${
                    isActive ? 'text-[#D92D20] font-medium' : 'text-[#555555] hover:text-[#111111]'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="relative">
                    {item.label}
                    {/* Animated hover underline growing from left to right */}
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#111111] transition-all duration-200 ease-out group-hover:w-full" />
                  </span>

                  {/* Active highlight with shared layoutId */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="h-1.5 w-1.5 rounded-full bg-[#D92D20]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Theme Toggle + Status + Resume */}
          <div className="hidden sm:flex items-center gap-3 lg:gap-4">
            {/* Minimalist Swiss Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 border border-[#E5E5E0] bg-transparent px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-wider text-[#555555] hover:border-[#111111] hover:text-[#111111] transition-colors focus:outline-none"
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={isDark}
            >
              {isDark ? (
                <>
                  <Sun className="h-3 w-3 text-[#F5F5F4]" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3 w-3 text-[#111111]" />
                  <span>Dark</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2 border border-[#E5E5E0] px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#555555]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Available</span>
            </div>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 border border-[#111111] bg-transparent px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-[#111111] transition-all hover:bg-[#111111] hover:text-[#FAFAF9] focus:outline-none"
              aria-label="View and download printable resume"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile menu trigger + theme toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 border border-[#E5E5E0] text-[#555555] hover:text-[#111111]"
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={isDark}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={onOpenResume}
              className="border border-[#111111] px-2.5 py-1 text-xs font-mono uppercase"
              aria-label="Resume"
            >
              CV
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-[#E5E5E0] text-[#111111] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Dialog */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#E5E5E0] bg-[#FAFAF9] px-4 py-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E0]">
                <span className="font-mono text-xs uppercase tracking-wider text-[#767676]">Navigation</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex items-center gap-1 font-mono text-xs uppercase text-[#555555] border border-[#E5E5E0] px-2 py-0.5"
                  >
                    {isDark ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                  <span className="font-mono text-xs uppercase text-emerald-700 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    Available
                  </span>
                </div>
              </div>
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="flex items-center justify-between py-2.5 text-left font-display text-base font-medium text-[#111111] border-b border-[#F0F0EC]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#999999]" />
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full border border-[#111111] bg-[#111111] py-2.5 text-center font-mono text-xs uppercase tracking-wider text-[#FAFAF9]"
                >
                  Resume (PDF)
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
