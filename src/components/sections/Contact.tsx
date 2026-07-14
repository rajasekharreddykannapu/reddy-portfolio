"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/resume";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const links = [
  { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { label: "GitHub", href: profile.github, value: profile.github.replace("https://", "") },
  ...(profile.linkedin
    ? [{ label: "LinkedIn", href: profile.linkedin, value: profile.linkedin.replace("https://", "") }]
    : []),
];

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="mx-auto max-w-5xl px-6 py-24"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <motion.h2 variants={fadeUp} className="font-mono text-sm uppercase tracking-widest text-accent">
        Contact
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="mt-5 max-w-xl text-2xl font-medium leading-snug text-foreground sm:text-3xl"
      >
        Open to conversations about engineering leadership, platform architecture, and scaling teams.
      </motion.p>
      <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        {links.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            whileHover={{ y: -2 }}
            className="flex items-center justify-between gap-6 rounded-xl border border-border bg-surface px-5 py-3.5 text-sm transition-colors hover:border-accent sm:min-w-[15rem]"
          >
            <span className="text-muted">{link.label}</span>
            <span className="font-mono text-foreground">{link.value}</span>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}
