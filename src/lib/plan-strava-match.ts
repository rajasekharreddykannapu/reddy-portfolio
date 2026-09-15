import type { Run } from "@/lib/runs";
import {
  planWeeks,
  sessionsForWeek,
  type PlanDayKey,
  type PlanSession,
  type PlanWeek,
} from "@/lib/tmm-plan";

const DAY_OFFSET: Record<PlanDayKey, number> = {
  mon: 0,
  tue: 1,
  wed: 2,
  thu: 3,
  fri: 4,
  sat: 5,
  sun: 6,
};

const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

export function planDayDate(week: PlanWeek, day: PlanDayKey): string {
  const d = new Date(`${week.start}T12:00:00`);
  d.setDate(d.getDate() + DAY_OFFSET[day]);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dayNum = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dayNum}`;
}

function todayIso(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const dayNum = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${dayNum}`;
}

function shiftIso(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dayNum = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dayNum}`;
}

function activitiesOnDate(runs: Run[], isoDate: string): Run[] {
  return runs.filter((r) => r.date.slice(0, 10) === isoDate);
}

function plannedKm(session: PlanSession): number | null {
  const raw = `${session.load ?? ""} ${session.title}`;
  const m = raw.match(/(\d+(?:\.\d+)?)\s*km/i);
  return m ? Number(m[1]) : null;
}

function isStrengthSport(sport: string): boolean {
  return sport === "WeightTraining" || sport === "Workout" || sport === "Crossfit";
}

function isRunSport(sport: string): boolean {
  return sport === "Run" || sport === "VirtualRun" || sport === "TrailRun";
}

function isActiveTraining(a: Run): boolean {
  return isStrengthSport(a.sport) || (isRunSport(a.sport) && a.distance >= 3000);
}

export type PlanMatch = {
  done: boolean;
  activity?: Pick<Run, "id" | "name" | "distance" | "duration" | "sport">;
  /** Planned day differed (e.g. Friday quality done Saturday) */
  shifted?: boolean;
};

function activitySnapshot(hit: Run): PlanMatch["activity"] {
  return {
    id: hit.id,
    name: hit.name,
    distance: hit.distance,
    duration: hit.duration,
    sport: hit.sport,
  };
}

/**
 * Rest: day has arrived AND no real training that day (otherwise rest collided).
 * Strength / run: match same day first, then ±1 day in-week (Fri→Sat moves).
 */
export function matchPlanSession(
  session: PlanSession,
  dayActs: Run[],
  isoDate: string,
  usedIds: Set<string>,
  now = new Date(),
  neighborActs: { acts: Run[]; shifted: boolean }[] = [],
): PlanMatch {
  if (session.kind === "rest") {
    const collided = dayActs.some(isActiveTraining);
    return { done: !collided && isoDate <= todayIso(now) };
  }

  const pools: { acts: Run[]; shifted: boolean }[] = [
    { acts: dayActs, shifted: false },
    ...neighborActs,
  ];

  for (const { acts, shifted } of pools) {
    const available = acts.filter((a) => !usedIds.has(a.id));

    if (session.kind === "strength") {
      const hit = available.find((a) => isStrengthSport(a.sport));
      if (!hit) continue;
      usedIds.add(hit.id);
      return { done: true, activity: activitySnapshot(hit), shifted };
    }

    const runActs = available.filter((a) => isRunSport(a.sport));
    if (!runActs.length) continue;

    const target = plannedKm(session);
    const ranked = [...runActs].sort((a, b) => b.distance - a.distance);
    const best = ranked[0];
    if (target != null && best.distance / 1000 < target * 0.88) continue;

    usedIds.add(best.id);
    return { done: true, activity: activitySnapshot(best), shifted };
  }

  return { done: false };
}

export type StravaPlanHits = Record<string, PlanMatch>;

export function sessionKey(week: number, day: PlanDayKey, index = 0): string {
  return `${week}-${day}-${index}`;
}

function neighborDates(week: PlanWeek, day: PlanDayKey): string[] {
  const iso = planDayDate(week, day);
  const idx = DAY_KEYS.indexOf(day);
  const out: string[] = [];
  // Prefer next day (Fri quality → Sat), then previous.
  if (idx < 6) out.push(shiftIso(iso, 1));
  if (idx > 0) out.push(shiftIso(iso, -1));
  return out;
}

export function buildStravaPlanHits(runs: Run[], now = new Date()): StravaPlanHits {
  const hits: StravaPlanHits = {};
  // Global used set so a Saturday run can't clear both Sat rest-collision and Fri session twice incorrectly —
  // still allow one activity → one session.
  const usedGlobal = new Set<string>();

  for (const week of planWeeks) {
    // Pass 1: exact-day matches (strength + runs + rest)
    for (const { day, index, session } of sessionsForWeek(week)) {
      if (session.kind === "rest") continue;
      const iso = planDayDate(week, day);
      const acts = activitiesOnDate(runs, iso);
      const match = matchPlanSession(session, acts, iso, usedGlobal, now, []);
      if (match.done) hits[sessionKey(week.week, day, index)] = match;
    }

    // Pass 2: ±1 day for still-open non-rest sessions (Friday → Saturday moves)
    for (const { day, index, session } of sessionsForWeek(week)) {
      const key = sessionKey(week.week, day, index);
      if (hits[key]?.done || session.kind === "rest") continue;
      const iso = planDayDate(week, day);
      const neighbors = neighborDates(week, day).map((nIso) => ({
        acts: activitiesOnDate(runs, nIso),
        shifted: true,
      }));
      const match = matchPlanSession(session, [], iso, usedGlobal, now, neighbors);
      if (match.done) hits[key] = match;
    }

    // Pass 3: rest — after training matches so Saturday run can attach to Friday first
    for (const { day, index, session } of sessionsForWeek(week)) {
      if (session.kind !== "rest") continue;
      const iso = planDayDate(week, day);
      const acts = activitiesOnDate(runs, iso);
      // Treat activities already used for another planned session as OK for rest
      // only if nothing leftover is still "active training" unused… Actually if Sat
      // run matched Fri session, usedGlobal has it — rest should still see the run
      // on the day and mark collision. So use raw day acts, not unused filter.
      const match = matchPlanSession(session, acts, iso, new Set(), now, []);
      if (match.done) hits[sessionKey(week.week, day, index)] = match;
    }
  }
  return hits;
}

export function planProgressStats(hits: StravaPlanHits) {
  let total = 0;
  let done = 0;
  let weeksComplete = 0;
  const perWeek: Record<number, { done: number; total: number }> = {};

  for (const week of planWeeks) {
    const refs = sessionsForWeek(week);
    let wDone = 0;
    for (const { day, index } of refs) {
      total += 1;
      if (hits[sessionKey(week.week, day, index)]?.done) {
        done += 1;
        wDone += 1;
      }
    }
    perWeek[week.week] = { done: wDone, total: refs.length };
    if (wDone === refs.length) weeksComplete += 1;
  }

  return {
    done,
    total,
    pct: total === 0 ? 0 : Math.round((done / total) * 100),
    weeksComplete,
    weeksTotal: planWeeks.length,
    perWeek,
  };
}
