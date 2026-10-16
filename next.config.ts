import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev server from a phone/tablet on the same Wi-Fi (e.g. http://192.168.0.107:3000).
  // Without this, Next.js blocks its dev scripts for that address and the page never becomes interactive.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  // Smaller footprint on Hostinger shared hosting
  poweredByHeader: false,
  compress: true,
  images: {
    // Hostinger shared plans have no sharp-friendly CPU budget; serve images as-is.
    unoptimized: true,
  },
  experimental: {
    serverActions: { bodySizeLimit: "8mb" },
  },
};

export default nextConfig;
