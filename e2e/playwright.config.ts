import { defineConfig, devices } from "@playwright/test";
import { servers } from "./servers";

const CI = !!process.env.CI;
const basic = "node --expose-gc fixtures/basic/.output/server/index.mjs";

const server = (port: number, command: string, env = {}) => ({
  command,
  url: `http://localhost:${port}`,
  env: { PORT: String(port), ...env },
  reuseExistingServer: !CI,
  timeout: 180_000,
});

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? "github" : "list",
  use: { trace: "on-first-retry" },
  // Installed Chrome (preinstalled on GitHub's Ubuntu runners), so no browser download.
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
  webServer: [
    server(servers.config, basic),
    server(servers.runtime, basic, {
      NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID: "runtime-client-id",
    }),
    server(servers.empty, basic, { NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID: "" }),
    server(
      servers.ownPlugin,
      "node fixtures/own-plugin/.output/server/index.mjs",
    ),
    // Packs the module and installs it into a fresh app first
    server(servers.dev, "sh consumer.sh"),
  ],
});
