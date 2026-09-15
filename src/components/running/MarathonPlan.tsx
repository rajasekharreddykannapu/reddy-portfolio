"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";
import { runs } from "@/lib/runs";
import {
  buildStravaPlanHits,
  planProgressStats,
  sessionKey,
  type PlanMatch,
} from "@/lib/plan-strava-match";
import {
  tmmPlan,
  planPhases,
  planWeeks,
  currentPlanWeek,
  daysForWeek,
  planDayLabels,
  sessionKindLabel,
  todayPlanDay,
  type PlanWeek,
  type PlanSession,
  type PlanDayKey,
  type SessionKind,
} from "@/lib/tmm-plan";

const kindClass: Record<SessionKind, string> = {
  easy: "border-border text-neutral-800",
  intervals: "border-accent/40 text-accent-700",
  tempo: "border-accent/40 text-accent-700",
  hills: "border-accent/40 text-accent-700",
  long: "border-foreground text-foreground",
  race: "border-accent text-accent-700",
  strength: "border-border text-neutral-700",
  rest: "border-border text-neutral-500",
};

function PhaseBadge({ phase }: { phase: PlanWeek["phase"] }) {
  const label = planPhases.find((p) => p.id === phase)?.label ?? phase;
  return <span className="tag tag-accent">{label}</span>;
}

function ProgressBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="kicker">{label}</p>
        <p className="metric text-sm text-accent">{pct}%</p>
      </div>
      <div className="mt-2 h-2 border-2 border-border bg-surface">
        <div
          className="h-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        />
      </div>
    </div>
  );
}

function matchHint(match: PlanMatch | undefined): string | null {
  if (!match?.done || !match.activity) return null;
  const a = match.activity;
  const km = a.distance > 0 ? `${(a.distance / 1000).toFixed(1)} km` : null;
  const parts = [a.name, km, a.duration].filter(Boolean);
  return parts.join(" · ");
}

function SessionCard({
  day,
  session,
  match,
  isToday = false,
  compact = false,
  showDayLabel = true,
}: {
  day: PlanDayKey;
  session: PlanSession;
  match?: PlanMatch;
  isToday?: boolean;
  compact?: boolean;
  showDayLabel?: boolean;
}) {
  const done = Boolean(match?.done);
  const isRace = session.kind === "race";
  const hint = matchHint(match);
  const statusLabel = done
    ? session.kind === "rest"
      ? "Rest day"
      : match?.shifted
        ? "Moved"
        : "Matched"
    : isToday
      ? "Today"
      : sessionKindLabel[session.kind];

  return (
    <article
      aria-label={`${planDayLabels[day]}: ${session.title}. ${done ? "Completed" : "Pending Strava match"}`}
      className={`relative flex h-full flex-col border-2 p-3 ${
        done
          ? "border-accent/45 bg-accent-100 text-neutral-700"
          : `${kindClass[session.kind]} bg-background`
      } ${isRace && !done ? "bg-accent/5" : ""} ${
        isToday && !done ? "border-accent" : ""
      } ${compact ? "p-2.5" : ""}`}
    >
      {done && (
        <span
          className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center border-2 border-accent bg-accent text-[11px] font-bold text-white"
          aria-hidden
        >
          ✓
        </span>
      )}

      {showDayLabel && (
        <p className="pr-7 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-600">
          {planDayLabels[day]}
          {isToday ? " · today" : ""}
        </p>
      )}
      <p
        className={`${showDayLabel ? "mt-2" : "mt-0"} text-[11px] font-bold uppercase tracking-[0.08em] ${
          done ? "text-accent-700" : isToday ? "text-accent" : ""
        }`}
      >
        {statusLabel}
      </p>
      <p
        className={`mt-1.5 text-sm font-extrabold leading-snug ${
          done ? "text-neutral-700" : ""
        }`}
      >
        {session.title}
      </p>
      {session.load && !done && (
        <p className="mt-1 text-[12px] opacity-80">{session.load}</p>
      )}
      {session.detail && !compact && !done && (
        <p className="mt-1 text-[11px] leading-snug opacity-75">{session.detail}</p>
      )}

      {done && hint && (
        <p className="mt-auto pt-2 text-[11px] leading-snug text-neutral-700">
          {match?.activity ? (
            <a
              href={`https://www.strava.com/activities/${match.activity.id}`}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-accent/40 underline-offset-2 hover:text-accent-700"
            >
              {hint}
            </a>
          ) : (
            hint
          )}
        </p>
      )}
      {done && session.kind === "rest" && (
        <p className="mt-auto pt-2 text-[11px] text-neutral-600">Scheduled rest</p>
      )}
    </article>
  );
}

