import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { beforeEach, afterEach, vi } from "vitest";
beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("Network disabled in unit fixtures"))));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
