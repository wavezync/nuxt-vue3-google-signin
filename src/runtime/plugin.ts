import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { googleSignIn } = useRuntimeConfig().public
  if (googleSignIn) {
    const plugin = await import('vue3-google-signin')
    nuxtApp.vueApp.use(plugin.default, { clientId: googleSignIn.clientId })
  }
})
