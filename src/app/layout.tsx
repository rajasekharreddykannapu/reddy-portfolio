import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { profile } from "@/lib/resume";
import MotionProvider from "@/components/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = `${profile.name} — ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://reddy-portfolio.vercel.app"),
  title: siteTitle,
  description: profile.summary,
  keywords: [
    "Engineering Manager",
    "Principal Engineer",
    "Software Architecture",
    "Microservices",
    "Distributed Systems",
    ".NET",
    "Azure",
    "Angular",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title: siteTitle,
    description: profile.valueProp,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: profile.valueProp,
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <MotionProvider>
          <ScrollProgress />
          {children}
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
