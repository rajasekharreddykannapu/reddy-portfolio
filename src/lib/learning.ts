// Field notes — what a Principal EM at Kenyt.AI should read and learn.
// Editorial layer. Live headlines come from src/lib/feeds.ts and ISR.

export const learningProfile = {
  kicker: "Field notes",
  headline: "Stay ahead of the systems you already own.",
  intro:
    "Daily reading and a short learning stack, mapped to Kenyt: .NET 8, Angular, Azure, Elasticsearch, and AI products — plus the leadership work of a 9-person team.",
};

export type DailySlot = {
  when: string;
  minutes: string;
  title: string;
  detail: string;
};

export const dailyRitual: DailySlot[] = [
  {
    when: "Morning",
    minutes: "15 min",
    title: "Scan the live timeline",
    detail:
      "Two posts max. Prefer .NET / Azure / Elastic over generic AI hype. If it cannot change a decision this quarter, skip it.",
  },
  {
    when: "Deep",
    minutes: "40 min · 3× week",
    title: "One architecture piece",
    detail:
      "System design, reliability, or AI evals. Take notes as if you will brief the team on Monday: problem, trade-off, what we would do.",
  },
  {
    when: "Build",
    minutes: "45 min · 3× week",
    title: "Touch the learning track",
    detail:
      "Ship a tiny artifact: a spike, a doc, a dashboard query. Reading without a build does not stick at this level.",
  },
];

export type Track = {
  id: string;
  title: string;
  why: string;
  start: string[];
  sources: { label: string; href: string }[];
};

export const tracks: Track[] = [
  {
    id: "ai",
    title: "AI product engineering",
    why: "Kenyt ships conversational AI. The job is evals, latency, cost, and retrieval quality — not demo prompts.",
    start: [
      "Azure OpenAI + your own eval set (golden conversations, not vibes)",
      "RAG with Elasticsearch kNN / semantic search on real Kenyt corpora",
      "Tool-calling agents with hard timeouts, tracing, and fallbacks",
    ],
    sources: [
      { label: "Azure OpenAI docs", href: "https://learn.microsoft.com/azure/ai-foundry/" },
      { label: "OpenAI evals", href: "https://platform.openai.com/docs/guides/evals" },
      { label: "Elasticsearch vector search", href: "https://www.elastic.co/docs/solutions/search/vector" },
    ],
  },
  {
    id: "dotnet",
    title: ".NET 9 / Aspire / observability",
    why: "You already moved 4.8 → 8. The next win is cloud-native ops: OpenTelemetry, Aspire, and fewer snowflake clusters.",
    start: [
      ".NET Aspire dashboard against one Kenyt service",
      "OpenTelemetry traces from ASP.NET through Elasticsearch calls",
      "Native AOT / trimming only where it pays; ignore the rest",
    ],
    sources: [
      { label: ".NET blog", href: "https://devblogs.microsoft.com/dotnet/" },
      { label: "Aspire", href: "https://learn.microsoft.com/dotnet/aspire/get-started/aspire-overview" },
      { label: "ASP.NET Core", href: "https://learn.microsoft.com/aspnet/core/" },
    ],
  },
  {
    id: "angular",
    title: "Angular 16 → current",
    why: "You already did v8 → v16. Signals, zoneless change detection, and new control flow are the next migration, not another rewrite.",
    start: [
      "Signals + computed in one dashboard widget",
      "New control flow (@if / @for) on a high-traffic view",
      "Read the upgrade guide; plan v17+ like you planned v16",
    ],
    sources: [
      { label: "Angular blog", href: "https://blog.angular.dev/" },
      { label: "Update guide", href: "https://angular.dev/update-guide" },
      { label: "Signals", href: "https://angular.dev/guide/signals" },
    ],
  },
  {
    id: "data",
    title: "Search & cache at Kenyt scale",
    why: "Elasticsearch and Redis already sit on the critical path. Vector search, query cost, and cache invalidation are the next reliability work.",
    start: [
      "Profile the slowest ES queries; add slow-log + circuit breakers",
      "Hybrid lexical + kNN for conversational retrieval",
      "Redis as request cache with explicit invalidation, not TTL-only",
    ],
    sources: [
      { label: "Elasticsearch blog", href: "https://www.elastic.co/blog" },
      { label: "Redis blog", href: "https://redis.io/blog/" },
      { label: "Azure Cache for Redis", href: "https://learn.microsoft.com/azure/azure-cache-for-redis/" },
    ],
  },
  {
    id: "systems",
    title: "Distributed systems you will be asked about",
    why: "SaaS across clusters: outbox, sagas, multi-tenant isolation, and blast-radius. This is interview-and-incident material.",
    start: [
      "Transactional outbox for one existing .NET write path",
      "Idempotent APIs and poison-message handling",
      "Multi-cluster rollout playbook (you already built the pipeline)",
    ],
    sources: [
      { label: "Azure Architecture Center", href: "https://learn.microsoft.com/azure/architecture/" },
      { label: "InfoQ Architecture", href: "https://www.infoq.com/architecture/" },
      { label: "Microsoft Architecture", href: "https://learn.microsoft.com/azure/architecture/guide/" },
    ],
  },
  {
    id: "lead",
    title: "Principal EM craft",
    why: "Nine people, multiple clusters, OKRs. The gap is strategy, hiring bar, and making architecture decisions stick without becoming a bottleneck.",
    start: [
      "One-page technical strategy per quarter, tied to OKRs",
      "Staff-engineer promotion criteria written down",
      "Incident review that produces a design change, not a slide",
    ],
    sources: [
      { label: "The Pragmatic Engineer", href: "https://newsletter.pragmaticengineer.com/" },
      { label: "StaffEng", href: "https://staffeng.com/" },
      { label: "Microsoft Engineering", href: "https://devblogs.microsoft.com/" },
    ],
  },
];

export const standingReads: { title: string; why: string; href: string }[] = [
  {
    title: ".NET blog",
    why: "Release cadence, ASP.NET, and runtime notes — your production stack.",
    href: "https://devblogs.microsoft.com/dotnet/",
  },
  {
    title: "Azure Architecture Center",
    why: "Reference architectures for the SaaS / multi-cluster problems you already run.",
    href: "https://learn.microsoft.com/azure/architecture/",
  },
  {
    title: "Angular blog",
    why: "Signals and the post-16 upgrade path before the next forced migration.",
    href: "https://blog.angular.dev/",
  },
  {
    title: "Elasticsearch engineering",
    why: "Query cost, vector search, and relevance — the conversational-AI data plane.",
    href: "https://www.elastic.co/blog",
  },
];
