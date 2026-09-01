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
      className="group relative mt-8 block overflow-hidden rounded-2xl border border-border bg-[#0b0e14] transition-[border-color,transform] duration-300 hover:border-accent/40 hover:shadow-[0_20px_60px_-24px_rgba(251,191,36,0.35)]"
      aria-label={`${gallery.title} — open event photo gallery`}
    >
      <div className="relative aspect-[21/9] min-h-[11rem] sm:aspect-[2.8/1]">
        <Image
          src={photoSrc(gallery.bannerPhoto)}
          alt={gallery.title}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
          <p className="kicker text-amber-200/80">Memzo · Event gallery</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            {gallery.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-amber-50/80 sm:text-[0.95rem]">
            {gallery.subtitle}
          </p>
          <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-xs text-amber-50 backdrop-blur transition-colors group-hover:border-accent/50 group-hover:bg-accent/20">
            View gallery
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </motion.a>
  );
}
