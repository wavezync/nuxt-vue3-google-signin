export default defineNuxtConfig({
  modules: ["nuxt-vue3-google-signin"],
  googleSignIn: { clientId: "config-client-id" },
  devtools: { enabled: false },
  telemetry: false,
  compatibilityDate: "2026-10-01",
});
