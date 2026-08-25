import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.96.59'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
