import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vydthxnbdvkgwwjqjdum.supabase.co",
      },
    ],
  },
};

export default nextConfig;