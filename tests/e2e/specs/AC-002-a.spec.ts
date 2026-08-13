// spec: tests/validation/test-plan.md § AC-002-a
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-002-a: GET /greeting returns HTTP 200", async ({ request }) => {
  const res = await request.get(`${target("hello-api")}/greeting`);
  expect(res.status()).toBe(200);
});
