"use client";

import { useEffect } from "react";

// A single delegated pointer listener that feeds cursor coordinates to whichever
// `.card-glow` element is under the pointer, driving its radial spotlight. One
// listener for the whole page — cheap even with dozens of cards.
export default function PointerSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let current: HTMLElement | null = null;

    function onMove(e: PointerEvent) {
      const el = (e.target as HTMLElement | null)?.closest?.(".card-glow") as
        | HTMLElement
        | null;
      current = el;
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!current) return;
        const r = current.getBoundingClientRect();
        current.style.setProperty("--mx", `${e.clientX - r.left}px`);
        current.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
