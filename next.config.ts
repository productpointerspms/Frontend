import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "production" ? ".next-production" : ".next",
  output: 'export',
  trailingSlash: true,
  agentRules: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
