"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { featuredRace, spotlightRace, supportingRaces } from "@/lib/running";
import { findRunById, photoSrc, primaryPhoto } from "@/lib/runs";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import SectionHeading from "@/components/SectionHeading";
import RouteMap from "./RouteMap";
import RunPhotos from "./RunPhotos";
import EventGalleryBanner from "./EventGalleryBanner";

function resolveRacePhotos(race: { runId?: string; photos?: string[] }) {
  if (race.photos?.length) return race.photos;
  const live = race.runId ? findRunById(race.runId) : undefined;
  return live?.photos ?? [];
}

function resolveCoverPhoto(race: { runId?: string; coverPhoto?: string; photos?: string[] }) {
  if (race.coverPhoto) return race.coverPhoto;
  return primaryPhoto(resolveRacePhotos(race));
}

export default function Races() {
  const route = featuredRace.runId ? findRunById(featuredRace.runId)?.map ?? null : null;
  const spotlightPhotos = spotlightRace ? resolveRacePhotos(spotlightRace) : [];
  const spotlightCover = spotlightRace ? resolveCoverPhoto(spotlightRace) : null;

  return (
    <section id="races" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <SectionHeading index="04">Breakthrough</SectionHeading>
        <motion.p
          variants={fadeUp}
          className="mt-3 max-w-xl text-[0.975rem] leading-7 text-muted"
        >
          The races that rewrote what felt possible — and the proof that kept stacking.
        </motion.p>

        {/* Featured half */}
        <motion.article
          variants={fadeUp}
          className="card relative mt-10 overflow-hidden px-6 py-10 sm:px-8 sm:py-14"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="kicker text-accent">Featured · {featuredRace.date}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                {featuredRace.name}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {featuredRace.distance}
                {featuredRace.note ? ` · ${featuredRace.note}` : ""}
              </p>

              <p
                className="metric mt-8 text-5xl text-foreground sm:text-6xl"
                aria-label={`Finish time ${featuredRace.time}`}
              >
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="inline-block"
                >
                  {featuredRace.time}
                </motion.span>
              </p>

              {featuredRace.story && (
                <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
                  {featuredRace.story}
                </p>
              )}

              {featuredRace.resultUrl && (
                <div className="mt-8 flex flex-wrap gap-2.5">
                  <a
                    href={featuredRace.resultUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex items-center gap-1.5"
                  >
                    Official result
                  </a>
                  {featuredRace.runId && (
                    <a
                      href={`https://www.strava.com/activities/${featuredRace.runId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost inline-flex items-center gap-1.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />
                      Strava
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0b0e14]">
              {route ? (
                <RouteMap map={route} tone="dark" className="h-full w-full p-6" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                  <p className="font-mono text-xs text-muted">Half marathon · 21.1 km</p>
                </div>
              )}
            </div>
          </div>
        </motion.article>

        {featuredRace.eventGallery && (
          <EventGalleryBanner gallery={featuredRace.eventGallery} />
        )}

        {/* Latest race — photo spotlight */}
        {spotlightRace && spotlightCover && (
          <motion.article
            variants={fadeUp}
            className="card gradient-border relative mt-8 overflow-hidden"
          >
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="photo-cover relative min-h-[280px] lg:min-h-[420px]">
                <Image
                  src={photoSrc(spotlightCover)}
                  alt={spotlightRace.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {spotlightPhotos.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/45 p-4 backdrop-blur-md">
                    <RunPhotos photos={spotlightPhotos} alt={spotlightRace.name} layout="strip" />
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12">
                <p className="kicker text-accent">Latest · {spotlightRace.date}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  {spotlightRace.name}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {spotlightRace.distance}
                  {spotlightRace.note ? ` · ${spotlightRace.note}` : ""}
                </p>

                <p className="metric mt-8 text-5xl text-foreground">{spotlightRace.time}</p>

                {spotlightRace.story && (
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                    {spotlightRace.story}
                  </p>
                )}

                <div className="mt-8 flex flex-wrap gap-2.5">
                  {spotlightRace.resultUrl && (
                    <a
                      href={spotlightRace.resultUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary inline-flex items-center gap-1.5"
                    >
                      Official result
                    </a>
                  )}
                  {spotlightRace.runId && (
                    <a
                      href={`https://www.strava.com/activities/${spotlightRace.runId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost inline-flex items-center gap-1.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />
                      Strava
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        )}

        {/* Earlier results */}
        <motion.div variants={fadeUp} className="mt-10">
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted">
            The path so far
          </h4>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {supportingRaces.map((race) => {
              const thumb = resolveCoverPhoto(race);
              return (
                <li
                  key={`${race.date}-${race.name}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-4 transition-colors hover:bg-surface-2/60 sm:grid-cols-[7rem_1fr_5rem_auto] sm:px-1 lg:grid-cols-[7rem_1fr_5rem_auto_4.5rem]"
                >
                  <p className="order-1 font-mono text-xs text-muted sm:order-none">
                    {race.date}
                  </p>
                  <div className="order-3 col-span-2 sm:order-none sm:col-span-1">
                    <p className="font-semibold text-foreground">{race.name}</p>
                    {race.note && <p className="text-xs text-accent">{race.note}</p>}
                    {race.story && (
                      <p className="mt-1 max-w-md text-xs leading-relaxed text-muted">
                        {race.story}
                      </p>
                    )}
                  </div>
                  <p className="order-2 text-right font-mono text-sm text-muted sm:order-none sm:text-left">
                    {race.distance}
                  </p>
                  <p className="order-4 text-right font-mono text-lg font-semibold tabular-nums text-foreground sm:order-none">
                    {race.time}
                  </p>
                  {thumb && (
                    <div className="order-5 relative col-span-2 hidden h-14 w-14 overflow-hidden rounded-xl border border-border lg:col-span-1 lg:col-start-5 lg:block">
                      <Image
                        src={photoSrc(thumb)}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
