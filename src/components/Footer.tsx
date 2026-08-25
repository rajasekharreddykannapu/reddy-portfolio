import { profile } from "@/lib/resume";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav className="flex gap-5">
          <a href="/running" className="transition-colors hover:text-accent">
            Running
          </a>
          <a href="/learning" className="transition-colors hover:text-accent">
            Learning
          </a>
        </nav>
      </div>
    </footer>
  );
}
