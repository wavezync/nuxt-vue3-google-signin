# Changelog

Every release of nuxt-vue3-google-signin, newest first. For the library itself,
see https://vue3-google-signin.wavezync.com/changelog/

## 1.0.0

Released October 28, 2026. [Compare with 0.0.13](https://github.com/wavezync/nuxt-vue3-google-signin/compare/v0.0.13...v1.0.0)

### Breaking changes

- Upgrade to vue3-google-signin 3 ([5f16ebc](https://github.com/wavezync/nuxt-vue3-google-signin/commit/5f16ebc68ba20a38e51ab5ba43655522132eca7a))

### Features

- Re-export vue3-google-signin's types and auto-import its helpers ([3b30106](https://github.com/wavezync/nuxt-vue3-google-signin/commit/3b3010603d407bad3c46bfd5a86cfc9fa841c88e))
- Add plugin and locale options ([0714ec5](https://github.com/wavezync/nuxt-vue3-google-signin/commit/0714ec5f8a517573109eec7738752493e02b529d))

### Bug fixes

- Load vue3-google-signin through the module's own files ([5d85bf9](https://github.com/wavezync/nuxt-vue3-google-signin/commit/5d85bf986fc3616a5d47a7017c662cd2bda80d06))
- Warn about a missing client ID once, when building ([ea8a821](https://github.com/wavezync/nuxt-vue3-google-signin/commit/ea8a8213980ee83e0fd321959f38634f3074cdef))
- Require vue3-google-signin 3.0.1 ([460415a](https://github.com/wavezync/nuxt-vue3-google-signin/commit/460415a08aaa50e220d67fadc11d323a915052b7))

<details>
<summary>Documentation (1)</summary>

- Rewrite the README and update the playground ([60e59e2](https://github.com/wavezync/nuxt-vue3-google-signin/commit/60e59e2af8d7ad9a6e07652cefdf7d8e5209e790))

</details>

<details>
<summary>Tooling (5)</summary>

- Switch to pnpm 12, oxlint and oxfmt ([840d88c](https://github.com/wavezync/nuxt-vue3-google-signin/commit/840d88c137d1e2c3c5212f81fcad32cb361876b8))
- Add a Playwright suite with SSR and memory leak checks ([1c9742e](https://github.com/wavezync/nuxt-vue3-google-signin/commit/1c9742ecc15c2c200a4995cc31ee148b36417bf3))
- Test on Nuxt 3 and 4, publish with npm trusted publishing ([7a2bbbc](https://github.com/wavezync/nuxt-vue3-google-signin/commit/7a2bbbc932b7b7ca23e1cf3b2185105a3eb5eec0))
- Generate the changelog with git-cliff ([631230c](https://github.com/wavezync/nuxt-vue3-google-signin/commit/631230ce3db8f11d444f6ee942c953ac5b676793))
- Generate Nuxt's types before building in the test job ([cdd14ba](https://github.com/wavezync/nuxt-vue3-google-signin/commit/cdd14baa2fc0f084f4e6fe7d037ca85ff3b05e3b))

</details>

## 0.0.13

Released September 19, 2025. [Compare with 0.0.12](https://github.com/wavezync/nuxt-vue3-google-signin/compare/v0.0.12...v0.0.13)

### Bug fixes

- Change error logging to warning for missing googleSignIn.clientId ([036ed9b](https://github.com/wavezync/nuxt-vue3-google-signin/commit/036ed9beacfcc90f21ce34a7e83e050c2e395bd6))

## 0.0.12

Released September 19, 2025. [Compare with 0.0.11](https://github.com/wavezync/nuxt-vue3-google-signin/compare/v0.0.11...v0.0.12)

### Bug fixes

- Add lint:fix script and format code in app.vue and nuxt.config.ts ([90246c7](https://github.com/wavezync/nuxt-vue3-google-signin/commit/90246c7a26357d35feac239160f399f08909fbf9))

<details>
<summary>Documentation (1)</summary>

- Use new `nuxi module add` command in installation ([4b6aebb](https://github.com/wavezync/nuxt-vue3-google-signin/commit/4b6aebb5a1dbf5dd37e779f163d38a2315471cdd)) by [@danielroe](https://github.com/danielroe)

</details>

<details>
<summary>Tooling (1)</summary>

- Run tests against prs ([396a0ac](https://github.com/wavezync/nuxt-vue3-google-signin/commit/396a0ac0f17969d83112661eae284a4977ea7289)) by [@danielroe](https://github.com/danielroe)

</details>

### New contributors

- [@](https://github.com/) made their first contribution
- [@cracker4o](https://github.com/cracker4o) made their first contribution
- [@tanukijs](https://github.com/tanukijs) made their first contribution
- [@danielroe](https://github.com/danielroe) made their first contribution

## 0.0.11

Released March 4, 2024. [Compare with 0.0.10](https://github.com/wavezync/nuxt-vue3-google-signin/compare/v0.0.10...v0.0.11)

### Bug fixes

- Node version ([dcac156](https://github.com/wavezync/nuxt-vue3-google-signin/commit/dcac156a7d3da29c2622d4c2e5c4e5fc1b76d310))
- Update ci ([f3ba2a8](https://github.com/wavezync/nuxt-vue3-google-signin/commit/f3ba2a8766a0c06ce983b506c38a4aebdbe9ef3d))

<details>
<summary>Tooling (2)</summary>

- Change order ([17f116f](https://github.com/wavezync/nuxt-vue3-google-signin/commit/17f116f5dc88733044134872c24f844ce2c54da6))
- Reoder scripts ([62ef584](https://github.com/wavezync/nuxt-vue3-google-signin/commit/62ef584f8f378b7f139f50a7331cf49e46a4685f))

</details>

## 0.0.7

Released November 2, 2022. [Compare with 0.0.6](https://github.com/wavezync/nuxt-vue3-google-signin/compare/v0.0.6...v0.0.7)

### Bug fixes

- Use latest lib version ([a1c5fdc](https://github.com/wavezync/nuxt-vue3-google-signin/commit/a1c5fdc9563b23b05654672f01c0469926bfbf8c))

## 0.0.4

Released September 22, 2022. [Compare with 0.0.3](https://github.com/wavezync/nuxt-vue3-google-signin/compare/v0.0.3...v0.0.4)

<details>
<summary>Documentation (1)</summary>

- Update readme ([1aaa55f](https://github.com/wavezync/nuxt-vue3-google-signin/commit/1aaa55fcd4cef6cb44ac8a1f2606f03620f32eba))

</details>

## 0.0.3

Released September 22, 2022. [Compare with 0.0.2](https://github.com/wavezync/nuxt-vue3-google-signin/compare/v0.0.2...v0.0.3)

### Features

- Use runtime config ([b3e956d](https://github.com/wavezync/nuxt-vue3-google-signin/commit/b3e956d64b48ab1e55a70abf3a26690953b2b530))

### Bug fixes

- Issue with config ([389ca1f](https://github.com/wavezync/nuxt-vue3-google-signin/commit/389ca1f5275614e52ad21cd657a4cee50b12e97f))

<details>
<summary>Documentation (1)</summary>

- Update readme ([0753ffd](https://github.com/wavezync/nuxt-vue3-google-signin/commit/0753ffd706084d635b447a7965abb03c20f0add3))

</details>

## 0.0.2

Released August 16, 2022. [Compare with 0.0.1](https://github.com/wavezync/nuxt-vue3-google-signin/compare/v0.0.1...v0.0.2)

<details>
<summary>Documentation (1)</summary>

- Added readme ([18679a1](https://github.com/wavezync/nuxt-vue3-google-signin/commit/18679a1cd47e51d8192530c1ec0026a09405da3f))

</details>

## 0.0.1

Released August 16, 2022.

### Features

- Initialize module ([96d1d97](https://github.com/wavezync/nuxt-vue3-google-signin/commit/96d1d977fd74ea872d308bbb0556383efe105418))
- UseLogger ([e6da9f6](https://github.com/wavezync/nuxt-vue3-google-signin/commit/e6da9f6b701285346e8ac7baa3073a4bf68398a6))
- Add .env example ([38ead71](https://github.com/wavezync/nuxt-vue3-google-signin/commit/38ead71e400c9d1ef61040f15cf3395031619565))

### Bug fixes

- Minor improvements ([6309b67](https://github.com/wavezync/nuxt-vue3-google-signin/commit/6309b671b08e17a0ae17e510b1cac8bf3afed3ef))

<details>
<summary>Documentation (2)</summary>

- Update readme ([bd008a9](https://github.com/wavezync/nuxt-vue3-google-signin/commit/bd008a962a5760c5e1939b5d2372868abcb8221d))
- Update readme ([0b703ef](https://github.com/wavezync/nuxt-vue3-google-signin/commit/0b703ef2e4f4d2f6ff8ae0b6f9bf9a3c8c99982b))

</details>

<details>
<summary>Tooling (4)</summary>

- Added config ([e195335](https://github.com/wavezync/nuxt-vue3-google-signin/commit/e195335b03682b4d35474f5e43bee546ac555b08))
- Update to build properly ([ef557fd](https://github.com/wavezync/nuxt-vue3-google-signin/commit/ef557fd2503639be7c13bf3c0aa70b1f81a31d8e))
- Added linting ([e88138e](https://github.com/wavezync/nuxt-vue3-google-signin/commit/e88138e92dcd2fa3f6aad348557d4bb229d682d6))
- Fix script ([1669633](https://github.com/wavezync/nuxt-vue3-google-signin/commit/1669633c32fede2501e75ece7647669049ad034d))

</details>

### New contributors

- [@kasvith](https://github.com/kasvith) made their first contribution

