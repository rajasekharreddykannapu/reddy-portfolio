// ---------------------------------------------------------------------------
// Tata Mumbai Marathon 2027 — 19-week plan (from coach PDF overview).
// Week starts are Mondays. Race day is Sun 17 Jan 2027 (Week 19).
//
// PDF often stacks two Friday sessions (e.g. Full Body + quality run) with
// Saturday as Rest before the Sunday long/race.
// ---------------------------------------------------------------------------

export type SessionKind =
  | "easy"
  | "intervals"
  | "tempo"
  | "hills"
  | "long"
  | "race"
  | "strength"
  | "rest";

export type PlanSession = {
  kind: SessionKind;
  /** Short label shown in the week grid */
  title: string;
  detail?: string;
  /** Distance hint when relevant, e.g. "8 km" or "55–65 min" */
  load?: string;
};

export type PlanWeek = {
  week: number;
  /** Monday of the week (ISO date) */
  start: string;
  label: string;
  phase: "base" | "build" | "specific" | "taper";
  focus: string;
  /** Approximate planned run volume (strength sessions excluded) */
  runKm?: number;
  mon: PlanSession[];
  tue: PlanSession[];
  wed: PlanSession[];
  thu: PlanSession[];
  fri: PlanSession[];
  sat: PlanSession[];
  sun: PlanSession[];
};

export const tmmPlan = {
  race: {
    name: "Tata Mumbai Marathon",
    date: "2027-01-17",
    dateLabel: "17 Jan 2027",
    location: "Mumbai",
    distance: "42.2 km",
    goalTime: "Sub-3:30",
    goalPace: "~4:58 /km",
    url: "https://tatamumbaimarathon.procam.in/",
  },
  planStart: "2026-09-07",
  totalWeeks: 19,
  source: "Coach plan overview — Rajasekhar",
} as const;

export const planPhases: {
  id: PlanWeek["phase"];
  label: string;
  weeks: string;
  detail: string;
}[] = [
  {
    id: "base",
    label: "Base",
    weeks: "1–5",
    detail: "Easy volume, hills, and long runs — Soldierathon HM + Ananthagiri 32K as checkpoints.",
  },
  {
    id: "build",
    label: "Build",
    weeks: "6–11",
    detail: "Delhi half, first full at Hitech, then race-pace long runs back toward 30K.",
  },
  {
    id: "specific",
    label: "Specific",
    weeks: "12–16",
    detail: "Peak long runs (32–34K), MP work, then Tata Steel World 25K as a tune-up.",
  },
  {
    id: "taper",
    label: "Taper",
    weeks: "17–19",
    detail: "Cut volume, keep sharpness — progressive half, short long, then TMM.",
  },
];

const S = {
  rest: (title = "Rest"): PlanSession => ({ kind: "rest", title }),
  easy: (km: string, title?: string): PlanSession => ({
    kind: "easy",
    title: title ?? `${km} Easy`,
    load: km,
  }),
  intervals: (km: string, title: string, detail?: string): PlanSession => ({
    kind: "intervals",
    title,
    load: km,
    detail,
  }),
  tempo: (km: string, title: string, detail?: string): PlanSession => ({
    kind: "tempo",
    title,
    load: km,
    detail,
  }),
  hills: (km: string, title: string, detail?: string): PlanSession => ({
    kind: "hills",
    title,
    load: km,
    detail,
  }),
  long: (km: string, title: string, detail?: string): PlanSession => ({
    kind: "long",
    title,
    load: km,
    detail,
  }),
  race: (km: string, title: string, detail?: string): PlanSession => ({
    kind: "race",
    title,
    load: km,
    detail,
  }),
  strength: (title: string): PlanSession => ({
    kind: "strength",
    title,
    load: "55–65 min",
  }),
};

/** One or more sessions on a calendar day (PDF stacks Friday doubles often). */
const D = (...sessions: PlanSession[]): PlanSession[] => sessions;

