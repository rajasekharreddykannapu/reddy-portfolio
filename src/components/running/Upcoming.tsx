"use client";

import { motion } from "framer-motion";
import { upcoming, goals, type UpcomingEvent } from "@/lib/running";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

const chapterLabel: Record<UpcomingEvent["chapter"], string> = {
  next: "Next up",
  build: "Sharpening",
  peak: "The peak",
  close: "Season close",
};

function EventLink({ event }: { event: UpcomingEvent }) {
  if (!event.url) return null;
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noreferrer"
      className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-accent"
    >
      Event page
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
        <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export default function Upcoming() {
  const peak = upcoming.find((e) => e.chapter === "peak");
  const next = upcoming.filter((e) => e.chapter === "next");
  const build = upcoming.filter((e) => e.chapter === "build");
  const close = upcoming.filter((e) => e.chapter === "close");

  return (
    <section id="next" className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="05">Path to the marathon</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-2xl text-lg leading-relaxed text-muted"
        >
          The season climbs toward one start line — then keeps going.
        </motion.p>

        {/* Vertical path */}
        <div className="relative mt-12 space-y-0 pl-6 before:absolute before:left-[0.4rem] before:top-2 before:bottom-2 before:w-px before:bg-border sm:pl-8">
          {/* Next */}
          {next.map((event) => (
            <motion.div key={event.name} variants={fadeUp} className="relative pb-10">
              <span className="absolute -left-[1.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[1.85rem]" />
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                {chapterLabel.next}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{event.name}</h3>
              <p className="mt-1 font-mono text-sm text-muted">
                {event.date}
                {event.location ? ` · ${event.location}` : ""} · {event.distance}
              </p>
              <EventLink event={event} />
            </motion.div>
          ))}

          {/* Build */}
          <motion.div variants={fadeUp} className="relative pb-10">
            <span className="absolute -left-[1.35rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent/50 sm:-left-[1.85rem]" />
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
              {chapterLabel.build}
            </p>
            <ul className="mt-4 space-y-5">
              {build.map((event) => (
                <li key={event.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-foreground">{event.name}</h4>
                    {event.goalTime && (
                      <span className="font-mono text-xs font-semibold text-accent">
                        Goal · {event.goalTime}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-mono text-sm text-muted">
                    {event.date}
                    {event.location ? ` · ${event.location}` : ""} · {event.distance}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Peak — first full marathon */}
          {peak && (
            <motion.div
              variants={fadeUp}
              className="relative mb-4 overflow-hidden rounded-2xl border border-accent/40 bg-accent/[0.06] p-6 sm:p-8"
            >
              <span className="absolute -left-[1.35rem] top-8 h-3 w-3 rounded-full bg-accent ring-4 ring-accent/20 sm:-left-[1.9rem]" />
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-accent">
                {chapterLabel.peak}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {peak.name}
              </h3>
              <p className="mt-2 font-mono text-sm text-muted">
                {peak.date}
                {peak.location ? ` · ${peak.location}` : ""} · {peak.distance}
              </p>
              {peak.note && (
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">{peak.note}</p>
              )}
              {peak.prep && peak.prep.length > 0 && (
                <ul className="mt-5 space-y-2 border-t border-border/80 pt-5">
                  {peak.prep.map((step) => (
                    <li key={step} className="flex gap-2 text-sm text-muted">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                      >
                        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="leading-snug">{step}</span>
                    </li>
                  ))}
                </ul>
              )}
              <EventLink event={peak} />
            </motion.div>
          )}

          {/* Close */}
          <motion.div variants={fadeUp} className="relative pt-6">
            <span className="absolute -left-[1.35rem] top-7 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background sm:-left-[1.85rem]" />
            <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
              {chapterLabel.close}
            </p>
            <ul className="mt-4 space-y-4">
              {close.map((event) => (
                <li key={event.name} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{event.name}</h4>
                    <p className="font-mono text-sm text-muted">
                      {event.date}
                      {event.location ? ` · ${event.location}` : ""} · {event.distance}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Standing targets — quiet row */}
        <motion.div variants={fadeUp} className="mt-16 border-t border-border pt-10">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
            Standing targets
          </h3>
          <div className="mt-5 grid gap-6 sm:grid-cols-3">
            {goals.map((goal) => (
              <div key={goal.title}>
                <h4 className="text-sm font-semibold text-foreground">{goal.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{goal.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
