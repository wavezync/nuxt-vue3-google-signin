export default defineNuxtConfig({
  modules: ["nuxt-vue3-google-signin"],
  googleSignIn: { plugin: false },
  devtools: { enabled: false },
  telemetry: false,
  compatibilityDate: "2026-10-01",
});
