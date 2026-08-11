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
  const w = opts.w ?? 640;
  const h = opts.h ?? 180;
  const padX = opts.padX ?? 20;
  const padY = opts.padY ?? 22;
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
  kicker,
  children,
  className = "",
}: {
  title: string;
  kicker: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`card overflow-hidden p-5 sm:p-6 ${className}`}>
      <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">{kicker}</p>
      <h3 className="mt-1.5 text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function LineChart({
  chart,
  ariaLabel,
}: {
  chart: ReturnType<typeof buildLine>;
  ariaLabel: string;
}) {
  return (
    <>
      <svg
        viewBox={chart.viewBox}
        className="h-44 w-full sm:h-52"
        preserveAspectRatio="none"
        role="img"
        aria-label={ariaLabel}
      >
        {[0.33, 0.66, 1].map((t) => {
          const y = chart.h - chart.padY - t * (chart.h - chart.padY * 2);
          return (
            <line
              key={t}
              x1="20"
              x2={chart.w - 20}
              y1={y}
              y2={y}
              stroke="var(--border)"
              strokeWidth="1"
            />
          );
        })}
        <path d={chart.area} fill="var(--accent)" opacity="0.12" />
        <path
          className="chart-line"
          pathLength={1}
          d={chart.line}
          stroke="var(--accent)"
          strokeWidth="2.5"
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
            r="4"
            fill="var(--accent)"
            stroke="var(--surface)"
            strokeWidth="2"
          />
        ))}
      </svg>
      <div
        className="mt-2 grid gap-1"
        style={{ gridTemplateColumns: `repeat(${chart.points.length}, minmax(0, 1fr))` }}
      >
        {chart.points.map((p) => (
          <div key={p.key} className="min-w-0 text-center">
            <p className="truncate font-mono text-[0.65rem] text-muted">{p.label}</p>
            <p className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-foreground">
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
    <div className="flex h-44 items-end gap-2 px-1 sm:h-52">
      {bars.map((b) => {
        const h = Math.max(10, (b.value / b.max) * 100);
        return (
          <div key={b.key} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
            <span className="font-mono text-[0.65rem] tabular-nums text-muted">{b.valueLabel}</span>
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent-2/80"
              style={{ height: `${h}%` }}
              title={`${b.label}: ${b.valueLabel} days`}
            />
            <span className="w-full truncate text-center font-mono text-[0.6rem] text-muted">
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
        { key: "2026-02", label: "Feb", paceSec: 404, pace: "6:44", count: 16 },
        { key: "2026-03", label: "Mar", paceSec: 391, pace: "6:31", count: 13 },
        { key: "2026-05", label: "May", paceSec: 397, pace: "6:37", count: 12 },
        { key: "2026-06", label: "Jun", paceSec: 399, pace: "6:39", count: 19 },
        { key: "2026-07", label: "Jul", paceSec: 409, pace: "6:49", count: 21 },
      ];
    }
    return monthlyMedianPace().map((m) => ({
      ...m,
      label: m.label.split(" ")[0],
    }));
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
    return longestRunProgression().map((p) => ({
      ...p,
      label: p.label.replace(/^\d+\s/, ""),
    }));
  }, []);

  const weeks = useMemo(() => {
    if (!hasRunData) return [];
    return weeklyConsistency(undefined, 10);
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
        { invert: true, w: 640, h: 180 },
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
        { w: 640, h: 180 },
      ),
    [longest],
  );

  const weekBars = useMemo(() => {
    if (weeks.length === 0) return null;
    const max = Math.max(...weeks.map((w) => w.days), 1);
    return weeks.map((w) => ({
      key: w.key,
      label: w.label.replace(/^W0?/, "W"),
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
    <section id="charts" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="03">How it compounds</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
        >
          Distance first — then pace, then the habit of showing up.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 grid gap-5 lg:grid-cols-5">
          <ChartCard
            className="lg:col-span-3"
            kicker={`Best month ${bestPace.pace}/km`}
            title="Median pace, month by month"
          >
            <LineChart chart={paceChart} ariaLabel="Monthly median pace chart" />
          </ChartCard>

          <ChartCard
            className="lg:col-span-2"
            kicker={avgDays ? `${avgDays} days / week` : "Days out"}
            title="Weekly consistency"
          >
            {weekBars ? (
              <BarChart bars={weekBars} />
            ) : (
              <p className="py-16 text-center font-mono text-xs text-muted">
                Sync Strava to unlock weekly bars
              </p>
            )}
          </ChartCard>

          <ChartCard
            className="lg:col-span-5"
            kicker={peakLong ? `${longest[0]?.km ?? "—"} → ${peakLong.km} km` : "Distance PRs"}
            title="Longest run, stretching out"
          >
            <LineChart chart={longestChart} ariaLabel="Longest run progression chart" />
            {peakLong && (
              <p className="mt-4 font-mono text-xs text-muted">
                Latest PR · {peakLong.name} ·{" "}
                <span className="text-accent">{peakLong.km} km</span>
                {paceMonths.length > 0 && (
                  <>
                    {" "}
                    · Fastest median ·{" "}
                    <span className="text-accent">{formatPace(bestPace.paceSec)}/km</span>
                  </>
                )}
              </p>
            )}
          </ChartCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
