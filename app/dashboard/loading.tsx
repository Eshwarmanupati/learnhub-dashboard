import { SkeletonGrid } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
      <SkeletonGrid />
    </main>
  );
}
