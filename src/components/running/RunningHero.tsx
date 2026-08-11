"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  runningProfile,
  runStats,
  records,
  heroRouteSilhouette,
} from "@/lib/running";
import { findRunById, longestRun } from "@/lib/runs";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Counter from "@/components/Counter";

function resolveHeroMap() {
  const fromId = findRunById(runningProfile.heroRunId);
  if (fromId?.map) return fromId.map;
  const longest = longestRun();
  if (longest?.map) return longest.map;
  return heroRouteSilhouette;
}

export default function RunningHero() {
  const reduce = useReducedMotion();
  const map = resolveHeroMap();

  return (
    <>
      <section id="top" className="relative min-h-[78vh] overflow-hidden">
        <div aria-hidden className="hero-glow" />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 sm:inset-y-0 sm:left-[28%] sm:right-[-8%]"
        >
          <svg
            viewBox={map.viewBox}
            className="hero-route-svg h-full w-full opacity-80"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d={map.path}
              stroke="var(--accent)"
              strokeWidth="12"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.14"
            />
            <motion.path
              d={map.path}
              stroke="var(--accent)"
              strokeWidth="2.8"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0.35 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20 sm:via-background/55 sm:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 mx-auto flex max-w-5xl flex-col justify-end px-6 pt-20 pb-16 sm:min-h-[78vh] sm:pt-28 sm:pb-24"
        >
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
            className="text-sheen mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl"
          >
            {runningProfile.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            {runningProfile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
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
            <span className="font-mono text-xs text-muted">{runningProfile.since}</span>
          </motion.div>
        </motion.div>
      </section>

      <section
        id="stats"
        className="mx-auto max-w-5xl px-6 pb-6 pt-2 sm:pb-8"
        aria-label="By the numbers"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.dl
            variants={fadeUp}
            className="card gradient-border grid grid-cols-2 divide-border overflow-hidden sm:grid-cols-4 sm:divide-x"
          >
            {runStats.map((stat) => (
              <div key={stat.label} className="px-5 py-6">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="text-gradient block text-2xl font-semibold tracking-tight sm:text-3xl">
                    <Counter value={stat.value} />
                  </span>
                  <span className="mt-1 block text-sm font-medium text-foreground">
                    {stat.label}
                  </span>
                  {stat.hint && (
                    <span className="mt-0.5 block text-xs leading-snug text-muted">
                      {stat.hint}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.ul
            variants={fadeUp}
            className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {records.map((rec) => (
              <li key={rec.label} className="card card-glow px-4 py-4">
                <p className="font-mono text-lg font-semibold tabular-nums text-foreground">
                  {rec.value}
                </p>
                <p className="mt-0.5 text-sm font-medium text-accent">{rec.label}</p>
                <p className="mt-0.5 text-xs leading-snug text-muted">{rec.note}</p>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>
    </>
  );
}
