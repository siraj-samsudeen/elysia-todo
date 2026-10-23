import { afterEach, beforeEach, expect, test } from "bun:test";
import { chromium, type Browser, type Page } from "playwright";
import { createApp } from "../../src/app";

let app: ReturnType<typeof createApp>;
let browser: Browser;
let page: Page;
let baseUrl: string;

beforeEach(async () => {
  app = createApp().listen(0);
  baseUrl = `http://localhost:${app.server!.port}`;
  browser = await chromium.launch();
  page = await browser.newPage();
});

afterEach(async () => {
  await browser.close();
  await app.stop();
});

test("1.0 Opening a fresh app shows the to-do input and an empty list", async () => {
  await page.goto(baseUrl);

  expect(await page.getByPlaceholder("What needs to be done?").count()).toBe(1);
  expect(await page.locator("li").count()).toBe(0);
});
