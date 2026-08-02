"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { timeline, type TimelineEntry } from "@/lib/running";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

const kindLabel: Record<TimelineEntry["kind"], string> = {
  start: "Start",
  milestone: "Milestone",
  race: "Race",
  present: "Now",
};

export default function Timeline() {
  const olRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: olRef,
    offset: ["start 65%", "end 55%"],
  });

  return (
    <section id="journey" className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="01">The journey</SectionHeading>
      </motion.div>
      <motion.ol
        ref={olRef}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="relative mt-10 space-y-10 pl-8 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-border"
      >
        {/* Accent trail that fills as you scroll through the journey. */}
        <motion.span
          aria-hidden
          style={{ scaleY: scrollYProgress }}
          className="absolute left-0 top-1 bottom-1 w-px origin-top bg-gradient-to-b from-accent to-accent-2"
        />
        {timeline.map((entry, index) => {
          const isPresent = entry.kind === "present";
          return (
            <motion.li key={entry.title} variants={fadeUp} className="relative">
              <span className="absolute -left-[2.29rem] top-1.5 flex h-2.5 w-2.5">
                {(index === 0 || isPresent) && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                )}
                <span
                  className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                    entry.kind === "milestone" ? "bg-accent/60" : "bg-accent"
                  }`}
                />
              </span>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
                    {kindLabel[entry.kind]}
                  </span>
                </div>
                <p className="font-mono text-sm text-muted">{entry.date}</p>
              </div>
              {entry.stat && (
                <p className="text-gradient mt-1 font-mono text-sm font-semibold">{entry.stat}</p>
              )}
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">{entry.detail}</p>
            </motion.li>
          );
        })}
      </motion.ol>
    </section>
  );
}
