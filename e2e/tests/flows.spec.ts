import { calls, events, expect, test, url } from "./fixtures";

test("the button hands Google's credential to its success event", async ({
  page,
}) => {
  await page.goto(url("config"));
  await expect(page.getByTestId("gsi-button")).toBeVisible();
  await page.evaluate(() =>
    window.__gsi.credential({ credential: "id-token", select_by: "btn" }),
  );
  expect(await events(page)).toEqual([
    {
      event: "success",
      payload: { credential: "id-token", select_by: "btn" },
    },
  ]);
});

test("useTokenClient logs in and hands over the token", async ({ page }) => {
  await page.goto(url("config", "/token"));
  await page.getByRole("button", { name: "Get token" }).click();
  expect(await calls(page, "oauth2.requestAccessToken")).toHaveLength(1);

  const token = { access_token: "token", scope: "openid", expires_in: 3599 };
  await page.evaluate((t) => window.__gsi.tokenResponse(t), token);
  expect(await events(page)).toEqual([{ event: "success", payload: token }]);
});

test("useCodeClient logs in and hands over the code", async ({ page }) => {
  await page.goto(url("config", "/code"));
  await page.getByRole("button", { name: "Get code" }).click();
  expect(await calls(page, "oauth2.requestCode")).toHaveLength(1);

  const code = { code: "auth-code", scope: "openid" };
  await page.evaluate((c) => window.__gsi.codeResponse(c), code);
  expect(await events(page)).toEqual([{ event: "success", payload: code }]);
});
