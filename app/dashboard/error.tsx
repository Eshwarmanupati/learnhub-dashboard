'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Error boundary for the dashboard route.
 * Provides a graceful error state with a retry button.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <motion.section
        className="flex max-w-md flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
          <AlertTriangle className="h-7 w-7 text-red-400" />
        </span>

        <h1 className="text-xl font-bold text-zinc-100">Something went wrong</h1>
        <p className="mt-2 text-sm text-zinc-400">
          {error.message || 'An unexpected error occurred while loading the dashboard.'}
        </p>

        <button
          onClick={reset}
          className="mt-6 flex items-center gap-2 rounded-xl bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-zinc-200 ring-1 ring-white/[0.08] transition-colors hover:bg-white/[0.1]"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </motion.section>
    </main>
  );
}
