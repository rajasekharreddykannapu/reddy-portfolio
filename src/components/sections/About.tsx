"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { profile } from "@/lib/resume";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

export default function About() {
  return (
    <Section id="about" index="01" title="About">
      <motion.p
        variants={fadeUp}
        className="max-w-[62ch] text-[1.3125rem] leading-[1.6] text-foreground"
      >
        {profile.summary}
      </motion.p>
      <motion.p variants={fadeUp} className="mt-7 text-[15px] text-muted">
        Also:{" "}
        <Link href="/running" className="text-accent-700 transition-colors hover:text-accent">
          running journey
        </Link>
        {" · "}
        <Link href="/learning" className="text-accent-700 transition-colors hover:text-accent">
          field notes
        </Link>
      </motion.p>
    </Section>
  );
}
