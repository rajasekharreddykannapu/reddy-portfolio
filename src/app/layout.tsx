import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  defaultOgImage,
  defaultTitle,
  homeDescription,
  siteUrl,
  titleTemplate,
} from "@/lib/seo";
import MotionProvider from "@/components/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: titleTemplate,
  },
  description: homeDescription,
  keywords: [
    "Engineering Manager",
    "Principal Engineer",
    "Software Architecture",
    "Microservices",
    "Distributed Systems",
    ".NET",
    "Azure",
    "Angular",
    "Kannapu Rajasekhar Reddy",
  ],
  authors: [{ name: "Kannapu Rajasekhar Reddy", url: siteUrl }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: defaultTitle,
    description: homeDescription,
    siteName: "Kannapu Rajasekhar Reddy",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: homeDescription,
    images: [defaultOgImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#about"
          className="absolute left-[-9999px] top-0 z-100 bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <JsonLd />
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
