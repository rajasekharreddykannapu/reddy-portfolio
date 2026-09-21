"use client";

import { profile } from "@/lib/resume";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

const socials = [
  ...(profile.linkedin
    ? [{ label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon }]
    : []),
  { label: "GitHub", href: profile.github, Icon: GitHubIcon },
  { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon },
];

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socials.map(({ label, href, Icon }) => {
        const external = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            target={external ? "_blank" : undefined}
            rel={external ? "me noreferrer" : undefined}
            className="flex h-8 w-8 items-center justify-center text-neutral-700 transition-colors hover:text-accent"
          >
            <Icon className="h-[1.05rem] w-[1.05rem]" />
          </a>
        );
      })}
    </div>
  );
}
