"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { engineBeats, featuredRunHighlights, videoSpotlight } from "@/lib/running";
import { findRunById, photoSrc, primaryPhoto } from "@/lib/runs";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";
import RouteMap from "./RouteMap";
import RunVideo from "./RunVideo";

export default function TrainingEngine() {
  const spotlightRun = videoSpotlight.runId ? findRunById(videoSpotlight.runId) : undefined;

  return (
    <Section
      id="engine"
      index="05"
      title="The training engine"
      intro="Easy miles, speed work, and a longest run that proved the base was real."
    >
      <div className="grid gap-10">
        {spotlightRun?.video && (
          <motion.article
            variants={fadeUp}
            className="grid grid-cols-2 gap-8 border-t-2 border-foreground pt-6 max-[900px]:grid-cols-1"
          >
            <div>
              <span className="tag tag-accent">Latest long run · {videoSpotlight.date}</span>
              <h3 className="mt-4 text-[1.625rem]">{videoSpotlight.title}</h3>
              <p className="mt-3 max-w-[52ch] text-[17px] leading-[1.55] text-neutral-800">
                {videoSpotlight.story}
              </p>
              <p className="metric mt-4 text-[1.375rem]">{videoSpotlight.stat}</p>
              <a
                href={`https://www.strava.com/activities/${spotlightRun.id}`}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost mt-4.5"
              >
                View on Strava
              </a>
            </div>
            <div className="border-2 border-border">
              <RunVideo video={spotlightRun.video} title={spotlightRun.name} />
            </div>
          </motion.article>
        )}

        {/* Sessions — ruled rows, distance as an outlined tag. */}
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

        {/* Featured efforts — gap-as-divider grid. */}
        <motion.div variants={fadeUp}>
          <h3 className="border-b-2 border-border pb-2.5 text-[1.1875rem]">Featured efforts</h3>
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
