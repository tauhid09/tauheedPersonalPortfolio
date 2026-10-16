import { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Terminal } from 'lucide-react';
import type { PortfolioOwner } from '../../domain/entities.ts';
import {
  HERO_EASE,
  HOVER_TRANSITION,
  heroContainerVariants,
  badgeVariants,
  headlineLineVariants,
  headlineLine3Variants,
  subtextVariants,
  buttonContainerVariants,
  buttonItemVariants,
  metaRowVariants,
  reducedMotionFade,
} from '../motion.ts';

// Lazy-load the Three.js Canvas component so typography and critical UI render instantly
const CodeScene = lazy(() =>
  import('./hero/CodeScene.tsx').then((module) => ({
    default: module.CodeScene,
  }))
);

interface HeroProps {
  owner: PortfolioOwner;
  onOpenChat?: () => void;
}

export function Hero({ owner, onOpenChat }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isHoveringButton, setIsHoveringButton] = useState(false);

  // Normalized mouse position (-1 to 1) for camera parallax
  const mouseNormRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebGLSupported(Boolean(gl));
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // Track mouse coordinates on hero container
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current || shouldReduceMotion) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouseNormRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    mouseNormRef.current = { x: 0, y: 0 };
  };

  // Scroll parallax: Fade canvas opacity toward 0 and shift text as user scrolls
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, shouldReduceMotion ? 1 : 0]
  );
  const textTranslateY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -35]
  );
  const canvasOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, shouldReduceMotion ? 1 : 0]
  );

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeVariants = shouldReduceMotion ? reducedMotionFade : heroContainerVariants;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ backgroundColor: 'var(--bg-primary)' }}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden border-b border-[#E5E5E0] transition-colors"
    >
      {/* 3D Three.js Animated Code Scene - Sits absolutely behind & to the right */}
      <motion.div
        ref={canvasWrapperRef}
        style={{ opacity: canvasOpacity }}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      >
        {webGLSupported && !shouldReduceMotion ? (
          <Suspense
            fallback={
              <div className="absolute inset-0 bg-transparent transition-opacity duration-1000" />
            }
          >
            <div className="animate-fade-in h-full w-full transition-opacity duration-1000">
              <CodeScene
                mouseNormRef={mouseNormRef}
                isFastParticles={isHoveringButton}
              />
            </div>
          </Suspense>
        ) : (
          /* WebGL fallback / Reduced motion static preview */
          <div className="absolute inset-0 flex items-center justify-end pr-8 sm:pr-16 opacity-30">
            <div className="max-w-md border border-[#E5E5E0] bg-[#111111] p-6 font-mono text-xs text-[#FAFAF9]">
              <p className="text-[#D92D20] font-semibold">// Apex Trigger Handler</p>
              <p className="mt-2 text-[#999999]">
                TriggerHandler.execute(OpportunityHandler.class);
              </p>
              <p className="mt-1 text-[#10B981]">
                Database.executeBatch(new LeadBatch(), 200);
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Left-to-right Dark/Light Gradient Overlay for Maximum Text Readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] w-full sm:w-[65%]"
        style={{
          background:
            'linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 65%, transparent 100%)',
        }}
      />

      {/* Foreground Content: Text stays on top (z-10), vertically centered */}
      <motion.div
        style={{
          opacity: textOpacity,
          y: textTranslateY,
        }}
        variants={activeVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
      >
        <div className="max-w-2xl">
          {/* Badge: MOHD TAUHEED ANSARI · SALESFORCE ASSOCIATE DEVELOPER */}
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFade : badgeVariants}
            className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs"
          >
            <span className="inline-flex items-center gap-2 border border-[#E5E5E0] bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xs px-3 py-1 text-[#D92D20] font-medium uppercase tracking-wider shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              <span>{owner.name}</span>
            </span>
            <span className="text-[#767676] hidden sm:inline">•</span>
            <span className="text-[#666666] dark:text-[#999999] uppercase tracking-wider hidden sm:inline">
              Salesforce Associate Developer
            </span>
          </motion.div>

          {/* Headline: Scalable CRM. / Dynamic LWC. / Clean automation. (line 3 dimmed) */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111111] dark:text-[#F5F5F4] leading-[1.06]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={shouldReduceMotion ? reducedMotionFade : headlineLineVariants}
                className="block will-change-transform"
              >
                Scalable CRM.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={shouldReduceMotion ? reducedMotionFade : headlineLineVariants}
                className="block will-change-transform"
              >
                Dynamic LWC.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={shouldReduceMotion ? reducedMotionFade : headlineLine3Variants}
                className="block text-[#666666] dark:text-[#777777] will-change-transform"
              >
                Clean automation.
              </motion.span>
            </span>
          </h1>

          {/* Subtext paragraph (max 2 lines) */}
          <motion.p
            variants={shouldReduceMotion ? reducedMotionFade : subtextVariants}
            className="mt-6 text-base sm:text-lg text-[#444444] dark:text-[#A3A3A3] leading-relaxed max-w-[50ch]"
          >
            {owner.valueProposition}
          </motion.p>

          {/* Buttons: View Work, Contact, Ask AI */}
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFade : buttonContainerVariants}
            className="mt-8 flex flex-wrap items-center gap-3.5"
          >
            <motion.button
              variants={shouldReduceMotion ? reducedMotionFade : buttonItemVariants}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { y: -2, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }
              }
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={HOVER_TRANSITION}
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
              onClick={scrollToWork}
              className="group inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-5 py-3 text-xs font-mono uppercase tracking-wider text-[#FAFAF9] dark:border-[#F5F5F4] dark:bg-[#F5F5F4] dark:text-[#111111] focus:outline-none"
            >
              <span>View Work</span>
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </motion.button>

            <motion.button
              variants={shouldReduceMotion ? reducedMotionFade : buttonItemVariants}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { y: -2, boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }
              }
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={HOVER_TRANSITION}
              onMouseEnter={() => setIsHoveringButton(true)}
              onMouseLeave={() => setIsHoveringButton(false)}
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 border border-[#E5E5E0] bg-white/90 dark:border-neutral-800 dark:bg-neutral-900/90 backdrop-blur-xs px-5 py-3 text-xs font-mono uppercase tracking-wider text-[#111111] dark:text-[#FAFAF9] focus:outline-none"
            >
              <span>Contact</span>
              <ArrowUpRight className="h-4 w-4 text-[#767676] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.button>

            {onOpenChat && (
              <motion.button
                variants={shouldReduceMotion ? reducedMotionFade : buttonItemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={HOVER_TRANSITION}
                onMouseEnter={() => setIsHoveringButton(true)}
                onMouseLeave={() => setIsHoveringButton(false)}
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 border border-[#D92D20]/40 bg-[#D92D20]/10 px-4 py-3 text-xs font-mono uppercase tracking-wider text-[#D92D20] transition-colors hover:bg-[#D92D20]/20 focus:outline-none"
                aria-label="Ask Portfolio AI"
              >
                <Terminal className="h-3.5 w-3.5 text-[#D92D20]" />
                <span>Ask AI</span>
              </motion.button>
            )}
          </motion.div>

          {/* Status Row: Varanasi, India · KloudCodey · Open for CRM Roles */}
          <motion.div
            variants={shouldReduceMotion ? reducedMotionFade : metaRowVariants}
            className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs text-[#767676] dark:text-[#888888]"
          >
            <span>Varanasi, India</span>
            <span>•</span>
            <span className="text-[#111111] dark:text-[#E5E5E5] font-medium">KloudCodey</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Open for CRM Roles</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
