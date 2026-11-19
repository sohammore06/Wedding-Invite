import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phone/tablet on same WiFi to load dev assets via LAN IP
  allowedDevOrigins: ["192.168.1.2", "192.168.1.2:3000"],
  // Links to the Marathi page were first shared as /marathi
  async redirects() {
    return [{ source: "/marathi", destination: "/mr", permanent: true }];
  },
};

export default nextConfig;
