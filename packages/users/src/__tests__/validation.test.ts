import { describe, it, expect } from "vitest";
import { createUserSchema } from "../validation";

describe("createUserSchema", () => {
  describe("valid inputs", () => {
    it("should accept a valid username with letters", () => {
      const result = createUserSchema.safeParse({
        username: "john",
      });

      expect(result.success).toBe(true);
    });

    it("should accept username with numbers", () => {
      const result = createUserSchema.safeParse({
        username: "user123",
      });

      expect(result.success).toBe(true);
    });

    it("should accept username with hyphens and underscores", () => {
      const result = createUserSchema.safeParse({
        username: "user_name-123",
      });

      expect(result.success).toBe(true);
    });

    it("should accept username at minimum length (2 characters)", () => {
      const result = createUserSchema.safeParse({
        username: "ab",
      });

      expect(result.success).toBe(true);
    });

    it("should accept username at maximum length (30 characters)", () => {
      const result = createUserSchema.safeParse({
        username: "a".repeat(30),
      });

      expect(result.success).toBe(true);
    });
  });

  describe("invalid inputs", () => {
    it("should reject username shorter than 2 characters", () => {
      const result = createUserSchema.safeParse({
        username: "a",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Username must be at least 2 characters",
        );
      }
    });

    it("should reject username longer than 30 characters", () => {
      const result = createUserSchema.safeParse({
        username: "a".repeat(31),
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Username must not exceed 30 characters",
        );
      }
    });

    it("should reject username with spaces", () => {
      const result = createUserSchema.safeParse({
        username: "user name",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Username can only contain letters, numbers, hyphens, and underscores",
        );
      }
    });

    it("should reject username with special characters", () => {
      const result = createUserSchema.safeParse({
        username: "user@name",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Username can only contain letters, numbers, hyphens, and underscores",
        );
      }
    });

    it("should reject empty username", () => {
      const result = createUserSchema.safeParse({
        username: "",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Username must be at least 2 characters",
        );
      }
    });

    it("should reject missing username field", () => {
      const result = createUserSchema.safeParse({});

      expect(result.success).toBe(false);
    });
  });
});
