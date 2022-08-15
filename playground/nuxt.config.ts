import { defineNuxtConfig } from 'nuxt'
import GoogleSignIn from '..'

export default defineNuxtConfig({
  modules: [
    [GoogleSignIn, { clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID }]
  ]
})
