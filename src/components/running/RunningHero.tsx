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
      <section
        id="top"
        className="relative overflow-hidden border-b border-border/60"
      >
        <div aria-hidden className="hero-glow" />

        {/* Full-bleed route plane — dominant visual, edge-anchored */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-full sm:w-[62%] lg:w-[58%]"
        >
          <svg
            viewBox={map.viewBox}
            className="hero-route-svg h-full w-full opacity-90"
            fill="none"
            preserveAspectRatio="xMaxYMid slice"
          >
            <path
              d={map.path}
              stroke="var(--accent)"
              strokeWidth="14"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.12"
            />
            <motion.path
              d={map.path}
              stroke="var(--accent)"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              initial={reduce ? false : { pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent sm:via-background/40" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28"
        >
          <motion.p
            variants={fadeUp}
            className="text-sheen text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            {runningProfile.brand}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-xl font-mono text-sm text-accent sm:text-base"
          >
            {runningProfile.name}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-8 max-w-xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {runningProfile.headline}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {runningProfile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
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
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 font-mono text-xs text-muted"
          >
            {runningProfile.since}
          </motion.p>
        </motion.div>
      </section>

      {/* Below-fold: by the numbers */}
      <section
        id="stats"
        className="mx-auto max-w-5xl px-6 py-14 sm:py-16"
        aria-label="By the numbers"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-widest text-muted"
          >
            By the numbers
          </motion.p>

          <motion.dl
            variants={fadeUp}
            className="card gradient-border mt-5 grid grid-cols-2 divide-border overflow-hidden sm:grid-cols-4 sm:divide-x"
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
              <li
                key={rec.label}
                className="border-b border-border px-1 py-3 sm:px-2"
              >
                <p className="font-mono text-lg font-semibold text-foreground tabular-nums">
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
