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
import PointerSpotlight from "@/components/running/PointerSpotlight";
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

export default function RunningPage() {
  return (
    <>
      <PointerSpotlight />
      <RunningHeader />
      <main className="flex-1">
        <RunningHero />
        <Origin />
        <div className="border-y border-border/50 bg-surface-2/40">
          <ProgressionChart />
          <JourneyCharts />
        </div>
        <Races />
        <div className="border-y border-border/50 bg-surface-2/40">
          <TrainingEngine />
        </div>
        <Upcoming />
        <div className="border-t border-border/50 bg-surface-2/40">
          <RunLog />
          <Gear />
        </div>
      </main>
      <Footer />
    </>
  );
}
