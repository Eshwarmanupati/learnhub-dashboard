import { Sidebar } from '@/components/layout/sidebar';

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
