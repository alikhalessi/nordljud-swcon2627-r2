import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  outputFileTracingIncludes: {
    "/api/lexicon": ["./shared-content/verb-library/*.json", "./shared-content/SOURCE_MANIFEST.md"],
    "/api/missions": ["./shared-content/verb-library/*.json", "./shared-content/mission-seeds.json"],
  },
};
export default config;
