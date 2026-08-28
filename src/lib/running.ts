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
    "Twelve months ago one park lap left me walking. By June I had a sub-2 half — no coach, just sunrise miles logged on Strava.",
  stravaUrl: "https://www.strava.com/athletes/202080481",
  since: "Logging since Jan 2026",
  /** Strava activity id for hero route art when runs.json is populated. */
  heroRunId: "18817317833",
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
  { value: "1:59:15", label: "Half marathon", note: "Telangana Run · 7 Jun 2026" },
  { value: "51:11", label: "10K", note: "Hyderabad City Slam · 24 May 2026" },
  { value: "22.4 km", label: "Longest run", note: "Sunday long run · 23 Aug 2026" },
  { value: "5:03 /km", label: "10K race pace", note: "Hyderabad City Slam · 24 May 2026" },
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
  /** Official chip-time / results page when available. */
  resultUrl?: string;
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
    note: "Personal best",
    story: "Four minutes faster than the same distance a month before — 5:03/km in brutal summer heat.",
    runId: "18628386726",
  },
  {
    date: "7 Jun 2026",
    name: "Telangana Run",
    distance: "Half marathon",
    time: "1:59:15",
    note: "First HM · sub-2:00",
    featured: true,
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
    spotlight: true,
    story:
      "The City Slam 5:03/km, carried for sixteen kilometres in monsoon humidity at T-Works. Proof the half was not a one-off.",
    runId: "19762807960",
    coverPhoto: "monsoon-finish.jpg",
    resultUrl:
      "https://www.ifinish.in/myresultdetail/LR8npB5a1C3nK6gWWd9yzuB7mUTtOEw1kbqlTQ96UBhkBxZ1PKViEowlGnrEJB3IO_-bzn7H-vrNywW9mH0DuA",
  },
];

export const featuredRace = races.find((r) => r.featured)!;
export const spotlightRace = races.find((r) => r.spotlight);
export const supportingRaces = races.filter((r) => !r.featured && !r.spotlight);

/** Featured video card in the training chapter. */
export const videoSpotlight = {
  runId: "19858726882",
  title: "Sunday long run",
  date: "23 Aug 2026",
  stat: "22.4 km · 2:26:59",
  story:
    "A humid Hyderabad morning, easy effort, and a new longest run — captured in a short recap from the road.",
};

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
    title: "Hyderabad City Slam",
    date: "24 May 2026",
    distance: "10.0 km",
    finishTime: "51:11",
    pace: "5:03",
    note: "10K PB",
    runId: "18628386726",
  },
  {
    title: "Telangana Run",
    date: "7 Jun 2026",
    distance: "21.1 km",
    pace: "5:37",
    note: "First half · sub-2",
    runId: "18817317833",
  },
  {
    title: "NMDC dry run",
    date: "2 Aug 2026",
    distance: "21.3 km",
    note: "Longest · 254 m ↑",
    runId: "19563722110",
  },
  {
    title: "Hyderabad Monsoon Run",
    date: "16 Aug 2026",
    distance: "16.4 km",
    finishTime: "1:22:35",
    pace: "5:03",
    note: "Latest race",
    runId: "19762807960",
  },
  {
    title: "Sunday long run",
    date: "23 Aug 2026",
    distance: "22.4 km",
    finishTime: "2:26:59",
    pace: "6:34",
    note: "Longest · video",
    runId: "19858726882",
  },
];

// Crafted hero route silhouette (no GPS required) — reads as a winding long run.
export const heroRouteSilhouette = {
  viewBox: "0 0 800 420",
  path: "M40 320 C80 280 100 200 160 180 C220 160 240 240 300 220 C360 200 380 120 440 100 C500 80 520 160 580 150 C640 140 680 80 720 60 C740 50 760 70 780 90",
};

// ── Shoe rotation ───────────────────────────────────────────────────────────
export type Gear = { name: string; model: string; km: number; role: string };

export const gear: Gear[] = [
  { name: "Daily trainer", model: "ASICS Gel-Nimbus 27", km: 304, role: "Long runs & most weekly miles" },
  { name: "Race day", model: "ASICS Novablast 5", km: 59, role: "Half marathons & fast efforts" },
  { name: "College shoe", model: "Adidas Duramo SL", km: 52, role: "Easy and recovery days" },
  { name: "Barefoot", model: "No shoes", km: 19, role: "Hikes & giri pradakshina" },
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
    date: "30 Aug 2026",
    name: "NMDC Half Marathon",
    distance: "Half marathon",
    location: "Hyderabad",
    status: "registered",
    chapter: "next",
    goalTime: "Sub-1:55",
    url: "https://nmdchyderabadmarathon.com/",
  },
  {
    date: "18 Oct 2026",
    name: "Vedanta Delhi Half Marathon",
    distance: "Half marathon",
    location: "New Delhi",
    status: "registered",
    chapter: "build",
    goalTime: "Sub-1:50",
    url: "https://vedantadelhihalfmarathon.procam.in/",
  },
  {
    date: "25 Oct 2026",
    name: "Times Internet Half Marathon",
    distance: "Half marathon",
    status: "registered",
    chapter: "build",
    url: "https://timesofindia.indiatimes.com/times-events/marathon",
  },
  {
    date: "1 Nov 2026",
    name: "Hyderabad Hitech Marathon",
    distance: "Full marathon",
    location: "Hyderabad",
    status: "registered",
    chapter: "peak",
    note: "First full marathon — the big one of the season.",
    prep: [
      "Long runs past 30 km through October",
      "Hold ~30 km easy weeks as the base",
      "Respect the heat — practice race-day fueling",
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
    url: "https://tatamumbaimarathon.procam.in/",
  },
];

export type Goal = { title: string; detail: string };

export const goals: Goal[] = [
  {
    title: "Half marathon under 1:50",
    detail: "Take ~9 minutes off 1:59 — tempo runs and 800m repeats to lift threshold.",
  },
  {
    title: "First full marathon",
    detail: "Carry the half base to 42.2 km: long runs beyond 30 km, patient weekly volume.",
  },
  {
    title: "Run every week, all year",
    detail: "Consistency over heroics — ~30 km a week of mostly easy Zone 2 miles.",
  },
];
