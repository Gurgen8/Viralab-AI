import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Inline the (small) Tailwind CSS into the HTML so it doesn't block first paint
    inlineCss: true,
  },
};

export default nextConfig;
