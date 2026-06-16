# DevPath 🟠 (Blue Platypus)

A personal **JavaScript & React learning platform** for frontend developers moving
from Angular to React. Flashcards (spaced repetition), interview-style quizzes, a
real split-pane coding IDE, progress tracking, and an Angular → React migration
guide — all running locally.

Built with **Next.js 14 (App Router) · TypeScript (strict) · Tailwind · Supabase ·
Monaco · Sandpack · Framer Motion**.

---

## Features

- **Dashboard** — daily streak, XP & level, per-track progress rings, a recommended
  daily session, recent activity, and an Angular → React quick-reference strip.
- **Flashcards** — two-pane study with a flip animation and the **SM-2** spaced
  repetition algorithm. Rate recall (Again / Hard / Good / Easy); due cards surface
  first. Keyboard: `Space` to flip, `1`–`4` to rate.
- **Quiz** — topic-based 10-question sessions with an optional timer, instant
  feedback + explanations, and a weak-area review. Plus a **30-minute Interview
  Simulation** (5 MCQs + 1 coding challenge, scored together).
- **Challenges** — split-pane IDE. JS challenges run in a **sandboxed test runner**
  with per-test pass/fail; React challenges run live in **Sandpack** with a
  verification checklist. Progressive hints, and the solution unlocks after 3
  attempts. `Cmd/Ctrl+Enter` runs your code.
- **Progress** — 90-day activity heatmap, per-topic mastery bars, stat cards, level
  progression, and auto-detected weak areas.
- **Migration Guide** — a public, side-by-side Angular → React reference across
  template syntax, communication, lifecycle, state, routing, HTTP/services, and
  RxJS → Promises/async.

### Content included (seeded)

- **25 topics**, **85 flashcards**, **56 quiz questions** (incl. Angular→React
  comparisons), and **26 coding challenges** (21 JS auto-graded + 5 React) spanning
  easy → hard. Every JS solution is verified to pass its own test cases.

---

## Quick start

### Prerequisites

- **Node 20+**
- **Docker** (for local Supabase)
- The Supabase CLI is used via `npx` — no global install required.

### 1. Install

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

The defaults work out of the box with local Supabase and **local-first auth** — the
app boots immediately with a built-in dev user, no Auth0 needed. (See
[Authentication](#authentication) to enable Auth0.)

### 3. Start the database (Supabase via Docker)

```bash
npx supabase start
```

This boots Postgres + the Supabase stack and prints an **API URL**, **anon key**,
and **service_role key**. The values in `.env.local.example` match the stock local
keys; if your output differs, copy the printed values into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...        # API URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=...   # anon key
SUPABASE_SERVICE_ROLE_KEY=...       # service_role key (server only)
```

### 4. Apply the schema

```bash
npx supabase db reset
```

`db reset` applies everything in `supabase/migrations/` to your local database.
(You can also use `npx supabase db push`.)

### 5. Seed content

```bash
npm run seed
```

Idempotent — safe to re-run. It validates every JS challenge solution against its
test cases before inserting.

### 6. Run the app

```bash
npm run dev
```

Open **http://localhost:3000**.

---

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` (strict) |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm run test:logic` | Pure-logic + seed-content sanity checks (SM-2, levels, runner, seed integrity) |
| `npm run seed` | Seed the database |
| `npm run db:start` / `db:reset` / `db:push` | Supabase CLI shortcuts |

---

## Authentication

Auth is **local-first** and controlled by `AUTH_MODE` in `.env.local`:

- `AUTH_MODE=local` (default) — a built-in dev user; progress saves normally. Zero
  external setup.
- `AUTH_MODE=auth0` — real Auth0 login/signup. Fill in the `AUTH0_*` variables
  (`AUTH0_SECRET` via `openssl rand -hex 32`, plus your tenant's issuer, client id,
  and secret), and set your Auth0 app's callback to
  `http://localhost:3000/api/auth/callback` and logout to `http://localhost:3000`.
  Routes are then protected by middleware, except `/` and `/migration-guide`.

---

## How it works

- **Data access** is server-side only (server components, server actions) using the
  Supabase **service-role** client, with every user-owned query scoped by `user_id`.
  Row-Level Security is enabled on user tables as defense-in-depth (the spec's
  `app.current_user_id` GUC pattern is provided via the `set_current_user` RPC).
- **XP & levels** — flashcard good/easy +5; quiz +10 and +2/correct; challenge pass
  easy/medium/hard +20/+40/+75; daily streak +5. 100 XP per level
  (Apprentice → Practitioner → Engineer → Senior → Architect).
- **Spaced repetition** — SM-2 stores `ease_factor`, `interval_days`,
  `repetitions`, and `next_review_date` per card per user.
- **JS test runner** — user code runs in a `Function()` sandbox; the exported
  function is called per test case and deep-compared to the expected output, with
  console capture and error handling. (It's a learning sandbox, not a security
  boundary.)

---

## Project structure

```
app/
  (app)/            authenticated shell: dashboard, flashcards, quiz, challenges, progress
  actions/          server actions (rate flashcard, submit quiz, submit challenge)
  api/auth/         Auth0 endpoints (active only when AUTH_MODE=auth0)
  migration-guide/  public Angular → React reference
  page.tsx          landing
components/         ui primitives + feature components (dashboard, flashcards, quiz, challenges, progress)
lib/                supabase, auth, queries, sm2, xp, levels, test-runner, content-config, utils
scripts/            seed.ts + seed-data/* + test-logic.ts
supabase/           config.toml + migrations
types/              shared domain types
```

---

## Tech stack

Next.js 14 · React 18 · TypeScript (strict, no `any`) · Tailwind CSS · shadcn-style
Radix primitives · Supabase (Postgres + RLS) · `@monaco-editor/react` ·
`@codesandbox/sandpack-react` · Framer Motion · Lucide · optional Auth0.
