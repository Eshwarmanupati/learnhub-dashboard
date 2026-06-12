'use client';

import { motion } from 'framer-motion';
import { Flame, Sparkles, TrendingUp } from 'lucide-react';
import { MotionTile } from '@/components/ui/motion-tile';

/**
 * Hero tile displayed at the top of the Bento grid.
 * Features animated gradient background, welcome message,
 * and a learning streak indicator.
 */
export function HeroTile() {
  return (
    <MotionTile index={0} className="md:col-span-2 lg:col-span-2 min-h-[220px]">
      <span className="relative flex h-full flex-col justify-between p-6 sm:p-8">
        {/* Animated gradient background */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-40"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.2) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(236,72,153,0.15) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        {/* Floating particle effects */}
        <motion.span
          className="pointer-events-none absolute right-8 top-6 h-24 w-24 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        />
        <motion.span
          className="pointer-events-none absolute bottom-12 left-1/3 h-16 w-16 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          aria-hidden="true"
        />

        <span className="relative">
          <span className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-medium uppercase tracking-widest text-indigo-400">
              Welcome back
            </span>
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
            Good to see you,{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Student
            </span>
          </h1>
          <p className="mt-2 max-w-md text-sm text-zinc-400">
            You&apos;re making great progress. Keep the momentum going and crush your learning goals.
          </p>
        </span>

        {/* Streak & stats row */}
        <span className="relative mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
          <span className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-2.5">
            <Flame className="h-5 w-5 text-orange-400" />
            <span className="block">
              <span className="text-lg font-bold leading-none text-zinc-100">12</span>
              <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Day streak
              </span>
            </span>
          </span>

          <span className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-2.5">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <span className="block">
              <span className="text-lg font-bold leading-none text-zinc-100">67%</span>
              <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                Avg progress
              </span>
            </span>
          </span>
        </span>
      </span>
    </MotionTile>
  );
}
