import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#daily", label: "Daily" },
  { href: "#tracks", label: "Learn" },
  { href: "#timeline", label: "Timeline" },
];

export default function LearningHeader() {
  return (
    <header className="vt-header sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-3">
        <a
          href="/"
          className="group flex shrink-0 items-center gap-1.5 text-[0.8125rem] font-medium tracking-tight text-muted transition-colors hover:text-foreground"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          Portfolio
        </a>
        <nav className="flex min-w-0 flex-1 items-center justify-end gap-5 overflow-x-auto text-[0.8125rem] text-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative shrink-0 py-1 transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
