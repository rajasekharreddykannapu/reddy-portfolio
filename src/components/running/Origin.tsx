"use client";

import { motion } from "framer-motion";
import { originBeats } from "@/lib/running";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

export default function Origin() {
  return (
    <section id="origin" className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="01">Day zero</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
        >
          The honest starting line — a body that couldn&apos;t finish a park loop,
          and a simple rule: show up.
        </motion.p>

        <ol className="relative mt-12 space-y-0 pl-0 sm:pl-4">
          {originBeats.map((beat, i) => (
            <motion.li
              key={beat.title}
              variants={fadeUp}
              className="relative grid gap-4 border-t border-border py-10 sm:grid-cols-[7rem_1fr] sm:gap-10"
            >
              <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1">
                <span className="font-mono text-xs text-muted">{beat.date}</span>
                {beat.stat && (
                  <span className="text-gradient font-mono text-sm font-semibold">
                    {beat.stat}
                  </span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/40 font-mono text-[0.65rem] text-accent"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">{beat.title}</h3>
                </div>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{beat.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
