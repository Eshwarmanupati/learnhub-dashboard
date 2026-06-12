import { createServerSupabaseClient } from './server';
import type { Course } from '@/types';

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    progress: 75,
    icon_name: 'Brain',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Next.js Performance',
    progress: 60,
    icon_name: 'Rocket',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'System Design Basics',
    progress: 45,
    icon_name: 'Network',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'TypeScript Mastery',
    progress: 90,
    icon_name: 'Code',
    created_at: new Date().toISOString(),
  },
];

export async function fetchCourses(): Promise<Course[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl === 'your_supabase_project_url'
  ) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_COURSES;
  }

  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase query error:', error.message);
      return MOCK_COURSES;
    }

    return data ?? MOCK_COURSES;
  } catch (err) {
    console.error('Failed to fetch courses:', err);
    return MOCK_COURSES;
  }
}
