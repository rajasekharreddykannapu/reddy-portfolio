"use client";

import { motion } from "framer-motion";
import { learningProfile, dailyRitual, tracks } from "@/lib/learning";
import { feedSources } from "@/lib/feeds";
import { staggerContainer, fadeUp } from "@/lib/motion";

const stats = [
  { value: String(dailyRitual.length), label: "Daily slots" },
  { value: String(tracks.length), label: "Learning tracks" },
  { value: String(feedSources.length), label: "Live sources" },
];

export default function LearningHero() {
  return (
    <section id="top" className="mx-auto max-w-[1240px] px-10 max-sm:px-5">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="border-b-2 border-border pt-20 pb-12">
          <motion.p variants={fadeUp} className="kicker flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-0.5 w-7 bg-accent" />
            {learningProfile.kicker}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-6.5 max-w-[20ch] text-[clamp(2.5rem,6.4vw,5.25rem)] leading-[0.94]"
          >
            {learningProfile.headline}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[58ch] text-[1.1875rem] leading-[1.55] text-neutral-800"
          >
            {learningProfile.intro}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <a href="#tracks" className="btn-primary">
              Start learning now
            </a>
            <a href="#timeline" className="btn-ghost">
              See the timeline
            </a>
          </motion.div>
        </div>

        {/* Stat row — cells divided by 2px vertical rules; last figure in the accent. */}
        <motion.dl
          variants={fadeUp}
          className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-b-2 border-border"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-7.5 ${i === 0 ? "pr-7" : "px-7"} ${
                i === stats.length - 1 ? "" : "border-r-2 border-border"
              }`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  className={`metric block text-[clamp(2.125rem,4.2vw,3.375rem)] leading-none ${
                    i === stats.length - 1 ? "text-accent" : "text-foreground"
                  }`}
                >
                  {stat.value}
                </span>
                <span className="kicker mt-2 block">{stat.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
