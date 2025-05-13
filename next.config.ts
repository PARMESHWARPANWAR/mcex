import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // swcMinify: true,
  images: {
    domains: ['*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
