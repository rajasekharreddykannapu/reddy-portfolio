# Strava-derived run data

The `/running` page is driven by [`src/data/runs.json`](../src/data/runs.json),
generated from Strava data:

- **Route maps** — decoded from each activity's GPS polyline into a normalized
  inline-SVG path (`map.path` + `map.viewBox`). No external map tiles, so it works
  in the static export.
- **Elevation profiles** (`elevation`) — from the activity `altitude` stream,
  downsampled to a compact area/line path.
- **Heart-rate profiles** (`hr`) — from the `heart_rate` stream where a monitor
  was worn (earlier runs have none).
- **Stats** — distance, moving time, pace, elevation gain, calories, cadence,
  relative effort, kudos, achievements and PR counts come from the activity
  summary.

## Current coverage

- **Route maps + full stats:** all runs with GPS.
- **Elevation + heart-rate profiles:** the featured runs (every race, every PB,
  and the long runs). Any other run can be enriched the same way.

## How it was built

Data was pulled via the Strava MCP tools and processed by two small scripts (kept
in the scratchpad, not committed):

1. `list_activities(include_polyline: true)` → decode polylines → route-map SVGs +
   per-run summary stats → write `runs.json`.
2. `get_activity_streams(streams: [distance, altitude, heart_rate])` for selected
   activities → elevation/HR area+line SVGs merged into `runs.json`.

To refresh (new runs) or enrich more runs, re-pull from Strava and regenerate
`runs.json`. Photos are stored separately in
[`src/data/run-photos.json`](../src/data/run-photos.json) and are **not** touched
by regeneration.
