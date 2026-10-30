import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e", testIgnore: "**/account.spec.ts", fullyParallel: false, workers: 1,
  timeout: 30000, expect: { timeout: 5000 }, retries: 0,
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "msedge-desktop", use: { channel: "msedge", viewport: { width: 1280, height: 800 } } },
    { name: "msedge-narrow", use: { channel: "msedge", viewport: { width: 360, height: 800 } } },
  ],
  webServer: {
    command: "node ./node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100", reuseExistingServer: false, timeout: 60000,
    env: { NEXT_TELEMETRY_DISABLED: "1", NEXT_PUBLIC_SUPABASE_URL: "", NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "" },
  },
});
