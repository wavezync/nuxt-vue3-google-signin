import { expect, test, url } from "./fixtures";

const pages = [
  "/",
  "/one-tap",
  "/token",
  "/code",
  "/own-client-id",
  "/helpers",
];

for (const path of pages) {
  test(`${path} renders on the server and hydrates cleanly`, async ({
    page,
    request,
  }) => {
    const response = await request.get(url("config", path));
    expect(response.status()).toBe(200);
    // Google's script only loads in the browser, once the page has mounted
    expect(await response.text()).not.toContain("accounts.google.com/gsi");

    const warnings: string[] = [];
    page.on("console", (message) => {
      if (/hydration/i.test(message.text())) warnings.push(message.text());
    });
    await page.goto(url("config", path));
    // app.vue sets it on mount, so the page has hydrated
    await page.waitForFunction(() => window.__router);
    expect(warnings).toEqual([]);
  });
}

test("auto-imported helpers run on the server", async ({ request }) => {
  const html = await (await request.get(url("config", "/helpers"))).text();
  expect(html).toContain("Ada Lovelace &lt;ada@example.com&gt;");
});
