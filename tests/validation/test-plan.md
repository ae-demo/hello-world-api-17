# Validation test plan — hello-world-api-17

## Endpoint note

The validation context supplied endpoints with an explicit `:19080` port
(e.g. `http://development-default.apps.94.72.97.95.sslip.io:19080/hello-world-api-17-hello-api-http`).
That port is not reachable from this runner (`curl`/`fetch` to `:19080`
return connection-refused on both HTTP and HTTPS, for both components).
The same hostnames answer normally on the standard 80/443 front door
(port 80 redirects to 443), so `tests/e2e/targets.json` drops the
`:19080` suffix and lets Caddy route on Host + path as it does for any
other browser/API client. This was confirmed with `curl`, Node `fetch`,
and a real Chromium session (via `playwright-cli`) before authoring any
spec.

## Live-probe findings

- `hello-api` (`hello-world-api-17-hello-api-http` at
  `development-default.apps.94.72.97.95.sslip.io`, no port): reachable.
  `GET /greeting` → `200 {"message":"Hello, World!"}`. No auth required.
- `hello-webapp` (`http-hello-world-a-development-default-1df166bd.apps.94.72.97.95.sslip.io`,
  no port): **unreachable**. `GET /` returns `404 Not Found` from Caddy
  on plain HTTP, and a TLS-layer "internal error" alert on HTTPS (no
  site/cert configured for that host) — confirmed both via `curl` and a
  real Chromium session opened with `playwright-cli`. This looks like
  the webapp's ingress route was never provisioned, not a sandbox
  networking quirk (the same host/port normalization that fixed
  `hello-api` does not change this outcome). Per the authoring
  discipline, the specs below for REQ-001 are still authored against
  the criterion and the app's source (`hello-webapp/src/pages/Greeting.tsx`)
  so they fail honestly and record the real state, rather than being
  skipped.

## AC-001-a — Opening the web app displays a greeting on screen without requiring sign-in

- Target: hello-webapp (primary)
- Steps:
  1. Navigate to `/`
  2. Locate the page's greeting heading (role: heading, level 1) — per
     `hello-webapp/src/pages/Greeting.tsx`, the fetched message renders
     in an `<h1 className="heading">`
- Assert: the heading is visible, and no sign-in form/prompt is present
- Source of truth: `hello-webapp/src/pages/Greeting.tsx` (unambiguous —
  no auth gate in the component tree) + live probe (currently 404, see
  above)

## AC-001-b — The displayed greeting text is exactly "Hello, World!"

- Target: hello-webapp (primary)
- Steps:
  1. Navigate to `/`
  2. Locate the greeting heading (role: heading, level 1)
- Assert: the heading's text is exactly `Hello, World!`
- Source of truth: `hello-webapp/src/pages/Greeting.tsx` (renders
  `data.message` from `hello-api`'s `/greeting` response, which is
  `"Hello, World!"` per `specs/design/components/hello-api/openapi.yaml`)

## AC-002-a — A direct GET request to the greeting endpoint returns HTTP 200

- Target: hello-api
- Steps:
  1. `GET {hello-api}/greeting` via the `request` fixture, no headers
- Assert: response status is `200`
- Source of truth: `specs/design/components/hello-api/openapi.yaml`
  (`GET /greeting` → `200`) + live probe (confirmed `200`)

## AC-002-b — The response body contains the exact message "Hello, World!"

- Target: hello-api
- Steps:
  1. `GET {hello-api}/greeting` via the `request` fixture
  2. Parse the JSON body
- Assert: `body.message === "Hello, World!"`
- Source of truth: `specs/design/components/hello-api/openapi.yaml`
  (`Greeting.message` example `"Hello, World!"`) + live probe

## AC-002-c — The endpoint is reachable without any authentication or API key

- Target: hello-api
- Steps:
  1. `GET {hello-api}/greeting` via the `request` fixture with no
     `Authorization` header and no API key
- Assert: response status is `200` (not `401`/`403`)
- Source of truth: `specs/design/components/hello-api/design.json`
  ("requires no sign-in") + live probe
