// spec: tests/validation/test-plan.md § AC-001-a
import { test, expect } from "@playwright/test";

test("AC-001-a: opening the web app displays a greeting without sign-in", async ({
  page,
}) => {
  // 1. Navigate to /
  await page.goto("/");
  // 2. Locate the greeting heading and assert it is visible
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Assert no sign-in form is present
  await expect(page.getByLabel(/password/i)).toHaveCount(0);
});
