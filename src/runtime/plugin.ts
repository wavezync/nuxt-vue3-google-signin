import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { googleSignIn } = useRuntimeConfig().public
  if (googleSignIn) {
    const plugin = await import('vue3-google-signin')

    if (!googleSignIn.clientId) {
      console.warn('[vue3-google-signin] googleSignIn.clientId is not provided in appConfig')
      return
    }

    nuxtApp.vueApp.use(plugin.default, { clientId: googleSignIn.clientId })
  }
})
