"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { engineBeats, featuredRunHighlights } from "@/lib/running";
import { findRunById, photoSrc, primaryPhoto } from "@/lib/runs";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";
import RouteMap from "./RouteMap";

export default function TrainingEngine() {
  return (
    <Section
      id="engine"
      index="05"
      title="The training engine"
      intro="Easy miles, speed work, and the long runs that made race day possible — not another race recap."
    >
      <div className="grid gap-10">
        <motion.ol variants={fadeUp}>
          {engineBeats.map((beat, i) => (
            <li
              key={beat.title}
              className={`rule-row grid grid-cols-[130px_1fr] gap-6 border-t-2 border-border py-5.5 pr-3 max-[700px]:grid-cols-1 ${
                i === engineBeats.length - 1 ? "border-b-2" : ""
              }`}
            >
              <span className="text-[13px] font-semibold text-neutral-700">{beat.date}</span>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-[1.1875rem]">{beat.title}</h3>
                  {beat.stat && <span className="tag tag-outline">{beat.stat}</span>}
                </div>
                <p className="mt-2.5 max-w-[70ch] text-base leading-[1.55] text-neutral-800">
                  {beat.detail}
                </p>
              </div>
            </li>
          ))}
        </motion.ol>

        <motion.div variants={fadeUp}>
          <h3 className="border-b-2 border-border pb-2.5 text-[1.1875rem]">Key efforts</h3>
          <div className="rule-grid mt-5 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {featuredRunHighlights.map((run) => {
              const live = run.runId ? findRunById(run.runId) : undefined;
              const map = live?.map ?? null;
              const cover = live ? primaryPhoto(live.photos) : null;
              return (
                <article key={run.title} className="p-5.5">
                  <div className="kicker flex justify-between gap-3">
                    <span>{run.date.replace(/ 2026/, "")}</span>
                    <span className="text-accent">{run.note}</span>
                  </div>
                  <h4 className="mt-3 text-[1.1875rem]">{run.title}</h4>
                  <p className="mt-2.5 text-sm text-neutral-800">
                    {run.finishTime ? `${run.finishTime} · ` : ""}
                    {run.distance}
                    {run.pace ? ` · ${run.pace}/km` : ""}
                  </p>
                  {cover ? (
                    <div className="relative mt-4 h-32 border-2 border-border">
                      <Image
                        src={photoSrc(cover)}
                        alt={run.title}
                        fill
                        sizes="(max-width: 900px) 100vw, 250px"
                        className="grayscale-photo object-cover"
                      />
                    </div>
                  ) : (
                    map && (
                      <div className="mt-4 border-2 border-border">
                        <RouteMap map={map} className="h-32 w-full p-3" />
                      </div>
                    )
                  )}
                </article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
