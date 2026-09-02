"use client";

import { motion } from "framer-motion";
import { dailyRitual } from "@/lib/learning";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

export default function DailyRitual() {
  return (
    <Section
      id="daily"
      index="01"
      title="Daily operating system"
      intro="Not a firehose. Three slots that fit around shipping and a 9-person team."
    >
      {/* The 2px gap is the divider — cells sit on the page ground. */}
      <motion.div
        variants={fadeUp}
        className="rule-grid grid-cols-1 sm:grid-cols-3"
      >
        {dailyRitual.map((slot) => (
          <article key={slot.title} className="p-5.5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="kicker text-accent">{slot.when}</p>
              <p className="font-mono text-xs text-muted">{slot.minutes}</p>
            </div>
            <h3 className="mt-3.5 text-[1.1875rem]">{slot.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-800">{slot.detail}</p>
          </article>
        ))}
      </motion.div>
    </Section>
  );
}
