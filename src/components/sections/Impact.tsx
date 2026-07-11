import { impact } from "@/lib/resume";

export default function Impact() {
  return (
    <section id="impact" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-mono text-sm uppercase tracking-widest text-accent">Selected Impact</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {impact.map((item) => (
          <div
            key={item.title}
            className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
          >
            <p className="font-mono text-sm font-medium text-accent">{item.metric}</p>
            <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
