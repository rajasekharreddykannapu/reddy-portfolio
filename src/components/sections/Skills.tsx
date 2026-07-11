import { skills } from "@/lib/resume";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-mono text-sm uppercase tracking-widest text-accent">Skills</h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.group}>
            <h3 className="text-sm font-medium text-muted">{group.group}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
