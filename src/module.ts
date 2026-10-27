import {
  addComponent,
  addImports,
  addPlugin,
  createResolver,
  defineNuxtModule,
  useLogger,
} from "@nuxt/kit";
import { defu } from "defu";

// Types such as CredentialResponse, importable from the module even when the
// app can't import vue3-google-signin itself (pnpm)
export type * from "vue3-google-signin";

const MODULE_NAME = "nuxt-vue3-google-signin";

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
    name: "vue3-google-signin",
    configKey: "googleSignIn",
    compatibility: {
      nuxt: ">=3.0.0 <5.0.0",
    },
  },
  defaults: {
    clientId: "",
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.googleSignIn = defu(
      nuxt.options.runtimeConfig.public.googleSignIn,
      { clientId: options.clientId },
    );

    if (isEmpty(nuxt.options.runtimeConfig.public.googleSignIn.clientId)) {
      useLogger(MODULE_NAME).warn("provide googleSignIn.clientId in appConfig");
    }

    const { resolve } = createResolver(import.meta.url);
    // Everything imports the library through the module's runtime files, never
    // from app code. Imported from the app, it didn't resolve under strict
    // pnpm, and on Nuxt 3 Vite found it late and bundled it twice, so the
    // composables lost the plugin's client ID (#11).
    const runtime = resolve("./runtime/index");

    addPlugin(resolve("./runtime/plugin"));
    addComponent({
      name: "GoogleSignInButton",
      export: "GoogleSignInButton",
      filePath: runtime,
    });
    addImports(
      [
        "useCodeClient",
        "useGsiScript",
        "useOneTap",
        "useTokenClient",
        "decodeCredential",
        "idRevoke",
        "hasGrantedAllScopes",
        "hasGrantedAnyScopes",
        "revokeAccessToken",
        "buildCodeRequestRedirectUrl",
      ].map((name) => ({ name, from: runtime })),
    );
  },
});

function isEmpty(value: string | undefined): boolean {
  if (!value) {
    return true;
  }
  return value.trim().length === 0;
}
