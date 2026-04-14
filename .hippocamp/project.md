# Pixel Editor — Project Memory

## What it is
A 32x32 pixel art editor with multi-frame animation support. Stack: vanilla JS frontend, Express backend, Supabase (auth + DB + edge functions), deployed on Vercel.

## Key features
- Multi-frame animation with configurable FPS
- Cloud save/load via Supabase (user-scoped)
- GIF export via Supabase Edge Function
- Responsive design: mobile (≤1023px) and desktop (≥1024px)
- Local storage fallback for non-authenticated users

## Tech stack
- Frontend: vanilla JS, no framework
- Backend: Node.js 22.x, Express
- Cloud: Supabase (auth, DB, edge functions), Vercel (hosting)
- Styling: separate CSS per breakpoint (common, mobile, desktop, login)
