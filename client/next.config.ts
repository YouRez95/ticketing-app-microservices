import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    return {
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: 300,
      },
    };
  },

  allowedDevOrigins: ["ticketing.dev"],
  turbopack: {},
};

export default nextConfig;
