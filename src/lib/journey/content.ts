// Journey narrative — all content derived from the résumé (plus the
// runner identity the site owner described). No fabricated metrics.

export const hero = {
  greeting: "Hi, I'm",
  name: "Rajasekhar Reddy",
  roles: ["Principal Engineering Manager", "AI Builder", "Problem Solver"],
  tagline: "A journey through engineering, AI, and leadership.",
};

export type Chapter = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lede: string;
  points: string[];
  tags?: string[];
};

export const chapters: Chapter[] = [
  {
    id: "beginning",
    index: "01",
    kicker: "Chapter One",
    title: "The Beginning",
    lede: "A dual degree at IIT Kharagpur and an early pull toward how systems really work.",
    points: [
      "Dual Degree — B.Tech & M.Tech, Computer Science & Engineering, IIT Kharagpur (2019).",
      "Research intern at Siemens Technology India — evaluated YOLO & YOLOv2 for real-time object detection.",
      "Built a recognition pipeline for live and offline video streams.",
    ],
    tags: ["IIT Kharagpur", "Computer Vision", "Research"],
  },
  {
    id: "engineer",
    index: "02",
    kicker: "Chapter Two",
    title: "Growing as an Engineer",
    lede: "One of the earliest engineers at Kenyt.AI — building the core platform that powered the company's growth.",
    points: [
      "Built core components of Kenyt's conversational AI platform.",
      "Optimised Elasticsearch queries for faster response times.",
      "Migrated the dashboard from ASP.NET MVC to a REST API + Angular architecture.",
      "Built an automated invoicing system.",
    ],
    tags: ["C#", ".NET", "Angular", "Elasticsearch", "REST APIs"],
  },
  {
    id: "leadership",
    index: "03",
    kicker: "Chapter Three",
    title: "Leadership",
    lede: "From Senior Technical Lead to Principal Engineering Manager — scaling teams, architecture, and standards.",
    points: [
      "Lead a 9-person engineering team delivering AI-driven products across multiple clusters.",
      "Define and execute the strategic technical roadmap, aligning engineering with business OKRs.",
      "Mentor senior engineers and managers; drive best practices and architectural standards org-wide.",
      "Established CI/CD pipelines to accelerate releases; conducted code reviews and technical interviews.",
    ],
    tags: ["Team Leadership", "System Design", "Architecture", "Mentoring"],
  },
  {
    id: "ai",
    index: "04",
    kicker: "Chapter Four",
    title: "AI Builder",
    lede: "Architecting distributed, cloud-native systems behind an AI-driven SaaS platform.",
    points: [
      "Architected microservices-based distributed systems using C#, Angular & Elasticsearch.",
      "Independently migrated the platform from .NET Framework 4.8 to .NET 8, enabling cloud-native deployment.",
      "Engineered an Azure publish pipeline producing deployment-ready artifacts for multi-cluster rollouts.",
      "Focus on API design, performance optimization, and high-availability systems.",
    ],
    tags: ["AI Platforms", "Azure", "Microservices", ".NET 8", "Redis"],
  },
];

export const impact = [
  {
    metric: ".NET 4.8 → .NET 8",
    title: "Full-Platform Framework Migration",
    description:
      "Independently architected and executed a full migration to .NET 8, unlocking cloud-native deployment and measurable performance gains.",
    stack: ["C#", ".NET 8", "Azure"],
  },
  {
    metric: "Angular v8 → v16",
    title: "Frontend Modernization",
    description:
      "Led the Angular migration across the platform, improving runtime performance and long-term supportability without pausing delivery.",
    stack: ["Angular", "TypeScript"],
  },
  {
    metric: "Manual → Automated",
    title: "Azure Multi-Cluster Release Pipeline",
    description:
      "Engineered an automated Azure publish pipeline producing deployment-ready artifacts for multi-cluster rollouts, cutting release friction.",
    stack: ["Azure", "CI/CD"],
  },
  {
    metric: "₹10L → $1M · 10 → 1000+",
    title: "Scaling Kenyt.AI From Day One",
    description:
      "As one of the earliest engineers, built and scaled the core platform and conversational AI that underpinned the company's growth.",
    stack: ["Elasticsearch", "Distributed Systems"],
  },
];

export const experience = [
  {
    role: "Principal Engineering Manager",
    company: "Kenyt.AI",
    period: "May 2025 — Present",
    note: "Leading a 9-person team delivering AI-driven products across multiple clusters.",
  },
  {
    role: "Staff Engineering Manager",
    company: "Kenyt.AI",
    period: "Apr 2024 — Apr 2025",
    note: "Scaled a ~10-person team; architected microservices-based distributed systems.",
  },
  {
    role: "Senior Technical Lead",
    company: "Kenyt.AI",
    period: "Mar 2023 — Mar 2024",
    note: "Managed and mentored a team of 4; established CI/CD pipelines.",
  },
  {
    role: "Software Engineer",
    company: "Kenyt.AI",
    period: "Jun 2019 — Mar 2023",
    note: "One of the earliest engineers; built core platform capabilities.",
  },
  {
    role: "Research Intern",
    company: "Siemens Technology India",
    period: "May 2018 — Jul 2018",
    note: "Evaluated YOLO & YOLOv2 for real-time object detection.",
  },
];

// Skills for the galaxy — grouped so orbits can be tinted by domain.
export const skillPlanets: { name: string; group: "lang" | "cloud" | "arch" | "ai" | "lead" }[] = [
  { name: "C#", group: "lang" },
  { name: ".NET 8", group: "lang" },
  { name: "Angular", group: "lang" },
  { name: "JavaScript", group: "lang" },
  { name: "Azure", group: "cloud" },
  { name: "Elasticsearch", group: "cloud" },
  { name: "Redis", group: "cloud" },
  { name: "Microservices", group: "arch" },
  { name: "System Design", group: "arch" },
  { name: "API Design", group: "arch" },
  { name: "AI Platforms", group: "ai" },
  { name: "Leadership", group: "lead" },
];

export const contact = {
  email: "rajasekhar.sachin@gmail.com",
  linkedin: "https://www.linkedin.com/in/kannapurajasekharreddy/",
  github: "https://github.com/rajasekharreddykannapu",
};
