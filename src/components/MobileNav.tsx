"use client";

import { useState } from "react";
import SocialLinks from "@/components/SocialLinks";

type NavLink = { href: string; label: string };

export default function MobileNav({
  links,
  label,
  showSocial = false,
}: {
  links: NavLink[];
  label: string;
  showSocial?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center border-2 border-border text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          aria-hidden
        >
          {open ? (
            <>
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full border-b-2 border-border bg-background"
        >
          <nav
            aria-label={label}
            className="mx-auto flex max-w-[1240px] flex-col px-10 py-1 max-sm:px-5"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="link-line border-t border-border py-3.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-neutral-800 transition-colors first:border-t-0 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            {showSocial ? (
              <div className="border-t border-border py-4">
                <SocialLinks />
              </div>
            ) : null}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
