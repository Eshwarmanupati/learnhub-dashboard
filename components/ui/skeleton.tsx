'use client';

import { motion } from 'framer-motion';

export function SkeletonTile({ className = '' }: { className?: string }) {
  return (
    <motion.span
      className={`relative block overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.02] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      aria-busy="true"
      aria-label="Loading content"
      role="status"
    >
      <span
        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
        }}
      />
    </motion.span>
  );
}

export function SkeletonGrid() {
  return (
    <section className="grid auto-rows-[minmax(180px,_1fr)] gap-4 p-4 sm:p-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1" aria-label="Loading dashboard">
      <SkeletonTile className="min-h-[220px] md:col-span-2 lg:col-span-2" />
      <SkeletonTile className="min-h-[180px]" />
      <SkeletonTile className="min-h-[180px]" />
      <SkeletonTile className="min-h-[180px]" />
      <SkeletonTile className="min-h-[200px] md:col-span-2 lg:col-span-2" />
      <SkeletonTile className="min-h-[180px]" />
    </section>
  );
}
