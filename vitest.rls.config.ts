import { defineConfig } from "vitest/config";
import { requireLiveTestAuthorization } from "./scripts/live-test-gate";
requireLiveTestAuthorization();
export default defineConfig({ test: { environment: "node", include: ["tests/integration/ownership.test.ts"], maxWorkers: 1 } });
