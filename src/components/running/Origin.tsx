"use client";

import { motion } from "framer-motion";
import { originBeats } from "@/lib/running";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

export default function Origin() {
  return (
    <Section
      id="origin"
      index="01"
      title="Day zero"
      intro="Five weeks in January and February 2026: walks, one easy ride, then a first 8 km and a first 10K."
    >
      <ol>
        {originBeats.map((beat, i) => (
          <motion.li
            key={beat.title}
            variants={fadeUp}
            className={`rule-row grid grid-cols-[160px_1fr] gap-6 border-t-2 border-border py-6 pr-5 max-[700px]:grid-cols-1 ${
              i === originBeats.length - 1 ? "border-b-2" : ""
            }`}
          >
            <div>
              <div className="text-[13px] font-bold uppercase tracking-[0.08em]">{beat.date}</div>
              {beat.stat && <div className="mt-1 text-[13px] text-accent">{beat.stat}</div>}
            </div>
            <div>
              <h3 className="text-xl">{beat.title}</h3>
              <p className="mt-2.5 max-w-[70ch] text-base leading-[1.55] text-neutral-800">
                {beat.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
