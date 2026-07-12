import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows phone/tablet testing over LAN during development
  // (Next otherwise blocks cross-origin dev requests for HMR/fonts).
  allowedDevOrigins: ["192.168.0.20"],
};

export default nextConfig;
