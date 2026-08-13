# Validation report

- **Issue:** #4
- **Commit:** dc94fc4e7840251634488186367fa440cf948dc7
- **Generated:** 2026-08-13T13:13:09.551Z
- **Playwright:** 1.61.1

## Summary

| Method | Total | Pass | Fail | Not run |
|---|---|---|---|---|
| e2e | 5 | 3 | 2 | 0 |
| manual (human checklist) | 0 | — | — | — |
| scenario (not validated) | 0 | — | — | — |

## E2E results

| Criterion | Must | Status | Spec | Notes |
|---|---|---|---|---|
| AC-001-a | Opening the web app displays a greeting on screen without requiring sign-in | ❌ fail | `tests/e2e/specs/AC-001-a.spec.ts` | — |
| AC-001-b | The displayed greeting text is exactly "Hello, World!" | ❌ fail | `tests/e2e/specs/AC-001-b.spec.ts` | — |
| AC-002-a | A direct GET request to the greeting endpoint returns HTTP 200 | ✅ pass | `tests/e2e/specs/AC-002-a.spec.ts` | — |
| AC-002-b | The response body contains the exact message "Hello, World!" | ✅ pass | `tests/e2e/specs/AC-002-b.spec.ts` | — |
| AC-002-c | The endpoint is reachable without any authentication or API key | ✅ pass | `tests/e2e/specs/AC-002-c.spec.ts` | — |

## Failures

### AC-001-a — Opening the web app displays a greeting on screen without requiring sign-in

Spec: `tests/e2e/specs/AC-001-a.spec.ts`
Location: `AC-001-a.spec.ts:4`

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { level: 1 })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { level: 1 })

```

### AC-001-b — The displayed greeting text is exactly "Hello, World!"

Spec: `tests/e2e/specs/AC-001-b.spec.ts`
Location: `AC-001-b.spec.ts:4`

```
Error: expect(locator).toHaveText(expected) failed

Locator: getByRole('heading', { level: 1 })
Expected: "Hello, World!"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByRole('heading', { level: 1 })

```

