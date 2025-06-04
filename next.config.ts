import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // swcMinify: true,
   env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://127.0.0.1:8000',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Image optimization configuration
  images: {
    domains: ['127.0.0.1', 'localhost',],
    unoptimized: true, // For development with local server
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
