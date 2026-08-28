"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { engineBeats, featuredRunHighlights, videoSpotlight } from "@/lib/running";
import { findRunById, photoSrc, primaryPhoto } from "@/lib/runs";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";
import RouteMap from "./RouteMap";
import RunVideo from "./RunVideo";

export default function TrainingEngine() {
  const spotlightRun = videoSpotlight.runId ? findRunById(videoSpotlight.runId) : undefined;

  return (
    <section id="engine" className="mx-auto max-w-5xl px-6 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="05">The training engine</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-xl text-[0.975rem] leading-7 text-muted"
        >
          Easy miles, speed work, and a longest run that proved the base was real.
        </motion.p>

        {spotlightRun?.video && (
          <motion.article
            variants={fadeUp}
            className="card gradient-border mt-10 overflow-hidden"
          >
            <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="kicker text-accent">Latest long run · {videoSpotlight.date}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  {videoSpotlight.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                  {videoSpotlight.story}
                </p>
                <p className="metric mt-6 text-4xl text-foreground">{videoSpotlight.stat}</p>
                <a
                  href={`https://www.strava.com/activities/${spotlightRun.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />
                  View on Strava
                </a>
              </div>
              <RunVideo video={spotlightRun.video} title={spotlightRun.name} />
            </div>
          </motion.article>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <motion.ol variants={fadeUp} className="space-y-8">
            {engineBeats.map((beat) => (
              <li key={beat.title}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{beat.title}</h3>
                  {beat.stat && (
                    <span className="text-gradient font-mono text-sm font-semibold">
                      {beat.stat}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-xs text-muted">{beat.date}</p>
                <p className="mt-2 leading-relaxed text-muted">{beat.detail}</p>
              </li>
            ))}
          </motion.ol>

          <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-1">
            <p className="font-mono text-xs uppercase tracking-widest text-muted lg:hidden">
              Featured efforts
            </p>
            {featuredRunHighlights.map((run) => {
              const live = run.runId ? findRunById(run.runId) : undefined;
              const map = live?.map ?? null;
              const cover = live ? primaryPhoto(live.photos) : null;
              return (
                <div
                  key={run.title}
                  className="card card-glow flex overflow-hidden transition-colors hover:border-accent/40"
                >
                  <div className="relative w-[38%] shrink-0 bg-surface-2 sm:w-36">
                    {cover ? (
                      <>
                        <Image
                          src={photoSrc(cover)}
                          alt={run.title}
                          fill
                          sizes="144px"
                          className="object-cover"
                        />
                        {map && (
                          <div className="photo-map-inset absolute bottom-2 right-2 h-11 w-16 overflow-hidden rounded-md">
                            <RouteMap map={map} tone="dark" className="h-full w-full p-1" />
                          </div>
                        )}
                      </>
                    ) : (
                      <RouteMap map={map} className="h-full min-h-[5.5rem] w-full p-2.5" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-semibold text-foreground">{run.title}</h4>
                      <span className="shrink-0 font-mono text-[0.65rem] text-muted">
                        {run.date.replace(/ 2026/, "")}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-sm text-accent">{run.note}</p>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {run.finishTime ? (
                        <>
                          <span className="text-foreground">{run.finishTime}</span>
                          {" · "}
                          {run.distance}
                          {run.pace ? ` · ${run.pace}/km` : ""}
                        </>
                      ) : (
                        <>
                          {run.distance}
                          {run.pace ? ` · ${run.pace}/km` : ""}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
