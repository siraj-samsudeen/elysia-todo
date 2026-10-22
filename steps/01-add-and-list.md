# Step 1 — add a to-do and see the list

Start it by saying `start step 1` in a Claude Code session. The block below is the request, taken
unchanged: every attempt and every student starts from the same words, so differences in the result
come from the process, not the request.

```
Start a new OpenSpec change: in the browser, a person can add a to-do and see their list of
to-dos. Nothing else yet. The app will grow feature by feature along the TodoMVC spec
(https://github.com/tastejs/todomvc/blob/master/app-spec.md); this step is only "add and list".

Done when, in the browser:
1. I open the app and see an empty list.
2. I type "Read the guide on routing" and press Enter.
   → The list shows "Read the guide on routing".
3. I type "Write the first test for the to-do API" and press Enter.
   → The list shows both, in the order I added them:
     - Read the guide on routing
     - Write the first test for the to-do API
```
