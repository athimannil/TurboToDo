import { describe, it, expect } from "vitest";
import { users } from "../data";

describe("Mock Data - Users", () => {
  it("should have mock users defined", () => {
    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
  });
});
