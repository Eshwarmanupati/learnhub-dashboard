import { SkeletonGrid } from '@/components/ui/skeleton';

/**
 * Loading state for the dashboard route.
 * Displayed automatically by Next.js during server-side data fetching.
 */
export default function DashboardLoading() {
  return (
    <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
      <SkeletonGrid />
    </main>
  );
}
