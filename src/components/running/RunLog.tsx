"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { hasRunData, runsOnly, groupByMonth } from "@/lib/runs";
import { runningProfile } from "@/lib/running";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";
import RunCard from "./RunCard";

const PREVIEW_COUNT = 9;

/**
 * The archive reads as a ruled ledger: RunCard renders one row per run,
 * so the log is a stack of 2px rules rather than a card grid.
 */
export default function RunLog() {
  const [open, setOpen] = useState(false);
  const months = hasRunData ? groupByMonth(runsOnly) : [];
  const latest = [...runsOnly].sort((a, b) => (a.date < b.date ? 1 : -1));
  const preview = latest.slice(0, PREVIEW_COUNT);
  const hidden = Math.max(0, latest.length - PREVIEW_COUNT);

  return (
    <Section
      id="log"
      index="07"
      title="Every run"
      intro={
        hasRunData
          ? "Latest efforts from Strava. Open Details for elevation and the GPS track."
          : "The full Strava archive lives here once run data is synced."
      }
    >
      {!hasRunData ? (
        <div className="border-2 border-border px-6 py-14">
          <p className="kicker">Archive awaiting Strava sync</p>
          <a
            href={runningProfile.stravaUrl}
            target="_blank"
            rel="me noreferrer"
            className="btn-ghost mt-4"
          >
            View activities on Strava
          </a>
        </div>
      ) : !open ? (
        <motion.div variants={fadeUp}>
          <div className="border-t-2 border-foreground">
            {preview.map((run) => (
              <RunCard key={run.id} run={run} />
            ))}
          </div>
          {hidden > 0 && (
            <button type="button" onClick={() => setOpen(true)} className="btn-ghost mt-6">
              Show all {latest.length} runs
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div variants={fadeUp} className="grid gap-10">
          {months.map((month) => (
            <div key={month.key}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-foreground pb-2.5">
                <h3 className="text-[1.1875rem]">{month.label}</h3>
                <p className="kicker">
                  <span className="text-accent">{month.count}</span>{" "}
                  {month.count === 1 ? "run" : "runs"} · {month.distanceKm.toFixed(0)} km ·{" "}
                  {month.elevation} m ↑
                </p>
              </div>
              <div>
                {month.runs
                  .slice()
                  .sort((a, b) => (a.date < b.date ? 1 : -1))
                  .map((run) => (
                    <RunCard key={run.id} run={run} />
                  ))}
              </div>
            </div>
          ))}
          <button type="button" onClick={() => setOpen(false)} className="btn-ghost">
            Show latest only
          </button>
        </motion.div>
      )}
    </Section>
  );
}
