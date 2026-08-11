import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#origin", label: "Origin" },
  { href: "#arc", label: "Proof" },
  { href: "#races", label: "Races" },
  { href: "#next", label: "Season" },
  { href: "#log", label: "Archive" },
];

export default function RunningHeader() {
  return (
    <header className="vt-header sticky top-0 z-50 animate-[fade-down_0.6s_ease-out] border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-3.5">
        <a
          href="/"
          className="group flex shrink-0 items-center gap-2 font-mono text-sm font-medium tracking-tight text-muted transition-colors hover:text-foreground"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          Portfolio
        </a>
        <nav className="flex min-w-0 flex-1 items-center justify-end gap-5 overflow-x-auto text-sm text-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative shrink-0 py-1 transition-colors hover:text-foreground"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
