"use client";

import { motion } from "framer-motion";
import { tracks } from "@/lib/learning";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

export default function Tracks() {
  return (
    <Section
      id="tracks"
      index="02"
      title="Start learning now"
      intro="Sequenced for Kenyt: AI products on the existing C# / Angular / Azure / Elastic stack — not a career reset."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {tracks.map((track) => (
          <motion.article key={track.id} variants={fadeUp} className="card p-6 sm:p-7">
            <h3 className="text-[1.1875rem]">{track.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-800">{track.why}</p>
            <ol className="mt-5 space-y-2.5">
              {track.start.map((step, i) => (
                <li key={step} className="grid grid-cols-[22px_1fr] gap-2 text-sm leading-snug text-foreground">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t-2 border-border pt-4">
              {track.sources.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-line font-mono text-xs text-muted transition-colors hover:text-accent"
                >
                  {s.label} ↗
                </a>
              ))}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
