import { profile } from "@/lib/resume";

export default function Footer() {
  return (
    <footer className="border-t-2 border-border">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-10 py-8 text-sm text-muted max-sm:px-5">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <nav className="flex gap-5">
          <a href="/running" className="link-line transition-colors hover:text-accent-700">
            Running
          </a>
          <a href="/learning" className="link-line transition-colors hover:text-accent-700">
            Learning
          </a>
          <a href="#top" className="link-line transition-colors hover:text-accent-700">
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  );
}
