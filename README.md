# nuxt-vue3-google-signin

[![CI](https://github.com/wavezync/nuxt-vue3-google-signin/actions/workflows/build.yaml/badge.svg)](https://github.com/wavezync/nuxt-vue3-google-signin/actions/workflows/build.yaml) [![npm](https://img.shields.io/npm/v/nuxt-vue3-google-signin)](https://www.npmjs.com/package/nuxt-vue3-google-signin) ![npm](https://img.shields.io/npm/dw/nuxt-vue3-google-signin) ![NPM](https://img.shields.io/npm/l/nuxt-vue3-google-signin) [![Docs](https://img.shields.io/badge/docs-Read%20Now-green)](https://vue3-google-signin.wavezync.com/)

Nuxt module for [vue3-google-signin](https://vue3-google-signin.wavezync.com/):
Google sign-in with Google Identity Services, for Nuxt 3 and 4.

## Install

```sh
npx nuxi@latest module add nuxt-vue3-google-signin
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["nuxt-vue3-google-signin"],
  googleSignIn: {
    clientId: "CLIENT ID OBTAINED FROM GOOGLE API CONSOLE",
  },
});
```

`GoogleSignInButton`, the composables (`useOneTap`, `useTokenClient`,
`useCodeClient`, `useGsiScript`) and the helpers (`decodeCredential`,
`hasGrantedAllScopes`, `revokeAccessToken`, ...) are auto-imported. See the
[documentation](https://vue3-google-signin.wavezync.com/) for how to use them.

```vue
<script setup lang="ts">
import type { CredentialResponse } from "nuxt-vue3-google-signin";

const onSuccess = ({ credential }: CredentialResponse) => {
  // send the credential to your server and verify it there
};
</script>

<template>
  <GoogleSignInButton @success="onSuccess" />
</template>
```

Import types such as `CredentialResponse` from `nuxt-vue3-google-signin`; it
re-exports every type of vue3-google-signin.

## Options

| Option     | Default | Description                                                                          |
| ---------- | ------- | ------------------------------------------------------------------------------------ |
| `clientId` | `""`    | Your client ID. Stored in `runtimeConfig.public.googleSignIn.clientId`.              |
| `locale`   |         | Language to load Google's script in, such as `en`. Defaults to the browser's.        |
| `plugin`   | `true`  | Set to `false` to install the vue3-google-signin plugin yourself. Auto-imports stay. |

### Set the client ID when the server starts

The client ID is part of Nuxt's runtime config, so you can leave it out of
`nuxt.config.ts` and set it with an environment variable when the server
starts. One build then serves any client ID:

```sh
NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID=your-client-id node .output/server/index.mjs
```

`process.env.SOMETHING` in `nuxt.config.ts` is read when you build, not when
the server starts. With `nuxi generate`, the client ID is fixed at generate time.

### A client ID per domain or tenant

To choose the client ID per request, for example one per domain, turn off the
module's plugin and install vue3-google-signin in your own Nuxt plugin. Add
`vue3-google-signin` to your dependencies to import it.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["nuxt-vue3-google-signin"],
  googleSignIn: { plugin: false },
});
```

```ts
// plugins/google-sign-in.ts
import GoogleSignInPlugin from "vue3-google-signin";

export default defineNuxtPlugin((nuxtApp) => {
  const clientId = clientIdFor(useRequestURL().hostname); // your lookup
  nuxtApp.vueApp.use(GoogleSignInPlugin, { clientId });
});
```

The plugin also takes a ref, and each composable and the button accept their
own `clientId`. See
[Dynamic Client ID](https://vue3-google-signin.wavezync.com/guide/dynamic-client-id/).

## FAQ

### Nothing happens after the Google popup closes

Google's popup reports back to your page with `postMessage`, which a
`Cross-Origin-Opener-Policy: same-origin` header blocks. Modules such as
nuxt-security send that header by default. Use `same-origin-allow-popups`:

```ts
// nuxt.config.ts, with nuxt-security
security: {
  headers: { crossOriginOpenerPolicy: "same-origin-allow-popups" },
},
```

`useTokenClient` and `useCodeClient` call `onNonOAuthError` when the user
closes the popup or it can't open.

### "The given client ID is not found" or "missing required parameter client_id"

Check that the client ID reached the browser: it's in
`useRuntimeConfig().public.googleSignIn.clientId`. If you set it from an
environment variable, set `NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID` where the
server runs (see above). Your page's origin must also be listed under
Authorized JavaScript origins for that client ID.

## Upgrading from 0.x

1.0 uses [vue3-google-signin 3](https://vue3-google-signin.wavezync.com/guide/migrating-to-v3/),
whose option and response types are named after their composable
(`UseTokenClientOptions`, `TokenClientSuccessResponse`, ...). The old names
still work but are deprecated. The module's options are unchanged.

## Development

pnpm 12 and Node 24 (`.node-version`).

```sh
pnpm install
pnpm dev:prepare   # build the module stub and generate types
pnpm dev           # playground; set NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID in playground/.env
pnpm lint          # oxlint
pnpm format        # oxfmt
pnpm typecheck
pnpm test          # build, then the Playwright suite in e2e/
```
