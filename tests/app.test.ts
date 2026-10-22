import { expect, test } from "bun:test";
import { parseHTML } from "linkedom";
import { createApp } from "../src/app";

test("1.2 GET / answers with an HTML page", async () => {
  const response = await createApp().handle(new Request("http://localhost/"));

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toStartWith("text/html");
});

test("1.3 the page's form posts to /todos with an input named title", async () => {
  const response = await createApp().handle(new Request("http://localhost/"));
  const html = await response.text();
  const { document } = parseHTML(html);
  const form = document.querySelector("form");

  expect(form?.getAttribute("method")).toBe("post");
  expect(form?.getAttribute("action")).toBe("/todos");
  expect(document.querySelector("form input")?.getAttribute("name")).toBe("title");
});
