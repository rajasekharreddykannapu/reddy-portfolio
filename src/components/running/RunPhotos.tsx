"use client";

import Image from "next/image";
import { useState } from "react";
import { photoSrc } from "@/lib/runs";
import PhotoLightbox from "./PhotoLightbox";

type RunPhotosProps = {
  photos: string[];
  alt: string;
  /** grid = details panel; strip = horizontal scroll */
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

  const gridClass =
    layout === "strip"
      ? "flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1"
      : "grid grid-cols-3 gap-2";

  const itemClass =
    layout === "strip"
      ? "relative aspect-[4/3] w-[72%] shrink-0 snap-center overflow-hidden rounded-xl sm:w-[45%]"
      : "group/photo relative aspect-square overflow-hidden rounded-xl";

  return (
    <>
      <div className={`${gridClass} ${className}`}>
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
              sizes={layout === "strip" ? "45vw" : "120px"}
              className="object-cover transition-transform duration-500 group-hover/photo:scale-[1.04]"
            />
            <span className="photo-thumb-shine" aria-hidden />
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
