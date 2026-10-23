import { describe, expect, test } from "bun:test";
import { createSession } from "feather-testing-core/request";
import { createApp } from "../src/app";

describe("1.0 Opening a fresh app shows the to-do input and an empty list", () => {
  const openFreshApp = () => createSession(createApp().handle).visit("/");

  test("1.1 lands on an HTML page", async () => {
    await openFreshApp().raw("the response is a 200 HTML page", ({ response }) => {
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toStartWith("text/html");
    });
  });

  test("1.2 shows an input for a new to-do", async () => {
    await openFreshApp().assertValue("What needs to be done?", "");
  });

  test("1.3 shows an empty list", async () => {
    await openFreshApp().assertHas("ul").refuteHas("li");
  });
});
