# Collaborative Grid Canvas

A minimal, high-performance collaborative canvas for developers. Create, sketch, and brainstorm on an infinite grid in real-time with multiple users, optimized for both desktop and mobile.

🔗 [Live Demo](https://plinth-beta.vercel.app/)

## ⚡ Features

- **Real-Time Collaboration:** Shared canvas state is synced instantly across users with Liveblocks.
- **Infinite Grid Canvas:** Place and remove blocks on a responsive grid with smooth pan and zoom controls.
- **User Authentication:** Sign up and sign in via Supabase Auth.
- **Project Rooms:** Create named canvas rooms and jump directly into collaborative sessions.
- **Presence Tracking:** Online users are visible through Supabase realtime presence.
- **Mobile-Friendly Interactions:** Touch and pointer controls work smoothly on small screens.
- **Developer UI:** Clean dark aesthetic with JetBrains Mono typography and minimal chrome.

## 🧱 Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS
- **Realtime Sync:** Liveblocks
- **Auth & Database:** Supabase
- **Animation:** GSAP
- **State Management:** React Query + Zustand
- **Fonts:** `@fontsource/jetbrains-mono`
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js installed locally.
- A Supabase project with Auth enabled.
- A Supabase `projects` table with `id`, `name`, and `created_by` columns.
- A Liveblocks public API key.

### Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/huxlic/plinth.git
   cd plinth
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

4. Fill in the required variables in `.env.local`:

   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-actual-anon-key-here
   VITE_LIVEBLOCKS_PUBLIC_KEY=pk_prod_your-liveblocks-key-here
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL shown by Vite in your browser.

## 📦 Available Scripts

- `npm run dev` — Start the dev server.
- `npm run build` — Build the app for production.
- `npm run preview` — Preview the production build locally.
- `npm run lint` — Run ESLint.

## 🗂️ Project Structure

- `src/App.tsx` — Root providers for Liveblocks, Auth, and React Query.
- `src/AppRoutes.tsx` — Client-side routing with protected routes.
- `src/pages/Overview.tsx` — Marketing/landing page.
- `src/pages/Nodes.tsx` — Dashboard for project rooms and online presence.
- `src/pages/PlayGround.tsx` — Collaborative canvas room.
- `src/auth/SignUpForm.tsx` — Supabase registration page.
- `src/auth/LoginForm.tsx` — Supabase login page.
- `src/components/features/MultiplayerSurface.tsx` — Canvas rendering, grid logic, and Liveblocks storage.
- `src/lib/utils/supabaseClient.ts` — Supabase client setup.
- `src/services/projectService.ts` — Project creation service.

## 🔧 App Behavior

- Users authenticate with Supabase email/password.
- The dashboard at `/dashboard` lists user projects and online presence.
- Creating a project opens a new room at `/canvas/:id`.
- Rooms use Liveblocks `RoomProvider` and an `artNodes` LiveMap for shared state.
- Clicking an empty grid cell places a node; clicking an occupied cell removes it.
- Camera pan and zoom are controlled via pointer and wheel events.
- Online presence is tracked through a Supabase realtime channel.

## ✅ Deployment

The app is ready for Vercel deployment. Ensure the same environment variables are configured in the Vercel dashboard.

## Notes

- There is no `.env.example` file included by default.
- The app depends on a Supabase table named `projects`.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Open a pull request with a clear description.

---

Built for polished developer collaboration on an infinite shared grid canvas.
