// ---------------------------------------------------------------------------
// Running journey content — single source of truth for /running.
//
// Stats/timeline/races were seeded from Strava (athlete 202080481),
// Jan 2026 → Aug 2026. Photos plug in later via src/data/run-photos.json
// (filenames in public/running/photos/) without touching this file.
// ---------------------------------------------------------------------------

import { profile } from "@/lib/resume";

export const runningProfile = {
  brand: "Running",
  name: profile.name,
  kicker: "The running journey",
  headline: "From one hard loop to marathon distance.",
  intro:
    "Twelve months ago one park lap left me walking. By June a sub-2 half — by August, 1:49 at NMDC — then a 47:10 10K at Run for Nature. No coach, just sunrise miles logged on Strava.",
  stravaUrl: "https://www.strava.com/athletes/202080481",
  since: "Logging since Jan 2026",
  /** Strava activity id for hero route art when runs.json is populated. */
  heroRunId: "20054628774",
};

export type RunStat = { value: string; label: string; hint?: string };

// Fallback only — the hero prefers live totals from runs.json (see headlineStats).
export const runStats: RunStat[] = [
  { value: "683 km", label: "Distance run", hint: "Across 88 runs" },
  { value: "88", label: "Runs logged", hint: "80 different days out" },
  { value: "76 h", label: "Time on feet", hint: "~26 km every week" },
  { value: "4,255 m", label: "Elevation climbed", hint: "≈ half of Everest" },
];

export type RunRecord = { value: string; label: string; note: string };

export const records: RunRecord[] = [
  { value: "1:49:01", label: "Half marathon", note: "NMDC Hyderabad · 30 Aug 2026" },
  { value: "47:10", label: "10K", note: "Run for Nature · 6 Sep 2026" },
  { value: "22.4 km", label: "Longest run", note: "Sunday long run · 23 Aug 2026" },
  { value: "4:43 /km", label: "10K race pace", note: "Run for Nature · 6 Sep 2026" },
];

// ── Origin chapter (day zero → first double digits) ─────────────────────────
export type OriginBeat = {
  date: string;
  title: string;
  detail: string;
  stat?: string;
};

export const originBeats: OriginBeat[] = [
  {
    date: "Jan 2026",
    title: "Lacing up",
    detail:
      "The honest starting line. Walks, one easy ride, and a body that couldn't finish a loop of the park. The only plan: keep showing up.",
    stat: "Day 0",
  },
  {
    date: "1 Feb 2026",
    title: "First real run — 8 km",
    detail:
      "Opened the account with an 8 km morning run. Slow and heavy-legged — proof the engine just needed building.",
    stat: "8.0 km",
  },
  {
    date: "8 Feb 2026",
    title: "First 10K",
    detail:
      "Double digits before breakfast. A number that had felt impossible a month earlier.",
    stat: "10.0 km",
  },
];

// ── Full journey timeline (kept for reference / archive chapters) ───────────
export type TimelineEntry = {
  date: string;
  kind: "start" | "milestone" | "race" | "present";
  title: string;
  detail: string;
  stat?: string;
};

