import type { Metadata } from "next";
import { profile } from "@/lib/resume";
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

const title = `Running — ${profile.name}`;

export const metadata: Metadata = {
  title,
  description: runningProfile.intro,
  alternates: {
    canonical: "/running",
  },
  openGraph: {
    type: "website",
    url: "https://krajasekharreddy.com/running",
    title,
    description: runningProfile.intro,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: runningProfile.intro,
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
