'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionTileProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

const tileVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const hoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

/**
 * MotionTile wraps each Bento grid tile with staggered entry animation
 * and a spring-physics hover scale effect.
 * Only animates transform and opacity for GPU-accelerated performance.
 */
export function MotionTile({ children, index = 0, className = '' }: MotionTileProps) {
  return (
    <motion.article
      custom={index}
      variants={tileVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.12] ${className}`}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Gradient border glow on hover */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 50%, rgba(236,72,153,0.06) 100%)',
        }}
        variants={hoverVariants}
        aria-hidden="true"
      />
      <span className="relative block h-full">{children}</span>
    </motion.article>
  );
}
