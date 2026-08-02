"use client";

import { motion } from "framer-motion";
import { gear } from "@/lib/running";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

export default function Gear() {
  return (
    <motion.section
      id="gear"
      className="mx-auto max-w-5xl px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <SectionHeading index="04">The shoe rotation</SectionHeading>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {gear.map((shoe) => (
          <motion.div
            key={shoe.model}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="card card-glow group p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_16px_40px_-16px_var(--accent)]"
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-gradient font-mono text-sm font-semibold">{shoe.name}</p>
              <p className="font-mono text-sm text-muted tabular-nums">{shoe.km} km</p>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-foreground">{shoe.model}</h3>
            <p className="mt-2 leading-relaxed text-muted">{shoe.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
