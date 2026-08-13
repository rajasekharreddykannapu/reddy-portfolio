"use client";

import { motion } from "framer-motion";
import { gear } from "@/lib/running";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

export default function Gear() {
  return (
    <motion.section
      id="gear"
      className="mx-auto max-w-5xl px-6 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <SectionHeading index="08">Shoe rotation</SectionHeading>
      <motion.div
        variants={fadeUp}
        className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {gear.map((shoe) => (
          <div key={shoe.model} className="border-t border-border pt-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-xs text-accent">{shoe.name}</p>
              <p className="metric text-sm text-muted">{shoe.km} km</p>
            </div>
            <h3 className="mt-2 text-sm font-semibold text-foreground">{shoe.model}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted">{shoe.role}</p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
