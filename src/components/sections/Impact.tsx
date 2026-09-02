"use client";

import { motion } from "framer-motion";
import { impact } from "@/lib/resume";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

export default function Impact() {
  return (
    <Section id="impact" index="04" title="Selected Impact">
      {/* The 2px gap is the divider — cells sit on the page ground. */}
      <div className="rule-grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {impact.map((item) => (
          <motion.article key={item.title} variants={fadeUp} className="p-7">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
              {item.metric}
            </p>
            <h3 className="mt-3.5 text-[1.3125rem]">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.55] text-neutral-800">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
