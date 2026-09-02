"use client";

import { motion } from "framer-motion";
import { education, experience } from "@/lib/resume";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

export default function Experience() {
  return (
    <Section id="experience" index="02" title="Experience" rule={false}>
      <ol>
        {experience.map((entry) => (
          <motion.li
            key={`${entry.company}-${entry.role}-${entry.start}`}
            variants={fadeUp}
            className="rule-row border-t-2 border-border py-7 pr-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-[1.4375rem]">
                {entry.role} <span className="text-accent-700">· {entry.company}</span>
              </h3>
              <span className="tag tag-outline">
                {entry.start} – {entry.end}
              </span>
            </div>
            <ul className="mt-4.5 grid max-w-[78ch] gap-3 text-base leading-[1.55] text-neutral-800">
              {entry.bullets.map((bullet) => (
                <li key={bullet} className="grid grid-cols-[18px_1fr] gap-2">
                  <span aria-hidden className="text-accent">
                    —
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
        <motion.li
          variants={fadeUp}
          className="rule-row border-y-2 border-border py-7 pr-6"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-[1.4375rem]">
              {education.degree} <span className="text-accent-700">· {education.school}</span>
            </h3>
            <span className="tag tag-outline">{education.year}</span>
          </div>
        </motion.li>
      </ol>
    </Section>
  );
}