export const timeline: TimelineEntry[] = [
  {
    date: "Jan 2026",
    kind: "start",
    title: "Lacing up",
    detail:
      "The honest starting line. January was walks, one easy ride, and a body that couldn't run a full loop of the park. No plan beyond a simple one: keep showing up.",
    stat: "Day 0",
  },
  {
    date: "1 Feb 2026",
    kind: "milestone",
    title: "First real run — 8 km",
    detail:
      "Opened the account with an 8 km morning run. Slow and heavy-legged, but the distance was there from day one — proof the engine just needed building.",
    stat: "8.0 km",
  },
  {
    date: "8 Feb 2026",
    kind: "milestone",
    title: "First 10K",
    detail:
      "Double digits for the first time — 10 km before breakfast. A number that had felt impossible a month earlier.",
    stat: "10.0 km",
  },
  {
    date: "15 Feb 2026",
    kind: "milestone",
    title: "Stretching the long run",
    detail:
      "Pushed the long run to 14.5 km and started learning the real craft — how to pace the early kilometres and hold form when it gets hard.",
    stat: "14.5 km",
  },
  {
    date: "29 Mar 2026",
    kind: "race",
    title: "First race bib — The IT-Run Sprint",
    detail:
      "First time on a start line with a bib. Nerves, a crowd, and a clean 10K in 55:17. Racing turned out to be addictive.",
    stat: "10K · 55:17",
  },
  {
    date: "26 Apr 2026",
    kind: "race",
    title: "TCS World 10K",
    detail:
      "Big-city race energy for the first time. The heat bit hard, but I held it together to the line for 59:25 — and learned how much summer pacing matters.",
    stat: "10K · 59:25",
  },
  {
    date: "24 May 2026",
    kind: "race",
    title: "Hyderabad Summer City Slam — 10K PB",
    detail:
      "The day it all clicked. A personal-best 10K at 5:03/km in brutal summer conditions — four minutes faster than the same distance a month before.",
    stat: "10K · 51:11 PB",
  },
  {
    date: "31 May 2026",
    kind: "milestone",
    title: "Learning to run easy",
    detail:
      "A deliberate 16 km held in Zone 2 — training the body to stay relaxed for two hours. The unglamorous easy miles quietly became the foundation for everything.",
    stat: "16.1 km",
  },
  {
    date: "7 Jun 2026",
    kind: "race",
    title: "First half marathon — sub-2:00",
    detail:
      "The big one. Toed the line at the Telangana Run and broke two hours on the very first attempt — 1:59:15. From 'can't finish a lap' to 21.1 km in five months.",
    stat: "21.1 km · 1:59:15",
  },
  {
    date: "Jul 2026",
    kind: "milestone",
    title: "Building the base",
    detail:
      "The biggest month yet — speed sessions (8×800, 8×400), progression runs, a 19 km long run, and back-to-back weeks around 26 km. Training with intent, not just mileage.",
    stat: "≈ 150 km",
  },
  {
    date: "2 Aug 2026",
    kind: "present",
    title: "NMDC dry run — half marathon distance",
    detail:
      "Back out to 21.3 km with 254 m of climbing and 36 personal records in a single morning. The base is set. Now the work turns toward the next start line — and faster times.",
    stat: "21.3 km · 254 m",
  },
  {
    date: "23 Aug 2026",
    kind: "present",
    title: "Sunday long run — new distance PR",
    detail:
      "22.4 km before breakfast on a humid Hyderabad morning. Easy effort, two and a half hours on feet, and a new longest run — proof the base can stretch when the calendar asks.",
    stat: "22.4 km · 2:27",
  },
  {
    date: "30 Aug 2026",
    kind: "present",
    title: "NMDC half — sub-1:50",
    detail:
      "Chip time 1:49:01 at the 15th NMDC Hyderabad Half Marathon. Ten minutes faster than the first half in June — the season goal landed on race morning.",
    stat: "21.1 km · 1:49:01",
  },
  {
    date: "6 Sep 2026",
    kind: "race",
    title: "Run for Nature — 10K PB",
    detail:
      "A new 10K personal best at 47:10 — four minutes faster than City Slam. The race that proved the half base had speed left in it.",
    stat: "10K · 47:10 PB",
  },
];

// ── Month-by-month progression (fallback when runs.json is empty) ───────────
export type ProgressionMonth = {
  key: string;
  label: string;
  km: number;
  longestKm: number;
};

export const progressionFallback: ProgressionMonth[] = [
  { key: "2026-01", label: "Jan '26", km: 12, longestKm: 5 },
  { key: "2026-02", label: "Feb '26", km: 78, longestKm: 14.5 },
  { key: "2026-03", label: "Mar '26", km: 95, longestKm: 12 },
  { key: "2026-04", label: "Apr '26", km: 88, longestKm: 12 },
  { key: "2026-05", label: "May '26", km: 110, longestKm: 16.1 },
  { key: "2026-06", label: "Jun '26", km: 105, longestKm: 21.1 },
  { key: "2026-07", label: "Jul '26", km: 150, longestKm: 19 },
  { key: "2026-08", label: "Aug '26", km: 45, longestKm: 21.3 },
];

