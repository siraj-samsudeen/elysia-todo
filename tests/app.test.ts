import { expect, test } from "bun:test";
import { createApp } from "../src/app";

test("1.2 GET / answers with an HTML page", async () => {
  const response = await createApp().handle(new Request("http://localhost/"));

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toStartWith("text/html");
});
