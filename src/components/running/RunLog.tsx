import { runsOnly, groupByMonth } from "@/lib/runs";
import SectionHeading from "@/components/SectionHeading";
import RunCard from "./RunCard";

export default function RunLog() {
  const months = groupByMonth(runsOnly);

  return (
    <section id="log" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading index="03">Every run</SectionHeading>
      <p className="mt-4 max-w-2xl text-muted">
        All {runsOnly.length} runs, straight from Strava — each with its GPS route. Open{" "}
        <span className="text-foreground">Details</span> for elevation, heart rate, splits and
        photos.
      </p>

      <div className="mt-10 space-y-12">
        {months.map((month) => (
          <div key={month.key}>
            <div className="sticky top-14 z-20 -mx-6 flex flex-wrap items-baseline justify-between gap-2 border-b border-border bg-background/75 px-6 py-2.5 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-foreground">
                {month.label}
              </h3>
              <p className="font-mono text-sm text-muted">
                <span className="text-accent">{month.count}</span>{" "}
                {month.count === 1 ? "run" : "runs"} ·{" "}
                {month.distanceKm.toFixed(0)} km · {month.elevation} m ↑
              </p>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {month.runs
                .slice()
                .sort((a, b) => (a.date < b.date ? 1 : -1))
                .map((run) => (
                  <RunCard key={run.id} run={run} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
