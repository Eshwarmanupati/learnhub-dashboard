import type { ActivityDay } from '@/types';

/**
 * Generates deterministic mock activity data for the contribution chart.
 * Uses a seeded approach so data is consistent across renders.
 */
export function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = 154; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Simple hash-based pseudo-random for consistent data
    const seed = date.getDate() * 31 + date.getMonth() * 7 + date.getFullYear();
    const hash = ((seed * 2654435761) >>> 0) % 100;

    let count: number;
    let level: 0 | 1 | 2 | 3 | 4;

    if (hash < 25) {
      count = 0;
      level = 0;
    } else if (hash < 50) {
      count = 1 + (hash % 3);
      level = 1;
    } else if (hash < 72) {
      count = 4 + (hash % 4);
      level = 2;
    } else if (hash < 90) {
      count = 8 + (hash % 5);
      level = 3;
    } else {
      count = 13 + (hash % 6);
      level = 4;
    }

    days.push({
      date: date.toISOString().split('T')[0],
      count,
      level,
    });
  }

  return days;
}
