"use client";

import { motion } from "framer-motion";
import { profile, stats } from "@/lib/resume";
import { staggerContainer, fadeUp } from "@/lib/motion";
import Counter from "@/components/Counter";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1240px] px-10 max-sm:px-5">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
        <div className="border-b-2 border-border pt-22 pb-14">
          <motion.p
            variants={fadeUp}
            className="kicker flex items-center gap-2.5 text-neutral-700"
          >
            <span aria-hidden className="inline-block h-0.5 w-7 bg-accent" />
            {profile.location}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-[15ch] text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.92]"
          >
            {profile.name}
          </motion.h1>
          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 items-end gap-10 max-[860px]:grid-cols-1"
          >
            <div>
              <p className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-extrabold tracking-[-0.01em] text-accent-700">
                {profile.title}
              </p>
              <p className="mt-4 max-w-[46ch] text-lg leading-[1.55] text-neutral-800">
                {profile.valueProp}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#experience" className="btn-primary">
                View experience
              </a>
              <a href="/learning" className="btn-ghost">
                Field notes
              </a>
              <a href="#contact" className="btn-ghost border-transparent">
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stat row — cells divided by 2px vertical rules; last figure in the accent. */}
        <motion.dl
          variants={fadeUp}
          className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] border-b-2 border-border"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 ${i === 0 ? "pr-8" : "px-8"} ${
                i === stats.length - 1 ? "" : "border-r-2 border-border"
              }`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span
                  className={`metric block text-[clamp(2.5rem,5vw,4rem)] leading-none ${
                    i === stats.length - 1 ? "text-accent" : "text-foreground"
                  }`}
                >
                  <Counter value={stat.value} />
                </span>
                <span className="kicker mt-2.5 block">{stat.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
