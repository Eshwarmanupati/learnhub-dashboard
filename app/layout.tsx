import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'LearnHub — Student Learning Dashboard',
    template: '%s — LearnHub',
  },
  description:
    'A modern student learning dashboard to track your courses, progress, and learning activity. Built with Next.js, Supabase, and Framer Motion.',
  metadataBase: new URL('https://learnhub.vercel.app'),
  openGraph: {
    title: 'LearnHub — Student Learning Dashboard',
    description: 'Track your courses, progress, and learning activity.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full bg-zinc-950 font-sans text-zinc-100">
        {children}
      </body>
    </html>
  );
}
