import { afterAll, afterEach, beforeAll, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { server } from "./packages/shared/src/mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => {
  server.close();
});
