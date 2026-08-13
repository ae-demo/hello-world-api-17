// spec: tests/validation/test-plan.md § AC-001-b
import { test, expect } from "@playwright/test";

test("AC-001-b: the displayed greeting text is exactly Hello, World!", async ({
  page,
}) => {
  // 1. Navigate to /
  await page.goto("/");
  // 2. Locate the greeting heading and assert its exact text
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hello, World!",
  );
});
