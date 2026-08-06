# Rajasekhar Reddy Kannapu — Portfolio

Portfolio/resume site built with Next.js (App Router) and Tailwind CSS, deployed on Vercel.

The `/running` page syncs from Strava near real-time via webhooks — see [`scripts/README-strava.md`](scripts/README-strava.md).

## Content

Resume content lives in one place: [`src/lib/resume.ts`](src/lib/resume.ts). Edit that file to update the summary, experience, skills, or impact highlights — the page re-renders automatically.

Running narrative/stats live in [`src/lib/running.ts`](src/lib/running.ts). Activity archive data is [`src/data/runs.json`](src/data/runs.json) (generated from Strava).

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

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, import the project (Framework preset: **Next.js**).
3. For Strava auto-sync, add the env vars listed in [`scripts/README-strava.md`](scripts/README-strava.md), then create the Strava webhook subscription.
4. Deploy.

Vercel builds on each push to `main` (including Strava sync commits from GitHub Actions).
