import type { Variants, Transition } from 'framer-motion';

export const HERO_EASE = [0.22, 1, 0.36, 1] as const;

export const HOVER_TRANSITION: Transition = {
  duration: 0.2,
  ease: 'easeOut',
};

// Container stagger
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// 1. Badge row: fade in + slide up 12px, 0.5s, delay 0.1s
export const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: HERO_EASE,
    },
  },
};

// 2. Headline masked slide-up: line inside overflow-hidden, moves from translateY(100%) to 0, 0.7s
export const headlineLineVariants: Variants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: HERO_EASE,
    },
  },
};

// Line 3 accent fade
export const headlineLine3Variants: Variants = {
  hidden: { y: '100%', opacity: 0.5 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: HERO_EASE,
      opacity: {
        duration: 0.6,
        delay: 0.2,
        ease: 'easeOut',
      },
    },
  },
};

// 3. Subtext paragraph: fade in + slide up 16px, 0.6s
export const subtextVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: HERO_EASE,
    },
  },
};

// 4. Buttons container & items: fade + slide up 12px, staggered by 0.08s
export const buttonContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const buttonItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: HERO_EASE,
    },
  },
};

// 5. Location / metadata row: simple fade in, 0.5s
export const metaRowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Right column architecture card: fade in + slide up 24px + scale from 0.98 to 1, 0.8s, delay 0.4s
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.4,
      ease: HERO_EASE,
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

// Staggered items inside the card
export const cardHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: HERO_EASE },
  },
};

export const cardSlideRightVariants: Variants = {
  hidden: { opacity: 0, x: 12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: HERO_EASE },
  },
};

export const cardMetricsVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: HERO_EASE },
  },
};

export const cardCodeVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: HERO_EASE },
  },
};

// "Zero" metric slight scale from 0.9 to 1
export const zeroMetricVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: HERO_EASE },
  },
};

// Fallback for reduced motion
export const reducedMotionFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};
