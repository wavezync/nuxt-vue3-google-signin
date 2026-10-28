import { clientIds, expect, test, url } from "./fixtures";

test("the button gets the client ID from nuxt.config", async ({ page }) => {
  await page.goto(url("config"));
  await expect(page.getByTestId("gsi-button")).toBeVisible();
  expect(await clientIds(page, "id.initialize")).toEqual(["config-client-id"]);
});

for (const [path, call] of [
  ["/one-tap", "id.initialize"],
  ["/token", "oauth2.initTokenClient"],
  ["/code", "oauth2.initCodeClient"],
]) {
  test(`${path} gets the client ID from nuxt.config`, async ({ page }) => {
    await page.goto(url("config", path));
    await expect
      .poll(() => clientIds(page, call))
      .toEqual(["config-client-id"]);
  });
}

test("NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID overrides it at runtime", async ({
  page,
}) => {
  await page.goto(url("runtime", "/token"));
  await expect
    .poll(() => clientIds(page, "oauth2.initTokenClient"))
    .toEqual(["runtime-client-id"]);
});

test("an empty client ID leaves sign-in off without breaking the page", async ({
  page,
}) => {
  const response = await page.goto(url("empty", "/token"));
  expect(response?.status()).toBe(200);
  await expect.poll(() => page.evaluate(() => window.__gsiLoads)).toBe(1);
  await expect(page.getByRole("button", { name: "Get token" })).toBeDisabled();
  expect(await clientIds(page, "oauth2.initTokenClient")).toEqual([]);
});

test("a button's own client ID works without one from the module", async ({
  page,
}) => {
  await page.goto(url("empty", "/own-client-id"));
  await expect(page.getByTestId("gsi-button")).toBeVisible();
  expect(await clientIds(page, "id.initialize")).toEqual(["button-client-id"]);
});

test("plugin: false lets the app pick a client ID per domain", async ({
  page,
}) => {
  for (const host of ["localhost", "127.0.0.1"]) {
    await page.goto(url("ownPlugin").replace("localhost", host));
    await expect(page.getByTestId("gsi-button")).toBeVisible();
    expect(await clientIds(page, "id.initialize")).toEqual([
      `${host}-client-id`,
    ]);
  }
});
