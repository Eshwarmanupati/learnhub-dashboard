import { Sidebar } from '@/components/layout/sidebar';

/**
 * Dashboard layout wraps all /dashboard/* routes.
 * Renders the Sidebar alongside the page content.
 * The sidebar is a Client Component; the overall layout is a Server Component.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar />
      {children}
    </section>
  );
}
