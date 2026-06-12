'use client';

import { MotionTile } from '@/components/ui/motion-tile';
import { ProgressBar } from '@/components/ui/progress-bar';
import { getIcon } from '@/lib/icon-map';
import type { Course } from '@/types';

interface CourseTileProps {
  course: Course;
  index: number;
}

/**
 * Individual course tile with glassmorphism effect, dynamic icon,
 * and animated progress bar. Data is passed from Server Components.
 */
export function CourseTile({ course, index }: CourseTileProps) {
  const Icon = getIcon(course.icon_name);

  return (
    <MotionTile index={index + 1} className="min-h-[180px]">
      <span className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        {/* Gradient mesh background */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
          style={{
            background: `radial-gradient(ellipse at ${30 + index * 15}% ${40 + index * 10}%, rgba(99,102,241,0.15) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />

        <span className="relative">
          {/* Icon */}
          <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 ring-1 ring-white/[0.08]">
            <Icon className="h-5 w-5 text-indigo-400" />
          </span>

          {/* Title */}
          <h2 className="text-base font-semibold tracking-tight text-zinc-100">
            {course.title}
          </h2>
        </span>

        {/* Progress */}
        <span className="relative mt-4">
          <ProgressBar
            value={course.progress}
            label={`${course.title} progress`}
          />
        </span>
      </span>
    </MotionTile>
  );
}

interface CourseGridProps {
  courses: Course[];
}

/**
 * Renders a list of course tiles.
 * Receives course data from a Server Component parent.
 */
export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <>
      {courses.map((course, i) => (
        <CourseTile key={course.id} course={course} index={i} />
      ))}
    </>
  );
}
