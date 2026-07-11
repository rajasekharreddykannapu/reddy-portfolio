export const profile = {
  name: "Rajasekhar Reddy Kannapu",
  title: "Principal Engineering Manager",
  location: "Hyderabad, India",
  email: "rajasekhar.sachin@gmail.com",
  // TODO: replace with your real LinkedIn profile URL
  linkedin: null as string | null,
  github: "https://github.com/rajasekharreddykannapu",
  valueProp:
    "Building scalable, distributed, cloud-native SaaS platforms — and the teams that ship them.",
  summary:
    "Principal Engineering Manager with 6+ years of experience building scalable, distributed, cloud-native SaaS platforms. Proven track record of scaling systems, teams, and revenue (₹10L → $1M, 10 → 1000+ customers). Expertise in microservices architecture, API design, performance optimization, and high-availability systems using C#, Angular, and Azure. Strong background in technical leadership, system design, and engineering execution.",
};

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
      "Lead a 9-person engineering team delivering AI-driven products and SaaS platforms across multiple clusters.",
      "Define and execute the strategic technical roadmap, aligning engineering initiatives with business OKRs and scalable architecture principles.",
      "Mentor senior engineers and managers, driving best practices and architectural standards org-wide.",
      "Independently architected and executed full migration from .NET Framework 4.8 to .NET 8 (Mar 2025), enabling cloud-native application deployment and delivering measurable performance optimization across the platform.",
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
    items: ["C#", "C++", "JavaScript"],
  },
  {
    group: "Frameworks",
    items: ["Angular", "ASP.NET Web API", ".NET 8"],
  },
  {
    group: "Cloud & Data",
    items: ["Azure", "Elasticsearch", "Redis"],
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
    metric: ".NET 4.8 → .NET 8",
    title: "Full-Platform Framework Migration",
    description:
      "Independently architected and executed a full migration from .NET Framework 4.8 to .NET 8, unlocking cloud-native deployment and measurable performance gains across the platform.",
  },
  {
    metric: "Angular v8 → v16",
    title: "Frontend Modernization",
    description:
      "Led the Angular frontend migration across the platform, improving runtime performance and securing long-term framework supportability without pausing feature delivery.",
  },
  {
    metric: "Manual → Automated",
    title: "Azure Multi-Cluster Release Pipeline",
    description:
      "Engineered an automated Azure publish pipeline producing deployment-ready artifacts for multi-cluster rollouts, eliminating manual build steps and cutting release friction.",
  },
  {
    metric: "₹10L → $1M · 10 → 1000+ customers",
    title: "Scaling Kenyt.AI From Day One",
    description:
      "As one of the earliest engineers, built and scaled the core platform and conversational AI capabilities that underpinned the company's growth in revenue and customer base.",
  },
];
