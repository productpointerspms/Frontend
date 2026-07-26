import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  // Old per-program checkout pages were consolidated into one shared,
  // program-aware /checkout route — send any stale links there instead of 404s.
  async redirects() {
    return [
      { source: "/ppap/checkout", destination: "/checkout?program=PPAP", permanent: false },
      { source: "/ppip/checkout", destination: "/checkout?program=PPIP", permanent: false },
    ];
  },
};

export default nextConfig;
