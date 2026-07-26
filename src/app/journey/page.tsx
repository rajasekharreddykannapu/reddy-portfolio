"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/journey/SmoothScroll";
import JourneyContent from "@/components/journey/JourneyContent";
import { useLowPower } from "@/lib/journey/useLowPower";

const Universe = dynamic(() => import("@/components/journey/Universe"), {
  ssr: false,
  loading: () => null,
});

export default function JourneyPage() {
  const low = useLowPower();

  return (
    <SmoothScroll>
      <main className="relative min-h-screen overflow-x-hidden text-white">
        {/* Base backdrop behind the canvas (also the pre-hydration color). */}
        <div className="fixed inset-0 -z-20 bg-[#05070a]" />

        {/* 3D universe (or a static, GPU-cheap fallback on low-power devices). */}
        {low ? (
          <div className="fixed inset-0 -z-10 bg-[#05070a]">
            <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_8%,rgba(251,191,36,0.16),transparent_60%),radial-gradient(50%_40%_at_85%_14%,rgba(251,146,60,0.12),transparent_60%)]" />
          </div>
        ) : (
          <Universe />
        )}

        {/* Vignette for legibility over the 3D scene. */}
        <div className="pointer-events-none fixed inset-0 -z-[5] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,7,10,0.55))]" />

        <JourneyContent />
      </main>
    </SmoothScroll>
  );
}
