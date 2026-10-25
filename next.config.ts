import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Content site: use the classic ISR model (route segment `revalidate` + revalidatePath)
  // rather than Cache Components, so CMS reads stay simple for the team.
  cacheComponents: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "dhanvesttor.com" },
      { protocol: "https", hostname: "*.dhanvesttor.com" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
