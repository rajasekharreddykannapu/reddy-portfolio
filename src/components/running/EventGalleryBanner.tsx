"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { photoSrc } from "@/lib/runs";
import { fadeUp, viewportOnce } from "@/lib/motion";

type EventGalleryBannerProps = {
  gallery: {
    url: string;
    bannerPhoto: string;
    title: string;
    subtitle: string;
  };
};

/** Photo left, type right — no overlay gradient, no tinted imagery. */
export default function EventGalleryBanner({ gallery }: EventGalleryBannerProps) {
  return (
    <motion.a
      href={gallery.url}
      target="_blank"
      rel="noreferrer"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="rule-row group grid grid-cols-[minmax(0,1fr)_1.2fr] border-2 border-border text-foreground max-[760px]:grid-cols-1"
      aria-label={`${gallery.title} — open event photo gallery`}
    >
      <div className="relative min-h-[11rem]">
        <Image
          src={photoSrc(gallery.bannerPhoto)}
          alt={gallery.title}
          fill
          sizes="(max-width: 760px) 100vw, 480px"
          className="grayscale-photo object-cover"
        />
      </div>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">
          Memzo · Event gallery
        </p>
        <h3 className="mt-2 text-xl">{gallery.title}</h3>
        <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.5] text-neutral-800">
          {gallery.subtitle}
        </p>
        <span className="mt-3 inline-block text-[13px] font-bold uppercase tracking-[0.08em] text-accent-700">
          View gallery →
        </span>
      </div>
    </motion.a>
  );
}
