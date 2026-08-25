// Curated RSS → live timeline. Fetched on the server; the /learning page
// revalidates on a schedule so headlines stay fresh without a database.

export type FeedItem = {
  title: string;
  href: string;
  date: string; // ISO
  source: string;
  track: string;
};

export type FeedSource = {
  id: string;
  name: string;
  href: string;
  rss: string;
  track: string;
};

export const feedSources: FeedSource[] = [
  {
    id: "dotnet",
    name: ".NET",
    href: "https://devblogs.microsoft.com/dotnet/",
    rss: "https://devblogs.microsoft.com/dotnet/feed/",
    track: "dotnet",
  },
  {
    id: "azure",
    name: "Azure",
    href: "https://azure.microsoft.com/blog/",
    rss: "https://azure.microsoft.com/en-us/blog/feed/",
    track: "systems",
  },
  {
    id: "angular",
    name: "Angular",
    href: "https://blog.angular.dev/",
    rss: "https://blog.angular.dev/feed",
    track: "angular",
  },
  {
    id: "elastic",
    name: "Elastic",
    href: "https://www.elastic.co/blog",
    rss: "https://www.elastic.co/blog/feed",
    track: "data",
  },
  {
    id: "infoq",
    name: "InfoQ",
    href: "https://www.infoq.com/architecture/",
    rss: "https://feed.infoq.com/architecture/",
    track: "systems",
  },
  {
    id: "msdev",
    name: "Microsoft DevBlogs",
    href: "https://devblogs.microsoft.com/",
    rss: "https://devblogs.microsoft.com/feed/",
    track: "lead",
  },
];

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, " ")
    .trim();
}

function tag(block: string, names: string[]): string | null {
  for (const name of names) {
    const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i");
    const m = block.match(re);
    if (m?.[1]) return decodeEntities(m[1]);
    const attr = block.match(new RegExp(`<${name}[^>]+href=["']([^"']+)["']`, "i"));
    if (attr?.[1]) return decodeEntities(attr[1]);
  }
  return null;
}

function parseDate(raw: string | null): string | null {
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function parseFeed(xml: string, source: FeedSource): FeedItem[] {
  const chunks = [
    ...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi),
    ...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi),
  ];

  const items: FeedItem[] = [];
  for (const m of chunks) {
    const block = m[0];
    const title = tag(block, ["title"]);
    const href =
      tag(block, ["link"]) ||
      block.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] ||
      null;
    const date = parseDate(
      tag(block, ["pubDate", "published", "updated", "dc:date"]),
    );
    if (!title || !href || !date) continue;
    items.push({
      title: title.slice(0, 180),
      href: href.trim(),
      date,
      source: source.name,
      track: source.track,
    });
  }
  return items;
}

async function fetchOne(source: FeedSource): Promise<FeedItem[]> {
  const res = await fetch(source.rss, {
    headers: {
      Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml",
      "User-Agent": "krajasekharreddy.com/learning (+https://krajasekharreddy.com/learning)",
    },
    next: { revalidate: 14400 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return [];
  const xml = await res.text();
  return parseFeed(xml, source).slice(0, 8);
}

export async function loadTimeline(limit = 18): Promise<{
  items: FeedItem[];
  fetchedAt: string;
  failed: string[];
}> {
  const results = await Promise.allSettled(feedSources.map(fetchOne));
  const failed: string[] = [];
  const items: FeedItem[] = [];

  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      items.push(...r.value);
    } else {
      failed.push(feedSources[i].name);
    }
  });

  const seen = new Set<string>();
  const unique = items.filter((item) => {
    const key = item.href.split("?")[0];
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  unique.sort((a, b) => (a.date < b.date ? 1 : -1));

  return {
    items: unique.slice(0, limit),
    fetchedAt: new Date().toISOString(),
    failed,
  };
}

export function fmtFeedDay(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}
