"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/**
 * The left rail of every section: the section number in the accent above a
 * flush-left heading, with an optional intro line beneath.
 * Parent sections lay this out as a 220px column (see Section below).
 */
export default function SectionHeading({
  index,
  intro,
  children,
}: {
  index: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp}>
      <p className="text-sm font-extrabold tracking-[0.1em] text-accent">{index}</p>
      <h2 className="mt-2 text-[2rem] leading-[1.05] text-foreground">{children}</h2>
      {intro ? <p className="mt-3.5 text-[15px] leading-relaxed text-muted">{intro}</p> : null}
    </motion.div>
  );
}
