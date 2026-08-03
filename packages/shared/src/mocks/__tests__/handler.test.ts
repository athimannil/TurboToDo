import { describe, it, expect } from "vitest";
import { users, todoItems } from "../data";

/**
 * Simple tests to verify mock data structure
 * MSW handler functionality is already tested through hook and component tests
 */

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

describe("Mock Data - Todos", () => {
  it("should have mock todos defined", () => {
    expect(todoItems).toBeDefined();
    expect(todoItems.length).toBeGreaterThan(0);
  });

  it("should have valid todo structure", () => {
    const todo = todoItems[0];
    expect(todo).toHaveProperty("id");
    expect(todo).toHaveProperty("title");
    expect(todo).toHaveProperty("status");
    expect(todo).toHaveProperty("userId");
    expect(todo).toHaveProperty("createdAt");
    expect(todo).toHaveProperty("updatedAt");
  });

  it("should have todos with valid status values", () => {
    const validStatuses = ["pending", "done"];
    todoItems.forEach((todo) => {
      expect(validStatuses).toContain(todo.status);
    });
  });

  it("should have todos assigned to existing users", () => {
    const userIds = users.map((u) => u.id);
    todoItems.forEach((todo) => {
      expect(userIds).toContain(todo.userId);
    });
  });
});
