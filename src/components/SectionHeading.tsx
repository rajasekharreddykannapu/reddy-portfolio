"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function SectionHeading({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp}>
      <p className="kicker text-accent">{index}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
        {children}
      </h2>
    </motion.div>
  );
}