/** Full 19-week grid transcribed from the PDF overview. */
export const planWeeks: PlanWeek[] = [
  {
    week: 1,
    start: "2026-09-07",
    label: "Sep 7",
    phase: "base",
    focus: "Open the block — hilly 22K long",
    runKm: 60,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("8 km")),
    wed: D(S.intervals("7.5 km", "1 km Repeats")),
    // As run: Full Body moved onto Thursday with easy; Friday keeps quality only; Saturday rest.
    thu: D(S.easy("6 km"), S.strength("Full Body")),
    fri: D(S.intervals("8 km", "On / Off Ks")),
    sat: D(S.rest()),
    sun: D(S.long("22 km", "Hilly Long Run")),
  },
  {
    week: 2,
    start: "2026-09-14",
    label: "Sep 14",
    phase: "base",
    focus: "Rolling speed + 25K long",
    runKm: 54,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("7 km")),
    wed: D(S.intervals("8 km", "Rolling 400s")),
    thu: D(S.easy("5.5 km")),
    fri: D(S.strength("Full Body"), S.hills("8 km", "Hill Repeats")),
    sat: D(S.rest()),
    sun: D(S.long("25 km", "Long Run")),
  },
  {
    week: 3,
    start: "2026-09-21",
    label: "Sep 21",
    phase: "base",
    focus: "Soldierathon half — race checkpoint",
    runKm: 46,
    mon: D(S.strength("Full Body")),
    tue: D(S.easy("8 km")),
    wed: D(S.tempo("9 km", "Progressive Run")),
    thu: D(S.strength("Legs & Core")),
    fri: D(S.easy("8 km")),
    sat: D(S.rest()),
    sun: D(S.race("21.1 km", "Federal Bank Soldierathon", "27 Sep 2026")),
  },
  {
    week: 4,
    start: "2026-09-28",
    label: "Sep 28",
    phase: "base",
    focus: "Ananthagiri hills — 32K trail",
    runKm: 46,
    mon: D(S.rest()),
    tue: D(S.easy("6.5 km")),
    wed: D(S.strength("Legs & Core")),
    thu: D(S.intervals("7.5 km", "400 m Repeats")),
    fri: D(S.strength("Full Body")),
    sat: D(S.rest()),
    sun: D(S.long("32 km", "Avantika Ananthagiri Hills Trail", "4 Oct 2026")),
  },
  {
    week: 5,
    start: "2026-10-05",
    label: "Oct 5",
    phase: "base",
    focus: "Progressive 25K long",
    runKm: 57,
    mon: D(S.rest()),
    tue: D(S.easy("8 km")),
    wed: D(S.strength("Full Body")),
    thu: D(S.easy("8 km")),
    fri: D(S.intervals("8 km", "400s into 200s")),
    sat: D(S.easy("8 km")),
    sun: D(S.long("25 km", "Progressive Long Run")),
  },
  {
    week: 6,
    start: "2026-10-12",
    label: "Oct 12",
    phase: "build",
    focus: "Vedanta Delhi Half",
    runKm: 35,
    mon: D(S.rest()),
    tue: D(S.easy("6 km")),
    wed: D(S.strength("Legs & Core")),
    thu: D(S.tempo("7.5 km", "Race Pace Practice Ks")),
    fri: D(S.strength("Full Body")),
    sat: D(S.rest()),
    sun: D(S.race("21.1 km", "Vedanta Delhi Half Marathon", "18 Oct 2026")),
  },
  {
    week: 7,
    start: "2026-10-19",
    label: "Oct 19",
    phase: "build",
    focus: "Recovery week before Hitech",
    runKm: 25,
    mon: D(S.rest()),
    tue: D(S.strength("Legs & Core")),
    wed: D(S.easy("5 km")),
    thu: D(S.intervals("5 km", "Mile Repeats")),
    fri: D(S.strength("Full Body")),
    sat: D(S.rest()),
    sun: D(S.long("15 km", "Long Run")),
  },
  {
    week: 8,
    start: "2026-10-26",
    label: "Oct 26",
    phase: "build",
    focus: "First full — Hyderabad Hitech",
    runKm: 56,
    mon: D(S.rest()),
    tue: D(S.easy("6 km")),
    wed: D(S.strength("Legs & Core")),
    thu: D(S.intervals("7.6 km", "K200s")),
    fri: D(S.strength("Full Body")),
    sat: D(S.rest()),
    sun: D(S.race("42.2 km", "Hyderabad Hitech Marathon", "1 Nov 2026 · debut full")),
  },
  {
    week: 9,
    start: "2026-11-02",
    label: "Nov 2",
    phase: "build",
    focus: "Rebuild — hilly 28K",
    runKm: 61,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("10 km")),
    wed: D(S.easy("10 km")),
    thu: D(S.intervals("8 km", "Mile Repeats")),
    fri: D(S.easy("5 km"), S.strength("Full Body")),
    sat: D(S.rest()),
    sun: D(S.long("28 km", "Hilly Long Run")),
  },
  {
    week: 10,
    start: "2026-11-09",
    label: "Nov 9",
    phase: "build",
    focus: "30K race-practice long",
    runKm: 64,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("7 km")),
    wed: D(S.strength("Full Body")),
    thu: D(S.tempo("10 km", "Progressive Run")),
    fri: D(S.easy("7 km"), S.hills("10 km", "Hill Repeats")),
    sat: D(S.rest()),
    sun: D(S.long("30 km", "Race Practice Long Run")),
  },
  {
    week: 11,
    start: "2026-11-16",
    label: "Nov 16",
    phase: "build",
    focus: "Tempo + shorter long",
    runKm: 44,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("7 km")),
    wed: D(S.tempo("7 km", "Tempo 5 km")),
    thu: D(S.strength("Full Body")),
    fri: D(S.intervals("7 km", "1 km Repeats")),
    sat: D(S.rest()),
    sun: D(S.long("16 km", "Long Run")),
  },
  {
    week: 12,
    start: "2026-11-23",
    label: "Nov 23",
    phase: "specific",
    focus: "32K race-practice long",
    runKm: 68,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("10 km")),
    wed: D(S.strength("Full Body")),
    thu: D(S.intervals("9 km", "Over and Unders", "1 km reps")),
    fri: D(S.easy("10 km"), S.intervals("7 km", "800 m Repeats")),
    sat: D(S.rest()),
    sun: D(S.long("32 km", "Race Practice Long Run")),
  },
  {
    week: 13,
    start: "2026-11-30",
    label: "Nov 30",
    phase: "specific",
    focus: "Peak long — 34K hilly progressive",
    runKm: 73,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("11 km")),
    wed: D(S.hills("11 km", "Alternating Hill Reps")),
    thu: D(S.easy("6.5 km")),
    fri: D(S.strength("Full Body"), S.tempo("10 km", "Tempo 6 km")),
    sat: D(S.rest()),
    sun: D(S.long("34 km", "Hilly Progressive Long Run")),
  },
  {
    week: 14,
    start: "2026-12-07",
    label: "Dec 7",
    phase: "specific",
    focus: "Cutback long before 25K",
    runKm: 44,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("8 km")),
    wed: D(S.intervals("9 km", "400 m Repeats")),
    thu: D(S.strength("Full Body")),
    fri: D(S.tempo("8 km", "Tempo 2-1-1")),
    sat: D(S.rest()),
    sun: D(S.long("19 km", "Long Run")),
  },
  {
    week: 15,
    start: "2026-12-14",
    label: "Dec 14",
    phase: "specific",
    focus: "Tata Steel World 25K",
    runKm: 43,
    mon: D(S.rest()),
    tue: D(S.easy("9 km")),
    wed: D(S.strength("Legs & Core")),
    thu: D(S.intervals("9 km", "Descending Intervals")),
    fri: D(S.strength("Full Body")),
    sat: D(S.rest()),
    sun: D(S.race("25 km", "Tata Steel World 25K", "20 Dec 2026")),
  },
  {
    week: 16,
    start: "2026-12-21",
    label: "Dec 21",
    phase: "specific",
    focus: "Last big long — 32K",
    runKm: 76,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("12 km")),
    wed: D(S.easy("11 km")),
    thu: D(S.intervals("11 km", "Mile Up & Overs")),
    fri: D(S.easy("10 km"), S.strength("Full Body")),
    sat: D(S.rest()),
    sun: D(S.long("32 km", "Long Run")),
  },
  {
    week: 17,
    start: "2026-12-28",
    label: "Dec 28",
    phase: "taper",
    focus: "Progressive half as long run",
    runKm: 60,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("12 km")),
    wed: D(S.intervals("9 km", "Progressive Mile Repeats")),
    thu: D(S.easy("10 km")),
    fri: D(S.strength("Full Body"), S.tempo("8 km", "Tempo 2 km Repeats")),
    sat: D(S.rest()),
    sun: D(S.long("21.1 km", "Half Marathon Progressive Long")),
  },
  {
    week: 18,
    start: "2027-01-04",
    label: "Jan 4",
    phase: "taper",
    focus: "Volume down — 13K long",
    runKm: 38,
    mon: D(S.strength("Legs & Core")),
    tue: D(S.easy("10 km")),
    wed: D(S.hills("8 km", "Hill Repeats")),
    thu: D(S.strength("Full Body")),
    fri: D(S.intervals("6.5 km", "On / Off Ks")),
    sat: D(S.rest()),
    sun: D(S.long("13 km", "Long Run")),
  },
  {
    week: 19,
    start: "2027-01-11",
    label: "Jan 11",
    phase: "taper",
    focus: "Race week — Tata Mumbai Marathon",
    runKm: 57,
    mon: D(S.rest()),
    tue: D(S.easy("7 km")),
    wed: D(S.strength("Legs & Core")),
    thu: D(S.tempo("7.5 km", "Race Pace Fartlek")),
    fri: D(S.rest()),
    sat: D(S.rest()),
    sun: D(S.race("42.2 km", "Tata Mumbai Marathon", "17 Jan 2027 · Sub-3:30")),
  },
];

