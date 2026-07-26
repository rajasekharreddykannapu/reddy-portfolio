import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Journey — Rajasekhar Reddy",
  description:
    "An interactive journey through engineering, AI, leadership, and the long road — by Rajasekhar Reddy, Principal Engineering Manager.",
  alternates: { canonical: "/journey" },
  openGraph: {
    type: "website",
    url: "https://krajasekharreddy.com/journey",
    title: "My Journey — Rajasekhar Reddy",
    description: "An interactive, cinematic journey through my career and life.",
  },
};

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
