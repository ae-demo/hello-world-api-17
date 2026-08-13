// spec: tests/validation/test-plan.md § AC-002-b
import { test, expect } from "@playwright/test";
import { target } from "../lib/targets";

test("AC-002-b: response body contains the exact message Hello, World!", async ({
  request,
}) => {
  const res = await request.get(`${target("hello-api")}/greeting`);
  expect(await res.json()).toMatchObject({ message: "Hello, World!" });
});
