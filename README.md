# Bdayly — Birthday Wish Website MVP

A React + Vite starter for personalized birthday microsites, with romantic, friends, family, and funny templates. Uses Supabase for shareable links when configured.

## What's included
- Responsive dark/pink landing page
- Birthday builder with name, sender, date, template, message, and optional public image URL
- Live preview while creating
- Unique URLs at `/w/:slug`
- Surprise reveal interaction and copy-link button
- Supabase database integration
- Local-only fallback for frontend testing without Supabase

## Run locally
1. Install Node.js LTS (18+ recommended).
2. Open this folder in a terminal.
3. Run `npm install`
4. Copy `.env.example` to `.env` and configure Supabase (steps below).
5. Run `npm run dev` and open the local URL Vite prints.

## Enable real shareable links (free-tier setup)
1. Create a project at https://supabase.com.
2. In Supabase, open **SQL Editor**, paste `supabase-schema.sql`, and run it.
3. Open **Project Settings → API** (or **Connect**) and copy the Project URL and anon/public key.
4. Put them in `.env`:

   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
   ```

5. Restart `npm run dev` after changing `.env`.

With Supabase configured, a created page is stored in the database and the `/w/slug` link works on other devices once the app is deployed. Without Supabase, pages are stored only in the current browser's localStorage; those demo links won't work on another device.

## Deploy free
- Push the folder to a GitHub repository.
- Import the repository into Vercel or Netlify.
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the hosting provider's environment settings.
- Enable SPA fallback/rewrites so routes like `/w/your-slug` load `index.html`.

## Important before public launch
This is an MVP, not production-hardened. The included public table policy intentionally allows anonymous creation and reading so no-login birthday pages can work. Before promotion at scale, add rate limiting / abuse controls, input moderation, basic privacy notice, image URL validation, and consider protecting page creation from spam. Never put a Supabase service-role key in the frontend; use only the anon/public key.
