import GoogleSignInPlugin from "vue3-google-signin";

// One client ID per domain, as a multi-brand app serving several hosts would
export default defineNuxtPlugin((nuxtApp) => {
  const clientId = `${useRequestURL().hostname}-client-id`;
  nuxtApp.vueApp.use(GoogleSignInPlugin, { clientId });
});
