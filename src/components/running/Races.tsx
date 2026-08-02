"use client";

import { motion } from "framer-motion";
import { races } from "@/lib/running";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

export default function Races() {
  return (
    <motion.section
      id="races"
      className="mx-auto max-w-5xl px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <SectionHeading index="02">Race results</SectionHeading>
      <motion.div variants={fadeUp} className="card mt-10 overflow-hidden">
        <div className="divide-y divide-border">
          {races.map((race) => (
            <div
              key={`${race.date}-${race.name}`}
              className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-4 transition-colors hover:bg-surface-2 sm:grid-cols-[7rem_1fr_6rem_auto]"
            >
              <p className="order-1 font-mono text-xs text-muted sm:order-none">{race.date}</p>
              <div className="order-3 col-span-2 sm:order-none sm:col-span-1">
                <p className="font-semibold text-foreground">{race.name}</p>
                {race.note && <p className="text-xs text-accent">{race.note}</p>}
              </div>
              <p className="order-2 text-right font-mono text-sm text-muted sm:order-none sm:text-left">
                {race.distance}
              </p>
              <p className="order-4 text-right font-mono text-lg font-semibold text-foreground tabular-nums sm:order-none">
                {race.time}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
