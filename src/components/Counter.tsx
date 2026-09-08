"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Parses a stat like "1000+" into { target: 1000, prefix: "", suffix: "+" }.
function parse(value: string) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    target: Number(match[2].replace(/,/g, "")),
    suffix: match[3],
  };
}

/**
 * Always SSR / first-paint the final value — never flash "0".
 * When in view, optionally count up from ~70% of the target.
 */
export default function Counter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const parsed = useMemo(() => parse(value), [value]);
  const [display, setDisplay] = useState<number | string>(() =>
    parsed ? parsed.target : value,
  );
  const animated = useRef(false);

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }
    // Keep the painted value in sync if the prop changes (e.g. live stats).
    if (!animated.current) setDisplay(parsed.target);
  }, [parsed, value]);

  useEffect(() => {
    if (!parsed || !inView || reduce || animated.current) return;
    animated.current = true;
    const from = Math.max(0, Math.round(parsed.target * 0.7));
    const controls = animate(from, parsed.target, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, parsed]);

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={`tabular-nums ${className}`.trim()}>
      {parsed.prefix}
      {typeof display === "number" ? display.toLocaleString() : display}
      {parsed.suffix}
    </span>
  );
}
