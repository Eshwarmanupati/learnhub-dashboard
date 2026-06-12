'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Trophy,
  Calendar,
} from 'lucide-react';
import type { NavItem } from '@/types';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard', isActive: true },
  { label: 'Courses', icon: 'BookOpen', href: '#' },
  { label: 'Analytics', icon: 'BarChart3', href: '#' },
  { label: 'Achievements', icon: 'Trophy', href: '#' },
  { label: 'Schedule', icon: 'Calendar', href: '#' },
  { label: 'Settings', icon: 'Settings', href: '#' },
];

const iconComponents: Record<string, React.ElementType> = {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  GraduationCap,
  Trophy,
  Calendar,
};

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <>
      <motion.aside
        className="sticky top-0 hidden h-screen flex-col border-r border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl md:flex"
        animate={{ width: isCollapsed ? 72 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        aria-label="Main navigation"
      >
        <header className="flex h-16 items-center gap-3 border-b border-white/[0.06] px-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <GraduationCap className="h-5 w-5 text-white" />
          </span>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                className="text-sm font-semibold tracking-tight text-zinc-100 whitespace-nowrap"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                LearnHub
              </motion.span>
            )}
          </AnimatePresence>
        </header>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const IconComponent = iconComponents[item.icon] ?? LayoutDashboard;
            const isActive = activeItem === item.label;

            return (
              <button
                key={item.label}
                onClick={() => setActiveItem(item.label)}
                className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-xl bg-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <IconComponent className="relative h-5 w-5 shrink-0" />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      className="relative whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </nav>

        <footer className="border-t border-white/[0.06] p-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex w-full items-center justify-center rounded-lg py-2 text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-200"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </footer>
      </motion.aside>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/[0.06] bg-zinc-950/90 px-2 py-2 backdrop-blur-xl md:hidden"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const IconComponent = iconComponents[item.icon] ?? LayoutDashboard;
          const isActive = activeItem === item.label;

          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`relative flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${
                isActive ? 'text-indigo-400' : 'text-zinc-500'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-mobile"
                  className="absolute inset-0 rounded-lg bg-indigo-500/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <IconComponent className="relative h-5 w-5" />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
