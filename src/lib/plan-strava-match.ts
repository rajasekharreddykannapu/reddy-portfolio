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

export type PlanMatch = {
  done: boolean;
  /** Matched Strava activity when applicable */
  activity?: Pick<Run, "id" | "name" | "distance" | "duration" | "sport">;
};

/**
 * Rest days complete once the calendar day arrives (no Strava needed).
 * Strength / run / race need a matching synced Strava activity that day.
 */
export function matchPlanSession(
  session: PlanSession,
  dayActs: Run[],
  isoDate: string,
  now = new Date(),
): PlanMatch {
  if (session.kind === "rest") {
    return { done: isoDate <= todayIso(now) };
  }

  if (session.kind === "strength") {
    const hit = dayActs.find((a) => isStrengthSport(a.sport));
    return hit
      ? {
          done: true,
          activity: {
            id: hit.id,
            name: hit.name,
            distance: hit.distance,
            duration: hit.duration,
            sport: hit.sport,
          },
        }
      : { done: false };
  }

  const runActs = dayActs.filter((a) => isRunSport(a.sport));
  if (!runActs.length) return { done: false };

  const target = plannedKm(session);
  const ranked = [...runActs].sort((a, b) => b.distance - a.distance);
  const best = ranked[0];
  if (target != null && best.distance / 1000 < target * 0.88) {
    return { done: false };
  }

  return {
    done: true,
    activity: {
      id: best.id,
      name: best.name,
      distance: best.distance,
      duration: best.duration,
      sport: best.sport,
    },
  };
}

export type StravaPlanHits = Record<string, PlanMatch>;

export function sessionKey(week: number, day: PlanDayKey): string {
  return `${week}-${day}`;
}

export function buildStravaPlanHits(runs: Run[], now = new Date()): StravaPlanHits {
  const hits: StravaPlanHits = {};
  for (const week of planWeeks) {
    for (const { day, session } of sessionsForWeek(week)) {
      const iso = planDayDate(week, day);
      const acts = activitiesOnDate(runs, iso);
      const match = matchPlanSession(session, acts, iso, now);
      if (match.done) hits[sessionKey(week.week, day)] = match;
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
    const days = sessionsForWeek(week);
    let wDone = 0;
    for (const { day } of days) {
      total += 1;
      if (hits[sessionKey(week.week, day)]?.done) {
        done += 1;
        wDone += 1;
      }
    }
    perWeek[week.week] = { done: wDone, total: days.length };
    if (wDone === days.length) weeksComplete += 1;
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
