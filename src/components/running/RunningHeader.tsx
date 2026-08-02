import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "#journey", label: "Journey" },
  { href: "#races", label: "Races" },
  { href: "#log", label: "Every run" },
  { href: "#gear", label: "Gear" },
  { href: "#next", label: "Next up" },
];

export default function RunningHeader() {
  return (
    <header className="vt-header sticky top-0 z-50 animate-[fade-down_0.6s_ease-out] border-b border-border/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="group flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-muted transition-colors hover:text-foreground"
        >
          <span className="transition-transform group-hover:-translate-x-0.5">←</span>
          Portfolio
        </a>
        <nav className="hidden items-center gap-7 text-sm text-muted sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 transition-colors hover:text-foreground"
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
