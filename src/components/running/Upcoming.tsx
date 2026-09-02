"use client";

import { motion } from "framer-motion";
import { upcoming, goals, type UpcomingEvent } from "@/lib/running";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

const chapterLabel: Record<UpcomingEvent["chapter"], string> = {
  next: "Next up",
  build: "Sharpening",
  peak: "The peak",
  close: "Season close",
};

function EventLink({ event, onAccent = false }: { event: UpcomingEvent; onAccent?: boolean }) {
  if (!event.url) return null;
  if (onAccent) {
    return (
      <a
        href={event.url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block bg-white px-4.5 py-3 text-sm font-bold uppercase tracking-[0.06em] text-accent-700 transition-colors hover:bg-accent-200"
      >
        Event page
      </a>
    );
  }
  return (
    <a href={event.url} target="_blank" rel="noreferrer" className="btn-ghost mt-4">
      Event page
    </a>
  );
}

function EventMeta({ event }: { event: UpcomingEvent }) {
  return (
    <>
      {event.date}
      {event.location ? ` · ${event.location}` : ""} · {event.distance}
    </>
  );
}

export default function Upcoming() {
  const peak = upcoming.find((e) => e.chapter === "peak");
  const next = upcoming.filter((e) => e.chapter === "next");
  const build = upcoming.filter((e) => e.chapter === "build");
  const close = upcoming.filter((e) => e.chapter === "close");

  return (
    <Section
      id="next"
      index="06"
      title="Path to the marathon"
      intro="Two halves in October to sharpen, the first full marathon on 1 November, then two more start lines."
    >
      <div className="grid gap-9">
        {next.map((event) => (
          <motion.article
            key={event.name}
            variants={fadeUp}
            className="border-t-2 border-foreground pt-5.5"
          >
            <span className="tag tag-accent">{chapterLabel.next}</span>
            <h3 className="mt-3.5 text-[1.625rem]">{event.name}</h3>
            <p className="kicker mt-2">
              <EventMeta event={event} />
            </p>
            <EventLink event={event} />
          </motion.article>
        ))}

        {build.length > 0 && (
          <motion.div variants={fadeUp} className="border-t-2 border-border pt-5.5">
            <p className="kicker">{chapterLabel.build}</p>
            <ul className="mt-3 grid gap-5">
              {build.map((event) => (
                <li key={event.name}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h4 className="text-xl">{event.name}</h4>
                    {event.goalTime && (
                      <span className="tag tag-accent">Goal · {event.goalTime}</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-neutral-700">
                    <EventMeta event={event} />
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* The poster moment — the one place red runs as a field. */}
        {peak && (
          <motion.article variants={fadeUp} className="bg-accent p-8 text-accent-foreground">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-200">
              {chapterLabel.peak}
            </p>
            <h3 className="mt-3.5 text-[clamp(1.75rem,4vw,2.75rem)] leading-none">{peak.name}</h3>
            <p className="mt-3 text-[15px] font-semibold uppercase tracking-[0.06em] text-accent-200">
              <EventMeta event={peak} />
            </p>
            {peak.note && (
              <p className="mt-4.5 max-w-[48ch] text-lg leading-[1.5]">{peak.note}</p>
            )}
            {peak.prep && peak.prep.length > 0 && (
              <ul className="mt-5.5 grid gap-2.5 text-base leading-[1.5]">
                {peak.prep.map((step) => (
                  <li key={step} className="grid grid-cols-[18px_1fr] gap-2">
                    <span aria-hidden>—</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            )}
            <EventLink event={peak} onAccent />
          </motion.article>
        )}

        {close.length > 0 && (
          <motion.div variants={fadeUp} className="border-t-2 border-border pt-5.5">
            <p className="kicker">{chapterLabel.close}</p>
            <ul className="rule-grid mt-4 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
              {close.map((event) => (
                <li key={event.name} className="p-5">
                  <h4 className="text-[1.1875rem]">{event.name}</h4>
                  <p className="mt-1.5 text-sm text-neutral-700">
                    <EventMeta event={event} />
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <motion.div variants={fadeUp}>
          <h3 className="border-b-2 border-border pb-2.5 text-[1.1875rem]">Standing targets</h3>
          <div className="rule-grid mt-5 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
            {goals.map((goal) => (
              <article key={goal.title} className="p-5.5">
                <h4 className="text-lg">{goal.title}</h4>
                <p className="mt-2.5 text-[15px] leading-[1.5] text-neutral-800">{goal.detail}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
