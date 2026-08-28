"use client";

import Image from "next/image";
import { useState } from "react";
import type { Run } from "@/lib/runs";
import { gearById, fmtKm, fmtDay, fmtTimeOfDay, primaryPhoto, photoSrc } from "@/lib/runs";
import { resultUrlForRunId } from "@/lib/running";
import RouteMap from "./RouteMap";
import MiniChart from "./MiniChart";
import RunPhotos from "./RunPhotos";
import PhotoLightbox from "./PhotoLightbox";
import RunVideo from "./RunVideo";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="metric text-[0.8125rem] text-foreground">{value}</p>
      <p className="kicker mt-0.5">{label}</p>
    </div>
  );
}

export default function RunCard({ run }: { run: Run }) {
  const shoe = run.gearId
    ? gearById[run.gearId] ?? gearById[run.gearId.replace(/^g/, "")]
    : null;
  const cadence = run.avgCadence ? Math.round(run.avgCadence * 2) : null;
  const maxKmh = run.maxSpeed ? (run.maxSpeed * 3.6).toFixed(1) : null;
  const stravaUrl = `https://www.strava.com/activities/${run.id}`;
  const resultUrl = resultUrlForRunId(run.id);
  const cover = primaryPhoto(run.photos);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const hasDetail =
    run.elevation || run.hr || run.description || run.photos.length > 0 || run.video || run.calories;

  return (
    <div className="card card-glow group overflow-hidden transition-[border-color] duration-300 hover:border-accent/35">
      {cover ? (
        <button
          type="button"
          className="photo-cover relative block aspect-[16/9] w-full cursor-zoom-in border-b border-border text-left"
          onClick={() => {
            setLightboxIndex(Math.max(0, run.photos.indexOf(cover)));
            setLightboxOpen(true);
          }}
          aria-label={`View photos from ${run.name}`}
        >
          <Image
            src={photoSrc(cover)}
            alt={run.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {run.map && (
            <div className="photo-map-inset absolute bottom-3 right-3 h-16 w-24 overflow-hidden rounded-lg">
              <RouteMap map={run.map} tone="dark" className="h-full w-full p-1.5" />
            </div>
          )}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-black/55 px-2 py-0.5 font-mono text-[0.65rem] text-amber-50 backdrop-blur">
              {fmtTimeOfDay(run.date)}
            </span>
            {run.photos.length > 1 && (
              <span className="rounded-full bg-accent/90 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-accent-foreground">
                {run.photos.length} photos
              </span>
            )}
            {run.video && (
              <span className="rounded-full bg-red-600/90 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-white">
                video
              </span>
            )}
            {run.prCount > 0 && (
              <span className="rounded-full bg-black/55 px-2 py-0.5 font-mono text-[0.65rem] text-amber-100 backdrop-blur">
                {run.prCount} PR
              </span>
            )}
          </div>
        </button>
      ) : (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border bg-[#f3f1ee] dark:bg-surface-2">
          <RouteMap map={run.map} className="h-full w-full p-3" />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <span className="rounded-full bg-background/70 px-2 py-0.5 font-mono text-[0.65rem] text-muted backdrop-blur">
              {fmtTimeOfDay(run.date)}
            </span>
            {run.prCount > 0 && (
              <span className="rounded-full bg-accent/90 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-accent-foreground">
                {run.prCount} PR
              </span>
            )}
            {run.video && (
              <span className="rounded-full bg-red-600/90 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-white">
                video
              </span>
            )}
          </div>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h4
            className="truncate text-sm font-semibold tracking-tight text-foreground"
            title={run.name}
          >
            {run.name}
          </h4>
          <span className="shrink-0 font-mono text-xs text-muted">{fmtDay(run.date)}</span>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          <Stat label="km" value={fmtKm(run.distance)} />
          <Stat label="/km" value={run.pace ?? "—"} />
          <Stat label="time" value={run.duration ?? "—"} />
          <Stat label="elev" value={`${Math.round(run.elevationGain)}m`} />
        </div>

        {run.photos.length > 0 && (
          <div className="mt-3 border-t border-border pt-3">
            <RunPhotos photos={run.photos} alt={run.name} layout="strip" />
          </div>
        )}

        {hasDetail && (
          <details className="group/d mt-3 border-t border-border pt-3">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-muted transition-colors hover:text-accent">
              <span>Details</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 transition-transform group-open/d:rotate-180"
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>

            <div className="mt-4 space-y-4">
              {run.video && <RunVideo video={run.video} title={run.name} />}

              {run.description && (
                <p className="border-l-2 border-accent/50 pl-3 text-sm italic leading-relaxed text-muted">
                  {run.description}
                </p>
              )}

              {run.elevation && (
                <div>
                  <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-wider text-muted">
                    <span>Elevation</span>
                    <span className="font-mono normal-case">
                      {run.elevation.min}–{run.elevation.max} m
                    </span>
                  </div>
                  <MiniChart
                    {...run.elevation}
                    className="mt-1.5 h-12 w-full"
                    color="var(--accent-2)"
                  />
                </div>
              )}

              {run.hr && (
                <div>
                  <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-wider text-muted">
                    <span>Heart rate</span>
                    <span className="font-mono normal-case">
                      avg {run.hr.avg} · max {run.hr.max} bpm
                    </span>
                  </div>
                  <MiniChart {...run.hr} className="mt-1.5 h-12 w-full" color="#ef4444" />
                </div>
              )}

              {!cover && run.map && (
                <div className="overflow-hidden rounded-xl border border-border bg-surface-2 p-2">
                  <RouteMap map={run.map} className="aspect-[2/1] w-full" />
                </div>
              )}

              <div className="grid grid-cols-3 gap-y-3 gap-x-2">
                {run.calories != null && <Stat label="cal" value={`${run.calories}`} />}
                {cadence && <Stat label="spm" value={`${cadence}`} />}
                {run.relativeEffort != null && (
                  <Stat label="effort" value={`${run.relativeEffort}`} />
                )}
                {maxKmh && <Stat label="max km/h" value={maxKmh} />}
                {run.achievements > 0 && <Stat label="awards" value={`${run.achievements}`} />}
                {run.kudos > 0 && <Stat label="kudos" value={`${run.kudos}`} />}
              </div>

              {shoe && (
                <p className="text-xs text-muted">
                  <span className="text-accent">{shoe.label}</span> · {shoe.model}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                {resultUrl && (
                  <a
                    href={resultUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
                  >
                    Official result
                  </a>
                )}
                <a
                  href={stravaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fc4c02]" />
                  View on Strava
                </a>
              </div>
            </div>
          </details>
        )}
      </div>

      {run.photos.length > 0 && (
        <PhotoLightbox
          photos={run.photos}
          alt={run.name}
          open={lightboxOpen}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </div>
  );
}
