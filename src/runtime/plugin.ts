import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import GoogleSignInPlugin from "vue3-google-signin";

export default defineNuxtPlugin((nuxtApp) => {
  const { clientId, locale } = useRuntimeConfig().public.googleSignIn;
  // Without a client ID, leave it out: the module already warned at build
  // time, and composables or buttons can still bring their own
  nuxtApp.vueApp.use(
    GoogleSignInPlugin,
    clientId?.trim() ? { clientId, locale } : { locale },
  );
});
