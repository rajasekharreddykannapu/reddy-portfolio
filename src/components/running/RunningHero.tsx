"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  runningProfile,
  runStats,
  records,
  heroRouteSilhouette,
} from "@/lib/running";
import {
  findRunById,
  longestRun,
  hasRunData,
  headlineStats,
  withLiveLongest,
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
  const reduce = useReducedMotion();
  const heroRun = resolveHeroRun();
  const map = heroRun?.map ?? heroRouteSilhouette;
  const stats = hasRunData ? headlineStats() : runStats;
  const prs = hasRunData ? withLiveLongest(records) : records;

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow opacity-30" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 mx-auto grid max-w-5xl items-center gap-8 px-6 pt-12 pb-8 sm:pt-16 sm:pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16"
      >
        <div>
          <motion.p variants={fadeUp} className="kicker text-accent">
            {runningProfile.kicker}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-sheen mt-3 max-w-xl text-[2.15rem] font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]"
          >
            {runningProfile.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-[0.975rem] leading-7 text-muted"
          >
            {runningProfile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-2.5">
            <motion.a
              whileHover={reduce ? undefined : { y: -1 }}
              whileTap={reduce ? undefined : { y: 0 }}
              href="#origin"
              className="btn-primary"
            >
              Read the journey
            </motion.a>
            <a
              href={runningProfile.stravaUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost inline-flex items-center gap-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />
              Strava
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp}>
          <div className="panel-dark relative overflow-hidden rounded-2xl">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 50% at 80% 0%, rgba(251,191,36,0.16), transparent 58%)",
              }}
            />
            <RouteMap map={map} tone="dark" className="aspect-[4/3] h-auto w-full p-7 sm:p-8" />
            <div className="flex items-end justify-between gap-3 border-t border-white/8 px-5 py-3.5">
              <div>
                <p className="kicker text-amber-200/55">Featured route</p>
                <p className="mt-1 text-sm font-medium text-amber-50">
                  {heroRun?.name ?? "Long run"}
                </p>
              </div>
              <p className="metric text-sm text-amber-200/85">
                {heroRun ? `${(heroRun.distance / 1000).toFixed(1)} km` : runningProfile.since}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div id="stats" className="mx-auto max-w-5xl px-6 pb-14" aria-label="By the numbers">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <dl className="grid grid-cols-2 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-5 py-5 ${i % 2 === 1 ? "border-l border-border" : ""} ${i > 1 ? "border-t border-border" : ""} sm:border-t-0 sm:border-l sm:first:border-l-0`}
              >
                <dt className="kicker">{stat.label}</dt>
                <dd className="mt-2">
                  <Counter value={stat.value} className="metric text-[1.65rem] text-foreground sm:text-[1.85rem]" />
                  {stat.hint && (
                    <span className="mt-1.5 block text-xs leading-snug text-muted">{stat.hint}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <ul className="grid grid-cols-2 border-t border-border sm:grid-cols-4">
            {prs.map((rec, i) => (
              <li
                key={rec.label}
                className={`px-5 py-4 ${i % 2 === 1 ? "border-l border-border" : ""} ${i > 1 ? "border-t border-border" : ""} sm:border-t-0 sm:border-l sm:first:border-l-0`}
              >
                <p className="metric text-lg text-foreground">{rec.value}</p>
                <p className="mt-1 text-xs font-medium text-accent">{rec.label}</p>
                <p className="mt-0.5 text-[0.7rem] leading-snug text-muted">{rec.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
