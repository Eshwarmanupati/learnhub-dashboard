import { Suspense } from 'react';
import { fetchCourses } from '@/lib/supabase/queries';
import { BentoGrid } from '@/components/dashboard/bento-grid';
import { HeroTile } from '@/components/dashboard/hero-tile';
import { CourseGrid } from '@/components/dashboard/course-tile';
import { ActivityTile } from '@/components/dashboard/activity-tile';
import { StatsTile } from '@/components/dashboard/stats-tile';
import { SkeletonGrid } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard — LearnHub',
  description: 'Your personalized learning dashboard. Track course progress, view activity, and stay on top of your learning goals.',
};

/**
 * Server Component that fetches course data and renders the dashboard.
 * The data fetching happens entirely on the server — no client-side fetching.
 * Client components receive data as props.
 */
async function DashboardContent() {
  const courses = await fetchCourses();

  return (
    <BentoGrid>
      <HeroTile />
      <StatsTile />
      <CourseGrid courses={courses} />
      <ActivityTile />
    </BentoGrid>
  );
}

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto pb-20 md:pb-6">
      {/* Grain texture overlay */}
      <span
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      <Suspense fallback={<SkeletonGrid />}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
