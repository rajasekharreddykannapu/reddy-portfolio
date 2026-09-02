"use client";

import { track } from "@vercel/analytics";
import { motion } from "framer-motion";
import { profile } from "@/lib/resume";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const links = [
  { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { label: "GitHub", href: profile.github, value: profile.github.replace("https://", "") },
  ...(profile.linkedin
    ? [
        {
          label: "LinkedIn",
          href: profile.linkedin,
          value: profile.linkedin.replace("https://", "").replace(/\/$/, ""),
        },
      ]
    : []),
  {
    label: "Instagram",
    href: profile.instagram,
    value: profile.instagram.replace("https://www.", "").replace(/\/$/, ""),
    event: "instagram_click" as const,
  },
];

/**
 * The poster statement: the one place the accent runs as a full field.
 * Type stays display-grade, everything flush left.
 */
export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="bg-accent text-accent-foreground"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-[1240px] px-10 py-20 max-sm:px-5">
        <motion.p
          variants={fadeUp}
          className="text-sm font-extrabold tracking-[0.1em] text-accent-200"
        >
          05
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-2.5 max-w-[20ch] text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95]"
        >
          Open to conversations about engineering leadership, platform architecture, and scaling
          teams.
        </motion.h2>
        <motion.div
          variants={fadeUp}
          className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-0.5 bg-white/40"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "me noreferrer" : undefined}
              onClick={
                "event" in link && link.event
                  ? () => track(link.event, { source: "contact" })
                  : undefined
              }
              className="block min-w-0 bg-accent p-6 transition-colors hover:bg-accent-600"
            >
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-accent-200">
                {link.label}
              </span>
              <span className="mt-2 block text-[15px] font-extrabold [overflow-wrap:anywhere]">
                {link.value}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
