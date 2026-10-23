import { afterAll, afterEach, beforeAll, beforeEach, test } from "bun:test";
import { createSession } from "feather-testing-core/playwright";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import { createApp } from "../../src/app";

// HEADED=1 shows the browser, slowed down to watch; RECORD=1 saves a video and a final
// screenshot per test under test-results/. Run them with a longer limit, e.g. --timeout 30000.
const headed = Boolean(process.env.HEADED);
const record = Boolean(process.env.RECORD);

let browser: Browser;
let context: BrowserContext;
let page: Page;
let app: ReturnType<typeof createApp>;
let baseUrl: string;

beforeAll(async () => {
  browser = await chromium.launch({ headless: !headed, slowMo: headed ? 700 : 0 });
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  app = createApp().listen(0);
  baseUrl = `http://localhost:${app.server!.port}`;
  context = await browser.newContext(record ? { recordVideo: { dir: "test-results/videos" } } : {});
  page = await context.newPage();
});

afterEach(async () => {
  if (record) {
    await page.screenshot({ path: `test-results/screenshots/last-page-${Date.now()}.png` });
  }
  await context.close();
  await app.stop();
});

test("1.0 Opening a fresh app shows the to-do input and an empty list", async () => {
  await createSession(page, { baseUrl })
    .visit("/")
    .assertValue("What needs to be done?", "")
    .refuteHas("li");
});
