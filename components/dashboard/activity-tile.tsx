'use client';

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { MotionTile } from '@/components/ui/motion-tile';
import { generateActivityData } from '@/lib/activity-data';

const LEVEL_COLORS = [
  'bg-white/[0.04]',           // level 0 — no activity
  'bg-indigo-500/30',          // level 1
  'bg-indigo-500/50',          // level 2
  'bg-purple-500/60',          // level 3
  'bg-purple-400/80',          // level 4
];

/**
 * Activity/contribution chart tile.
 * Displays a GitHub-style contribution grid showing learning activity.
 * Each cell animates in with a staggered delay for a premium feel.
 */
export function ActivityTile() {
  const activityData = generateActivityData();

  // Group days into weeks (columns of 7)
  const weeks: (typeof activityData)[] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const totalContributions = activityData.reduce((sum, d) => sum + d.count, 0);

  return (
    <MotionTile index={5} className="md:col-span-2 lg:col-span-2 min-h-[200px]">
      <span className="flex h-full flex-col p-5 sm:p-6">
        {/* Header */}
        <span className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-zinc-200">Learning Activity</h2>
          </span>
          <span className="text-xs text-zinc-500">
            <strong className="text-zinc-300">{totalContributions}</strong> contributions in the last 22 weeks
          </span>
        </span>

        {/* Contribution grid */}
        <span className="flex flex-1 items-center overflow-x-auto pb-2">
          <span className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <span key={weekIndex} className="flex flex-col gap-[3px]">
                {week.map((day, dayIndex) => (
                  <motion.span
                    key={day.date}
                    className={`h-[11px] w-[11px] rounded-[3px] ${LEVEL_COLORS[day.level]} transition-colors`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: weekIndex * 0.02 + dayIndex * 0.01,
                      duration: 0.3,
                      ease: 'easeOut',
                    }}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </span>
            ))}
          </span>
        </span>

        {/* Legend */}
        <span className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-zinc-500">
          <span>Less</span>
          {LEVEL_COLORS.map((color, i) => (
            <span key={i} className={`h-[10px] w-[10px] rounded-[2px] ${color}`} />
          ))}
          <span>More</span>
        </span>
      </span>
    </MotionTile>
  );
}
