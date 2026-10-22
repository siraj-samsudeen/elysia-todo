## 1. First open shows an empty list (@spec See the list)

- [ ] 1.1 outer: opening a just-started app shows the "What needs to be done?" input and no to-dos
- [ ] 1.2 inner: GET / answers with an HTML page
- [ ] 1.3 inner: the page's form posts to /todos with an input named title
- [ ] 1.4 inner: a new app's page lists no to-dos

## 2. Add the first to-do (@spec Add a to-do)

- [ ] 2.1 outer: typing "Read the guide on routing" and pressing Enter shows it in the list and leaves the input empty
- [ ] 2.2 inner: POST /todos with a title answers 303 See Other to /
- [ ] 2.3 inner: after POST /todos, GET / lists that to-do

## 3. To-dos keep the order they were added (@spec Add a to-do)

- [ ] 3.1 outer: after adding "Read the guide on routing", adding "Write the first test for the to-do API" lists both, in that order
- [ ] 3.2 inner: two POSTs to /todos are listed by GET / in the order they were posted

## 4. Reloading the page keeps the list (@spec Keep the list on reload)

- [ ] 4.1 outer: after adding "Read the guide on routing", reloading the page lists it exactly once

## 5. Surrounding spaces are removed (@spec Trim the text)

- [ ] 5.1 outer: typing "   Read the guide on routing   " and pressing Enter lists "Read the guide on routing"
- [ ] 5.2 inner: POST /todos with a title surrounded by spaces lists it trimmed

## 6. An empty entry adds nothing (@spec Ignore blank entries)

- [ ] 6.1 outer: pressing Enter in the empty input leaves the list empty
- [ ] 6.2 inner: POST /todos with an empty title adds nothing and still answers 303 See Other to /

## 7. A whitespace-only entry adds nothing (@spec Ignore blank entries)

- [ ] 7.1 outer: typing "   " and pressing Enter leaves the list empty
- [ ] 7.2 inner: POST /todos with a whitespace-only title adds nothing

## 8. Reconcile

- [ ] 8.1 Coverage 100% of lines and functions; every uncovered line ratified, deleted or asked
- [ ] 8.2 No unused files, exports or dependencies (knip)
- [ ] 8.3 Types check clean
- [ ] 8.4 Mutation testing: every surviving mutant ratified, deleted or asked
- [ ] 8.5 `openspec validate add-and-list --type change --strict` passes before archive
