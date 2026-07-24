"use client";

import { motion } from "framer-motion";
import { impact } from "@/lib/resume";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

export default function Impact() {
  return (
    <motion.section
      id="impact"
      className="mx-auto max-w-5xl px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <SectionHeading index="04">Selected Impact</SectionHeading>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {impact.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="card group p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_16px_40px_-16px_var(--accent)]"
          >
            <p className="text-gradient font-mono text-sm font-semibold">{item.metric}</p>
            <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