// ── Races ───────────────────────────────────────────────────────────────────
export type Race = {
  date: string;
  name: string;
  distance: string;
  time: string;
  note?: string;
  featured?: boolean;
  /** Second hero card — usually the latest race with photos. */
  spotlight?: boolean;
  story?: string;
  /** Optional Strava activity id to pull a route map when available. */
  runId?: string;
  /** Override cover image in public/running/photos/ */
  coverPhoto?: string;
  /** Editorial photos when Strava id is not synced yet (or as override). */
  photos?: string[];
  /** Official chip-time / results page when available. */
  resultUrl?: string;
  /**
   * Official chip / gun time when it differs from Strava moving time.
   * Display this as the race PB; keep Strava duration as moving time.
   */
  chipTime?: string;
  /** External event photo gallery (e.g. Memzo finish-line album). */
  eventGallery?: {
    url: string;
    bannerPhoto: string;
    title: string;
    subtitle: string;
  };
};

export const races: Race[] = [
  {
    date: "29 Mar 2026",
    name: "The IT-Run Sprint",
    distance: "10K",
    time: "55:17",
    note: "First bib",
    runId: "17895204432",
  },
  {
    date: "26 Apr 2026",
    name: "TCS World 10K",
    distance: "10K",
    time: "59:25",
    note: "Heat lesson",
    runId: "18259820429",
  },
  {
    date: "24 May 2026",
    name: "Hyderabad Summer City Slam",
    distance: "10K",
    time: "51:11",
    note: "Former 10K PB",
    story: "Four minutes faster than the same distance a month before — 5:03/km in brutal summer heat.",
    runId: "18628386726",
  },
  {
    date: "7 Jun 2026",
    name: "Telangana Run",
    distance: "Half marathon",
    time: "1:59:15",
    note: "First HM · sub-2:00",
    story:
      "From a body that couldn't finish a park loop to 21.1 km under two hours — five months, one stubborn habit, and a first half that broke the tape.",
    runId: "18817317833",
  },
  {
    date: "16 Aug 2026",
    name: "Hyderabad Monsoon Run",
    distance: "16.1 km",
    time: "1:22:35",
    note: "Same pace as City Slam 10K",
    story:
      "The City Slam 5:03/km, carried for sixteen kilometres in monsoon humidity at T-Works. Proof the half was not a one-off.",
    runId: "19762807960",
    coverPhoto: "monsoon-finish.jpg",
    photos: ["monsoon-stride.jpg", "monsoon-finish.jpg", "monsoon-medals.jpg"],
    resultUrl:
      "https://www.ifinish.in/myresultdetail/LR8npB5a1C3nK6gWWd9yzuB7mUTtOEw1kbqlTQ96UBhkBxZ1PKViEowlGnrEJB3IO_-bzn7H-vrNywW9mH0DuA",
  },
  {
    date: "30 Aug 2026",
    name: "NMDC Hyderabad Half Marathon",
    distance: "Half marathon",
    time: "1:49:01",
    note: "Half marathon PB · sub-1:50",
    featured: true,
    story:
      "Ten minutes off the first half — 1:49:01 in humid Hyderabad air. The sub-1:50 goal from the season plan, crossed at the 15th edition start line.",
    runId: "19956634788",
    chipTime: "1:49:01",
    coverPhoto: "nmdc-finish.jpg",
    photos: ["nmdc-finish.jpg", "nmdc-medal.jpg", "nmdc-celebrate.jpg"],
    resultUrl:
      "https://sportstimingsolutions.in/results?q=eyJlX25hbWUiOiJOTURDIEh5ZGVyYWJhZCBNYXJhdGhvbiAyMDI2IiwiZV9pZCI6OTQxMzUsImJpYk5vIjoiMjM5NzgifQ%3D%3D",
    eventGallery: {
      url: "https://event.memzo.ai/m/my-photo/22723/194999/al35135_B2088775",
      bannerPhoto: "nmdc-memzo-banner.jpg",
      title: "Finish line photos",
      subtitle:
        "Relive the best moments from NMDC Hyderabad Marathon 2026 — tap to browse the full gallery.",
    },
  },
  {
    date: "6 Sep 2026",
    name: "Run for Nature 2026",
    distance: "10K",
    time: "47:10",
    note: "10K PB · sub-48",
    spotlight: true,
    story:
      "Four minutes off City Slam — 47:10 at 4:43/km. The first sub-48 10K, and proof the half training had turned into real race-day speed.",
    runId: "20054628774",
    chipTime: "47:10",
  },
];

