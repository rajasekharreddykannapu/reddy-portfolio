const links = [
  { href: "#origin", label: "Origin" },
  { href: "#arc", label: "Proof" },
  { href: "#races", label: "Races" },
  { href: "#next", label: "Season" },
  { href: "#log", label: "Archive" },
];

export default function RunningHeader() {
  return (
    <header className="vt-header sticky top-0 z-50 border-b-2 border-border bg-background/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-10 py-3.5 max-sm:px-5">
        <a
          href="/"
          className="group flex shrink-0 items-center gap-2 text-[15px] font-extrabold text-foreground"
        >
          <span aria-hidden className="text-accent transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          Portfolio
        </a>
        <nav
          aria-label="Running sections"
          className="hidden min-w-0 items-center gap-6.5 text-[13px] font-semibold uppercase tracking-[0.06em] lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-line shrink-0 text-neutral-800 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="https://www.strava.com/athletes/202080481"
          target="_blank"
          rel="me noreferrer"
          className="btn-primary"
        >
          Strava
        </a>
      </div>
    </header>
  );
}
