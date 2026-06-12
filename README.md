# LearnHub — Student Learning Dashboard

A premium, futuristic student learning dashboard built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, and **Supabase**. Features an animated Bento Grid layout, glassmorphism effects, and responsive design inspired by Linear, Vercel, and Raycast.

![Dashboard Preview](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

- **Animated Bento Grid** — Staggered tile entry with spring physics hover effects
- **Server-First Architecture** — Data fetched exclusively in Server Components
- **Supabase Integration** — Real-time course data with graceful fallback to mock data
- **Glassmorphism Design** — Subtle transparency, backdrop blur, gradient borders
- **Responsive Layout** — Full sidebar → icons-only → bottom nav
- **Animated Progress Bars** — Spring-physics driven, accessible progress indicators
- **Activity Contribution Chart** — GitHub-style learning activity visualization
- **Grain Texture Overlay** — Subtle noise for premium depth
- **Skeleton Loading States** — Animated shimmer placeholders during data fetching

---

## 🏗️ Architecture Decisions

### Server/Client Component Split

The application follows Next.js 15's recommended pattern of **server-first rendering**:

| Component | Type | Rationale |
|---|---|---|
| `app/dashboard/page.tsx` | Server | Fetches courses from Supabase at the edge |
| `app/dashboard/layout.tsx` | Server | Renders layout structure |
| `app/dashboard/loading.tsx` | Server | Provides Suspense fallback |
| `components/layout/sidebar.tsx` | Client | Interactive collapse/expand + navigation state |
| `components/dashboard/hero-tile.tsx` | Client | Framer Motion animations |
| `components/dashboard/course-tile.tsx` | Client | Animated progress bars + hover effects |
| `components/dashboard/activity-tile.tsx` | Client | Animated contribution chart cells |
| `components/dashboard/bento-grid.tsx` | Client | Staggered animation orchestration |
| `components/ui/motion-tile.tsx` | Client | Reusable Framer Motion wrapper |
| `components/ui/progress-bar.tsx` | Client | Spring-animated progress fill |

**Key principle:** Data flows server → client. The `page.tsx` Server Component fetches data and passes it as props to Client Components. No client-side data fetching occurs.

### Animation Strategy

All animations use **Framer Motion** with these constraints:

1. **GPU-optimized properties only** — Only `transform` and `opacity` are animated (no `width`, `height`, or `left/top`)
2. **Spring physics** — Hover states use `type: "spring"` with `stiffness: 300, damping: 20` for natural feel
3. **Staggered entry** — Tiles animate sequentially with `0.1s` delay between each
4. **No layout shifts** — `scale` transforms don't affect document flow; all tiles have fixed minimum heights
5. **`layoutId`** — Sidebar active state uses `layoutId="active-nav"` for seamless animated transitions

### Folder Structure

```
app/
  layout.tsx          # Root layout (Server Component)
  page.tsx            # Redirects to /dashboard
  globals.css         # Global styles + Tailwind
  dashboard/
    layout.tsx        # Dashboard layout with sidebar
    page.tsx          # Main dashboard (Server Component — data fetching)
    loading.tsx       # Suspense skeleton fallback
    error.tsx         # Error boundary with retry

components/
  layout/
    sidebar.tsx       # Collapsible sidebar + mobile bottom nav
  dashboard/
    bento-grid.tsx    # Grid container with stagger orchestration
    hero-tile.tsx     # Welcome banner + streak indicator
    course-tile.tsx   # Course cards with progress bars
    activity-tile.tsx # Contribution/activity chart
    stats-tile.tsx    # Quick stats panel
  ui/
    motion-tile.tsx   # Reusable animated tile wrapper
    progress-bar.tsx  # Animated progress bar
    skeleton.tsx      # Skeleton loading components

lib/
  supabase/
    server.ts         # Supabase server client factory
    queries.ts        # Data fetching functions
    index.ts          # Barrel exports
  activity-data.ts    # Mock activity data generator
  icon-map.tsx        # Dynamic icon resolver

types/
  index.ts            # TypeScript interfaces
```

### Challenges & Solutions

1. **Next.js 15 Client/Server Split**:
   - *Challenge:* Maintaining dynamic layout and client interactions (such as the collapsible sidebar and animated progress bars) without resorting to client-side data fetching waterfalls.
   - *Solution:* Rerouted all data fetching into a single server-side entry point in the main dashboard Page Component. The server client calls Supabase at the edge and feeds the results down to animated client presentation tiles, optimizing LCP and SEO.

2. **Supabase Resilient Integration**:
   - *Challenge:* Ensuring the application works out of the box when Supabase environment variables are missing (such as during initial preview/local setup or clean clone).
   - *Solution:* Implemented a query isolation layer that dynamically verifies environment variables and falls back to a realistic local mock database with simulated artificial network delays, allowing visual testing of loading states.

3. **Hydration Mismatches in Dynamic Grids**:
   - *Challenge:* Creating a highly visual learning activity calendar mapping 154 days across screens where relative timezones or local date offsets could cause server/client render mismatches.
   - *Solution:* Designed a deterministic, timezone-agnostic relative date offset generator for mock metadata, ensuring exact alignment between SSR and client hydration.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** 9+ (or pnpm/yarn)
- **Supabase** project (optional — falls back to mock data)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run this SQL in the SQL Editor:

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  progress INTEGER NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Brain'),
  ('Next.js Performance', 60, 'Rocket'),
  ('System Design Basics', 45, 'Network'),
  ('TypeScript Mastery', 90, 'Code');
```

3. Copy your project URL and anon key from **Settings → API** into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Note:** If you skip Supabase setup, the app will display mock data with the same course structure.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to the dashboard.

---

## 📦 Deployment (Vercel)

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — Vercel auto-detects Next.js

```bash
# Or deploy via CLI
npx vercel
```

---

## ⚡ Performance Optimizations

- **Server-first rendering** — Course data fetched on the server, zero client-side waterfalls
- **Minimal Client Components** — Only components requiring interactivity/animation use `'use client'`
- **Font optimization** — `next/font` with `display: swap` for zero layout shift
- **GPU-only animations** — Transform and opacity only; `will-change` hints where needed
- **Tailwind v4** — Automatic tree-shaking, no unused CSS shipped
- **Semantic HTML** — Proper `nav`, `main`, `section`, `article`, `aside` elements throughout
- **Accessible** — ARIA labels, focus-visible outlines, progress bar roles, color contrast

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15 (App Router) | Framework + Server Components |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Framer Motion | 12 | Animations |
| Supabase | 2 | Database |
| Lucide React | 1 | Icons |

---

## 📄 License

MIT
