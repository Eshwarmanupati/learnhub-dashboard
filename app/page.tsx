import { redirect } from 'next/navigation';

/**
 * Root page redirects to the dashboard.
 * This ensures the app always starts at the dashboard route.
 */
export default function Home() {
  redirect('/dashboard');
}
