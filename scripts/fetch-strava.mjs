#!/usr/bin/env node
/**
 * Fetch Strava activities → src/data/runs.json
 *
 * Env (required):
 *   STRAVA_CLIENT_ID
 *   STRAVA_CLIENT_SECRET
 *   STRAVA_REFRESH_TOKEN
 *
 * Optional:
 *   STRAVA_AFTER_EPOCH   — unix seconds; only activities after this (default: none)
 *   STRAVA_ENRICH_LIMIT  — max activities to pull altitude/HR streams for (default: 40)
 *
 * Photos in run-photos.json are never touched.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "src", "data", "runs.json");

const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;
const ENRICH_LIMIT = Number(process.env.STRAVA_ENRICH_LIMIT || 40);

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error(
    "Missing STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, or STRAVA_REFRESH_TOKEN",
  );
  process.exit(1);
}

async function refreshAccessToken() {
  const res = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function stravaGet(accessToken, urlPath, params = {}) {
  const url = new URL(`https://www.strava.com/api/v3${urlPath}`);
  for (const [k, v] of Object.entries(params)) {
    if (v != null) url.searchParams.set(k, String(v));
  }
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 429) {
    const reset = res.headers.get("x-ratelimit-limit") || "";
    throw new Error(`Strava rate limited. ${reset}`);
  }
  if (!res.ok) {
    throw new Error(`Strava GET ${urlPath} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/** Google encoded polyline → [[lat, lng], ...] */
function decodePolyline(encoded) {
  if (!encoded) return [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;
  const coordinates = [];

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    coordinates.push([lat / 1e5, lng / 1e5]);
  }
  return coordinates;
}

/** Lat/lng points → normalized SVG path + viewBox (x = lng, y = lat flipped). */
function pointsToMap(latLngs) {
  if (!latLngs.length) return null;
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const [lat, lng] of latLngs) {
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }
  const pad = 0.02;
  const latSpan = Math.max(maxLat - minLat, 1e-6);
  const lngSpan = Math.max(maxLng - minLng, 1e-6);
  const targetW = 216;
  const targetH = 80.6;
  const scale = Math.min(targetW / lngSpan, targetH / latSpan);
  const w = lngSpan * scale;
  const h = latSpan * scale;
  const ox = (targetW - w) / 2;
  const oy = (targetH - h) / 2;

  const parts = [];
  for (let i = 0; i < latLngs.length; i++) {
    const [lat, lng] = latLngs[i];
    const x = ox + (lng - minLng) * scale;
    const y = oy + (maxLat - lat) * scale;
    parts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  void pad;
  return { viewBox: `0 0 ${targetW} ${targetH}`, path: parts.join(" ") };
}

function downsample(values, maxPoints = 60) {
  if (values.length <= maxPoints) return values;
  const out = [];
  const step = (values.length - 1) / (maxPoints - 1);
  for (let i = 0; i < maxPoints; i++) {
    out.push(values[Math.round(i * step)]);
  }
  return out;
}

