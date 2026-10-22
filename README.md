# elysia-todo

[TodoMVC](https://todomvc.com) built with **Bun + Elysia**, one step at a time, with a human in
control of every step. The point is not the app — it is the **git history**: read
`git log --reverse` on `main` and you can follow exactly how it was built, from the first
question to the last test.

Built with the [intent-driven-with-human-control](https://github.com/siraj-samsudeen/intent-driven-with-human-control)
process: plan with OpenSpec (proposal → specs → design → adr → tasks), then build one test at a
time — the human predicts what each test will do before it runs, and every red, green and
refactor is its own commit.

## Steps and attempts

The app grows in **steps**, following the [TodoMVC spec](https://github.com/tastejs/todomvc/blob/master/app-spec.md)
one feature at a time. Each step's prompt is in `steps/`, written when the step starts — later
features are never planned ahead.

A step can be built more than once, by more than one person: each run is an **attempt**, on
its own branch, numbered per person.

```
main                              ← grows one step at a time (the history to read)
step-01-add-and-list/siraj/attempt-1      ← branched from main as it was before step 1
step-01-add-and-list/siraj/attempt-2      ← the same step again, another day
step-01-add-and-list/mohammad/attempt-1   ← someone else's first attempt at the same step
step-02-.../siraj/attempt-1               ← branched from main after step 1 was merged
```

The best attempt of a step reaches `main` in one PR; the next step starts from there.
`ATTEMPTS.md` logs every attempt.

## Build a step yourself

1. Fork this repo and clone your fork.
2. Open a Claude Code session in it — the desktop app or `claude` in a terminal — and say
   **`start step 1`** (or the step you want).
3. Confirm your name when asked. The agent sets up your attempt branch,
   `step-01-<name>/<your-name>/attempt-N`, and starts.
4. Answer the agent's questions, review each document it drafts, and make a prediction before
   every test runs.
5. Compare your history with the reference: `git log --oneline <the step's merge>^2` next to yours
   (`git log --first-parent main` lists the merges).

## Read the reference

```
git log --reverse --format='%h %s' main
```

Each commit message records what the code cannot show: why, the command run, the prediction,
the real output, and what was deliberately not built.
