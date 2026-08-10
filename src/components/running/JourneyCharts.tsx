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

type Point = { x: number; y: number; key: string; label: string; valueLabel: string };

function buildLine(
  values: number[],
  meta: { key: string; label: string; valueLabel: string }[],
  opts: { invert?: boolean; w?: number; h?: number; padX?: number; padY?: number } = {},
) {
  const w = opts.w ?? 320;
  const h = opts.h ?? 140;
  const padX = opts.padX ?? 16;
  const padY = opts.padY ?? 18;
  const invert = opts.invert ?? false;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1e-6);
  const n = values.length;
  const step = n > 1 ? (w - padX * 2) / (n - 1) : 0;

  const points: Point[] = values.map((v, i) => {
    const norm = (v - min) / span;
    const yNorm = invert ? 1 - norm : norm;
    return {
      x: padX + i * step,
      y: h - padY - yNorm * (h - padY * 2),
      ...meta[i],
    };
  });

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${points[points.length - 1].x.toFixed(1)} ${h - padY} L${points[0].x.toFixed(1)} ${h - padY} Z`;

  return { viewBox: `0 0 ${w} ${h}`, line, area, points, w, h, padY };
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface/50 p-4 sm:p-5">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function LineChart({
  chart,
  ariaLabel,
  invertStroke,
}: {
  chart: ReturnType<typeof buildLine>;
  ariaLabel: string;
  invertStroke?: boolean;
}) {
  return (
    <>
      <svg
        viewBox={chart.viewBox}
        className="h-36 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
      >
        {[0.33, 0.66, 1].map((t) => {
          const y = chart.h - chart.padY - t * (chart.h - chart.padY * 2);
          return (
            <line
              key={t}
              x1="16"
              x2={chart.w - 16}
              y1={y}
              y2={y}
              stroke="var(--border)"
              strokeWidth="1"
            />
          );
        })}
        <path d={chart.area} fill="var(--accent)" opacity="0.1" />
        <path
          className="chart-line"
          pathLength={1}
          d={chart.line}
          stroke={invertStroke ? "var(--accent-2)" : "var(--accent)"}
          strokeWidth="2.25"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {chart.points.map((p) => (
          <circle
            key={p.key}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill="var(--accent)"
            stroke="var(--surface)"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <div
        className="mt-1 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${Math.min(chart.points.length, 8)}, minmax(0, 1fr))` }}
      >
        {chart.points.map((p) => (
          <div key={p.key} className="text-center">
            <p className="font-mono text-[0.6rem] text-muted truncate">{p.label}</p>
            <p className="mt-0.5 font-mono text-[0.65rem] font-semibold tabular-nums text-foreground">
              {p.valueLabel}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function BarChart({
  bars,
}: {
  bars: { key: string; label: string; value: number; max: number; valueLabel: string }[];
}) {
  return (
    <div className="flex h-36 items-end gap-1.5 px-1">
      {bars.map((b) => {
        const h = Math.max(8, (b.value / b.max) * 100);
        return (
          <div key={b.key} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1">
            <span className="font-mono text-[0.6rem] tabular-nums text-muted">{b.valueLabel}</span>
            <div
              className="w-full rounded-t-sm bg-accent/80 transition-colors hover:bg-accent"
              style={{ height: `${h}%` }}
              title={`${b.label}: ${b.valueLabel}`}
            />
            <span className="font-mono text-[0.55rem] text-muted truncate w-full text-center">
              {b.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function JourneyCharts() {
  const paceMonths = useMemo(() => {
    if (!hasRunData) {
      return [
        { key: "2026-02", label: "Feb '26", paceSec: 404, pace: "6:44", count: 16 },
        { key: "2026-03", label: "Mar '26", paceSec: 391, pace: "6:31", count: 13 },
        { key: "2026-05", label: "May '26", paceSec: 397, pace: "6:37", count: 12 },
        { key: "2026-06", label: "Jun '26", paceSec: 399, pace: "6:39", count: 19 },
        { key: "2026-07", label: "Jul '26", paceSec: 409, pace: "6:49", count: 21 },
      ];
    }
    return monthlyMedianPace();
  }, []);

  const longest = useMemo(() => {
    if (!hasRunData) {
      return [
        { date: "2026-02-01", label: "1 Feb", km: 8, name: "First real run" },
        { date: "2026-02-08", label: "8 Feb", km: 10, name: "First 10K" },
        { date: "2026-02-15", label: "15 Feb", km: 14.5, name: "Long run" },
        { date: "2026-06-07", label: "7 Jun", km: 21.1, name: "Telangana Run" },
        { date: "2026-08-02", label: "2 Aug", km: 21.3, name: "NMDC dry run" },
      ];
    }
    return longestRunProgression();
  }, []);

  const weeks = useMemo(() => {
    if (!hasRunData) return [];
    return weeklyConsistency(undefined, 12);
  }, []);

  const paceChart = useMemo(
    () =>
      buildLine(
        paceMonths.map((m) => m.paceSec),
        paceMonths.map((m) => ({
          key: m.key,
          label: m.label,
          valueLabel: m.pace,
        })),
        { invert: true }, // faster (lower sec) = higher on chart
      ),
    [paceMonths],
  );

  const longestChart = useMemo(
    () =>
      buildLine(
        longest.map((p) => p.km),
        longest.map((p) => ({
          key: p.date,
          label: p.label,
          valueLabel: `${p.km}`,
        })),
      ),
    [longest],
  );

  const weekBars = useMemo(() => {
    if (weeks.length === 0) return null;
    const max = Math.max(...weeks.map((w) => w.days), 1);
    return weeks.map((w) => ({
      key: w.key,
      label: w.label,
      value: w.days,
      max,
      valueLabel: String(w.days),
    }));
  }, [weeks]);

  const bestPace = paceMonths.reduce((a, b) => (a.paceSec <= b.paceSec ? a : b));
  const peakLong = longest[longest.length - 1];
  const avgDays =
    weeks.length > 0
      ? (weeks.reduce((s, w) => s + w.days, 0) / weeks.length).toFixed(1)
      : null;

  return (
    <section id="charts" className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="03">More of the proof</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
        >
          Pace, longest run, and weekly consistency — the same story, three angles.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 grid gap-5 lg:grid-cols-3"
        >
          <ChartCard
            title="Pace trend"
            subtitle={`Monthly median (≥5 km). Best month ${bestPace.pace}/km · ${bestPace.label}.`}
          >
            <LineChart
              chart={paceChart}
              ariaLabel="Monthly median pace chart"
              invertStroke
            />
          </ChartCard>

          <ChartCard
            title="Longest run"
            subtitle={
              peakLong
                ? `Distance PRs from ${longest[0]?.km ?? "—"} km → ${peakLong.km} km.`
                : "How far the long run has stretched."
            }
          >
            <LineChart chart={longestChart} ariaLabel="Longest run progression chart" />
          </ChartCard>

          <ChartCard
            title="Weekly consistency"
            subtitle={
              avgDays
                ? `Last ${weeks.length} weeks · avg ${avgDays} days out per week.`
                : "Days run each week — showing up, not heroics."
            }
          >
            {weekBars ? (
              <BarChart bars={weekBars} />
            ) : (
              <p className="py-10 text-center font-mono text-xs text-muted">
                Sync Strava to unlock weekly bars
              </p>
            )}
          </ChartCard>
        </motion.div>

        {peakLong && (
          <motion.p
            variants={fadeUp}
            className="mt-6 font-mono text-xs text-muted"
          >
            Latest distance PR · {peakLong.label} · {peakLong.name} ·{" "}
            <span className="text-accent">{peakLong.km} km</span>
            {paceMonths.length > 0 && (
              <>
                {" "}
                · Fastest month median ·{" "}
                <span className="text-accent">{formatPace(bestPace.paceSec)}/km</span>
              </>
            )}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
