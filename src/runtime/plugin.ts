import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import GoogleSignInPlugin from "vue3-google-signin";

export default defineNuxtPlugin((nuxtApp) => {
  const { clientId, locale } = useRuntimeConfig().public.googleSignIn;
  if (!clientId) {
    console.warn(
      "[vue3-google-signin] googleSignIn.clientId is not provided in appConfig",
    );
    return;
  }

  nuxtApp.vueApp.use(GoogleSignInPlugin, { clientId, locale });
});
