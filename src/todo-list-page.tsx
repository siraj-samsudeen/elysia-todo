import { Html } from "@elysiajs/html";

export const TodoListPage = () => (
  <html>
    <body>
      <form method="post" action="/todos">
        <input name="title" />
      </form>
      <ul></ul>
    </body>
  </html>
);
