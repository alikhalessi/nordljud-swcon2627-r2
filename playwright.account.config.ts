import { defineConfig } from "@playwright/test";
import base from "./playwright.config";
import { requireLiveTestAuthorization } from "./scripts/live-test-gate";
requireLiveTestAuthorization();
export default defineConfig({ ...base, testIgnore: [], testMatch: "**/account.spec.ts", workers: 1 });
