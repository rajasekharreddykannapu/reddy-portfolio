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
    <motion.div variants={fadeUp} className="flex items-center gap-3">
      <span className="font-mono text-sm text-accent">{index}</span>
      <span className="h-px w-8 bg-gradient-to-r from-accent to-transparent" />
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted">{children}</h2>
    </motion.div>
  );
}
