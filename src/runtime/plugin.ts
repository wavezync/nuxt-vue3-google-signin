import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import GoogleSignInPlugin from "vue3-google-signin";

export default defineNuxtPlugin((nuxtApp) => {
  const { googleSignIn } = useRuntimeConfig().public;
  if (!googleSignIn?.clientId) {
    console.warn(
      "[vue3-google-signin] googleSignIn.clientId is not provided in appConfig",
    );
    return;
  }

  nuxtApp.vueApp.use(GoogleSignInPlugin, { clientId: googleSignIn.clientId });
});
