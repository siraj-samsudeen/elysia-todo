import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { createSession } from "feather-testing-core/playwright";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { createApp } from "../../src/app";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let app: ReturnType<typeof createApp>;
let baseUrl: string;

beforeAll(async () => {
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  app = createApp().listen(0);
  baseUrl = `http://localhost:${app.server!.port}`;
  context = await browser.newContext();
  page = await context.newPage();
});

afterEach(async () => {
  await context.close();
  await app.stop();
});

test("1.0 Opening a fresh app shows the to-do input and an empty list", async () => {
  await createSession(page, { baseUrl })
    .visit("/")
    .assertValue("What needs to be done?", "")
    .refuteHas("li");
});
