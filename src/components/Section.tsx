"use client";

import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

/**
 * The page's structural unit: a 220px heading rail beside the content,
 * closed by a 2px rule. Collapses to one column under 900px.
 */
export default function Section({
  id,
  index,
  title,
  intro,
  children,
  rule = true,
}: {
  id?: string;
  index: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  rule?: boolean;
}) {
  return (
    <motion.section
      id={id}
      className="mx-auto max-w-[1240px] px-10 max-sm:px-5"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div
        className={`grid grid-cols-[220px_1fr] gap-10 py-18 max-[900px]:grid-cols-1 ${
          rule ? "border-b-2 border-border" : ""
        }`}
      >
        <SectionHeading index={index} intro={intro}>
          {title}
        </SectionHeading>
        <div>{children}</div>
      </div>
    </motion.section>
  );
}
