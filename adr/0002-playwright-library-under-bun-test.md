---
status: accepted
date: 2026-10-22
decision-makers: Siraj Samsudeen
---

# 0002 Playwright as a library under bun test for browser acceptance tests

## Context and Problem Statement

Each step's "Done when" script is an outer acceptance test that drives the real app in a browser.
The repo fixes `bun test` as its runner, and its end-of-change checks need 100% line and function
coverage and a Stryker mutation run, both through `bun test`. Which tool should run the browser
tests?

## Decision Drivers

- Each test needs a fresh, empty to-do list.
- Browser-driven server code must count towards `bun test --coverage` and Stryker.
- `bun test` is the fixed runner; Bun is the only runtime.
- A failing browser test should be easy to diagnose.

## Considered Options

- Playwright as a library (`playwright`) inside `bun test`, with the app started in the same process
- Playwright's own runner (`@playwright/test`) for browser tests, next to `bun test`

## Decision Outcome

Chosen option: "Playwright as a library inside `bun test`", because it meets the first three drivers
outright and the fourth with some setup, while the runner fails the first two.

### Consequences

- Good, because one runner, one command and one coverage report for every test.
- Bad, because every page reload must be waited for explicitly, or tests can be flaky.
- Bad, because traces and reports must be switched on by hand.

### Confirmation

Browser tests are ordinary `*.test.ts` files run by `bun test`, and the repo has no Playwright config
file. The first outer test's red run on Bun 1.4.2 confirms the setup works.

## Pros and Cons of the Options

### Playwright as a library inside `bun test`

- Good, because each test starts its own app with `createApp().listen(0)`: a fresh list on a free
  port.
- Good, because the server runs in the test process, so coverage and Stryker see it (the server must
  live in its own module, not a test file).
- Good, because Bun stays the only runtime.
- Neutral, because `PWDEBUG=1` (the inspector) and `codegen` work the same way in both options.
- Bad, because `bun:test`'s `expect` doesn't retry; a helper waits for the `GET` after each redirect.
- Bad, because there's no trace viewer, HTML report, or failure screenshots unless set up through the
  library's API.

### Playwright's own runner

- Good, because `expect` retries until true, and trace viewer, HTML report, screenshots, video and UI
  mode come out of the box.
- Good, because per-test pages, parallel workers and several browsers are built in.
- Bad, because its `webServer` starts one server for the whole run, so every test shares one list
  unless a test-only reset route is added.
- Bad, because the server runs in another process, invisible to coverage and Stryker.
- Bad, because the runner officially needs Node, a second runtime.
- Bad, because it means two runners, two configs, and naming rules to keep their files apart.

## More Information

A throwaway spike on 22-Oct-2026 (Elysia 1.4.30, playwright 1.64.1, headless Chromium) ran the
"Done when" script plus a no-leak test with no failures: 13 runs on Bun 1.3.9, then 5 on Bun 1.4.2,
with coverage counted on both. Revisit with a superseding ADR when there are many browser tests,
several browsers, or CI failures to debug; Playwright's own runner wins there. Design detail:
`openspec/changes/add-and-list/design.md`, decision 6.
