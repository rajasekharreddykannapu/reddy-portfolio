"use client";

import { motion } from "framer-motion";
import { engineBeats, featuredRunHighlights } from "@/lib/running";
import { findRunById } from "@/lib/runs";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";
import RouteMap from "./RouteMap";

export default function TrainingEngine() {
  return (
    <section id="engine" className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="04">The training engine</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
        >
          Easy miles, speed work, and a longest run that proved the base was real.
        </motion.p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <motion.ol variants={fadeUp} className="space-y-8">
            {engineBeats.map((beat) => (
              <li key={beat.title}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{beat.title}</h3>
                  {beat.stat && (
                    <span className="text-gradient font-mono text-sm font-semibold">
                      {beat.stat}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-xs text-muted">{beat.date}</p>
                <p className="mt-2 leading-relaxed text-muted">{beat.detail}</p>
              </li>
            ))}
          </motion.ol>

          <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted lg:hidden">
              Featured efforts
            </p>
            {featuredRunHighlights.map((run) => {
              const live = run.runId ? findRunById(run.runId) : undefined;
              const map = live?.map ?? null;
              return (
                <div
                  key={run.title}
                  className="flex overflow-hidden rounded-2xl border border-border bg-surface/40 transition-colors hover:border-accent/40"
                >
                  <div className="relative w-[38%] shrink-0 bg-surface-2 sm:w-36">
                    <RouteMap
                      map={map}
                      className="h-full min-h-[5.5rem] w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-semibold text-foreground">{run.title}</h4>
                      <span className="shrink-0 font-mono text-[0.65rem] text-muted">
                        {run.date.replace(/ 2026/, "")}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-sm text-accent">{run.note}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {run.distance}
                      {run.pace ? ` · ${run.pace}/km` : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