function seriesToProfile(values, { width = 100, height = 40 } = {}) {
  if (!values?.length) return null;
  const pts = downsample(values);
  let min = Infinity;
  let max = -Infinity;
  for (const v of pts) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const span = Math.max(max - min, 1);
  const coords = pts.map((v, i) => {
    const x = (i / (pts.length - 1 || 1)) * width;
    const y = height - ((v - min) / span) * (height - 4) - 2;
    return [x, y];
  });
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0].toFixed(2)} ${c[1].toFixed(2)}`).join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  return {
    viewBox: `0 0 ${width} ${height}`,
    area,
    line,
    min: Math.round(min),
    max: Math.round(max),
  };
}

function fmtPace(movingTimeSec, distanceM) {
  if (!distanceM || distanceM < 1 || !movingTimeSec) return null;
  const secPerKm = movingTimeSec / (distanceM / 1000);
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function fmtDuration(sec) {
  if (sec == null) return null;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Strava start_date_local is "2026-08-02T05:41:07Z" — strip Z for wall-clock. */
function localDate(startDateLocal) {
  if (!startDateLocal) return "";
  return startDateLocal.replace(/Z$/, "").slice(0, 19);
}

function sportFromType(type, sportType) {
  return sportType || type || "Run";
}

function toRun(activity) {
  const polyline =
    activity.map?.summary_polyline || activity.map?.polyline || null;
  const map = polyline ? pointsToMap(decodePolyline(polyline)) : null;

  return {
    id: String(activity.id),
    name: activity.name || "Untitled",
    description: activity.description || null,
    sport: sportFromType(activity.type, activity.sport_type),
    date: localDate(activity.start_date_local),
    gearId: activity.gear_id ? String(activity.gear_id) : null,
    isTrainer: Boolean(activity.trainer),
    isCommute: Boolean(activity.commute),
    distance: activity.distance ?? 0,
    movingTime: activity.moving_time ?? 0,
    elapsedTime: activity.elapsed_time ?? 0,
    elevationGain: activity.total_elevation_gain ?? 0,
    avgSpeed: activity.average_speed ?? 0,
    maxSpeed: activity.max_speed ?? 0,
    calories: activity.calories ?? null,
    avgCadence: activity.average_cadence ?? null,
    relativeEffort: activity.suffer_score ?? activity.relative_effort ?? null,
    kudos: activity.kudos_count ?? 0,
    achievements: activity.achievement_count ?? 0,
    prCount: activity.pr_count ?? 0,
    pace: fmtPace(activity.moving_time, activity.distance),
    duration: fmtDuration(activity.moving_time),
    map,
    elevation: null,
    hr: null,
    photos: [],
  };
}

function shouldEnrich(run) {
  if (run.sport !== "Run") return false;
  if (run.prCount > 0) return true;
  if (run.distance >= 15000) return true;
  // Named race-ish efforts
  const n = run.name.toLowerCase();
  if (/\b(race|hm|half|marathon|10k|5k|pb)\b/.test(n)) return true;
  return false;
}

async function listAllActivities(accessToken) {
  const all = [];
  let page = 1;
  const after = process.env.STRAVA_AFTER_EPOCH
    ? Number(process.env.STRAVA_AFTER_EPOCH)
    : undefined;

  while (true) {
    const batch = await stravaGet(accessToken, "/athlete/activities", {
      page,
      per_page: 100,
      after,
    });
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < 100) break;
    page += 1;
    if (page > 20) break; // safety
  }
  return all;
}

async function enrichStreams(accessToken, run) {
  try {
    const streams = await stravaGet(accessToken, `/activities/${run.id}/streams`, {
      keys: "altitude,heart_rate",
      key_by_type: true,
    });
    if (streams?.altitude?.data) {
      const elev = seriesToProfile(streams.altitude.data);
      if (elev) {
        run.elevation = {
          viewBox: elev.viewBox,
          area: elev.area,
          line: elev.line,
          min: elev.min,
          max: elev.max,
        };
      }
    }
    if (streams?.heart_rate?.data) {
      const hr = seriesToProfile(streams.heart_rate.data);
      if (hr) {
        const data = streams.heart_rate.data;
        const avg = Math.round(data.reduce((a, b) => a + b, 0) / data.length);
        const max = Math.round(Math.max(...data));
        run.hr = {
          viewBox: hr.viewBox,
          area: hr.area,
          line: hr.line,
          avg,
          max,
        };
      }
    }
  } catch (err) {
    console.warn(`Streams skipped for ${run.id}:`, err.message);
  }
}

async function main() {
  console.log("Refreshing Strava access token…");
  const token = await refreshAccessToken();

  console.log("Listing activities…");
  const activities = await listAllActivities(token);
  console.log(`Fetched ${activities.length} activities`);

  const runs = activities.map(toRun);

  // Prefer existing elevation/HR from previous file when we skip enrich
  let previous = [];
  if (fs.existsSync(OUT)) {
    try {
      previous = JSON.parse(fs.readFileSync(OUT, "utf8"));
    } catch {
      previous = [];
    }
  }
  const prevById = new Map(previous.map((r) => [String(r.id), r]));

  for (const run of runs) {
    const prev = prevById.get(run.id);
    if (prev?.elevation && !run.elevation) run.elevation = prev.elevation;
    if (prev?.hr && !run.hr) run.hr = prev.hr;
  }

  const enrichCandidates = runs
    .filter(shouldEnrich)
    .filter((r) => !r.elevation || !r.hr)
    .slice(0, ENRICH_LIMIT);

  console.log(`Enriching streams for ${enrichCandidates.length} runs…`);
  for (const run of enrichCandidates) {
    await enrichStreams(token, run);
    // gentle pacing
    await new Promise((r) => setTimeout(r, 200));
  }

  // Newest first (Strava list is usually newest first already)
  runs.sort((a, b) => (a.date < b.date ? 1 : -1));

  fs.writeFileSync(OUT, `${JSON.stringify(runs, null, 2)}\n`, "utf8");
  console.log(`Wrote ${runs.length} activities → ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
