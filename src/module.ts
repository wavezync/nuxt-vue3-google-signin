import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, addComponent, useLogger } from '@nuxt/kit'
import { defineUnimportPreset } from 'unimport'

const MODULE_NAME = 'nuxt-vue3-google-signin'

export interface ModuleOptions {
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue3-google-signin',
    configKey: 'googleSignIn',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false
    }
  },
  defaults: {},
  setup (_options, nuxt) {
    if (nuxt.options.runtimeConfig.public?.googleSignIn?.clientId.trim().length === 0) {
      useLogger(MODULE_NAME).error('clientId is required')
    }

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)
    addPlugin(resolve(runtimeDir, 'plugin'))

    // Add auto-imported components
    GsiBuiltinComponents.map(name =>
      addComponent({
        name,
        export: name,
        filePath: 'vue3-google-signin'
      })
    )

    // Add auto-imported composables
    nuxt.hook('autoImports:sources', (presets) => {
      presets.push(
        defineUnimportPreset({
          from: 'vue3-google-signin',
          imports: [...GsiComposables]
        })
      )
    })
  }
})

const GsiBuiltinComponents = [
  'GoogleSignInButton'
]

const GsiComposables = [
  'useTokenClient',
  'useCodeClient',
  'useGsiScript',
  'useOneTap'
]
