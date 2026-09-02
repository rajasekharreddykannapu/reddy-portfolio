"use client";

import { motion } from "framer-motion";
import { standingReads } from "@/lib/learning";
import { fmtFeedDay, feedSources, type FeedItem } from "@/lib/feeds";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

export default function Timeline({
  items,
  refreshed,
  failed,
}: {
  items: FeedItem[];
  refreshed: string;
  failed: string[];
}) {
  return (
    <Section
      id="timeline"
      index="03"
      title="Live reading timeline"
      intro="Headlines from .NET, Azure, Angular, Elastic, InfoQ, and Microsoft DevBlogs. Regenerates every four hours."
    >
      <p className="font-mono text-xs text-muted">
        Last refresh · {refreshed} IST
        {failed.length > 0 ? ` · skipped ${failed.join(", ")}` : ""}
      </p>

      {items.length === 0 ? (
        <div className="mt-8 border-2 border-border px-6 py-14">
          <p className="kicker">Feeds did not load this pass</p>
          <p className="mt-2 max-w-[52ch] text-sm text-neutral-800">
            Standing sources are below — try a refresh later.
          </p>
        </div>
      ) : (
        <motion.ol variants={fadeUp} className="mt-8">
          {items.map((item, i) => (
            <li
              key={item.href}
              className={`rule-row border-t-2 border-border ${
                i === items.length - 1 ? "border-b-2" : ""
              }`}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="grid gap-1.5 py-4 pr-3 transition-colors sm:grid-cols-[6.5rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs text-muted">{fmtFeedDay(item.date)}</span>
                <span className="font-medium text-foreground">{item.title}</span>
                <span className="tag tag-outline sm:justify-self-end">{item.source}</span>
              </a>
            </li>
          ))}
        </motion.ol>
      )}

      <div className="mt-14">
        <h3 className="border-b-2 border-border pb-2.5 text-[1.1875rem]">Standing sources</h3>
        <div className="rule-grid mt-5 grid-cols-1 sm:grid-cols-2">
          {standingReads.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="block p-5 transition-colors hover:text-accent"
            >
              <p className="text-base font-semibold text-foreground">{s.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-800">{s.why}</p>
            </a>
          ))}
        </div>
        <p className="mt-6 font-mono text-[0.6875rem] leading-relaxed text-muted">
          Feeds: {feedSources.map((f) => f.name).join(" · ")}
        </p>
      </div>
    </Section>
  );
}