const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type PlanDayKey = (typeof DAY_KEYS)[number];

export const planDayLabels: Record<PlanDayKey, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

export type PlanDaySessions = {
  day: PlanDayKey;
  sessions: PlanSession[];
};

export type PlanSessionRef = {
  day: PlanDayKey;
  index: number;
  session: PlanSession;
};

/** Calendar days Mon–Sun with one or more sessions each. */
export function daysForWeek(week: PlanWeek): PlanDaySessions[] {
  return DAY_KEYS.map((day) => ({ day, sessions: week[day] }));
}

/** Flattened session list (double Fridays appear as two entries). */
export function sessionsForWeek(week: PlanWeek): PlanSessionRef[] {
  return DAY_KEYS.flatMap((day) =>
    week[day].map((session, index) => ({ day, index, session })),
  );
}

/** Monday 00:00 local-ish — use UTC noon to avoid TZ edge cases. */
function parseStart(iso: string): Date {
  return new Date(`${iso}T12:00:00`);
}

export function currentPlanWeek(now = new Date()): PlanWeek {
  const t = now.getTime();
  for (let i = planWeeks.length - 1; i >= 0; i--) {
    const start = parseStart(planWeeks[i].start).getTime();
    if (t >= start) return planWeeks[i];
  }
  return planWeeks[0];
}

/** Local weekday → plan day key (Mon–Sun). */
export function todayPlanDay(now = new Date()): PlanDayKey {
  const js = now.getDay(); // 0 Sun … 6 Sat
  return DAY_KEYS[js === 0 ? 6 : js - 1];
}

export function weeksUntilRace(now = new Date()): number {
  const race = parseStart(tmmPlan.race.date).getTime();
  const ms = race - now.getTime();
  return Math.max(0, Math.ceil(ms / (7 * 86400000)));
}

export const sessionKindLabel: Record<SessionKind, string> = {
  easy: "Easy",
  intervals: "Intervals",
  tempo: "Tempo",
  hills: "Hills",
  long: "Long",
  race: "Race",
  strength: "Strength",
  rest: "Rest",
};
