"use client";

import { motion } from "framer-motion";
import { education, experience } from "@/lib/resume";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20">
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        className="font-mono text-sm uppercase tracking-widest text-accent"
      >
        Experience
      </motion.h2>
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="mt-10 space-y-12 border-l border-border pl-8"
      >
        {experience.map((entry, index) => (
          <motion.li
            key={`${entry.company}-${entry.role}-${entry.start}`}
            variants={fadeUp}
            className="relative"
          >
            <span className="absolute -left-[2.29rem] top-1.5 flex h-2.5 w-2.5">
              {index === 0 && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              )}
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {entry.role} <span className="font-normal text-muted">· {entry.company}</span>
              </h3>
              <p className="font-mono text-sm text-muted">
                {entry.start} – {entry.end}
              </p>
            </div>
            <ul className="mt-3 space-y-2">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5 text-muted">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
        <motion.li variants={fadeUp} className="relative">
          <span className="absolute -left-[2.29rem] top-1.5 h-2.5 w-2.5 rounded-full bg-border" />
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {education.degree} <span className="font-normal text-muted">· {education.school}</span>
            </h3>
            <p className="font-mono text-sm text-muted">{education.year}</p>
          </div>
        </motion.li>
      </motion.ol>
    </section>
  );
}
