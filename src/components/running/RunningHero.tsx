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
      <div aria-hidden className="hero-glow opacity-40" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 px-6 pt-14 pb-10 sm:pt-20 sm:pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
      >
        <div>
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 font-mono text-sm text-accent"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {runningProfile.kicker}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-sheen mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]"
          >
            {runningProfile.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {runningProfile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              href="#origin"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-[0_8px_30px_-8px_var(--accent)]"
            >
              Read the journey
            </motion.a>
            <a
              href={runningProfile.stravaUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />
              Strava
            </a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="relative">
          <div className="relative overflow-hidden rounded-3xl bg-[#0b0e14] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.55)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(80% 60% at 70% 20%, rgba(251,191,36,0.18), transparent 60%)",
              }}
            />
            <RouteMap map={map} tone="dark" className="aspect-[5/4] h-auto w-full p-8 sm:p-10" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#0b0e14] via-[#0b0e14]/70 to-transparent px-5 pb-5 pt-16">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-amber-200/70">
                  Featured route
                </p>
                <p className="mt-1 text-sm font-medium text-amber-50">
                  {heroRun?.name ?? "Long run"}
                </p>
              </div>
              <p className="font-mono text-xs tabular-nums text-amber-200/80">
                {heroRun
                  ? `${(heroRun.distance / 1000).toFixed(1)} km`
                  : runningProfile.since}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div id="stats" className="mx-auto max-w-5xl px-6 pb-12" aria-label="By the numbers">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface px-4 py-5 sm:px-5">
              <dt className="text-xs font-medium text-muted">{stat.label}</dt>
              <dd className="mt-1">
                <Counter
                  value={stat.value}
                  className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                />
                {stat.hint && (
                  <span className="mt-1 block text-xs leading-snug text-muted">{stat.hint}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-3 flex gap-6 overflow-x-auto border-t border-border pt-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {prs.map((rec) => (
            <li key={rec.label} className="min-w-[9.5rem] shrink-0">
              <p className="font-mono text-base font-semibold tabular-nums text-foreground">
                {rec.value}
              </p>
              <p className="mt-0.5 text-xs font-medium text-accent">{rec.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
