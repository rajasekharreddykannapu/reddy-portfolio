"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/resume";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

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
      <SectionHeading index="03">Skills</SectionHeading>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <motion.div key={group.group} variants={fadeUp}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">{group.group}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <motion.span
                  key={item}
                  whileHover={{ y: -2 }}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:bg-surface-2 hover:text-accent"
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
