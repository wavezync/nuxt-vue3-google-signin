# nuxt-vue3-google-signin

[![Build](https://github.com/syetalabs/nuxt-vue3-google-signin/actions/workflows/build.yaml/badge.svg)](https://github.com/syetalabs/nuxt-vue3-google-signin/actions/workflows/build.yaml) [![npm](https://img.shields.io/npm/v/nuxt-vue3-google-signin)](https://www.npmjs.com/package/nuxt-vue3-google-signin) ![npm](https://img.shields.io/npm/dw/nuxt-vue3-google-signin) ![NPM](https://img.shields.io/npm/l/nuxt-vue3-google-signin) [![Docs](https://img.shields.io/badge/docs-Read%20Now-green)](https://vue3-google-signin.syetalabs.io/)

Nuxt Module for [vue3-google-signin](https://vue3-google-signin.syetalabs.io/)

## Usage

### Install package

- With **NPM**

```bash
npm install -S nuxt-vue3-google-signin
```

- With **Yarn**

```bash
yarn add nuxt-vue3-google-signin
```

- With **PNPM**

```bash
pnpm add nuxt-vue3-google-signin
```

### Initialize

Now you can add following entry to the `nuxt.config.ts`(or `nuxt.config.js`)

```ts
import { defineNuxtConfig } from 'nuxt/config'
 
export default defineNuxtConfig({
  modules: [
    'nuxt-vue3-google-signin'
  ],
  googleSignIn: {
    clientId: 'CLIENT ID OBTAINED FROM GOOGLE API CONSOLE',
  }
})
```

Checkout [documentation](https://vue3-google-signin.syetalabs.io/) for more.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.# Nuxt Module
- Add your google client id to `.env` in playground
