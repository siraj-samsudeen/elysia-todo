import { beforeEach, describe, expect, test } from "bun:test";
import { parseHTML } from "linkedom";
import { createApp } from "../src/app";

describe("1.0 Opening a fresh app shows the to-do input and an empty list", () => {
  let response: Response;
  let document: Document;

  beforeEach(async () => {
    response = await createApp().handle(new Request("http://localhost/"));
    document = parseHTML(await response.clone().text()).document;
  });

  test("1.1 lands on an HTML page", () => {
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toStartWith("text/html");
  });

  test("1.2 shows an input for a new to-do", () => {
    expect(document.querySelector("input")?.getAttribute("placeholder")).toBe("What needs to be done?");
  });

  test("1.3 shows an empty list", () => {
    expect(document.querySelector("ul")?.children.length).toBe(0);
  });
});
