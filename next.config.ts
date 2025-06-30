import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["storage.googleapis.com"],
  },
};

export default nextConfig;
