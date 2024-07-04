import { resolve } from 'path'
import { fileURLToPath } from 'url'
import {
  addComponent,
  addImportsSources,
  addPlugin,
  defineNuxtModule,
  useLogger
} from '@nuxt/kit'
import { defu } from 'defu'
import { defineUnimportPreset } from 'unimport'

const MODULE_NAME = 'nuxt-vue3-google-signin'

export interface ModuleOptions {
  /**
   * Client ID obtained from Google Cloud Console
   *
   * @type {string}
   * @memberof ModuleOptions
   */
  clientId: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue3-google-signin',
    configKey: 'googleSignIn',
    compatibility: {
      nuxt: '^3',
      bridge: false
    }
  },
  defaults: {
    clientId: ''
  },
  setup (options, nuxt) {
    nuxt.options.runtimeConfig.public.googleSignIn = defu(
      nuxt.options.runtimeConfig.public.googleSignIn,
      { clientId: options.clientId }
    )

    if (isEmpty(nuxt.options.runtimeConfig.public.googleSignIn.clientId)) {
      useLogger(MODULE_NAME).error(
        'provide googleSignIn.clientId in appConfig'
      )
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
    addImportsSources(defineUnimportPreset({
      from: 'vue3-google-signin',
      imports: [...GsiComposables]
    }))
  }
})

function isEmpty (value: string | undefined): boolean {
  if (!value) {
    return true
  }
  return value.trim().length === 0
}

const GsiBuiltinComponents = ['GoogleSignInButton']

const GsiComposables = [
  'useTokenClient',
  'useCodeClient',
  'useGsiScript',
  'useOneTap'
]