function DayColumn({
  day,
  sessions,
  weekNum,
  isToday,
  matchFor,
  compact = false,
}: {
  day: PlanDayKey;
  sessions: PlanSession[];
  weekNum: number;
  isToday: boolean;
  matchFor: (week: number, day: PlanDayKey, index: number) => PlanMatch | undefined;
  compact?: boolean;
}) {
  return (
    <li className="flex min-h-[8.5rem] flex-col gap-2">
      {sessions.map((session, index) => (
        <SessionCard
          key={`${day}-${index}`}
          day={day}
          session={session}
          match={matchFor(weekNum, day, index)}
          isToday={isToday}
          compact={compact}
          showDayLabel={index === 0}
        />
      ))}
    </li>
  );
}

export default function MarathonPlan() {
  const thisWeek = useMemo(() => currentPlanWeek(), []);
  const today = useMemo(() => todayPlanDay(), []);
  const hits = useMemo(() => buildStravaPlanHits(runs), []);
  const stats = useMemo(() => planProgressStats(hits), [hits]);
  const [openWeek, setOpenWeek] = useState<number | null>(thisWeek.week);
  const days = daysForWeek(thisWeek);
  const phaseMeta = planPhases.find((p) => p.id === thisWeek.phase);
  const weekStats = stats.perWeek[thisWeek.week] ?? { done: 0, total: 7 };
  const weekPct = weekStats.total
    ? Math.round((weekStats.done / weekStats.total) * 100)
    : 0;
  const weekComplete = weekStats.done === weekStats.total;
  const matchFor = (week: number, day: PlanDayKey, index: number) =>
    hits[sessionKey(week, day, index)];

  return (
    <Section
      id="tmm-plan"
      index="06"
      title="Path to Mumbai"
      intro="Nineteen weeks to Tata Mumbai Marathon. Sessions clear only when a matching Strava activity syncs to the site."
    >
      <div className="grid gap-10">
        <motion.article
          variants={fadeUp}
          className="border-t-2 border-foreground pt-6"
        >
          <div className="grid grid-cols-[1.2fr_auto] items-end gap-8 max-[800px]:grid-cols-1">
            <div>
              <p className="kicker flex flex-wrap items-center gap-2">
                <span>A-race</span>
                <span aria-hidden>·</span>
                <span>{tmmPlan.race.dateLabel}</span>
                <span aria-hidden>·</span>
                <span>{tmmPlan.race.location}</span>
              </p>
              <h3 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] leading-none">
                {tmmPlan.race.name}
              </h3>
              <p className="mt-3 max-w-[52ch] text-[17px] leading-[1.5] text-neutral-800">
                Goal <span className="font-bold text-accent-700">{tmmPlan.race.goalTime}</span> at{" "}
                {tmmPlan.race.goalPace}. Week {thisWeek.week} of {tmmPlan.totalWeeks} —{" "}
                {phaseMeta?.label ?? thisWeek.phase} phase.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={tmmPlan.race.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Event page
                </a>
                <a
                  href="https://www.strava.com/athletes/202080481"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  Strava
                </a>
              </div>
            </div>
            <div className="text-right max-[800px]:text-left">
              <p className="metric text-[clamp(2.5rem,5vw,3.75rem)] leading-none text-accent">
                {tmmPlan.race.goalTime}
              </p>
              <p className="kicker mt-2">Target finish</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t-2 border-border pt-6 max-[700px]:grid-cols-1">
            <div>
              <p className="metric text-2xl text-foreground">
                {stats.done}
                <span className="text-neutral-500">/{stats.total}</span>
              </p>
              <p className="kicker mt-1">Sessions matched</p>
            </div>
            <div>
              <p className="metric text-2xl text-foreground">
                {stats.weeksComplete}
                <span className="text-neutral-500">/{stats.weeksTotal}</span>
              </p>
              <p className="kicker mt-1">Weeks cleared</p>
            </div>
            <div>
              <ProgressBar pct={stats.pct} label="Plan progress" />
            </div>
          </div>
        </motion.article>

        <motion.div variants={fadeUp}>
          <h3 className="border-b-2 border-border pb-2.5 text-[1.1875rem]">Four phases</h3>
          <ol className="rule-grid mt-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {planPhases.map((phase) => {
              const active = phase.id === thisWeek.phase;
              const phaseWeeks = planWeeks.filter((w) => w.phase === phase.id);
              const cleared = phaseWeeks.filter(
                (w) => stats.perWeek[w.week]?.done === stats.perWeek[w.week]?.total,
              ).length;
              const phaseDone = cleared === phaseWeeks.length && phaseWeeks.length > 0;
              return (
                <li
                  key={phase.id}
                  className={`p-5 ${active ? "bg-surface-2" : ""} ${phaseDone ? "bg-accent-100" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="kicker">{phase.weeks}</p>
                    {active ? (
                      <span className="tag tag-accent">Now</span>
                    ) : phaseDone ? (
                      <span className="tag tag-accent">Done</span>
                    ) : null}
                  </div>
                  <h4 className="mt-2 text-[1.1875rem]">{phase.label}</h4>
                  <p className="mt-2 text-[13px] leading-[1.5] text-neutral-700">{phase.detail}</p>
                  <div className="mt-3 h-1.5 border border-border bg-surface">
                    <div
                      className="h-full bg-accent transition-[width] duration-500"
                      style={{
                        width: `${phaseWeeks.length ? (cleared / phaseWeeks.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <p className="kicker mt-2 text-accent">
                    {cleared}/{phaseWeeks.length} weeks
                  </p>
                </li>
              );
            })}
          </ol>
        </motion.div>

        <motion.article
          variants={fadeUp}
          className={`border-t-2 pt-6 ${weekComplete ? "border-accent" : "border-foreground"}`}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <PhaseBadge phase={thisWeek.phase} />
            <span className="tag tag-outline">
              Week {thisWeek.week} · {thisWeek.label}
            </span>
            {thisWeek.runKm != null && (
              <span className="tag tag-outline">~{thisWeek.runKm} km planned</span>
            )}
            {weekComplete && <span className="tag tag-accent">Week complete ✓</span>}
          </div>
          <div className="mt-4">
            <h3 className="text-[1.625rem]">This week</h3>
            <p className="mt-2 max-w-[60ch] text-[17px] text-neutral-800">{thisWeek.focus}</p>
          </div>

          <ProgressBar
            pct={weekPct}
            label={`${weekStats.done} of ${weekStats.total} matched`}
          />

          <ul className="mt-6 grid grid-cols-7 gap-2 max-[1100px]:grid-cols-4 max-[700px]:grid-cols-2">
            {days.map(({ day, sessions }) => (
              <DayColumn
                key={day}
                day={day}
                sessions={sessions}
                weekNum={thisWeek.week}
                isToday={day === today}
                matchFor={matchFor}
              />
            ))}
          </ul>
          <p className="kicker mt-4 text-neutral-600">
            Double days stack in one column. Rest clears only with no training that day; sessions can still match ±1 day if you shuffle.
          </p>
        </motion.article>

        <motion.div variants={fadeUp}>
          <h3 className="border-b-2 border-border pb-2.5 text-[1.1875rem]">All 19 weeks</h3>
          <ul className="mt-2">
            {planWeeks.map((week) => {
              const open = openWeek === week.week;
              const weekDays = daysForWeek(week);
              const ws = stats.perWeek[week.week] ?? { done: 0, total: 7 };
              const complete = ws.done === ws.total;
              const isNow = week.week === thisWeek.week;
              const rowPct = ws.total ? Math.round((ws.done / ws.total) * 100) : 0;

              return (
                <li
                  key={week.week}
                  className={`border-b-2 border-border ${complete ? "bg-accent-100/60" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenWeek(open ? null : week.week)}
                    className="flex w-full min-w-0 items-baseline justify-between gap-4 py-4 text-left transition-colors hover:text-accent-700"
                    aria-expanded={open}
                  >
                    <span className="min-w-0">
                      <span className="text-[13px] font-semibold text-neutral-600">
                        Week {week.week} · {week.label}
                        {isNow ? " · now" : ""}
                        {complete ? " · cleared" : ""}
                      </span>
                      <span
                        className={`mt-1 block text-base font-extrabold ${
                          complete ? "text-neutral-600" : ""
                        }`}
                      >
                        {week.focus}
                      </span>
                      <span className="mt-2 block h-1 w-full max-w-[12rem] border border-border bg-surface">
                        <span
                          className="block h-full bg-accent transition-[width] duration-400"
                          style={{ width: `${rowPct}%` }}
                        />
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center">
                      <span className={`tag ${complete ? "tag-accent" : "tag-outline"}`}>
                        {ws.done}/{ws.total}
                      </span>
                      <span className="tag tag-outline capitalize">{week.phase}</span>
                    </span>
                  </button>

                  {open && (
                    <ul className="grid grid-cols-7 gap-2 pb-5 max-[1100px]:grid-cols-4 max-[700px]:grid-cols-2">
                      {weekDays.map(({ day, sessions }) => (
                        <DayColumn
                          key={day}
                          day={day}
                          sessions={sessions}
                          weekNum={week.week}
                          isToday={isNow && day === today}
                          matchFor={matchFor}
                          compact
                        />
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
