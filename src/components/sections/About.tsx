"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/resume";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <motion.section
      id="about"
      className="mx-auto max-w-5xl px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <SectionHeading index="01">About</SectionHeading>
      <motion.p
        variants={fadeUp}
        className="mt-6 max-w-3xl text-xl leading-relaxed text-foreground sm:text-2xl"
      >
        {profile.summary}
      </motion.p>
    </motion.section>
  );
}
