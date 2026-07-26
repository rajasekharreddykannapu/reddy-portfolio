"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  hero,
  chapters,
  impact,
  experience,
  contact,
  skillPlanets,
} from "@/lib/journey/content";
import { useLowPower } from "@/lib/journey/useLowPower";

const SkillsGalaxy = dynamic(() => import("@/components/journey/SkillsGalaxy"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const EASE = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm text-amber-400">{index}</span>
      <span className="h-px w-10 bg-gradient-to-r from-amber-400 to-transparent" />
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">{children}</span>
    </div>
  );
}

function RotatingRoles() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % hero.roles.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-400 bg-clip-text font-semibold text-transparent"
        >
          {hero.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const glass =
  "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_10px_50px_-20px_rgba(0,0,0,0.8)]";

function TagRow({ tags }: { tags: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-amber-400/25 bg-amber-400/5 px-3 py-1 text-xs text-amber-200/90"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function JourneyContent() {
  const low = useLowPower();

  function begin() {
    document.getElementById("beginning")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative z-10">
      {/* HERO */}
      <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-mono text-sm uppercase tracking-[0.3em] text-amber-400/80"
        >
          {hero.greeting}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="mt-4 bg-gradient-to-b from-white to-white/70 bg-clip-text text-5xl font-semibold tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(251,191,36,0.25)] sm:text-7xl"
        >
          {hero.name}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          className="mt-5 text-2xl sm:text-3xl"
        >
          <RotatingRoles />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
          className="mt-6 max-w-md text-balance text-white/50"
        >
          {hero.tagline}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          onClick={begin}
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-medium text-black shadow-[0_10px_40px_-8px_rgba(251,191,36,0.6)] transition-transform hover:scale-[1.04]"
        >
          Begin Journey
          <span className="transition-transform group-hover:translate-y-0.5">↓</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 font-mono text-xs uppercase tracking-widest text-white/40"
        >
          Scroll to travel
        </motion.div>
      </section>

      {/* NARRATIVE CHAPTERS */}
      {chapters.map((c, idx) => (
        <section
          key={c.id}
          id={c.id}
          className="flex min-h-[100svh] items-center px-6 py-24"
        >
          <div className="mx-auto w-full max-w-5xl">
            <Reveal>
              <Kicker index={c.index}>{c.kicker}</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                {c.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{c.lede}</p>
            </Reveal>
            <Reveal delay={0.15} className={`mt-10 ${glass} p-7 sm:p-9`}>
              <ul className="space-y-4">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-3 text-white/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
              {c.tags && <TagRow tags={c.tags} />}
            </Reveal>
          </div>
          <div className="pointer-events-none fixed left-6 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] tracking-widest text-white/30 lg:block">
            {String(idx + 1).padStart(2, "0")} / {String(chapters.length + 4).padStart(2, "0")}
          </div>
        </section>
      ))}

      {/* CHAPTER 6 — PROJECTS / IMPACT */}
      <section id="projects" className="px-6 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <Kicker index="06">Chapter Six</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Selected Impact
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {impact.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05} className={`${glass} group p-7 transition-colors hover:border-amber-400/40`}>
                <p className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text font-mono text-sm font-semibold text-transparent">
                  {p.metric}
                </p>
                <h3 className="mt-3 text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-white/65">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60">
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 7 — SKILLS GALAXY */}
      <section id="skills" className="px-6 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <Kicker index="07">Chapter Seven</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Skills Galaxy
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              {low
                ? "The tools and disciplines I work in."
                : "A living system of the tools and disciplines I work in. Hover a planet to name it."}
            </p>
          </Reveal>
          {low ? (
            <Reveal delay={0.15} className={`mt-8 ${glass} p-7 sm:p-9`}>
              <div className="flex flex-wrap gap-2.5">
                {skillPlanets.map((s) => (
                  <span
                    key={s.name}
                    className="rounded-full border border-amber-400/25 bg-amber-400/5 px-3.5 py-1.5 text-sm text-amber-100/90"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.15} className={`mt-8 ${glass} h-[440px] w-full overflow-hidden sm:h-[520px]`}>
              <SkillsGalaxy />
            </Reveal>
          )}
        </div>
      </section>

      {/* CHAPTER 8 — EXPERIENCE TIMELINE */}
      <section id="experience" className="px-6 py-24">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <Kicker index="08">Chapter Eight</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              The Timeline
            </h2>
          </Reveal>
          <ol className="relative mt-12 space-y-10 pl-8 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-gradient-to-b before:from-amber-400/70 before:via-white/15 before:to-transparent">
            {experience.map((e, i) => (
              <Reveal key={`${e.role}-${e.period}`} delay={i * 0.05}>
                <li className="relative">
                  <span className="absolute -left-[2.15rem] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_16px_2px_rgba(251,191,36,0.6)]" />
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {e.role} <span className="font-normal text-white/50">· {e.company}</span>
                    </h3>
                    <p className="font-mono text-sm text-white/45">{e.period}</p>
                  </div>
                  <p className="mt-1 text-white/60">{e.note}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CHAPTER 10 — VISION */}
      <section className="flex min-h-[90svh] items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Kicker index="09">The Horizon</Kicker>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-3xl font-medium leading-snug text-white sm:text-4xl">
              I don&apos;t just build software.
              <br />
              <span className="text-white/60">I build products that solve real problems. I build teams. I build AI.</span>
              <br />
              And this journey has only begun.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 pb-32 pt-8">
        <div className="mx-auto w-full max-w-3xl">
          <Reveal className={`${glass} p-8 sm:p-12`}>
            <Kicker index="10">Get in touch</Kicker>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s build something.
            </h2>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              {[
                { label: "Email", href: `mailto:${contact.email}`, value: contact.email },
                { label: "LinkedIn", href: contact.linkedin, value: "in/kannapurajasekharreddy" },
                { label: "GitHub", href: contact.github, value: "rajasekharreddykannapu" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex min-w-0 flex-1 items-center justify-between gap-6 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm transition-colors hover:border-amber-400/40 sm:min-w-[14rem]"
                >
                  <span className="shrink-0 text-white/50">{l.label}</span>
                  <span className="truncate font-mono text-white/85">{l.value}</span>
                </a>
              ))}
            </div>
            <a href="/" className="mt-8 inline-block font-mono text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-amber-400">
              ← Back to résumé
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
