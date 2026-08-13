// spec: tests/validation/test-plan.md § AC-002-c
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-002-c: the endpoint is reachable without authentication or an API key", async ({
  request,
}) => {
  const res = await request.get(`${target("hello-api")}/greeting`);
  expect(res.status()).toBe(200);
});
