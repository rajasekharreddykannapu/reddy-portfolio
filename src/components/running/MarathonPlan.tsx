"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";
import { usePlanProgress } from "@/lib/use-plan-progress";
import {
  tmmPlan,
  planPhases,
  planWeeks,
  currentPlanWeek,
  sessionsForWeek,
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

function SessionCard({
  day,
  session,
  done,
  onToggle,
  isToday = false,
  compact = false,
}: {
  day: PlanDayKey;
  session: PlanSession;
  done: boolean;
  onToggle: () => void;
  isToday?: boolean;
  compact?: boolean;
}) {
  const isRace = session.kind === "race";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={done}
      aria-label={`${planDayLabels[day]}: ${session.title}. ${done ? "Completed" : "Mark complete"}`}
      className={`group relative h-full border-2 p-3 text-left transition-[background-color,border-color,opacity,transform] duration-200 active:scale-[0.98] ${
        done
          ? "border-accent/50 bg-accent-100 text-neutral-700"
          : `${kindClass[session.kind]} hover:border-accent/60 hover:bg-surface`
      } ${isRace && !done ? "bg-accent/5" : ""} ${
        isToday && !done ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""
      } ${compact ? "p-2.5" : ""}`}
    >
      <span
        className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center border-2 text-[11px] font-bold transition-colors ${
          done
            ? "border-accent bg-accent text-white"
            : "border-border bg-background text-transparent group-hover:border-accent/50"
        }`}
        aria-hidden
      >
        {done ? "✓" : ""}
      </span>

      <p className="pr-7 text-[10px] font-bold uppercase tracking-[0.12em] opacity-70">
        {planDayLabels[day]}
        {isToday ? " · today" : ""}
      </p>
      <p
        className={`mt-2 text-[11px] font-bold uppercase tracking-[0.08em] ${
          done ? "text-accent-700" : ""
        }`}
      >
        {done ? "Done" : sessionKindLabel[session.kind]}
      </p>
      <p
        className={`mt-1.5 text-sm font-extrabold leading-snug ${
          done ? "line-through decoration-accent/40" : ""
        }`}
      >
        {session.title}
      </p>
      {session.load && (
        <p className={`mt-1 text-[12px] opacity-80 ${done ? "line-through decoration-accent/30" : ""}`}>
          {session.load}
        </p>
      )}
      {session.detail && !compact && (
        <p className="mt-1 text-[11px] leading-snug opacity-75">{session.detail}</p>
      )}
    </button>
  );
}

export default function MarathonPlan() {
  const thisWeek = useMemo(() => currentPlanWeek(), []);
  const today = useMemo(() => todayPlanDay(), []);
  const [openWeek, setOpenWeek] = useState<number | null>(thisWeek.week);
  const { ready, isDone, toggle, markWeek, stats } = usePlanProgress();
  const sessions = sessionsForWeek(thisWeek);
  const phaseMeta = planPhases.find((p) => p.id === thisWeek.phase);
  const weekStats = stats.perWeek[thisWeek.week] ?? { done: 0, total: 7 };
  const weekPct = weekStats.total
    ? Math.round((weekStats.done / weekStats.total) * 100)
    : 0;
  const weekComplete = weekStats.done === weekStats.total;

  return (
    <Section
      id="tmm-plan"
      index="06"
      title="Path to Mumbai"
      intro="Nineteen weeks to Tata Mumbai Marathon — tap a session when it’s done. Progress stays on this device."
    >
      <div className="grid gap-10">
        {/* Goal strip + overall progress */}
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
              <a
                href={tmmPlan.race.url}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost mt-5"
              >
                Event page
              </a>
            </div>
            <div className="text-right max-[800px]:text-left">
              <p className="metric text-[clamp(2.5rem,5vw,3.75rem)] leading-none text-accent">
                {tmmPlan.race.goalTime}
              </p>
              <p className="kicker mt-2">Target finish</p>
            </div>
          </div>

          <div
            className={`mt-8 grid grid-cols-3 gap-4 border-t-2 border-border pt-6 max-[700px]:grid-cols-1 ${
              ready ? "opacity-100" : "opacity-60"
            }`}
          >
            <div>
              <p className="metric text-2xl text-foreground">
                {stats.done}
                <span className="text-neutral-500">/{stats.total}</span>
              </p>
              <p className="kicker mt-1">Sessions done</p>
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

        {/* Phases */}
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

        {/* This week */}
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
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-[1.625rem]">This week</h3>
              <p className="mt-2 max-w-[60ch] text-[17px] text-neutral-800">{thisWeek.focus}</p>
              {weekComplete && (
                <p className="mt-2 text-[15px] font-semibold text-accent-700">
                  Nice work — week {thisWeek.week} locked in.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => markWeek(thisWeek.week, !weekComplete)}
              className={weekComplete ? "btn-ghost" : "btn-primary"}
            >
              {weekComplete ? "Clear week" : "Mark week done"}
            </button>
          </div>

          <ProgressBar
            pct={weekPct}
            label={`${weekStats.done} of ${weekStats.total} sessions`}
          />

          <ul className="mt-6 grid grid-cols-7 gap-2 max-[900px]:grid-cols-2">
            {sessions.map(({ day, session }) => (
              <li key={day} className="min-h-[7.5rem]">
                <SessionCard
                  day={day}
                  session={session}
                  done={isDone(thisWeek.week, day)}
                  onToggle={() => toggle(thisWeek.week, day)}
                  isToday={day === today}
                />
              </li>
            ))}
          </ul>
          <p className="kicker mt-4 text-neutral-600">
            Tap a day to mark it done — saved on this browser.
          </p>
        </motion.article>

        {/* All weeks */}
        <motion.div variants={fadeUp}>
          <h3 className="border-b-2 border-border pb-2.5 text-[1.1875rem]">All 19 weeks</h3>
          <ul className="mt-2">
            {planWeeks.map((week) => {
              const open = openWeek === week.week;
              const days = sessionsForWeek(week);
              const ws = stats.perWeek[week.week] ?? { done: 0, total: 7 };
              const complete = ws.done === ws.total;
              const isNow = week.week === thisWeek.week;
              const rowPct = ws.total ? Math.round((ws.done / ws.total) * 100) : 0;

              return (
                <li
                  key={week.week}
                  className={`border-b-2 border-border ${complete ? "bg-accent-100/60" : ""}`}
                >
                  <div className="flex items-stretch gap-0">
                    <button
                      type="button"
                      onClick={() => setOpenWeek(open ? null : week.week)}
                      className="flex min-w-0 flex-1 items-baseline justify-between gap-4 py-4 text-left transition-colors hover:text-accent-700"
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
                            complete ? "text-neutral-600 line-through decoration-accent/30" : ""
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
                  </div>

                  {open && (
                    <div className="pb-5">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => markWeek(week.week, !complete)}
                          className={complete ? "btn-ghost" : "btn-primary"}
                        >
                          {complete ? "Clear week" : "Mark week done"}
                        </button>
                      </div>
                      <div className="grid grid-cols-7 gap-2 max-[900px]:grid-cols-2">
                        {days.map(({ day, session }) => (
                          <SessionCard
                            key={day}
                            day={day}
                            session={session}
                            done={isDone(week.week, day)}
                            onToggle={() => toggle(week.week, day)}
                            isToday={isNow && day === today}
                            compact
                          />
                        ))}
                      </div>
                    </div>
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
