import { defineNuxtConfig } from 'nuxt/config'
import GoogleSignIn from '..'

export default defineNuxtConfig({
  modules: [
    GoogleSignIn,
  ],
  devtools: { enabled: true },
  googleSignIn: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
  },
})
