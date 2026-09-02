"use client";

import Image from "next/image";
import { useState } from "react";
import { photoSrc } from "@/lib/runs";
import PhotoLightbox from "./PhotoLightbox";

type RunPhotosProps = {
  photos: string[];
  alt: string;
  /** grid = details panel; strip = a ruled row of frames */
  layout?: "grid" | "strip";
  className?: string;
};

export default function RunPhotos({
  photos,
  alt,
  layout = "grid",
  className = "",
}: RunPhotosProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (photos.length === 0) return null;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  // The 2px gap is the divider; frames are square-cornered and grayscale.
  const wrapClass =
    layout === "strip"
      ? "grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-0.5 bg-[var(--border)]"
      : "grid grid-cols-3 gap-0.5 bg-[var(--border)]";

  const itemClass = layout === "strip" ? "relative h-40" : "relative aspect-square";

  return (
    <>
      <div className={`${wrapClass} ${className}`}>
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openAt(i)}
            className={`${itemClass} photo-thumb`}
            aria-label={`View ${alt} photo ${i + 1}`}
          >
            <Image
              src={photoSrc(src)}
              alt={alt}
              fill
              sizes={layout === "strip" ? "45vw" : "160px"}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <PhotoLightbox
        photos={photos}
        alt={alt}
        open={open}
        index={index}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
