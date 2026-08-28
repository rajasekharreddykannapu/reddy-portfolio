# Strava sync (near real-time)

## Your next steps (do once)

1. **Strava API app** → [strava.com/settings/api](https://www.strava.com/settings/api) → copy Client ID + Secret  
2. **Refresh token** — authorize with `read,activity:read_all`, exchange the `code` for a `refresh_token` (commands below)  
3. **GitHub secrets** (repo → Settings → Secrets → Actions):  
   `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_REFRESH_TOKEN`  
4. **Vercel env** (Production + Preview), then redeploy:  
   `STRAVA_VERIFY_TOKEN` (any random string),  
   `GITHUB_DISPATCH_TOKEN` (GitHub PAT with `repo` scope),  
   `GITHUB_REPO` = `rajasekharreddykannapu/reddy-portfolio` (optional)  
5. **Register webhook** (after deploy is live):

```powershell
$env:STRAVA_CLIENT_ID="…"
$env:STRAVA_CLIENT_SECRET="…"
$env:STRAVA_VERIFY_TOKEN="…"   # same as Vercel
$env:STRAVA_CALLBACK_URL="https://krajasekharreddy.com/api/strava/webhook"
npm run strava:webhook
```

6. **Test** — Actions → **Strava sync** → Run workflow, or upload a run on Strava → check `/running` in ~1–2 min  

**Easier alternative:** skip steps 4–5. Keep only the three GitHub secrets; the daily cron still syncs once a day. Webhooks are what make it near real-time.

---

When you save an activity on Strava, the site updates within a couple of minutes:

```text
Strava activity create/update/delete
  → POST /api/strava/webhook  (Vercel)
  → GitHub repository_dispatch
  → Action runs scripts/fetch-strava.mjs
  → commits src/data/runs.json if changed
  → Vercel redeploys
```

Photos stay in [`src/data/run-photos.json`](../src/data/run-photos.json) and are never overwritten. YouTube links stay in [`src/data/run-videos.json`](../src/data/run-videos.json) the same way.

A daily cron (~05:00 IST) is a safety net if a webhook is missed.

## One-time setup (detail)

### 1. Create a Strava API application

1. Open [strava.com/settings/api](https://www.strava.com/settings/api)
2. Create an app (Authorization Callback Domain can be `localhost` for personal use)
3. Note **Client ID** and **Client Secret**
4. Authorize yourself with scope `activity:read_all` (and `read`) to get a **refresh token**

Quick local authorize (replace IDs):

```text
https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost&approval_prompt=force&scope=read,activity:read_all
```

Exchange the `code` from the redirect:

```bash
curl -X POST https://www.strava.com/oauth/token \
  -d client_id=YOUR_CLIENT_ID \
  -d client_secret=YOUR_CLIENT_SECRET \
  -d code=THE_CODE \
  -d grant_type=authorization_code
```

Save the `refresh_token` from the JSON response.

### 2. GitHub Actions secrets

Repo → **Settings → Secrets and variables → Actions** → add:

| Secret | Value |
|---|---|
| `STRAVA_CLIENT_ID` | from Strava API app |
| `STRAVA_CLIENT_SECRET` | from Strava API app |
| `STRAVA_REFRESH_TOKEN` | from OAuth exchange |

### 3. Vercel environment variables

Project → **Settings → Environment Variables** (Production + Preview):

| Variable | Value |
|---|---|
| `STRAVA_VERIFY_TOKEN` | any long random string you choose (e.g. `reddy-strava-verify-…`) |
| `GITHUB_DISPATCH_TOKEN` | GitHub PAT with `repo` scope (to trigger the workflow) |
| `GITHUB_REPO` | `rajasekharreddykannapu/reddy-portfolio` (optional; this is the default) |

Redeploy after saving env vars so `/api/strava/webhook` is live.

### 4. Create the Strava webhook subscription

With the site deployed and env vars set:

```powershell
$env:STRAVA_CLIENT_ID="…"
$env:STRAVA_CLIENT_SECRET="…"
$env:STRAVA_VERIFY_TOKEN="…"   # must match Vercel
$env:STRAVA_CALLBACK_URL="https://krajasekharreddy.com/api/strava/webhook"
npm run strava:webhook
```

Or:

```bash
npm run strava:webhook -- list
npm run strava:webhook -- delete <id>
```

Strava will GET your callback to verify, then return a subscription `id`.

### 5. Smoke test

1. Actions tab → **Strava sync** → **Run workflow** (needs the three Strava secrets)
2. Or upload a test activity on Strava and watch the workflow run
3. Confirm `/running` shows the new run after deploy finishes (~1–2 min)

## Local sync

```powershell
$env:STRAVA_CLIENT_ID="…"
$env:STRAVA_CLIENT_SECRET="…"
$env:STRAVA_REFRESH_TOKEN="…"
npm run strava:sync
```

Writes [`src/data/runs.json`](../src/data/runs.json).

## Data shape

- **Route maps** — decoded GPS polylines → inline SVG (`map.path` + `map.viewBox`)
- **Elevation / HR** — streams for races, PRs, and long runs (capped per run)
- **Stats** — distance, pace, duration, elevation, kudos, PRs, etc.
- **Charts on /running** — monthly distance, median pace, longest-run PRs, weekly consistency days