export const featuredRace = races.find((r) => r.featured)!;
export const spotlightRace = races.find((r) => r.spotlight);
export const supportingRaces = races.filter((r) => !r.featured && !r.spotlight);

/** Display-name overrides for Strava titles that need editorial cleanup. */
export const runDisplayNames: Record<string, string> = {
  "20054628774": "Run for Nature 2026",
  "20055111169": "Run for Nature — cooldown",
  "19956634788": "NMDC Hyderabad Half Marathon",
};

/**
 * Soft-hide from the default archive preview (still available when expanded,
 * or filtered entirely from the log). Cool-down / duplicate race-day activities.
 */
export const archiveHiddenRunIds = new Set(["20055111169"]);

export function raceForRunId(runId: string | undefined) {
  if (!runId) return undefined;
  return races.find((r) => r.runId === runId);
}

export function chipTimeForRunId(runId: string | undefined): string | undefined {
  return raceForRunId(runId)?.chipTime;
}

export function displayNameForRun(runId: string, fallback: string): string {
  return runDisplayNames[runId] ?? fallback;
}

/** Official results link keyed by Strava activity id. */
export function resultUrlForRunId(runId: string | undefined): string | undefined {
  if (!runId) return undefined;
  return races.find((r) => r.runId === runId)?.resultUrl;
}

// ── Training engine beats ───────────────────────────────────────────────────
export type EngineBeat = {
  date: string;
  title: string;
  detail: string;
  stat?: string;
};

export const engineBeats: EngineBeat[] = [
  {
    date: "31 May 2026",
    title: "Learning to run easy",
    detail:
      "A deliberate 16 km held in Zone 2 — training the body to stay relaxed for two hours. The unglamorous easy miles became the foundation.",
    stat: "16.1 km",
  },
  {
    date: "Jul 2026",
    title: "Building the base",
    detail:
      "Speed sessions (8×800, 8×400), progression runs, a 19 km long run, and weeks around 26 km. Training with intent, not just mileage.",
    stat: "≈ 150 km",
  },
  {
    date: "2 Aug 2026",
    title: "NMDC dry run",
    detail:
      "Back out to 21.3 km with 254 m of climbing. The base is set — next work is the start line, and faster times.",
    stat: "21.3 km · 254 m",
  },
  {
    date: "16 Aug 2026",
    title: "Monsoon 16.1K",
    detail:
      "Held 5:03/km — the City Slam 10K pace — for 16.4 km at T-Works. Same effort, longer tape.",
    stat: "1:22:35 · 5:03/km",
  },
  {
    date: "23 Aug 2026",
    title: "Sunday 22.4K",
    detail:
      "A new longest run at easy effort — 22.4 km in 2:27 before the NMDC half. The engine is stretching, not sprinting.",
    stat: "22.4 km · 6:34/km",
  },
  {
    date: "30 Aug 2026",
    title: "NMDC half marathon",
    detail:
      "1:49:01 — ten minutes off the June half and under the 1:50 target. Corral A, humid air, and a finish-line medal that tasted like the whole season.",
    stat: "1:49:01 · 5:10/km",
  },
  {
    date: "6 Sep 2026",
    title: "Run for Nature 10K",
    detail:
      "47:10 — a new 10K PB at 4:43/km. Four minutes faster than City Slam, and the first time under 48.",
    stat: "47:10 · 4:43/km",
  },
];

/** Highlight cards for the training chapter when live run data is thin. */
export type FeaturedRunHighlight = {
  title: string;
  date: string;
  distance: string;
  finishTime?: string;
  pace?: string;
  note: string;
  runId?: string;
};

export const featuredRunHighlights: FeaturedRunHighlight[] = [
  {
    title: "Telangana Run",
    date: "7 Jun 2026",
    distance: "21.1 km",
    pace: "5:37",
    note: "First half · sub-2",
    runId: "18817317833",
  },
  {
    title: "Sunday long run",
    date: "23 Aug 2026",
    distance: "22.4 km",
    finishTime: "2:26:59",
    pace: "6:34",
    note: "Longest · base",
    runId: "19858726882",
  },
  {
    title: "NMDC Hyderabad Half",
    date: "30 Aug 2026",
    distance: "21.1 km",
    finishTime: "1:49:01",
    pace: "5:10",
    note: "Half PB · sub-1:50",
    runId: "19956634788",
  },
  {
    title: "Run for Nature 2026",
    date: "6 Sep 2026",
    distance: "10.0 km",
    finishTime: "47:10",
    pace: "4:43",
    note: "10K PB",
    runId: "20054628774",
  },
];

