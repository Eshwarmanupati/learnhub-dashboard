'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <motion.section
      className="grid auto-rows-[minmax(180px,_auto)] gap-4 p-4 sm:p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Dashboard overview"
    >
      {children}
    </motion.section>
  );
}
