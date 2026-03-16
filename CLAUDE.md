# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**RunSync** is a React + TypeScript + Vite web application for managing running club coaching and athlete performance tracking. It has a dual-role system: coaches manage athletes/groups, clients/athletes track their own progress.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # TypeScript check + production build (tsc -b && vite build)
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

No test runner is configured.

## Environment

- `.env` — API base URL: `VITE_API_BASE_URL=https://localhost:7123/api`
- Path alias `@/*` maps to `src/*` (configured in `tsconfig.app.json` and `vite.config.ts`)

## Architecture

### Dual-Role System

User roles determine what UI is rendered:
- `role === 0` — Client/Athlete
- `role === 1` — Coach

Both contexts share the same routes but render different tabs and content via `MainTabs` and conditional rendering throughout components.

### State Management

Two React Context providers (in `src/context/`):
- **`UserContext`** — Authentication, user data, persisted to `localStorage`
- **`LanguageContext`** — i18n with English (`en`) and Croatian (`hr`); 370+ translation keys

### Routing (`src/App.tsx`)

React Router v7 with a `ProtectedRoute` wrapper:
- `/login` — Public
- `/` — Main dashboard (Coach or Client view)
- `/profile` — User profile
- `/settings` — Settings

### Data Layer

- Mock data interfaces (`Athlete`, `Group`, `Training`, `Performance`) defined in `src/data/dummyData.ts`
- Real API calls made via Axios to the configured `VITE_API_BASE_URL` backend
- Strava OAuth tokens stored in `localStorage`

### Component Organization

`src/components/` contains ~29 feature directories. Each typically has:
- A main `ComponentName.tsx` file
- An optional `types.ts` for local TypeScript interfaces

Key shared components: `Header`, `StatsCard`, `MainTabs`, `Analytics`, `PersonalRecords`, `UpcomingTrainingSessions` (supports Excel/PDF export via XLSX + jsPDF).

### UI Stack

- **Chakra UI v3** — primary component library with theming
- **Recharts** / **Chakra UI Charts** — data visualization
- **React Icons** + **Font Awesome** — icons
- **Next Themes** — dark/light mode
