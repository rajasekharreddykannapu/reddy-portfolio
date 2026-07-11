import { profile } from "@/lib/resume";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
      <p className="font-mono text-sm text-accent">{profile.location}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
        {profile.name}
      </h1>
      <p className="mt-3 text-xl font-medium text-muted sm:text-2xl">{profile.title}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.valueProp}</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <a
          href="#experience"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
        >
          View experience
        </a>
        <a
          href="#contact"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
