"use client";

import { motion } from "framer-motion";
import { impact } from "@/lib/resume";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

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
      <motion.h2 variants={fadeUp} className="font-mono text-sm uppercase tracking-widest text-accent">
        Selected Impact
      </motion.h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {impact.map((item) => (
          <motion.div
            key={item.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-border bg-surface p-6 shadow-[0_0_0_0_rgba(0,0,0,0)] transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_12px_30px_-12px_var(--accent)]"
          >
            <p className="font-mono text-sm font-medium text-accent">{item.metric}</p>
            <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
