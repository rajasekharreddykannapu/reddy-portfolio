import type { Metadata } from "next";
import {
  defaultOgImage,
  learningDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";
import { loadTimeline } from "@/lib/feeds";
import LearningHeader from "@/components/learning/LearningHeader";
import LearningHero from "@/components/learning/LearningHero";
import DailyRitual from "@/components/learning/DailyRitual";
import Tracks from "@/components/learning/Tracks";
import Timeline from "@/components/learning/Timeline";
import Footer from "@/components/Footer";

export const revalidate = 14400; // 4 hours — ISR + scheduled ping

export const metadata: Metadata = {
  title: "Field notes",
  description: learningDescription,
  alternates: { canonical: "/learning" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/learning`,
    title: "Field notes",
    description: learningDescription,
    siteName,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field notes",
    description: learningDescription,
    images: [defaultOgImage.url],
  },
};

/**
 * No tinted section wrappers — the 2px rules inside each section do the
 * separating, matching the portfolio and running pages.
 */
export default async function LearningPage() {
  const { items, fetchedAt, failed } = await loadTimeline();
  const refreshed = new Date(fetchedAt).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  return (
    <>
      <LearningHeader />
      <main className="flex-1">
        <LearningHero />
        <DailyRitual />
        <Tracks />
        <Timeline items={items} refreshed={refreshed} failed={failed} />
      </main>
      <Footer />
    </>
  );
}
