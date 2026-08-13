# Hello World API — Design

## Overview

A minimal end-to-end reference: `hello-api`, a Go service, exposes a
single public endpoint that always returns a static "Hello, World!" greeting;
`hello-webapp`, a React single-page app, calls that endpoint and renders the
greeting on screen. Both are public with no sign-in, so a Visitor can open the
web app and a Developer can call the API directly and see the same result.

## Context (C1)

```mermaid
graph TD
  visitor(Visitor)
  developer(Developer)
  system[Hello World API system]

  visitor -->|opens web app| system
  developer -->|calls greeting API| system
```

## Domain model (ER)

The system holds no persisted data — the greeting is a fixed, computed value
with no storage. The single shape returned by the API is modeled below for
completeness; it becomes the `Greeting` schema in `hello-api`'s OpenAPI spec.

```mermaid
erDiagram
  GREETING {
    string message
  }
```

## Key flows

### Visitor opens the web app

```mermaid
sequenceDiagram
  actor Visitor
  participant Webapp as hello-webapp
  participant API as hello-api

  Visitor->>Webapp: Open web app
  Webapp->>API: GET /greeting
  API-->>Webapp: 200 { message: "Hello, World!" }
  Webapp-->>Visitor: Render greeting
```

### Developer calls the API directly

```mermaid
sequenceDiagram
  actor Developer
  participant API as hello-api

  Developer->>API: GET /greeting
  API-->>Developer: 200 { message: "Hello, World!" }
```