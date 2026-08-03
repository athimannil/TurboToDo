import { describe, it, expect } from "vitest";
import { users } from "../data";

describe("Mock Data - Users", () => {
  it("should have mock users defined", () => {
    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);
  });

  it("should have valid user structure", () => {
    const user = users[0];
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("createdAt");
    expect(user).toHaveProperty("updatedAt");
  });

  it("should have unique user IDs", () => {
    const ids = users.map((u) => u.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(users.length);
  });
});
