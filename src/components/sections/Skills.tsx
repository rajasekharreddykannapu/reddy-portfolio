"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/resume";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

export default function Skills() {
  return (
    <Section id="skills" index="03" title="Skills">
      <div className="grid gap-8">
        {skills.map((group) => (
          <motion.div key={group.group} variants={fadeUp}>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-neutral-700">
              {group.group}
            </h3>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="tag tag-neutral">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
