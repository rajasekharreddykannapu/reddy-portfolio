import SocialLinks from "@/components/SocialLinks";
import MobileNav from "@/components/MobileNav";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#impact", label: "Impact" },
  { href: "/running", label: "Running" },
  { href: "/learning", label: "Learning" },
];

export default function Header() {
  return (
    <header className="vt-header sticky top-0 z-50 animate-[fade-down_0.6s_ease-out] border-b-2 border-border bg-background/88 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-10 py-3.5 max-sm:px-5">
        <a href="#top" className="text-xl font-extrabold tracking-[-0.03em] text-foreground">
          RRK<span className="text-accent">.</span>
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-[13px] font-semibold uppercase tracking-[0.06em] lg:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-line text-neutral-800 transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <SocialLinks className="max-sm:hidden" />
          <a href="#contact" className="btn-primary">
            Get in touch
          </a>
          <MobileNav links={links} label="Primary" showSocial />
        </div>
      </div>
    </header>
  );
}
