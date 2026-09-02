"use client";

import { motion } from "framer-motion";
import { gear } from "@/lib/running";
import { fadeUp } from "@/lib/motion";
import Section from "@/components/Section";

export default function Gear() {
  return (
    <Section
      id="gear"
      index="08"
      title="Shoe rotation"
      intro="Four pairs, 434 km between them. The Nimbus carries the volume; the Novablast only comes out on race mornings."
    >
      <motion.div
        variants={fadeUp}
        className="rule-grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))]"
      >
        {gear.map((shoe) => (
          <article key={shoe.model} className="p-5.5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="kicker">{shoe.name}</p>
              <p className="metric text-lg text-accent">{shoe.km} km</p>
            </div>
            <h3 className="mt-3.5 text-[1.1875rem]">{shoe.model}</h3>
            <p className="mt-2 text-sm text-neutral-800">{shoe.role}</p>
          </article>
        ))}
      </motion.div>
    </Section>
  );
}
