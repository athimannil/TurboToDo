import { test, expect } from "@playwright/test";

test("should create a todo", async ({ page }) => {
  await page.goto("/todos");

  await page.selectOption('select[name="todo-assignee"]', { index: 1 });
  await page.fill('input[name="title"]', "Test Todo");
  await page.fill('textarea[name="description"]', "Test description");
  await page.click('button[type="submit"]');

  await expect(page.locator("text=Test Todo")).toBeVisible();
});

test("should filter todos by status", async ({ page }) => {
  await page.goto("/todos");

  await page.click('button:has-text("Done")');
  await expect(page.locator('[aria-pressed="true"]')).toContainText("Done");
});

test("should toggle todo status", async ({ page }) => {
  await page.goto("/todos");

  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.click();

  await expect(checkbox).toBeChecked();
});
