"use client";

import { motion } from "framer-motion";
import { originBeats } from "@/lib/running";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

export default function Origin() {
  return (
    <section id="origin" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="01">Day zero</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-xl text-[0.975rem] leading-7 text-muted"
        >
          The honest starting line — a body that couldn&apos;t finish a park loop,
          and a simple rule: show up.
        </motion.p>

        <ol className="relative mt-10 space-y-0 border-l border-border pl-6 sm:pl-8">
          {originBeats.map((beat) => (
            <motion.li
              key={beat.title}
              variants={fadeUp}
              className="relative grid gap-2 py-7 first:pt-1 last:pb-0 sm:grid-cols-[6.5rem_1fr] sm:gap-10"
            >
              <div className="flex items-baseline gap-3 sm:flex-col sm:gap-1">
                <span className="kicker">{beat.date}</span>
                {beat.stat && (
                  <span className="metric text-sm text-accent">{beat.stat}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="absolute -left-[1.45rem] top-9 h-2 w-2 rounded-full bg-accent ring-[3px] ring-background sm:-left-[2.05rem]"
                  />
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">{beat.title}</h3>
                </div>
                <p className="mt-2 max-w-xl text-[0.95rem] leading-7 text-muted">{beat.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
