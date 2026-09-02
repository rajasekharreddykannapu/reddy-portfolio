"use client";

import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  hasRunData,
  monthlyMedianPace,
  longestRunProgression,
  weeklyConsistency,
  formatPace,
} from "@/lib/runs";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

/** A titled block closed by a 2px rule — no card, no fill. */
function ChartBlock({
  title,
  kicker,
  accentKicker = false,
  children,
}: {
  title: string;
  kicker: string;
  accentKicker?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-border pb-2.5">
        <h3 className="text-[1.1875rem]">{title}</h3>
        <span className={accentKicker ? "tag tag-accent" : "tag tag-outline"}>{kicker}</span>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/** Horizontal bars — used for pace, where faster must read as longer. */
function RowBars({
  rows,
}: {
  rows: { key: string; label: string; fill: number; valueLabel: string; best: boolean }[];
}) {
  return (
    <div className="grid gap-2">
      {rows.map((r) => (
        <div key={r.key} className="grid grid-cols-[56px_1fr_64px] items-center gap-3">
          <span className="text-[13px] font-semibold text-neutral-700">{r.label}</span>
          <div className="h-4.5 bg-neutral-200">
            <div
              className="bar h-full"
              style={{
                width: `${r.fill}%`,
                background: r.best ? "var(--accent)" : "var(--neutral-500)",
              }}
            />
          </div>
          <span
            className="metric text-[13px]"
            style={{ color: r.best ? "var(--accent)" : undefined }}
          >
            {r.valueLabel}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Column bars on a 2px baseline — used for counts and distances. */
function ColumnBars({
  bars,
  height = "h-35",
  baseline = false,
}: {
  bars: { key: string; label: string; fill: number; valueLabel: string; peak: boolean }[];
  height?: string;
  baseline?: boolean;
}) {
  return (
    <>
      <div
        className={`grid items-end gap-1.5 ${height} ${
          baseline ? "border-b-2 border-foreground" : ""
        }`}
        style={{ gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))` }}
      >
        {bars.map((b) => (
          <div key={b.key} className="flex h-full flex-col justify-end">
            <span
              className="metric pb-1 text-[13px]"
              style={{ color: b.peak ? "var(--accent)" : undefined }}
            >
              {b.valueLabel}
            </span>
            <div
              className="bar"
              style={{
                height: `${b.fill}%`,
                background: b.peak ? "var(--accent)" : "var(--neutral-500)",
              }}
            />
          </div>
        ))}
      </div>
      <div
        className="mt-2 grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))` }}
      >
        {bars.map((b) => (
          <p key={b.key} className="truncate text-[11px] font-semibold text-neutral-600">
            {b.label}
          </p>
        ))}
      </div>
    </>
  );
}

export default function JourneyCharts() {
  const paceMonths = useMemo(() => {
    if (!hasRunData) {
      return [
        { key: "2026-02", label: "Feb", paceSec: 404, pace: "6:44", count: 16 },
        { key: "2026-03", label: "Mar", paceSec: 391, pace: "6:31", count: 13 },
        { key: "2026-05", label: "May", paceSec: 397, pace: "6:37", count: 12 },
        { key: "2026-06", label: "Jun", paceSec: 399, pace: "6:39", count: 19 },
        { key: "2026-07", label: "Jul", paceSec: 409, pace: "6:49", count: 21 },
      ];
    }
    return monthlyMedianPace().map((m) => ({ ...m, label: m.label.split(" ")[0] }));
  }, []);

  const longest = useMemo(() => {
    if (!hasRunData) {
      return [
        { date: "2026-02-01", label: "Feb", km: 8, name: "First real run" },
        { date: "2026-02-08", label: "Feb", km: 10, name: "First 10K" },
        { date: "2026-02-15", label: "Feb", km: 14.5, name: "Long run" },
        { date: "2026-06-07", label: "Jun", km: 21.1, name: "Telangana Run" },
        { date: "2026-08-02", label: "Aug", km: 21.3, name: "NMDC dry run" },
      ];
    }
    return longestRunProgression();
  }, []);

  const weeks = useMemo(() => (hasRunData ? weeklyConsistency(undefined, 10) : []), []);

  const bestPace = paceMonths.reduce((a, b) => (a.paceSec <= b.paceSec ? a : b));
  const peakLong = longest[longest.length - 1];
  const avgDays =
    weeks.length > 0 ? (weeks.reduce((s, w) => s + w.days, 0) / weeks.length).toFixed(1) : null;

  // Pace: faster = longer bar, floored at 25% so the slowest month stays visible.
  const paceRows = useMemo(() => {
    const fastest = Math.min(...paceMonths.map((m) => m.paceSec));
    const slowest = Math.max(...paceMonths.map((m) => m.paceSec));
    const span = Math.max(slowest - fastest, 1);
    return paceMonths.map((m) => ({
      key: m.key,
      label: m.label,
      valueLabel: m.pace,
      best: m.paceSec === fastest,
      fill: 25 + ((slowest - m.paceSec) / span) * 75,
    }));
  }, [paceMonths]);

  const weekBars = useMemo(() => {
    if (weeks.length === 0) return null;
    const max = Math.max(...weeks.map((w) => w.days), 1);
    return weeks.map((w) => ({
      key: w.key,
      label: w.label.replace(/^W0?/, "W"),
      valueLabel: String(w.days),
      peak: w.days === max,
      fill: Math.max(4, (w.days / max) * 100),
    }));
  }, [weeks]);

  const longestBars = useMemo(() => {
    const max = Math.max(...longest.map((p) => p.km), 1);
    return longest.map((p) => ({
      key: p.date,
      label: p.label,
      valueLabel: String(p.km),
      peak: p.km === max,
      fill: Math.max(4, (p.km / max) * 100),
    }));
  }, [longest]);

  return (
    <motion.section
      id="charts"
      className="mx-auto max-w-[1240px] px-10 max-sm:px-5"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div className="grid grid-cols-[220px_1fr] gap-10 border-b-2 border-border py-18 max-[900px]:grid-cols-1">
        <SectionHeading
          index="03"
          intro="Three curves running under the mileage: median pace, days out per week, and how far the longest run reached."
        >
          How it compounds
        </SectionHeading>

        <motion.div variants={fadeUp} className="grid gap-10">
          <ChartBlock
            kicker={`Best month ${bestPace.pace}/km`}
            accentKicker
            title="Median pace, month by month"
          >
            <RowBars rows={paceRows} />
          </ChartBlock>

          <ChartBlock
            kicker={avgDays ? `${avgDays} days / week` : "Days out"}
            title="Weekly consistency"
          >
            {weekBars ? (
              <ColumnBars bars={weekBars} />
            ) : (
              <p className="kicker py-14">Sync Strava to unlock weekly bars</p>
            )}
          </ChartBlock>

          <ChartBlock
            kicker={peakLong ? `${longest[0]?.km ?? "—"} → ${peakLong.km} km` : "Distance PRs"}
            accentKicker
            title="Longest run, stretching out"
          >
            <ColumnBars bars={longestBars} height="h-45" baseline />
            {peakLong && (
              <p className="kicker mt-4.5">
                Latest PR · {peakLong.name} · {peakLong.km} km · Fastest median ·{" "}
                {formatPace(bestPace.paceSec)}/km
              </p>
            )}
          </ChartBlock>
        </motion.div>
      </div>
    </motion.section>
  );
}
