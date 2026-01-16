import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: process.env.APP_ENV === 'export' ? 'export' : undefined,
  images: { unoptimized: process.env.APP_ENV === 'export' },
  reactCompiler: true,
};

export default nextConfig;
