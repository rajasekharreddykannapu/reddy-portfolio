"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollState } from "@/lib/journey/scrollStore";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // Native scrolling; still feed the scroll store for any parallax.
      const onScroll = () => {
        const limit = document.documentElement.scrollHeight - window.innerHeight;
        scrollState.progress = limit > 0 ? window.scrollY / limit : 0;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    lenis.on("scroll", (e: { animatedScroll: number; limit: number; velocity: number }) => {
      scrollState.progress = e.limit > 0 ? e.animatedScroll / e.limit : 0;
      scrollState.velocity = e.velocity;
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
