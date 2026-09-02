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
    <motion.section
      id="races"
      className="mx-auto max-w-[1240px] px-10 max-sm:px-5"
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer}
    >
      <div className="grid grid-cols-[220px_1fr] gap-10 border-b-2 border-border py-18 max-[900px]:grid-cols-1">
        <SectionHeading
          index="04"
          intro="Four bibs in five months. 55:17 for a first 10K, then 51:11, then two halves — 1:59:15, then 1:49:01."
        >
          Breakthrough
        </SectionHeading>

        <div className="grid gap-10">
          {/* Featured half — the finish time carries the accent. */}
          <motion.article variants={fadeUp} className="border-t-2 border-foreground pt-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="tag tag-accent">Featured · {featuredRace.date}</span>
              <span className="tag tag-outline">
                {featuredRace.distance}
                {featuredRace.note ? ` · ${featuredRace.note}` : ""}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-[1fr_200px] items-start gap-8 max-[900px]:grid-cols-1">
              <div>
                <h3 className="text-[1.875rem]">{featuredRace.name}</h3>
                {featuredRace.story && (
                  <p className="mt-3.5 max-w-[62ch] text-[17px] leading-[1.55] text-neutral-800">
                    {featuredRace.story}
                  </p>
                )}
                {featuredRace.resultUrl && (
                  <div className="mt-5.5 flex flex-wrap gap-3">
                    <a
                      href={featuredRace.resultUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                    >
                      Official result
                    </a>
                    {featuredRace.runId && (
                      <a
                        href={`https://www.strava.com/activities/${featuredRace.runId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost"
                      >
                        Strava
                      </a>
                    )}
                  </div>
                )}
              </div>
              <p
                className="metric text-[clamp(2.5rem,5vw,3.75rem)] leading-none text-accent"
                aria-label={`Finish time ${featuredRace.time}`}
              >
                {featuredRace.time}
              </p>
            </div>

            {route && (
              <div className="mt-6 border-2 border-border">
                <RouteMap map={route} tone="light" className="aspect-[16/7] h-auto w-full p-6" />
              </div>
            )}
          </motion.article>

          {featuredRace.eventGallery && <EventGalleryBanner gallery={featuredRace.eventGallery} />}

          {/* Latest race */}
          {spotlightRace && (
            <motion.article variants={fadeUp} className="border-t-2 border-border pt-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="tag tag-neutral">Latest · {spotlightRace.date}</span>
                <span className="tag tag-outline">
                  {spotlightRace.distance}
                  {spotlightRace.note ? ` · ${spotlightRace.note}` : ""}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-[1fr_200px] items-start gap-8 max-[900px]:grid-cols-1">
                <div>
                  <h3 className="text-[1.625rem]">{spotlightRace.name}</h3>
                  {spotlightRace.story && (
                    <p className="mt-3.5 max-w-[62ch] text-[17px] leading-[1.55] text-neutral-800">
                      {spotlightRace.story}
                    </p>
                  )}
                  <div className="mt-5.5 flex flex-wrap gap-3">
                    {spotlightRace.resultUrl && (
                      <a
                        href={spotlightRace.resultUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost"
                      >
                        Official result
                      </a>
                    )}
                    {spotlightRace.runId && (
                      <a
                        href={`https://www.strava.com/activities/${spotlightRace.runId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost border-transparent"
                      >
                        Strava
                      </a>
                    )}
                  </div>
                </div>
                <p className="metric text-[clamp(2.125rem,4vw,3rem)] leading-none">
                  {spotlightRace.time}
                </p>
              </div>

              {spotlightCover && spotlightPhotos.length > 0 && (
                <div className="mt-6">
                  <RunPhotos photos={spotlightPhotos} alt={spotlightRace.name} layout="strip" />
                </div>
              )}
            </motion.article>
          )}

          {/* Earlier results — ruled row grid. */}
          <motion.div variants={fadeUp}>
            <h4 className="border-b-2 border-border pb-2.5 text-[1.1875rem]">The path so far</h4>
            <ul>
              {supportingRaces.map((race) => {
                const thumb = resolveCoverPhoto(race);
                return (
                  <li
                    key={`${race.date}-${race.name}`}
                    className="rule-row grid grid-cols-[130px_1fr_110px_90px] items-baseline gap-4 border-b-2 border-border py-5 pr-3 max-[900px]:grid-cols-[1fr_auto]"
                  >
                    <p className="text-[13px] font-semibold text-neutral-700">{race.date}</p>
                    <div>
                      <p className="text-lg font-extrabold">{race.name}</p>
                      {race.note && <p className="mt-1 text-[13px] text-accent">{race.note}</p>}
                      {race.story && (
                        <p className="mt-2 max-w-[58ch] text-[15px] leading-[1.5] text-neutral-800">
                          {race.story}
                        </p>
                      )}
                      {thumb && (
                        <div className="relative mt-3 hidden h-14 w-14 border-2 border-border lg:block">
                          <Image
                            src={photoSrc(thumb)}
                            alt=""
                            fill
                            sizes="56px"
                            className="grayscale-photo object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-[13px] font-semibold text-neutral-700 max-[900px]:hidden">
                      {race.distance}
                    </p>
                    <p className="metric text-[19px]">{race.time}</p>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
