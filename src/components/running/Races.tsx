"use client";

import { motion } from "framer-motion";
import { featuredRace, supportingRaces } from "@/lib/running";
import { findRunById } from "@/lib/runs";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";
import RouteMap from "./RouteMap";

export default function Races() {
  const route = featuredRace.runId ? findRunById(featuredRace.runId)?.map ?? null : null;

  return (
    <section id="races" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="04">Breakthrough</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-xl text-[0.975rem] leading-7 text-muted"
        >
          One race that rewrote what felt possible — and the steps that led there.
        </motion.p>

        {/* Featured moment */}
        <motion.article
          variants={fadeUp}
          className="card relative mt-10 overflow-hidden px-6 py-10 sm:px-8 sm:py-14"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="kicker text-accent">
                Featured · {featuredRace.date}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                {featuredRace.name}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {featuredRace.distance}
                {featuredRace.note ? ` · ${featuredRace.note}` : ""}
              </p>

              <p
                className="metric mt-8 text-5xl text-foreground sm:text-6xl"
                aria-label={`Finish time ${featuredRace.time}`}
              >
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="inline-block"
                >
                  {featuredRace.time}
                </motion.span>
              </p>

              {featuredRace.story && (
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                  {featuredRace.story}
                </p>
              )}
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0b0e14]">
              {route ? (
                <RouteMap map={route} tone="dark" className="h-full w-full p-6" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <svg
                    viewBox="0 0 200 120"
                    className="w-full max-w-[220px] opacity-80"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      className="route-line"
                      pathLength={1}
                      d="M10 90 C40 70 50 40 80 35 C110 30 120 70 150 55 C170 45 180 30 190 25"
                      stroke="var(--accent)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="font-mono text-xs text-muted">Half marathon · 21.1 km</p>
                </div>
              )}
            </div>
          </div>
        </motion.article>

        {/* Supporting results */}
        <motion.div variants={fadeUp} className="mt-10">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
            The path to the half
          </h4>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {supportingRaces.map((race) => (
              <li
                key={`${race.date}-${race.name}`}
                className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-4 transition-colors hover:bg-surface-2/60 sm:grid-cols-[7rem_1fr_5rem_auto] sm:px-1"
              >
                <p className="order-1 font-mono text-xs text-muted sm:order-none">
                  {race.date}
                </p>
                <div className="order-3 col-span-2 sm:order-none sm:col-span-1">
                  <p className="font-semibold text-foreground">{race.name}</p>
                  {race.note && <p className="text-xs text-accent">{race.note}</p>}
                  {race.story && (
                    <p className="mt-1 max-w-md text-xs leading-relaxed text-muted">
                      {race.story}
                    </p>
                  )}
                </div>
                <p className="order-2 text-right font-mono text-sm text-muted sm:order-none sm:text-left">
                  {race.distance}
                </p>
                <p className="order-4 text-right font-mono text-lg font-semibold tabular-nums text-foreground sm:order-none">
                  {race.time}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
