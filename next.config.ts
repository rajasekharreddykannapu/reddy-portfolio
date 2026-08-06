import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serverful on Vercel so /api/strava/webhook can receive Strava push events.
  // Pages remain statically generated where possible.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
