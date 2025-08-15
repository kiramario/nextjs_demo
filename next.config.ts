import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

    // 规避构建时的type error
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
