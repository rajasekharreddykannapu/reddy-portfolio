"use client";

import { useEffect, useState } from "react";

// Returns true when we should skip / lighten heavy 3D work:
// user prefers reduced motion, small screen, or no fine pointer (touch).
export function useLowPower() {
  const [low, setLow] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    setLow(reduce || small);
  }, []);

  return low;
}
