// Typed accessors over the Strava-derived run dataset in src/data/runs.json.
//
// runs.json is generated from Strava (route maps decoded from GPS polylines,
// elevation/heart-rate profiles from activity streams). To refresh or enrich
// more runs, see scripts/README-strava.md.
//
// Photos attach separately via src/data/run-photos.json → public/running/photos/
// and are never overwritten by a Strava refresh.

import runsData from "@/data/runs.json";
import runPhotos from "@/data/run-photos.json";

export type RunMap = { viewBox: string; path: string };

export type ElevationProfile = {
  viewBox: string;
  area: string;
  line: string;
  min: number;
  max: number;
};

export type HeartRateProfile = {
  viewBox: string;
  area: string;
  line: string;
  avg: number;
  max: number;
};

export type Run = {
  id: string;
  name: string;
  description: string | null;
  sport: string;
  date: string; // ISO local, e.g. "2026-08-02T05:41:07"
  gearId: string | null;
  isTrainer: boolean;
  isCommute: boolean;
  distance: number; // metres
  movingTime: number; // seconds
  elapsedTime: number;
  elevationGain: number; // metres
  avgSpeed: number; // m/s
  maxSpeed: number;
  calories: number | null;
  avgCadence: number | null; // spm (one leg)
  relativeEffort: number | null;
  kudos: number;
  achievements: number;
  prCount: number;
  pace: string | null; // "5:03" min/km
  duration: string | null; // "1:59:15"
  map: RunMap | null;
  elevation: ElevationProfile | null;
  hr: HeartRateProfile | null;
  photos: string[]; // filenames in public/running/photos/
};

// Merge user-supplied photos (keyed by Strava activity id) onto each run.
const photoMap = runPhotos as unknown as Record<string, string[]>;

const rawRuns = (Array.isArray(runsData) ? runsData : []) as Omit<Run, "photos">[];

export const runs: Run[] = rawRuns.map((r) => ({
  ...r,
  photos: Array.isArray(photoMap[r.id]) ? photoMap[r.id] : [],
}));

// Runs only (excludes the handful of walks/hikes/rides also on Strava).
export const runsOnly = runs.filter((r) => r.sport === "Run");

export const hasRunData = runsOnly.length > 0;

// Shoe metadata keyed by Strava gear id.
export const gearById: Record<string, { model: string; label: string }> = {
  "31577296": { model: "ASICS Gel-Nimbus 27", label: "Daily trainer" },
  "31160220": { model: "ASICS Novablast 5", label: "Race day" },
  "31050860": { model: "Adidas Duramo SL", label: "Easy days" },
  "29723521": { model: "Barefoot", label: "No shoes" },
};

