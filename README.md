# The So Called Editor — Portfolio

A dark, cinematic portfolio for a video editor and motion designer. Built with React, Vite, Framer Motion, Lenis (smooth scroll) and Lucide icons.

## Run locally

1. Install Node.js (LTS).
2. `npm install`
3. `npm run dev`

## Deploy

Vercel detects Vite automatically — build command `npm run build`, output directory `dist`.

## Editing content

All copy lives in `src/data/content.js`:

- `site.email` and `site.socials` — replace the placeholder email and social links.
- `projects` — five empty work slots. Add your real titles and video/poster files when ready.
- `experience`, `skills`, `tools`, `journey` — update with your verified details.

Styles are split into `src/styles/base.css` (tokens), `components.css` (shared UI) and `sections.css` (page sections).

The images in `public/images` are decorative placeholders, not project work.
