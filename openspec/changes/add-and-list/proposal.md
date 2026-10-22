## Why

The repo has no app yet. This is the first step of TodoMVC on Bun + Elysia: in the browser, a person
can add a to-do and see the list of to-dos — the smallest slice every later TodoMVC feature
(complete, edit, delete, filter) builds on.

## What Changes

- A web app that shows a page with an input for a new to-do and the list of to-dos.
- Opening the app the first time shows an empty list.
- Typing a to-do and pressing Enter adds it to the end of the list, and the input is cleared.
- The list shows to-dos in the order they were added.
- The text is trimmed before it is added; pressing Enter on an empty or whitespace-only entry adds
  nothing.
- There is one list, shared by everyone who opens the app. There are no users or accounts.
- The list lasts while the app is running; reloading the page still shows it.

**Not yet** (each arrives in the step whose test needs it):
- Keeping to-dos across a server restart.
- Separate lists per person.
- Completing, editing, deleting or filtering to-dos, and every other TodoMVC feature.

## Capabilities

### New Capabilities
- `todo-list`: the single list of to-dos — adding a to-do and seeing the list. Later TodoMVC steps
  add their requirements to this capability.

### Modified Capabilities
_None — `openspec/specs/` has no specs yet._

## Impact

- New: the app itself — a Bun + Elysia server that serves the page, and its tests.
- New dependencies: Elysia, and Playwright for the browser acceptance test. Each arrives with the
  first test that needs it.
- No existing code, APIs or data are affected.