// Crafted hero route silhouette (no GPS required) — reads as a winding long run.
export const heroRouteSilhouette = {
  viewBox: "0 0 800 420",
  path: "M40 320 C80 280 100 200 160 180 C220 160 240 240 300 220 C360 200 380 120 440 100 C500 80 520 160 580 150 C640 140 680 80 720 60 C740 50 760 70 780 90",
};

// ── Shoe rotation ───────────────────────────────────────────────────────────
export type Gear = {
  name: string;
  model: string;
  /** Fallback km when Strava gear ids have no matches. */
  km: number;
  role: string;
  /** Strava gear id(s) — with or without leading `g`. */
  gearIds: string[];
};

export const gear: Gear[] = [
  {
    name: "Daily trainer",
    model: "ASICS Gel-Nimbus 27",
    km: 304,
    role: "Long runs & most weekly miles",
    gearIds: ["31577296", "g31577296"],
  },
  {
    name: "Race day",
    model: "ASICS Novablast 5",
    km: 59,
    role: "Half marathons & fast efforts",
    gearIds: ["31160220", "g31160220"],
  },
  {
    name: "College shoe",
    model: "Adidas Duramo SL",
    km: 52,
    role: "Easy and recovery days",
    gearIds: ["31050860", "g31050860"],
  },
  {
    name: "Barefoot",
    model: "No shoes",
    km: 19,
    role: "Hikes & giri pradakshina",
    gearIds: ["29723521", "g29723521"],
  },
];

// ── Season roadmap ──────────────────────────────────────────────────────────
export type UpcomingEvent = {
  date: string;
  name: string;
  distance: string;
  location?: string;
  status: "registered" | "target" | "planned";
  /** Visual weight on the path: next | build | peak | close */
  chapter: "next" | "build" | "peak" | "close";
  goalTime?: string;
  note?: string;
  prep?: string[];
  url?: string;
};

export const upcoming: UpcomingEvent[] = [
  {
    date: "18 Oct 2026",
    name: "Vedanta Delhi Half Marathon",
    distance: "Half marathon",
    location: "New Delhi",
    status: "registered",
    chapter: "next",
    goalTime: "Sub-1:50",
    url: "https://vedantadelhihalfmarathon.procam.in/",
  },
  {
    date: "1 Nov 2026",
    name: "Hyderabad Hitech Marathon",
    distance: "Full marathon",
    location: "Hyderabad",
    status: "registered",
    chapter: "peak",
    note: "First full marathon — finish and learn. TMM is the time-goal race.",
    prep: [
      "Treat as debut, not an all-out PB attempt",
      "Practice race-day fueling for Mumbai",
      "Recover honestly in the week after",
    ],
    url: "https://hyderabadhitecmarathon.com/",
  },
  {
    date: "20 Dec 2026",
    name: "Tata Steel Kolkata 25K",
    distance: "25 km",
    location: "Kolkata",
    status: "registered",
    chapter: "close",
    url: "https://tatasteelworld25k.procam.in/",
  },
  {
    date: "17 Jan 2027",
    name: "Tata Mumbai Marathon",
    distance: "Full marathon",
    location: "Mumbai",
    status: "registered",
    chapter: "close",
    goalTime: "Sub-3:30",
    note: "A-race — 19-week plan ends here.",
    url: "https://tatamumbaimarathon.procam.in/",
  },
];

export type Goal = { title: string; detail: string };

export const goals: Goal[] = [
  {
    title: "Tata Mumbai Marathon under 3:30",
    detail:
      "A-race on 17 Jan 2027. Target ~4:58/km after Hitech as the debut full and a December 25K tune-up.",
  },
  {
    title: "First full marathon — finish",
    detail: "Hitech on 1 Nov is marathon #1: finish strong, learn fueling, don’t empty the tank.",
  },
  {
    title: "Half marathon under 1:45",
    detail: "NMDC landed at 1:49 — October halves and plan quality work should carve toward 1:45.",
  },
];
