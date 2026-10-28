import { expect, test, url } from "./fixtures";

const pages = [
  "/",
  "/one-tap",
  "/token",
  "/code",
  "/own-client-id",
  "/helpers",
];
const MB = 1024 * 1024;

// Each test compares memory after a warm-up with memory after many more rounds.
// A leak grows with every round; caches and JIT settle during the warm-up.

test("server: rendering pages doesn't grow the heap", async ({ request }) => {
  test.setTimeout(180_000);
  const render = async (rounds: number) => {
    for (let i = 0; i < rounds; i++) {
      await Promise.all(pages.map((path) => request.get(url("config", path))));
    }
  };
  // Heap after a full GC; the server runs with --expose-gc
  const heap = async () =>
    Number(await (await request.get(url("config", "/api/heap"))).text());

  await render(100);
  const before = await heap();
  await render(500);
  const growth = (await heap()) - before;
  // 3,000 renders: a leaked app or component per request would be tens of MB
  expect(growth / MB).toBeLessThan(3);
});

test("browser: navigating between pages doesn't leak", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto(url("config"));
  await page.waitForFunction(() => window.__router);
  const cdp = await page.context().newCDPSession(page);

  const tour = async (rounds: number) => {
    for (let i = 0; i < rounds; i++) {
      for (const path of pages) {
        await page.evaluate((p) => window.__router!.push(p), path);
      }
    }
    await page.evaluate(() => window.__router!.push("/helpers"));
  };
  const measure = async () => {
    // The stub records every call; drop them so they don't count as a leak
    await page.evaluate(() => (window.__gsi.calls.length = 0));
    await cdp.send("HeapProfiler.collectGarbage");
    const { usedSize } = await cdp.send("Runtime.getHeapUsage");
    const counters = await cdp.send("Memory.getDOMCounters");
    return { heap: usedSize, ...counters };
  };

  await tour(10);
  const before = await measure();
  await tour(100);
  const after = await measure();

  // DOM nodes and listeners of unmounted pages are released
  expect(after.nodes - before.nodes).toBeLessThan(100);
  expect(after.jsEventListeners - before.jsEventListeners).toBeLessThan(20);
  expect((after.heap - before.heap) / MB).toBeLessThan(1);
  // 600 mounts later, Google's script is still loaded once
  expect(await page.evaluate(() => window.__gsiLoads)).toBe(1);
  expect(
    await page
      .locator('script[src^="https://accounts.google.com/gsi/client"]')
      .count(),
  ).toBe(1);
});
