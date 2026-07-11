# Rajasekhar Reddy Kannapu — Portfolio

Single-page portfolio/resume site built with Next.js (App Router) and Tailwind CSS, exported as a static site.

## Content

Resume content lives in one place: [`src/lib/resume.ts`](src/lib/resume.ts). Edit that file to update the summary, experience, skills, or impact highlights — the page re-renders automatically.

`profile.linkedin` is currently `null` (no LinkedIn URL was supplied). Set it to your profile URL to show the LinkedIn link in the Contact section.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

This produces a static export in the `out/` directory (configured via `output: "export"` in [`next.config.ts`](next.config.ts)).

## Deploying to Vercel

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. In Vercel, "Add New Project" → import `reddy-portfolio`.
3. Framework preset: **Next.js** (auto-detected). No environment variables or extra build settings are required — Vercel builds the static export automatically.
4. Deploy.

No `vercel.json` is needed: Vercel natively supports Next.js static exports out of the box.
