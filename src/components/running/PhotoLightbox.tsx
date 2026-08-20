"use client";

import Image from "next/image";
import { useEffect } from "react";
import { photoSrc } from "@/lib/runs";

type PhotoLightboxProps = {
  photos: string[];
  alt: string;
  open: boolean;
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function PhotoLightbox({
  photos,
  alt,
  open,
  index,
  onClose,
  onIndexChange,
}: PhotoLightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && photos.length > 1) {
        onIndexChange((index + 1) % photos.length);
      }
      if (e.key === "ArrowLeft" && photos.length > 1) {
        onIndexChange((index - 1 + photos.length) % photos.length);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, photos.length, onClose, onIndexChange]);

  if (!open || photos.length === 0) return null;

  const src = photos[index];

  return (
    <div
      className="photo-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} photo ${index + 1} of ${photos.length}`}
      onClick={onClose}
    >
      <button
        type="button"
        className="photo-lightbox-close"
        onClick={onClose}
        aria-label="Close gallery"
      >
        ×
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            className="photo-lightbox-nav photo-lightbox-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index - 1 + photos.length) % photos.length);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="photo-lightbox-nav photo-lightbox-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index + 1) % photos.length);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
          <p className="photo-lightbox-count">
            {index + 1} / {photos.length}
          </p>
        </>
      )}

      <div
        className="photo-lightbox-frame"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={photoSrc(src)}
          alt={alt}
          width={1600}
          height={1200}
          className="photo-lightbox-image"
          priority
        />
      </div>
    </div>
  );
}
