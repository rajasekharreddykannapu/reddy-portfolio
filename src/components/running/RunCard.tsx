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

/** A right-aligned numeric cell in the log row. */
function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-right max-[760px]:text-left">
      <p className="metric text-[15px]">{value}</p>
      <p className="kicker mt-0.5 text-[10px]">{label}</p>
    </div>
  );
}

/** A stat inside the expanded details panel. */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="metric text-[15px]">{value}</p>
      <p className="kicker mt-0.5 text-[10px]">{label}</p>
    </div>
  );
}

/**
 * One run as a ruled ledger row: name and meta on the left, the four numbers
 * right-aligned, with photos and Details folded underneath.
 */
export default function RunCard({ run }: { run: Run }) {
  const shoe = run.gearId ? gearById[run.gearId] ?? gearById[run.gearId.replace(/^g/, "")] : null;
  const cadence = run.avgCadence ? Math.round(run.avgCadence * 2) : null;
  const maxKmh = run.maxSpeed ? (run.maxSpeed * 3.6).toFixed(1) : null;
  const stravaUrl = `https://www.strava.com/activities/${run.id}`;
  const resultUrl = resultUrlForRunId(run.id);
  const cover = primaryPhoto(run.photos);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const hasDetail =
    run.elevation || run.hr || run.description || run.photos.length > 0 || run.video || run.calories;

  const meta = [
    fmtTimeOfDay(run.date),
    run.photos.length > 1 ? `${run.photos.length} photos` : null,
    run.video ? "video" : null,
    run.prCount > 0 ? `${run.prCount} PR` : null,
  ].filter(Boolean);

  return (
    <div className="rule-row border-b-2 border-border">
      <div className="grid grid-cols-[1fr_86px_repeat(4,68px)] items-baseline gap-4 py-4 pr-3 max-[760px]:grid-cols-2">
        <div className="min-w-0">
          <h4 className="truncate text-base font-extrabold" title={run.name}>
            {run.name}
          </h4>
          {meta.length > 0 && (
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.08em] text-accent">
              {meta.join(" · ")}
            </p>
          )}
        </div>
        <p className="text-[13px] font-semibold text-neutral-700">{fmtDay(run.date)}</p>
        <Cell label="km" value={fmtKm(run.distance)} />
        <Cell label="/km" value={run.pace ?? "—"} />
        <Cell label="time" value={run.duration ?? "—"} />
        <Cell label="elev" value={`${Math.round(run.elevationGain)}m`} />
      </div>

      {cover && (
        <button
          type="button"
          className="relative mb-4 block h-40 w-full cursor-zoom-in border-2 border-border text-left"
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
            sizes="(max-width: 900px) 100vw, 900px"
            className="grayscale-photo object-cover"
          />
        </button>
      )}

      {hasDetail && (
        <details className="group/d mb-4">
          <summary className="flex cursor-pointer list-none items-center justify-between border-t-2 border-border pt-3 text-sm font-bold uppercase tracking-[0.08em] text-neutral-700 transition-colors hover:text-accent-700">
            <span>Details</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 transition-transform group-open/d:rotate-180"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>

          <div className="mt-4 grid gap-4">
            {run.video && (
              <div className="border-2 border-border">
                <RunVideo video={run.video} title={run.name} />
              </div>
            )}

            {run.description && (
              <p className="border-l-2 border-accent pl-3 text-sm leading-relaxed text-neutral-800">
                {run.description}
              </p>
            )}

            {run.photos.length > 0 && <RunPhotos photos={run.photos} alt={run.name} layout="strip" />}

            {run.elevation && (
              <div>
                <div className="kicker flex items-center justify-between">
                  <span>Elevation</span>
                  <span className="metric text-[13px] normal-case tracking-normal">
                    {run.elevation.min}–{run.elevation.max} m
                  </span>
                </div>
                <MiniChart {...run.elevation} className="mt-1.5 h-12 w-full" color="var(--accent)" />
              </div>
            )}

            {run.hr && (
              <div>
                <div className="kicker flex items-center justify-between">
                  <span>Heart rate</span>
                  <span className="metric text-[13px] normal-case tracking-normal">
                    avg {run.hr.avg} · max {run.hr.max} bpm
                  </span>
                </div>
                <MiniChart {...run.hr} className="mt-1.5 h-12 w-full" color="var(--neutral-700)" />
              </div>
            )}

            {!cover && run.map && (
              <div className="border-2 border-border p-2">
                <RouteMap map={run.map} className="aspect-[2/1] w-full" />
              </div>
            )}

            <div className="grid grid-cols-3 gap-x-4 gap-y-3 sm:grid-cols-6">
              {run.calories != null && <Stat label="cal" value={`${run.calories}`} />}
              {cadence && <Stat label="spm" value={`${cadence}`} />}
              {run.relativeEffort != null && <Stat label="effort" value={`${run.relativeEffort}`} />}
              {maxKmh && <Stat label="max km/h" value={maxKmh} />}
              {run.achievements > 0 && <Stat label="awards" value={`${run.achievements}`} />}
              {run.kudos > 0 && <Stat label="kudos" value={`${run.kudos}`} />}
            </div>

            {shoe && (
              <p className="text-[13px] text-neutral-700">
                <span className="text-accent-700">{shoe.label}</span> · {shoe.model}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {resultUrl && (
                <a href={resultUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                  Official result
                </a>
              )}
              <a href={stravaUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                View on Strava
              </a>
            </div>
          </div>
        </details>
      )}

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
