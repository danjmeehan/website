import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  cacheComponents: true,
  partialPrefetching: true,
  outputFileTracingIncludes: {
    "/": ["./content/**/*.md"],
    "/writing/[slug]": ["./content/**/*.md"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
      "*.md": {
        condition: { query: "?raw" },
        type: "text",
      },
    },
  },
};

export default nextConfig;
