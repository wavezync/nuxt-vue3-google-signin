import { clientIds, expect, test, url } from "./fixtures";

// Runs against the packed module in a fresh pnpm app (consumer.sh), where the
// app can't import vue3-google-signin itself and Vite treats the module as a
// dependency. Before 1.0, every page there failed to load the library, and with
// hoisting, Vite found the library late on Nuxt 3, bundled it twice, and the
// composables lost the plugin's client ID (#11, "missing required parameter
// client_id").
test("a fresh app's dev server hands every composable the client ID", async ({
  page,
}) => {
  test.setTimeout(120_000);
  for (const [path, call] of [
    ["/token", "oauth2.initTokenClient"],
    ["/", "id.initialize"],
    ["/code", "oauth2.initCodeClient"],
  ]) {
    await page.goto(url("dev", path));
    await expect
      .poll(() => clientIds(page, call), { timeout: 30_000 })
      .toEqual(["config-client-id"]);
  }
});
