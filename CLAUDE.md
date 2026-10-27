# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`nuxt-vue3-google-signin`: a Nuxt module (Nuxt 3 and 4) for [vue3-google-signin](https://github.com/wavezync/vue3-google-signin), which lives in a sibling repo and has the docs site (https://vue3-google-signin.wavezync.com, its "With Nuxt" section and FAQ cover this module). Built with `@nuxt/module-builder` into `dist/module.mjs` (build-time module) plus `dist/runtime/` (code that runs in the app).

## Commands

pnpm 12 (pinned via `packageManager`; Node 24 from `.node-version`). pnpm settings, including the `allowBuilds` allowlist, live in `pnpm-workspace.yaml`. Its workspace packages are `playground` and `e2e`.

```sh
pnpm dev:prepare  # stub build + generated types; run first, and before typecheck
pnpm dev          # playground (needs NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID in playground/.env)
pnpm build        # nuxt-module-build build (also the prepack script)
pnpm typecheck    # vue-tsc on the module, then nuxi typecheck on the e2e basic fixture
pnpm lint         # oxlint (.oxlintrc.json); lint:fix to autofix
pnpm format       # oxfmt (.oxfmtrc.json); format:check in CI
pnpm test         # build, then e2e: build both fixtures, run Playwright
pnpm --filter e2e exec playwright test tests/memory.spec.ts   # one spec (after pnpm --filter e2e build)
```

TypeScript stays on 5.9: module-builder's peer range is `^5.9.3`. `src/runtime/plugin.ts` imports from `#app`, not `#imports`; with `#imports` the runtime `.d.ts` build fails (TS2742).

## Tests (`e2e/`)

Playwright on the installed Chrome (`channel: "chrome"`), against several servers started by `e2e/playwright.config.ts`, with ports in `e2e/servers.ts`:

- `fixtures/basic` (production build), started three times: client ID from `nuxt.config`, overridden by `NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID`, and overridden with an empty string. The first runs with `--expose-gc` for `server/api/heap.get.ts`.
- `fixtures/own-plugin`: `googleSignIn.plugin: false`, the app installs the plugin with a client ID per hostname.
- `consumer.sh`: packs the module and installs it with pnpm into a fresh app in a temp dir (the basic fixture's pages, same Nuxt version as `e2e`), then runs `nuxi dev`. Only there is the module inside `node_modules` with its dependencies out of the app's reach, as in users' projects; the workspace link makes Vite treat it as app source. `tests/dev.spec.ts` uses it.

`tests/fixtures.ts` routes Google's script to `e2e/gsi-stub.js` (copied from vue3-google-signin's e2e), which records calls in `window.__gsi.calls`, and fails any test with a page error or console error. Fixture pages report what the library handed them with `log()` into `window.__events`. `tests/memory.spec.ts` checks the server heap over 3,000 renders and, through CDP, the browser's DOM nodes, listeners and heap over 600 client-side navigations (`window.__router`, set in the fixture's `app.vue`).

CI (`.github/workflows/build.yaml`) runs lint + format, typecheck + build, and the tests on Nuxt 4 and on Nuxt 3 (`pnpm --filter e2e add nuxt@3`). Every job installs through `.github/actions/setup`. Actions are referenced by major version tag, not SHA; Dependabot bumps them. Publishing to npm happens on GitHub release publication (`publish.yaml`) after lint, typecheck and tests, through npm trusted publishing (OIDC, no token; provenance added by npm). The trusted publisher is configured on npmjs.com against the workflow filename, so renaming `publish.yaml` breaks publishing.

`pnpm changelog` regenerates `CHANGELOG.md` from conventional commits with git-cliff (`cliff.toml`, wrapped by `scripts/changelog.mjs`); don't edit it by hand. Run `pnpm changelog --tag vX.Y.Z` before tagging. `feat`/`fix`/`perf`/`refactor` and `!` breaking changes are listed, `docs`/`build`/`ci`/`test` collapsed, `chore`/`style` dropped.

## Architecture

- `src/module.ts` registers `GoogleSignInButton` and the composables and helpers as auto-imports, all from `src/runtime/index.ts`, which re-exports vue3-google-signin. Never point them at the bare `vue3-google-signin` specifier: the app's generated code can't resolve it under strict pnpm, and on Nuxt 3 Vite then found the library late and loaded it twice, so composables lost the plugin's client ID (#11). Add new public composables or helpers of the library to the `addImports` list.
- `module.ts` also re-exports the library's types (`export type *`), so apps import `CredentialResponse` and friends from `nuxt-vue3-google-signin`.
- Unless `plugin: false`, the module stores `clientId`/`locale` in `runtimeConfig.public.googleSignIn` (so `NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID` overrides it at runtime), warns once at build time when there's no client ID, and adds `src/runtime/plugin.ts`, which installs the library's plugin. An empty client ID is left out of the plugin options so the library doesn't warn on every request.

## Conventions

- Formatting is oxfmt with `printWidth: 80`. Prefix unused vars/args with `_`.
- When the module's options or behavior change, update `README.md` and the "With Nuxt" section of the docs in the vue3-google-signin repo (`docs/src/content/docs/guide/index.mdx`, `guide/faq.md`).
