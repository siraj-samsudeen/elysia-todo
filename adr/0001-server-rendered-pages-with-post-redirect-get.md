# 0001 Server-rendered pages with plain forms and post-redirect-get

- Status: Accepted
- Date: 2026-10-22

## Context and Problem Statement

elysia-todo grows TodoMVC one feature at a time on Bun + Elysia. Its first step (add-and-list) needs
a browser page where a person adds a to-do and sees the list, and the input clears and reloading
keeps the list without adding the to-do again. How should the browser and the server talk while the
app grows, until a later step introduces React?

## Considered Options

- Server-rendered pages with plain HTML forms and post-redirect-get, no browser JavaScript
- Server-rendered pages plus a small script that sends forms in the background and swaps in the new
  list (htmx-style)
- A JSON API with browser JavaScript that draws the page

## Decision Outcome

Chosen option: "Server-rendered pages with plain HTML forms and post-redirect-get", because every
behaviour so far comes from the browser itself (Enter submits the form, the new page has an empty
input, reload repeats a harmless `GET`), so nothing runs in the browser that we'd have to write and
test. It is also the direction this repo's CLAUDE.md names ("server-rendered HTML first"). Each
change answers `303 See Other` back to the page, so reloading never resubmits a form.

### Consequences

- Good, because all behaviour lives on the server, where inner tests check it with plain requests
  (`app.handle`), no browser needed.
- Good, because each later feature (complete, edit, delete, filter) follows the same pattern: a form
  posting to a route, then a redirect.
- Bad, because every change reloads the whole page (a brief flash, and scroll position resets).
- Bad, because HTML forms only send `GET` and `POST`, so later edits and deletes go through `POST`
  routes rather than `PUT`/`DELETE`.
- Follow-up: a later step introducing React supersedes this ADR with a new one.
