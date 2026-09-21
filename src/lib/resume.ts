export const profile = {
  name: "Kannapu Rajasekhar Reddy",
  title: "Principal Engineering Manager",
  location: "Hyderabad, India",
  email: "rajasekhar.sachin@gmail.com",
  linkedin: "https://www.linkedin.com/in/kannapurajasekharreddy/" as string | null,
  github: "https://github.com/rajasekharreddykannapu",
  /** Career start at Kenyt.AI — used for dynamic years-of-experience. */
  careerStart: "2019-06-01",
  valueProp:
    "Building production AI agents (voice, chat, and omnichannel) and the teams that ship them.",
  summary:
    "Principal Engineering Manager with 7+ years at Kenyt.AI, from one of its earliest engineers to leading engineering for its AI products. I design and ship production conversational AI (voice agents, chatbots, and CoPulse, an omnichannel customer engagement platform) for clients across real estate, healthcare, education, and government. I stay hands-on in architecture and code, from LLM prompt design and voice latency optimization to distributed backends on .NET 8, TypeScript, Kafka, Redis, and Postgres. Helped scale Kenyt from ₹10L to $1M in revenue and from 10 to 1,000+ customers.",
};

/** Full years since career start (June 2019). */
export function yearsOfExperience(now = new Date()): number {
  const start = new Date(`${profile.careerStart}T12:00:00`);
  const ms = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000)));
}

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: `${yearsOfExperience()}+`, label: "Years of experience" },
  { value: "Up to 9", label: "Engineers led" },
  { value: "1000+", label: "Customers scaled to" },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  start: string;
  end: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Principal Engineering Manager",
    company: "Kenyt.AI",
    start: "May 2025",
    end: "Present",
    bullets: [
      "Lead engineering for Kenyt.AI's conversational AI products, having led a team of up to 9 engineers across multiple client clusters.",
      "Architected CoPulse (copulse.app), a self-serve AI customer engagement platform unifying WhatsApp, Instagram, Messenger, email, voice, and web chat into a single inbox.",
      "Design and ship production voice agents and chatbots for clients in real estate, healthcare, education, and municipal government, owning prompt architecture and LLM integration (OpenAI, Anthropic).",
      "Optimized voice agent response latency from 10s to 2s on live outbound calls.",
      "Secured Meta App Review approval for Messenger and Instagram messaging permissions for CoPulse.",
      "Independently architected and executed full migration from .NET Framework 4.8 to .NET 8 (Mar 2025), enabling cloud-native application deployment and improving [TODO: metric, e.g. response time / throughput] by [TODO: %].",
      "Define the technical roadmap, aligning engineering work with business OKRs and scalable architecture.",
      "Mentor senior engineers and managers on best practices and architectural standards.",
    ],
  },
  {
    role: "Staff Engineering Manager",
    company: "Kenyt.AI",
    start: "Apr 2024",
    end: "Apr 2025",
    bullets: [
      "Scaled and managed a ~10-person engineering team delivering high-performance web applications for enterprise clients.",
      "Architected full-stack solutions and designed microservices-based distributed systems using C#, Angular & Elasticsearch, with a focus on API design, performance optimization, and reliability.",
      "Migrated Angular frontend from v8 to v16, improving performance and long-term framework supportability.",
      "Engineered Azure publish pipeline producing deployment-ready DLL artifacts for multi-cluster rollouts, eliminating manual build steps.",
    ],
  },
  {
    role: "Senior Technical Lead",
    company: "Kenyt.AI",
    start: "Mar 2023",
    end: "Mar 2024",
    bullets: [
      "Managed and mentored a team of 4 engineers; guided feature delivery and scalability improvements.",
      "Established CI/CD pipelines to accelerate releases; conducted code reviews and technical interviews.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Kenyt.AI",
    start: "Jun 2019",
    end: "Mar 2023",
    bullets: [
      "One of the earliest engineers at Kenyt.AI; built and scaled core platform capabilities that laid the foundation for the company's rapid growth.",
      "Built core components of Kenyt's conversational AI platform; optimised Elasticsearch queries for faster response times.",
      "Migrated dashboard from ASP.NET MVC to REST API + Angular architecture; built automated invoicing system.",
    ],
  },
  {
    role: "Research Intern",
    company: "Siemens Technology India",
    start: "May 2018",
    end: "Jul 2018",
    bullets: [
      "Evaluated YOLO & YOLOv2 for real-time object detection; built recognition pipeline for live and offline video streams.",
    ],
  },
];

export const education = {
  school: "Indian Institute of Technology, Kharagpur",
  year: "2019",
  degree: "Dual Degree – B.Tech & M.Tech, Computer Science & Engineering",
};

export const skills = [
  {
    group: "AI & LLM",
    items: [
      "LLM Integration (OpenAI, Anthropic)",
      "Prompt Engineering",
      "Voice AI Agents",
      "Conversational AI",
      "Omnichannel Messaging (WhatsApp, Instagram, Messenger)",
    ],
  },
  {
    group: "Architecture",
    items: [
      "Microservices",
      "System Design",
      "Distributed Systems",
      "Scalable Architecture",
      "API Design",
      "Design Patterns",
      "REST API",
    ],
  },
  {
    group: "Languages",
    items: ["C#", "C++", "JavaScript", "TypeScript"],
  },
  {
    group: "Frameworks",
    items: ["Angular", "ASP.NET Web API", ".NET 8", "Fastify", "React"],
  },
  {
    group: "Cloud & Data",
    items: ["Azure", "Elasticsearch", "Redis", "Postgres", "Kafka"],
  },
  {
    group: "Leadership & Practice",
    items: [
      "Technical Mentoring",
      "Team Leadership",
      "Agile / Scrum",
      "CI/CD Pipelines",
      "Performance Optimization",
    ],
  },
];

export type ImpactEntry = {
  title: string;
  description: string;
  metric: string;
};

export const impact: ImpactEntry[] = [
  {
    metric: "10s → 2s",
    title: "Real-Time Voice AI Latency",
    description:
      "Optimized the end-to-end response pipeline for outbound voice agents handling live sales and qualification calls, making conversations feel natural at production scale.",
  },
  {
    metric: "6 channels → 1 inbox",
    title: "CoPulse Omnichannel Platform",
    description:
      "Architected a self-serve AI customer engagement platform that unifies WhatsApp, Instagram, Messenger, email, voice, and web chat into a single inbox, including securing Meta App Review approval for messaging permissions.",
  },
  {
    metric: "[TODO: number] bots · 4 industries",
    title: "Production AI Agents Across Verticals",
    description:
      "Designed and shipped AI voice agents and chatbots for real estate, healthcare, education, and municipal government clients, owning prompt architecture, LLM integration, and deployment.",
  },
  {
    metric: "₹10L → $1M · 10 → 1000+ customers",
    title: "Scaling Kenyt.AI From Day One",
    description:
      "As one of the earliest engineers, built and scaled the core platform and conversational AI capabilities that underpinned the company's growth in revenue and customer base.",
  },
];