export type RunMonth = {
  key: string; // "2026-08"
  label: string; // "August 2026"
  runs: Run[];
  distanceKm: number;
  elevation: number;
  count: number;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Group a list of runs into months, newest month first.
export function groupByMonth(list: Run[]): RunMonth[] {
  const map = new Map<string, Run[]>();
  for (const r of list) {
    const key = r.date.slice(0, 7);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }
  return [...map.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([key, rs]) => {
      const [y, m] = key.split("-");
      return {
        key,
        label: `${MONTHS[Number(m) - 1]} ${y}`,
        runs: rs,
        count: rs.length,
        distanceKm: rs.reduce((s, r) => s + r.distance, 0) / 1000,
        elevation: Math.round(rs.reduce((s, r) => s + r.elevationGain, 0)),
      };
    });
}

/** Month-by-month distance (km) from live Strava data, chronological. */
export function monthlyDistanceKm(list: Run[] = runsOnly): { key: string; label: string; km: number; longestKm: number }[] {
  const months = groupByMonth(list).slice().reverse();
  return months.map((m) => ({
    key: m.key,
    label: `${MONTHS[Number(m.key.split("-")[1]) - 1].slice(0, 3)} '${m.key.slice(2, 4)}`,
    km: Math.round(m.distanceKm),
    longestKm: Math.round(Math.max(...m.runs.map((r) => r.distance / 1000), 0) * 10) / 10,
  }));
}

/** "5:03" → seconds per km */
export function parsePace(pace: string | null): number | null {
  if (!pace) return null;
  const parts = pace.split(":").map(Number);
  if (parts.length !== 2 || parts.some((n) => Number.isNaN(n))) return null;
  return parts[0] * 60 + parts[1];
}

export function formatPace(secPerKm: number): string {
  const m = Math.floor(secPerKm / 60);
  const s = Math.round(secPerKm % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function median(nums: number[]): number {
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/** Monthly median pace (sec/km) for runs ≥ minKm — chronological. */
export function monthlyMedianPace(
  list: Run[] = runsOnly,
  minKm = 5,
): { key: string; label: string; paceSec: number; pace: string; count: number }[] {
  const byMonth = new Map<string, number[]>();
  for (const r of list) {
    if (r.distance < minKm * 1000) continue;
    const sec = parsePace(r.pace);
    if (sec == null) continue;
    const key = r.date.slice(0, 7);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(sec);
  }
  return [...byMonth.entries()]
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([key, secs]) => {
      const [y, m] = key.split("-");
      const paceSec = Math.round(median(secs));
      return {
        key,
        label: `${MONTHS[Number(m) - 1].slice(0, 3)} '${y.slice(2)}`,
        paceSec,
        pace: formatPace(paceSec),
        count: secs.length,
      };
    });
}

/** Chronological distance PRs (each time the longest run grows). */
export function longestRunProgression(
  list: Run[] = runsOnly,
): { date: string; label: string; km: number; name: string }[] {
  const sorted = [...list].sort((a, b) => (a.date < b.date ? -1 : 1));
  let max = 0;
  const out: { date: string; label: string; km: number; name: string }[] = [];
  for (const r of sorted) {
    const km = r.distance / 1000;
    if (km > max + 0.05) {
      max = km;
      out.push({
        date: r.date.slice(0, 10),
        label: fmtDay(r.date),
        km: Math.round(km * 10) / 10,
        name: r.name,
      });
    }
  }
  return out;
}

/** ISO-week buckets for the last `weeks` weeks (oldest → newest). */
export function weeklyConsistency(
  list: Run[] = runsOnly,
  weeks = 16,
): { key: string; label: string; days: number; count: number; km: number }[] {
  const byWeek = new Map<string, { days: Set<string>; count: number; km: number }>();

  for (const r of list) {
    const d = new Date(r.date.slice(0, 10) + "T12:00:00");
    if (Number.isNaN(d.getTime())) continue;
    // ISO week: Thursday-based year
    const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = tmp.getUTCDay() || 7;
    tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    const key = `${tmp.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
    if (!byWeek.has(key)) byWeek.set(key, { days: new Set(), count: 0, km: 0 });
    const bucket = byWeek.get(key)!;
    bucket.days.add(r.date.slice(0, 10));
    bucket.count += 1;
    bucket.km += r.distance / 1000;
  }

  const keys = [...byWeek.keys()].sort();
  const recent = keys.slice(-weeks);
  // Fill gaps so empty weeks show as 0
  if (recent.length === 0) return [];

  return recent.map((key) => {
    const b = byWeek.get(key)!;
    const weekNum = key.split("-W")[1];
    return {
      key,
      label: `W${weekNum}`,
      days: b.days.size,
      count: b.count,
      km: Math.round(b.km),
    };
  });
}

/** Pick a run by Strava id, or the longest run as a fallback for hero route art. */
export function findRunById(id: string | undefined): Run | undefined {
  if (!id) return undefined;
  return runs.find((r) => r.id === id);
}

/** Prefer finish-line photo, then medal, otherwise first attached photo. */
export function primaryPhoto(photos: string[]): string | null {
  if (photos.length === 0) return null;
  return (
    photos.find((p) => /finish/i.test(p)) ??
    photos.find((p) => /medal/i.test(p)) ??
    photos[0]
  );
}

export function photoSrc(filename: string): string {
  return `/running/photos/${filename}`;
}

export function longestRun(): Run | undefined {
  if (runsOnly.length === 0) return undefined;
  return runsOnly.reduce((best, r) => (r.distance > best.distance ? r : best));
}

export type HeadlineStat = { value: string; label: string; hint?: string };
export type HeadlineRecord = { value: string; label: string; note: string };

/** Live totals from runs.json — used by the hero so Strava syncs update the page. */
export function headlineStats(list: Run[] = runsOnly): HeadlineStat[] {
  if (list.length === 0) return [];

  const km = list.reduce((s, r) => s + r.distance, 0) / 1000;
  const elev = Math.round(list.reduce((s, r) => s + r.elevationGain, 0));
  const hours = list.reduce((s, r) => s + r.movingTime, 0) / 3600;
  const days = new Set(list.map((r) => r.date.slice(0, 10))).size;
  const dates = list.map((r) => r.date.slice(0, 10)).sort();
  const spanMs =
    new Date(`${dates[dates.length - 1]}T12:00:00`).getTime() -
    new Date(`${dates[0]}T12:00:00`).getTime();
  const weeks = Math.max(1, spanMs / (7 * 86400000));
  const kmPerWeek = Math.round(km / weeks);

  return [
    {
      value: `${Math.round(km)} km`,
      label: "Distance run",
      hint: `Across ${list.length} runs`,
    },
    {
      value: `${list.length}`,
      label: "Runs logged",
      hint: `${days} different days out`,
    },
    {
      value: `${Math.round(hours)} h`,
      label: "Time on feet",
      hint: `~${kmPerWeek} km every week`,
    },
    {
      value: `${elev.toLocaleString("en-US")} m`,
      label: "Elevation climbed",
      hint: "≈ half of Everest",
    },
  ];
}

/** Overlay the live longest run onto the static PR strip. */
export function withLiveLongest(
  records: HeadlineRecord[],
  list: Run[] = runsOnly,
): HeadlineRecord[] {
  const longest = longestRun();
  if (!longest) return records;
  const km = (longest.distance / 1000).toFixed(1);
  return records.map((rec) =>
    rec.label === "Longest run"
      ? {
          value: `${km} km`,
          label: rec.label,
          note: `${longest.name} · ${fmtDay(longest.date)}`,
        }
      : rec,
  );
}

// Formatting helpers.
export const fmtKm = (m: number) => (m / 1000).toFixed(2);

export function fmtDay(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function fmtTimeOfDay(iso: string): string {
  const hour = Number(iso.slice(11, 13));
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  if (hour < 21) return "Evening";
  return "Night";
}
