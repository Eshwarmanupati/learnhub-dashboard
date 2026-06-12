'use client';

import { motion } from 'framer-motion';
import { MotionTile } from '@/components/ui/motion-tile';
import { Target, Clock, Zap } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'neutral';
}

const STATS: StatItem[] = [
  {
    icon: Target,
    label: 'Goals Met',
    value: '8/10',
    change: '+2 this week',
    changeType: 'positive',
  },
  {
    icon: Clock,
    label: 'Study Hours',
    value: '23.5h',
    change: 'This month',
    changeType: 'neutral',
  },
  {
    icon: Zap,
    label: 'XP Earned',
    value: '2,450',
    change: '+350 today',
    changeType: 'positive',
  },
];

export function StatsTile() {
  return (
    <MotionTile index={6} className="min-h-[200px]">
      <span className="flex h-full flex-col p-5 sm:p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-200">Quick Stats</h2>

        <span className="flex flex-1 flex-col justify-between gap-3">
          {STATS.map((stat, i) => (
            <motion.span
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                <stat.icon className="h-4 w-4 text-indigo-400" />
              </span>
              <span className="flex-1">
                <span className="flex items-baseline justify-between">
                  <span className="text-xs text-zinc-400">{stat.label}</span>
                  <span className="text-sm font-bold tabular-nums text-zinc-100">
                    {stat.value}
                  </span>
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    stat.changeType === 'positive' ? 'text-emerald-400' : 'text-zinc-500'
                  }`}
                >
                  {stat.change}
                </span>
              </span>
            </motion.span>
          ))}
        </span>
      </span>
    </MotionTile>
  );
}
