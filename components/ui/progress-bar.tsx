'use client';

import { motion, useMotionValue, useSpring, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface ProgressBarProps {
  value: number;
  label: string;
}

/**
 * Animated progress bar component.
 * Starts at 0% and animates to the target value when in viewport.
 * Uses a gradient fill with smooth spring physics.
 */
export function ProgressBar({ value, label }: ProgressBarProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const motionWidth = useMotionValue(0);
  const springWidth = useSpring(motionWidth, {
    stiffness: 80,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    if (isInView) {
      motionWidth.set(value);
    }
  }, [isInView, value, motionWidth]);

  return (
    <span ref={ref} className="block" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">Progress</span>
        <motion.span
          className="text-xs font-semibold tabular-nums text-zinc-300"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {value}%
        </motion.span>
      </span>
      <span className="block h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.span
          className="block h-full rounded-full"
          style={{
            width: springWidth.get() + '%',
            background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          }}
          animate={isInView ? { width: `${value}%` } : { width: '0%' }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
        />
      </span>
    </span>
  );
}
