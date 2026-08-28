import type { Metadata } from "next";
import {
  defaultOgImage,
  learningDescription,
  siteName,
  siteUrl,
} from "@/lib/seo";
import {
  learningProfile,
  dailyRitual,
  tracks,
  standingReads,
} from "@/lib/learning";
import { loadTimeline, fmtFeedDay, feedSources } from "@/lib/feeds";
import LearningHeader from "@/components/learning/LearningHeader";
import SectionHeading from "@/components/SectionHeading";
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
        <section className="relative mx-auto max-w-5xl overflow-hidden px-6 pt-16 pb-12 sm:pt-20">
          <div aria-hidden className="hero-glow opacity-30" />
          <p className="kicker text-accent">{learningProfile.kicker}</p>
          <h1 className="text-sheen mt-3 max-w-2xl text-[2.15rem] font-semibold tracking-tight sm:text-5xl sm:leading-[1.08]">
            {learningProfile.headline}
          </h1>
          <p className="mt-5 max-w-xl text-[0.975rem] leading-7 text-muted">
            {learningProfile.intro}
          </p>
        </section>

        <section id="daily" className="mx-auto max-w-5xl px-6 py-12">
          <SectionHeading index="01">Daily operating system</SectionHeading>
          <p className="mt-3 max-w-xl text-[0.975rem] leading-7 text-muted">
            Not a firehose. Three slots that fit around shipping and a 9-person team.
          </p>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {dailyRitual.map((slot) => (
              <li key={slot.title} className="border-t border-border pt-5">
                <p className="kicker text-accent">{slot.when}</p>
                <p className="mt-1 font-mono text-xs text-muted">{slot.minutes}</p>
                <h3 className="mt-3 text-base font-semibold text-foreground">{slot.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{slot.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="tracks"
          className="border-y border-border/50 bg-surface-2/40"
        >
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <SectionHeading index="02">Start learning now</SectionHeading>
            <p className="mt-3 max-w-xl text-[0.975rem] leading-7 text-muted">
              Sequenced for Kenyt: AI products on your existing C# / Angular / Azure / Elastic
              stack — not a career reset.
            </p>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {tracks.map((track) => (
                <article key={track.id} className="card p-6 sm:p-7">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {track.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{track.why}</p>
                  <ol className="mt-5 space-y-2">
                    {track.start.map((step, i) => (
                      <li key={step} className="flex gap-3 text-sm leading-snug text-foreground">
                        <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                    {track.sources.map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-xs text-muted transition-colors hover:text-accent"
                      >
                        {s.label} ↗
                      </a>
                    ))}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="timeline" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <SectionHeading index="03">Live reading timeline</SectionHeading>
          <p className="mt-3 max-w-xl text-[0.975rem] leading-7 text-muted">
            Headlines from .NET, Azure, Angular, Elastic, InfoQ, and Microsoft DevBlogs.
            Regenerates every four hours.
          </p>
          <p className="mt-4 font-mono text-xs text-muted">
            Last refresh · {refreshed} IST
            {failed.length > 0 ? ` · skipped ${failed.join(", ")}` : ""}
          </p>

          {items.length === 0 ? (
            <p className="mt-10 text-sm text-muted">
              Feeds did not load this pass. Standing sources are below — try a refresh later.
            </p>
          ) : (
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid gap-1 py-4 transition-colors hover:bg-surface-2/60 sm:grid-cols-[6.5rem_1fr_auto] sm:items-baseline sm:gap-6 sm:px-1"
                  >
                    <span className="font-mono text-xs text-muted">{fmtFeedDay(item.date)}</span>
                    <span>
                      <span className="font-medium text-foreground">{item.title}</span>
                    </span>
                    <span className="kicker sm:text-right">{item.source}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              Standing sources
            </h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {standingReads.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block border-t border-border pt-4 transition-colors hover:text-accent"
                  >
                    <p className="text-sm font-semibold text-foreground">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{s.why}</p>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-[0.65rem] leading-relaxed text-muted">
              Feeds: {feedSources.map((f) => f.name).join(" · ")}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
