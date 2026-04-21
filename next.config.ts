import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sponsor",
        destination: "/pacific-kings",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
