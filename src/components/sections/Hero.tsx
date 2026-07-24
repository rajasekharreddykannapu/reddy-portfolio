"use client";

import { motion } from "framer-motion";
import { profile, stats } from "@/lib/resume";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Counter from "@/components/Counter";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto max-w-5xl overflow-hidden px-6 pt-20 pb-24 sm:pt-28 sm:pb-32"
    >
      <div aria-hidden className="hero-glow" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10"
      >
        <motion.p
          variants={fadeUp}
          className="inline-flex items-center gap-2 font-mono text-sm text-accent"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {profile.location}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-sheen mt-4 text-4xl font-semibold tracking-tight sm:text-6xl"
        >
          {profile.name}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-3 text-xl font-medium text-muted sm:text-2xl">
          {profile.title}
        </motion.p>
        <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          {profile.valueProp}
        </motion.p>
        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#experience"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-[0_8px_30px_-8px_var(--accent)] transition-shadow hover:shadow-[0_10px_40px_-6px_var(--accent)]"
          >
            View experience
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Get in touch
          </motion.a>
        </motion.div>
        <motion.dl
          variants={fadeUp}
          className="card mt-14 grid max-w-2xl grid-cols-3 divide-x divide-border overflow-hidden"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="px-5 py-6 text-center sm:text-left">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="text-gradient block text-2xl font-semibold tracking-tight sm:text-3xl">
                  <Counter value={stat.value} />
                </span>
                <span className="mt-1 block text-xs leading-snug text-muted sm:text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
