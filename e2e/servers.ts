/** One server per scenario. Production servers share the basic fixture's build. */
export const servers = {
  /** googleSignIn.clientId from nuxt.config, with --expose-gc for the memory tests */
  config: 3100,
  /** Same build, client ID overridden by NUXT_PUBLIC_GOOGLE_SIGN_IN_CLIENT_ID */
  runtime: 3101,
  /** Same build, client ID overridden with an empty string */
  empty: 3102,
  /** googleSignIn.plugin: false, the app installs the plugin itself */
  ownPlugin: 3103,
  /** nuxi dev on a fresh app with the packed module installed (consumer.sh) */
  dev: 3104,
};

export const url = (server: keyof typeof servers, path = "/") =>
  `http://localhost:${servers[server]}${path}`;
