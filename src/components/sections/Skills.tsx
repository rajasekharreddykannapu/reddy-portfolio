"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/resume";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="mx-auto max-w-5xl px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <motion.h2 variants={fadeUp} className="font-mono text-sm uppercase tracking-widest text-accent">
        Skills
      </motion.h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <motion.div key={group.group} variants={fadeUp}>
            <h3 className="text-sm font-medium text-muted">{group.group}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
