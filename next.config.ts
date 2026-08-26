import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone/tablet on same WiFi to load dev assets via LAN IP
  allowedDevOrigins: ["192.168.1.2", "192.168.1.2:3000"],
};

export default nextConfig;
