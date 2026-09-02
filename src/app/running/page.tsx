import type { Metadata } from "next";
import { runningDescription, runningOgImage, siteUrl } from "@/lib/seo";
import { runningProfile } from "@/lib/running";
import RunningHeader from "@/components/running/RunningHeader";
import RunningHero from "@/components/running/RunningHero";
import Origin from "@/components/running/Origin";
import ProgressionChart from "@/components/running/ProgressionChart";
import JourneyCharts from "@/components/running/JourneyCharts";
import Races from "@/components/running/Races";
import TrainingEngine from "@/components/running/TrainingEngine";
import Upcoming from "@/components/running/Upcoming";
import RunLog from "@/components/running/RunLog";
import Gear from "@/components/running/Gear";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Running",
  description: runningDescription,
  alternates: {
    canonical: "/running",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/running`,
    title: "Running",
    description: runningDescription,
    siteName: runningProfile.name,
    images: [runningOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Running",
    description: runningDescription,
    images: [runningOgImage.url],
  },
};

/**
 * No tinted section wrappers — the 2px rules inside each section do the
 * separating, and PointerSpotlight is gone (no cursor glow in a flat system).
 */
export default function RunningPage() {
  return (
    <>
      <RunningHeader />
      <main className="flex-1">
        <RunningHero />
        <Origin />
        <ProgressionChart />
        <JourneyCharts />
        <Races />
        <TrainingEngine />
        <Upcoming />
        <RunLog />
        <Gear />
      </main>
      <Footer />
    </>
  );
}
