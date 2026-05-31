import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    localPatterns: [
      { pathname: "/projects/**" },
      { pathname: "/media/**" },
      { pathname: "/portfolio/**" },
    ],
  },
  ...(process.env.NODE_ENV === "development"
    ? {
        allowedDevOrigins: [
          "192.168.0.105",
          "192.168.1.105",
          "localhost",
        ],
      }
    : {}),
};

export default nextConfig;
