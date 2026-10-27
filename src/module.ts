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

export interface ModuleOptions {
  /**
   * Client ID obtained from the Google Cloud Console. Lands in
   * `runtimeConfig.public.googleSignIn.clientId`, so the
   * `NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID` env variable overrides it at runtime.
   *
   * @see https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
   */
  clientId?: string;

  /**
   * Language to load Google's script in, such as `en` or `fr`. Defaults to the
   * browser's language.
   */
  locale?: string;

  /**
   * Install the vue3-google-signin plugin. Set to `false` to install it in your
   * own Nuxt plugin instead, for example to pick a client ID per request.
   * Components and composables stay auto-imported.
   *
   * @default true
   */
  plugin?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-vue3-google-signin",
    configKey: "googleSignIn",
    compatibility: {
      nuxt: ">=3.0.0",
    },
  },
  defaults: {
    clientId: "",
    plugin: true,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    // Everything imports the library through the module's runtime files, never
    // from app code. Imported from the app, it didn't resolve under strict
    // pnpm, and on Nuxt 3 Vite found it late and bundled it twice, so the
    // composables lost the plugin's client ID (#11).
    const runtime = resolve("./runtime/index");

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

    if (!options.plugin) return;

    const config = (nuxt.options.runtimeConfig.public.googleSignIn = defu(
      nuxt.options.runtimeConfig.public.googleSignIn,
      { clientId: options.clientId, locale: options.locale },
    ));
    if (
      !config.clientId?.trim() &&
      !process.env.NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID
    ) {
      useLogger("nuxt-vue3-google-signin").warn(
        "No client ID: set googleSignIn.clientId, or NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID when the server starts",
      );
    }
    addPlugin(resolve("./runtime/plugin"));
  },
});

declare module "@nuxt/schema" {
  interface PublicRuntimeConfig {
    googleSignIn: Pick<ModuleOptions, "clientId" | "locale">;
  }
}
