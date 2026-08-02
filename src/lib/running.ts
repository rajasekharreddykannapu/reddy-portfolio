// ---------------------------------------------------------------------------
// Running journey content.
//
// This is the single place to edit everything on the /running page. The stats,
// timeline milestones, races and gear below were seeded from Strava data
// (athlete 202080481) covering the journey from Jan 2026 → Aug 2026.
//
// The `upcoming` and `goals` sections are yours to grow — add races as you
// register for them and update the goals as they change. See the comments on
// each section for the shape to follow.
// ---------------------------------------------------------------------------

export const runningProfile = {
  // Small kicker shown above the headline.
  kicker: "The running journey",
  // Big headline on the running page hero.
  headline: "From one hard loop to marathon distance.",
  // One or two sentences of context under the headline.
  intro:
    "Twelve months ago, one lap of the park left me walking. In early 2026 I started logging every run — first walks, then a stubborn 8K, then 10Ks, then a half marathon under two hours. No coach, no shortcuts: just showing up before sunrise, most days of the week. Every kilometre below is real, pulled straight from Strava — and the story is still being written.",
  // Link to the public Strava profile (Strava attribution).
  stravaUrl: "https://www.strava.com/athletes/202080481",
  // Range label shown as a chip.
  since: "Logging since Jan 2026",
};

// ── Headline stats (animated counters) ──────────────────────────────────────
// Keep `value` parseable by the Counter component: an optional prefix, a
// number (commas allowed), then an optional suffix — e.g. "683 km", "4,255 m".
export type RunStat = { value: string; label: string; hint?: string };

export const runStats: RunStat[] = [
  { value: "683 km", label: "Distance run", hint: "Across 88 runs" },
  { value: "88", label: "Runs logged", hint: "80 different days out" },
  { value: "76 h", label: "Time on feet", hint: "~26 km every week" },
  { value: "4,255 m", label: "Elevation climbed", hint: "≈ half of Everest" },
];

// ── Personal records (static highlight strip) ───────────────────────────────
export type RunRecord = { value: string; label: string; note: string };

export const records: RunRecord[] = [
  { value: "1:59:15", label: "Half marathon", note: "Telangana Run · 7 Jun 2026" },
  { value: "51:11", label: "10K", note: "Hyderabad City Slam · 24 May 2026" },
  { value: "21.3 km", label: "Longest run", note: "NMDC dry run · 2 Aug 2026" },
  { value: "5:03 /km", label: "10K race pace", note: "Fastest sustained effort" },
];

// ── The journey timeline ────────────────────────────────────────────────────
// kind drives the accent: "start" | "milestone" | "race" | "present".
export type TimelineEntry = {
  date: string; // display label, e.g. "1 Feb 2026"
  kind: "start" | "milestone" | "race" | "present";
  title: string;
  detail: string;
  stat?: string; // small mono badge, e.g. "8.0 km"
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
];

// ── Races (results table) ───────────────────────────────────────────────────
export type Race = {
  date: string;
  name: string;
  distance: string;
  time: string;
  note?: string;
};

export const races: Race[] = [
  { date: "29 Mar 2026", name: "The IT-Run Sprint", distance: "10K", time: "55:17" },
  { date: "26 Apr 2026", name: "TCS World 10K", distance: "10K", time: "59:25" },
  {
    date: "24 May 2026",
    name: "Hyderabad Summer City Slam",
    distance: "10K",
    time: "51:11",
    note: "Personal best",
  },
  {
    date: "7 Jun 2026",
    name: "Telangana Run",
    distance: "Half marathon",
    time: "1:59:15",
    note: "First HM · sub-2:00",
  },
];

// ── Shoe rotation (from Strava gear) ────────────────────────────────────────
export type Gear = { name: string; model: string; km: number; role: string };

export const gear: Gear[] = [
  { name: "Daily trainer", model: "ASICS Gel-Nimbus 27", km: 304, role: "Long runs & most weekly miles" },
  { name: "Race day", model: "ASICS Novablast 5", km: 59, role: "Half marathons & fast efforts" },
  { name: "College shoe", model: "Adidas Duramo SL", km: 52, role: "Easy and recovery days" },
  { name: "Barefoot", model: "No shoes", km: 19, role: "Hikes & giri pradakshina" },
];

// ── Upcoming events — ADD YOUR RACES HERE ───────────────────────────────────
// As you register for a race, add an entry:
//   • status:   "registered" | "target" | "planned"  (drives the chip)
//   • goalTime: the time you're chasing, e.g. "Sub-1:50"
//   • prep:     the plan to hit that time — one bullet per line
// Add or remove fields freely; goalTime, note and prep are all optional.
export type UpcomingEvent = {
  date: string;
  name: string;
  distance: string;
  location?: string;
  status: "registered" | "target" | "planned";
  goalTime?: string;
  note?: string;
  prep?: string[];
};

export const upcoming: UpcomingEvent[] = [
  // Example shape — replace with your real races and prep plans:
  {
    date: "TBD",
    name: "Next full marathon",
    distance: "42.2 km",
    status: "target",
    goalTime: "Sub-4:00",
    note: "The next frontier — turning a sub-2:00 half into a strong first full.",
    prep: [
      "Extend the long run past 30 km",
      "Build to 45–50 km weeks",
      "Marathon-pace blocks inside the long runs",
      "Dial in race-day fuelling & hydration",
    ],
  },
];

// ── Standing targets — EDIT FREELY ──────────────────────────────────────────
export type Goal = { title: string; detail: string };

export const goals: Goal[] = [
  {
    title: "Half marathon under 1:50",
    detail:
      "Take roughly nine minutes off the current 1:59 — built on weekly tempo runs and 800m repeats to lift threshold pace.",
  },
  {
    title: "First full marathon",
    detail:
      "Carry the half-marathon base up to 42.2 km: long runs beyond 30 km and a patient climb in weekly volume.",
  },
  {
    title: "Run every week, all year",
    detail:
      "Consistency over heroics — around 30 km a week of mostly easy Zone 2 miles as the engine under everything.",
  },
];
