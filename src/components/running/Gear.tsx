"use client";

import { motion } from "framer-motion";
import { gear } from "@/lib/running";
import { liveGearKm } from "@/lib/runs";
import { fadeUp } from "@/lib/motion";

/** Compact shoe strip — lives under the archive, not as a full chapter. */
export default function Gear() {
  const live = liveGearKm(gear);
  const totalKm = live[0]?.totalKm ?? gear.reduce((s, g) => s + g.km, 0);

  return (
    <motion.div
      variants={fadeUp}
      className="mt-14 border-t-2 border-border border-b-2 pb-10 pt-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-[1.1875rem]">Shoe rotation</h3>
        <p className="kicker">
          <span className="text-accent">{totalKm} km</span> across {gear.length} pairs
        </p>
      </div>
      <p className="mt-2 max-w-[62ch] text-sm text-neutral-700">
        The Nimbus carries the volume; the Novablast only comes out on race mornings.
      </p>
      <div className="rule-grid mt-5 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {gear.map((shoe, i) => (
          <article key={shoe.model} className="p-4">
            <div className="flex items-baseline justify-between gap-3">
              <p className="kicker">{shoe.name}</p>
              <p className="metric text-base text-accent">{live[i]?.km ?? shoe.km} km</p>
            </div>
            <h4 className="mt-2 text-base font-extrabold">{shoe.model}</h4>
            <p className="mt-1 text-[13px] text-neutral-700">{shoe.role}</p>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
