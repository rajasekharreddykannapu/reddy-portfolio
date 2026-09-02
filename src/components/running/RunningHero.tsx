"use client";

import { motion } from "framer-motion";
import { runningProfile, runStats, records, heroRouteSilhouette } from "@/lib/running";
import {
  findRunById,
  longestRun,
  hasRunData,
  headlineStats,
  withLiveLongest,
  withLiveHalfMarathon,
} from "@/lib/runs";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Counter from "@/components/Counter";
import RouteMap from "./RouteMap";

function resolveHeroRun() {
  const fromId = findRunById(runningProfile.heroRunId);
  if (fromId?.map) return fromId;
  const longest = longestRun();
  if (longest?.map) return longest;
  return null;
}

export default function RunningHero() {
  const heroRun = resolveHeroRun();
  const map = heroRun?.map ?? heroRouteSilhouette;
  const stats = hasRunData ? headlineStats() : runStats;
  const prs = hasRunData ? withLiveHalfMarathon(withLiveLongest(records)) : records;

  return (
    <section id="top" className="mx-auto max-w-[1240px] px-10 max-sm:px-5">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="grid grid-cols-[1.4fr_1fr] items-end gap-12 border-b-2 border-border pt-20 pb-12 max-[900px]:grid-cols-1">
          <div>
            <motion.p variants={fadeUp} className="kicker flex items-center gap-2.5">
              <span aria-hidden className="inline-block h-0.5 w-7 bg-accent" />
              {runningProfile.kicker}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-6.5 max-w-[20ch] text-[clamp(2.5rem,6.4vw,5.25rem)] leading-[0.94]"
            >
              {runningProfile.headline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[54ch] text-[1.1875rem] leading-[1.55] text-neutral-800"
            >
              {runningProfile.intro}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a href="#origin" className="btn-primary">
                Read the journey
              </a>
              <a
                href={runningProfile.stravaUrl}
                target="_blank"
                rel="me noreferrer"
                className="btn-ghost"
              >
                Strava
              </a>
            </motion.div>
          </div>

          {/* Featured route — flat, 2px edge, no glow panel. */}
          <motion.figure variants={fadeUp}>
            <div className="border-2 border-border">
              <RouteMap map={map} tone="light" className="aspect-[4/3] h-auto w-full p-7" />
            </div>
            <figcaption className="kicker mt-3 flex justify-between gap-4">
              <span>Featured route · {heroRun?.name ?? "Long run"}</span>
              <span className="text-accent">
                {heroRun ? `${(heroRun.distance / 1000).toFixed(1)} km` : runningProfile.since}
              </span>
            </figcaption>
          </motion.figure>
        </div>

        {/* Stat row — 2px vertical rules, last figure in the accent. */}
        <div id="stats" aria-label="By the numbers">
          <dl className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-b-2 border-border">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-7.5 ${i === 0 ? "pr-7" : "px-7"} ${
                  i === stats.length - 1 ? "" : "border-r-2 border-border"
                }`}
              >
                <dd>
                  <Counter
                    value={stat.value}
                    className={`metric block text-[clamp(2.125rem,4.2vw,3.375rem)] leading-none ${
                      i === stats.length - 1 ? "text-accent" : "text-foreground"
                    }`}
                  />
                </dd>
                <dt className="kicker mt-2">{stat.label}</dt>
                {stat.hint && (
                  <p className="mt-1 text-[13px] text-neutral-600">{stat.hint}</p>
                )}
              </div>
            ))}
          </dl>

          {/* Personal records — gap-as-divider grid. */}
          <ul className="rule-grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] border-b-2 border-border">
            {prs.map((rec) => (
              <li key={rec.label} className="p-6">
                <p className="metric text-[2rem] leading-none text-foreground">{rec.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-accent">
                  {rec.label}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-neutral-700">{rec.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
