"use client";

import { motion } from "framer-motion";
import { runningProfile, runStats, records } from "@/lib/running";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Counter from "@/components/Counter";

export default function RunningHero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl overflow-hidden px-6 pt-16 pb-20 sm:pt-24 sm:pb-24"
    >
      <div aria-hidden className="hero-glow" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10"
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
          className="text-sheen mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {runningProfile.headline}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {runningProfile.intro}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-7 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted">
            {runningProfile.since}
          </span>
          <a
            href={runningProfile.stravaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />
            Powered by Strava
          </a>
        </motion.div>

        <motion.dl
          id="stats"
          variants={fadeUp}
          className="card gradient-border mt-12 grid grid-cols-2 divide-border overflow-hidden sm:grid-cols-4 sm:divide-x"
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
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{stat.hint}</span>
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
            <li key={rec.label} className="card card-glow px-4 py-4 transition-transform duration-300 hover:-translate-y-1">
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
  );
}
