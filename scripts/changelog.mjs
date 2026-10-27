// Writes CHANGELOG.md from the commit history with git-cliff (cliff.toml).
// Arguments go to git-cliff, so `pnpm changelog --tag v1.0.0` files unreleased
// commits under v1.0.0. Set GITHUB_TOKEN if GitHub's API rate-limits the
// contributor lookups.
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const run = (command, args) =>
  execFileSync(command, args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  });

writeFileSync(
  "CHANGELOG.md",
  `# Changelog

Every release of nuxt-vue3-google-signin, newest first. For the library itself,
see https://vue3-google-signin.wavezync.com/changelog/

${run("git-cliff", process.argv.slice(2))}`,
);
