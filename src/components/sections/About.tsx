import { profile } from "@/lib/resume";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20">
      <h2 className="font-mono text-sm uppercase tracking-widest text-accent">About</h2>
      <p className="mt-5 max-w-3xl text-xl leading-relaxed text-foreground sm:text-2xl">
        {profile.summary}
      </p>
    </section>
  );
}
