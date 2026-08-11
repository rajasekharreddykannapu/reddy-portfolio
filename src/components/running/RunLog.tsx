"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { hasRunData, runsOnly, groupByMonth } from "@/lib/runs";
import { runningProfile } from "@/lib/running";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";
import RunCard from "./RunCard";

const PREVIEW_COUNT = 9;

export default function RunLog() {
  const [open, setOpen] = useState(false);
  const months = hasRunData ? groupByMonth(runsOnly) : [];
  const latest = [...runsOnly].sort((a, b) => (a.date < b.date ? 1 : -1));
  const preview = latest.slice(0, PREVIEW_COUNT);
  const hidden = Math.max(0, latest.length - PREVIEW_COUNT);

  return (
    <section id="log" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="07">Every run</SectionHeading>
        <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-muted">
          {hasRunData ? (
            <>
              Latest efforts from Strava. Open <span className="text-foreground">Details</span> for
              elevation, heart rate and the GPS track.
            </>
          ) : (
            <>The full Strava archive lives here once run data is synced.</>
          )}
        </motion.p>
      </motion.div>

      {!hasRunData ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border px-6 py-14 text-center">
          <p className="font-mono text-sm text-muted">Archive awaiting Strava sync</p>
          <a
            href={runningProfile.stravaUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />
            View activities on Strava
          </a>
        </div>
      ) : (
        <div className="mt-10">
          {!open ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {preview.map((run) => (
                  <RunCard key={run.id} run={run} />
                ))}
              </div>
              {hidden > 0 && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    Show all {latest.length} runs
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-12">
              {months.map((month) => (
                <div key={month.key}>
                  <div className="sticky top-14 z-20 -mx-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-border bg-background/75 px-6 py-2.5 backdrop-blur-md">
                    <h3 className="text-lg font-semibold text-foreground">{month.label}</h3>
                    <p className="font-mono text-sm text-muted">
                      <span className="text-accent">{month.count}</span>{" "}
                      {month.count === 1 ? "run" : "runs"} · {month.distanceKm.toFixed(0)} km ·{" "}
                      {month.elevation} m ↑
                    </p>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {month.runs
                      .slice()
                      .sort((a, b) => (a.date < b.date ? 1 : -1))
                      .map((run) => (
                        <RunCard key={run.id} run={run} />
                      ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  Show latest only
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
