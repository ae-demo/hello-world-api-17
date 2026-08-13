# Hello World API — PRD

## Problem Statement

Teams starting a new project on the platform need a minimal, known-good
reference: a backend service and a web client wired together end to end, with
nothing else in the way. Today there is no quick way to confirm that a new
project's plumbing — service, API call, and UI — actually works before
building real features on top of it.

## Solution

A tiny reference project made of two pieces: a backend API that returns a
"Hello, World!" greeting, and a simple web app that calls it and displays the
result. Anyone can open the web app or call the API directly, with no
sign-in required, and immediately see the whole path working.

## Actors

- **Visitor**: opens the web app to see the greeting rendered on screen.
- **Developer**: calls the API directly (e.g. via curl or another service) to
get the greeting programmatically.

## User Stories

1. As a Visitor, I want to open the web app and see a "Hello, World!" greeting
on screen, so that I can confirm the demo works end to end.
2. As a Developer, I want to call the greeting API directly, so that I can
verify the service responds correctly or integrate it elsewhere.

## Product Decisions

- The project ships both a backend API and a simple web app that calls it,
rather than an API-only deliverable.
- The greeting is static ("Hello, World!") — no name customization or other
parameters.
- The API is publicly accessible with no sign-in required; the web app does
not require authentication either.
- Web app: TypeScript + React single-page app. Service: Go (explicit choice,
overriding the org's default Ballerina-for-services stack).

## Phasing

- **Phase 1 — Working hello-world reference end to end**: deliver the
greeting API and the web app that calls and displays it. Stories: 1, 2.

## Out of Scope

- Customizable or parameterized greetings (e.g. greeting by name).
- Authentication or sign-in of any kind.
- Persisting or logging requests.
- Multiple languages/locales for the greeting.

## Open Questions

None — all decisions were resolved during the interview.

