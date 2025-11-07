# Repository Guidelines

## Project Structure & Module Organization
`server.js` hosts the Express app that serves static assets and file endpoints. The interactive UI lives in `public/`, with canvas logic in `public/js/pixel-editor.js`, Supabase helpers in `public/js/supabase-config.js`, and responsive styles split across `public/styles/`. Local development saves land in `pixel-art-saves/` (ignore large artifacts). Vercel deployments call the lighter `api/index.js`. Supabase Edge Functions reside in `supabase/functions/create-gif/`, alongside `supabase/config.toml` for project settings.

## Build, Test, and Development Commands
- `npm install` – install Node 22-compatible dependencies defined in `package.json`.
- `npm run dev` – start the local Express server on port 3000.
- `npm start` – production-style launch of `server.js`; match this command in deployment previews.
- `npm run build` – placeholder script; extend it when you add bundling or asset pipelines.
- `node test-supabase-gif.js` – exercise the Supabase GIF edge function after configuring the test keys.

## Coding Style & Naming Conventions
Use four-space indentation, trailing semicolons, and `const`/`let` over `var`. Keep modules small and descriptive, mirroring existing kebab-case filenames (e.g., `pixel-editor.css`, `create-gif`). Favor async/await for I/O and wrap routes with try/catch as in `server.js`. When editing frontend scripts, keep DOM queries and stateful helpers grouped near their event listeners to match current structure.

## Testing Guidelines
The repository relies on manual UI checks plus the Supabase GIF smoke test. Before running `node test-supabase-gif.js`, replace the placeholder URL and anon key in the script, or export them as environment variables in your shell. Capture the generated GIF artifact or console output in PR descriptions when fixing regressions. Add targeted unit tests only if you introduce new modules; colocate them beside the feature or under a new `tests/` folder.

## Commit & Pull Request Guidelines
Existing history mixes Conventional Commit prefixes (`fix:`, `feat:`) with occasional status emojis. Continue using lowercase imperative subjects, optionally prefixed by `feat:`, `fix:`, or a concise emoji that adds clarity. Each PR should summarize behavioural changes, list test commands executed, link relevant Notion or issue references, and attach before/after screenshots for UI updates. Mark Supabase or deployment configuration changes prominently so reviewers can update secrets.

## Supabase & Configuration Tips
Keep Supabase credentials out of version control. During local work, edit `public/js/supabase-config.js` only through temporary `.env` injections or runtime assignment. For edge changes, update `supabase/functions/deno.json` dependencies and verify CORS headers remain aligned with `create-gif/index.ts`. Document new configuration files alongside `/SUPABASE-SETUP.md` when relevant.
