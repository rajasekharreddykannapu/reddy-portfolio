// Typed accessors over the Strava-derived run dataset in src/data/runs.json.
//
// runs.json is generated from Strava (route maps decoded from GPS polylines,
// elevation/heart-rate profiles from activity streams). To refresh or enrich
// more runs, see scripts/README-strava.md.

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
// Kept separate from the generated dataset so a data refresh never wipes them.
const photoMap = runPhotos as unknown as Record<string, string[]>;

export const runs = (runsData as Run[]).map((r) => ({
  ...r,
  photos: Array.isArray(photoMap[r.id]) ? photoMap[r.id] : [],
}));

// Runs only (excludes the handful of walks/hikes/rides also on Strava).
export const runsOnly = runs.filter((r) => r.sport === "Run");

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
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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

// Formatting helpers.
export const fmtKm = (m: number) => (m / 1000).toFixed(2);

export function fmtDay(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function fmtTimeOfDay(iso: string): string {
  // iso is local wall-clock; read the hour directly.
  const hour = Number(iso.slice(11, 13));
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  if (hour < 21) return "Evening";
  return "Night";
}
