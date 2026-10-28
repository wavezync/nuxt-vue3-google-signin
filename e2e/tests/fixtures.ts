import { test as base, expect, type Page } from "@playwright/test";
import { fileURLToPath } from "node:url";

export { expect };
export { url } from "../servers";

type Call = { name: string; args: unknown[] };

declare global {
  interface Window {
    __gsi: {
      calls: Call[];
      credential(response: object): void;
      tokenResponse(response: object): void;
      codeResponse(response: object): void;
    };
    __gsiLoads?: number;
    __events?: { event: string; payload: unknown }[];
    __router?: { push(path: string): Promise<unknown> };
  }
}

const GSI_URL = "https://accounts.google.com/gsi/client";
const stub = fileURLToPath(new URL("../gsi-stub.js", import.meta.url));

/**
 * Every page gets the stubbed Google script instead of the real one, and a
 * test fails on any uncaught error or console error in the page.
 */
export const test = base.extend<{ errors: string[] }>({
  errors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await use(errors);
      expect(errors, "errors in the page").toEqual([]);
    },
    { auto: true },
  ],
  page: async ({ page }, use) => {
    const isGsi = (url: URL) => `${url.origin}${url.pathname}` === GSI_URL;
    await page.route(isGsi, (route) =>
      route.fulfill({ path: stub, contentType: "text/javascript" }),
    );
    await use(page);
  },
});

export const calls = (page: Page, name: string) =>
  page.evaluate(
    (n) => window.__gsi?.calls.filter((call) => call.name === n) ?? [],
    name,
  );

/** The client ID of every call to `name`, in order. */
export const clientIds = async (page: Page, name: string) =>
  (await calls(page, name)).map(
    (call) => (call.args[0] as { client_id: string }).client_id,
  );

export const events = (page: Page) =>
  page.evaluate(() => window.__events ?? []);
