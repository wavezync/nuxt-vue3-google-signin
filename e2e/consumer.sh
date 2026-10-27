#!/bin/sh
# Starts nuxi dev on a fresh app outside the repo with the packed module
# installed by pnpm, as in a user's project: inside node_modules, with its own
# dependencies out of the app's reach. Runs the basic fixture's pages on the
# same Nuxt version as e2e.
set -e
app=$(mktemp -d)
fixture=fixtures/basic
nuxt=$(node -p 'require("nuxt/package.json").version')
pnpm --dir .. pack --out "$app/module.tgz" > /dev/null
cp -R "$fixture/nuxt.config.ts" "$fixture/app.vue" "$fixture/pages" "$fixture/utils" "$app/"
cat > "$app/package.json" <<JSON
{
  "private": true,
  "type": "module",
  "dependencies": {
    "nuxt": "$nuxt",
    "nuxt-vue3-google-signin": "file:./module.tgz"
  }
}
JSON
printf 'allowBuilds:\n  "@parcel/watcher": true\n  esbuild: true\n' > "$app/pnpm-workspace.yaml"
cd "$app"
pnpm install > /dev/null
exec pnpm exec nuxi dev --port "$PORT"
