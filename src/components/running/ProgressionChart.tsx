"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { progressionFallback, type ProgressionMonth } from "@/lib/running";
import { hasRunData, monthlyDistanceKm } from "@/lib/runs";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

/**
 * Monthly distance as flat column bars on a 2px baseline — no curves, no
 * gradients. The peak month carries the accent; the rest step up the neutral
 * ramp so the shape reads without colour.
 */
export default function ProgressionChart() {
  const months = useMemo<ProgressionMonth[]>(() => {
    if (!hasRunData) return progressionFallback;
    const live = monthlyDistanceKm();
    return live.length > 0
      ? live.map((m) => ({ key: m.key, label: m.label, km: m.km, longestKm: m.longestKm }))
      : progressionFallback;
  }, []);

  const peak = months.reduce((a, b) => (a.km >= b.km ? a : b));
  const total = months.reduce((s, m) => s + m.km, 0);
  const max = Math.max(...months.map((m) => m.km), 1);

  // Bars below the peak step through the ramp by relative size.
  const fill = (km: number) => {
    if (km === peak.km) return "var(--accent)";
    const t = km / max;
    if (t > 0.85) return "var(--neutral-700)";
    if (t > 0.6) return "var(--neutral-500)";
    return "var(--neutral-400)";
  };

  return (
    <motion.section
      id="arc"
      className="mx-auto max-w-[1240px] px-10 max-sm:px-5"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div className="grid grid-cols-[220px_1fr] gap-10 border-b-2 border-border py-18 max-[900px]:grid-cols-1">
        <div>
          <SectionHeading
            index="02"
            intro="April fell to 30 km. August finished at 203. The distance between those two numbers is the story."
          >
            The distance arc
          </SectionHeading>
          <div className="mt-7 border-t-2 border-border pt-4">
            <p className="metric text-[2.875rem] leading-none">{total}</p>
            <p className="mt-1.5 text-[13px] text-neutral-700">
              km across {months.length} months
            </p>
            <p className="mt-2.5 text-xs font-bold uppercase tracking-[0.12em] text-accent">
              Peak · {peak.label} · {peak.km} km
            </p>
          </div>
        </div>

        <motion.div variants={fadeUp}>
          <div
            role="img"
            aria-label={`Monthly running distance, peaking at ${peak.km} km in ${peak.label}`}
            className="grid h-75 items-end gap-0.5 border-b-2 border-foreground"
            style={{ gridTemplateColumns: `repeat(${months.length}, minmax(0, 1fr))` }}
          >
            {months.map((m) => (
              <div key={m.key} className="flex h-full flex-col justify-end px-1">
                <span
                  className="metric pb-1.5 text-[15px]"
                  style={{ color: m.km === peak.km ? "var(--accent)" : undefined }}
                >
                  {m.km}
                </span>
                <div
                  className="bar"
                  style={{
                    height: `${Math.max(2, (m.km / max) * 100)}%`,
                    background: fill(m.km),
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className="mt-2.5 grid gap-0.5"
            style={{ gridTemplateColumns: `repeat(${months.length}, minmax(0, 1fr))` }}
          >
            {months.map((m) => (
              <p key={m.key} className="kicker px-1 text-[11px]">
                {m.label}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
