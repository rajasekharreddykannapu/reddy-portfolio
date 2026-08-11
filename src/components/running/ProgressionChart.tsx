"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { progressionFallback, type ProgressionMonth } from "@/lib/running";
import { hasRunData, monthlyDistanceKm } from "@/lib/runs";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

function buildChart(months: ProgressionMonth[]) {
  const w = 640;
  const h = 220;
  const padX = 28;
  const padY = 28;
  const maxKm = Math.max(...months.map((m) => m.km), 1);
  const n = months.length;
  const step = n > 1 ? (w - padX * 2) / (n - 1) : 0;

  const points = months.map((m, i) => {
    const x = padX + i * step;
    const y = h - padY - (m.km / maxKm) * (h - padY * 2);
    return { x, y, ...m };
  });

  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${points[points.length - 1].x.toFixed(1)} ${h - padY} L${points[0].x.toFixed(1)} ${h - padY} Z`;

  return { viewBox: `0 0 ${w} ${h}`, line, area, points, maxKm, w, h, padY };
}

export default function ProgressionChart() {
  const months = useMemo<ProgressionMonth[]>(() => {
    if (!hasRunData) return progressionFallback;
    const live = monthlyDistanceKm();
    return live.length > 0
      ? live.map((m) => ({
          key: m.key,
          label: m.label,
          km: m.km,
          longestKm: m.longestKm,
        }))
      : progressionFallback;
  }, []);

  const chart = useMemo(() => buildChart(months), [months]);
  const peak = months.reduce((a, b) => (a.km >= b.km ? a : b));
  const total = months.reduce((s, m) => s + m.km, 0);

  return (
    <section id="arc" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="02">The distance arc</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
        >
          Month by month, the kilometres stack. Proof that showing up compounds.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
            <p className="font-mono text-sm text-muted">
              <span className="text-gradient text-2xl font-semibold">{total}</span>
              <span className="ml-2">km across {months.length} months</span>
            </p>
            <p className="font-mono text-xs text-muted">
              Peak · {peak.label} · {peak.km} km
            </p>
          </div>

          <div className="card relative overflow-hidden px-2 pt-6 pb-2 sm:px-4">
            <svg
              viewBox={chart.viewBox}
              className="h-48 w-full sm:h-56"
              preserveAspectRatio="none"
              role="img"
              aria-label="Monthly running distance chart"
            >
              {/* grid */}
              {[0.25, 0.5, 0.75, 1].map((t) => {
                const y = chart.h - chart.padY - t * (chart.h - chart.padY * 2);
                return (
                  <line
                    key={t}
                    x1="28"
                    x2={chart.w - 28}
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

            <div className="mt-1 grid grid-cols-4 gap-1 px-1 pb-3 sm:grid-cols-8">
              {months.map((m) => (
                <div key={m.key} className="text-center">
                  <p className="font-mono text-[0.65rem] text-muted">{m.label}</p>
                  <p className="mt-0.5 font-mono text-xs font-semibold tabular-nums text-foreground">
                    {m.km}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
