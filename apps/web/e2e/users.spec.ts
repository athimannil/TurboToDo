import { test, expect } from "@playwright/test";

test("should display users page", async ({ page }) => {
  await page.goto("/users");
  await expect(page.locator("h1")).toContainText("Users");
});

test("should create a user", async ({ page }) => {
  await page.goto("/users");

  await page.fill('input[name="username"]', "John");
  await page.click('button[type="submit"]');

  // Wait for the new user to appear in the list
  await expect(page.locator("text=John")).toBeVisible();
});

test("should view user todos", async ({ page }) => {
  await page.goto("/users");

  const viewLink = page.locator('a:has-text("View")').first();
  await expect(viewLink).toBeVisible();

  await viewLink.click();

  // Use getByRole for accessible, specific selectors
  await expect(
    page.getByRole("heading", { name: "User Details" }),
  ).toBeVisible();
});
