"use client";

import { motion } from "framer-motion";
import { upcoming, goals, type UpcomingEvent } from "@/lib/running";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

const statusStyles: Record<UpcomingEvent["status"], string> = {
  registered: "border-accent text-accent",
  target: "border-border text-muted",
  planned: "border-border text-muted",
};

const statusLabel: Record<UpcomingEvent["status"], string> = {
  registered: "Registered",
  target: "Target",
  planned: "Planned",
};

export default function Upcoming() {
  return (
    <motion.section
      id="next"
      className="mx-auto max-w-5xl px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <SectionHeading index="05">What&apos;s next</SectionHeading>

      <div className="mt-10 space-y-14">
        {/* Upcoming events */}
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Upcoming events
            </h3>
            {upcoming.length > 0 && (
              <p className="font-mono text-sm text-muted">
                <span className="text-accent">{upcoming.length}</span> on the calendar
              </p>
            )}
          </div>
          {upcoming.length === 0 ? (
            <p className="mt-4 text-muted">
              No races on the calendar right now — watch this space.
            </p>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <motion.div
                  key={`${event.date}-${event.name}`}
                  variants={fadeUp}
                  className="card card-glow p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{event.name}</h4>
                    <p className="mt-0.5 font-mono text-sm text-muted">
                      {event.distance}
                      {event.location ? ` · ${event.location}` : ""}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider ${statusStyles[event.status]}`}
                  >
                    {statusLabel[event.status]}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm text-accent">{event.date}</span>
                  {event.goalTime && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-accent">
                      Goal · {event.goalTime}
                    </span>
                  )}
                </div>
                {event.note && <p className="mt-2 leading-relaxed text-muted">{event.note}</p>}
                {event.prep && event.prep.length > 0 && (
                  <div className="mt-3 border-t border-border pt-3">
                    <p className="text-[0.7rem] uppercase tracking-wider text-muted">Prep plan</p>
                    <ul className="mt-2 space-y-1.5">
                      {event.prep.map((step) => (
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
                  </div>
                )}
              </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Standing targets */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Standing targets
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {goals.map((goal) => (
              <motion.div
                key={goal.title}
                variants={fadeUp}
                className="card card-glow p-5"
              >
                <h4 className="text-base font-semibold text-foreground">{goal.title}</h4>
                <p className="mt-2 leading-relaxed text-muted">{goal.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
