import { profile } from "@/lib/resume";

export const siteUrl = "https://krajasekharreddy.com";

export const siteName = profile.name;

export const defaultTitle = `${profile.name} — ${profile.title}`;

export const titleTemplate = `%s · ${profile.name}`;

export const homeDescription =
  "Principal Engineering Manager · .NET 8, Azure, Angular · scaled Kenyt.AI to 1000+ customers · Hyderabad, India";

export const runningDescription =
  "22 km Sunday runs, sub-2 half marathon, live Strava stats — the running journey of Kannapu Rajasekhar Reddy.";

export const learningDescription =
  "Daily reading OS for .NET, Azure, Angular, Elastic, and AI product engineering — field notes from the desk.";

export const sameAs = [profile.linkedin, profile.github].filter(
  (url): url is string => Boolean(url),
);

export const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${profile.name} — ${profile.title}`,
};

export const runningOgImage = {
  url: "/running/photos/nmdc-finish.jpg",
  width: 1200,
  height: 800,
  alt: "NMDC Hyderabad Half Marathon finish",
};

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email,
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN",
    },
    sameAs,
    worksFor: {
      "@type": "Organization",
      name: "Kenyt.AI",
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: homeDescription,
    author: {
      "@type": "Person",
      name: profile.name,
    },
  };
}
