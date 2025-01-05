import { SERVER_HOST, SERVER_PORT } from "@/common/constant";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: SERVER_HOST || 'localhost',
        port: SERVER_PORT,
        pathname: '/attachments/**',
      },
    ],
  },
};

export default nextConfig;
