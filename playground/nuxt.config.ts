// Set NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID in playground/.env (see .env.example)
export default defineNuxtConfig({
  modules: ["nuxt-vue3-google-signin"],
  devtools: { enabled: true },
  compatibilityDate: "2026-10-01",
});
