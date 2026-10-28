<script setup lang="ts">
import type { CredentialResponse } from "nuxt-vue3-google-signin";

const onSuccess = (response: CredentialResponse) => log("success", response);
</script>

<template>
  <GoogleSignInButton @success="onSuccess" @error="log('error', $event)" />
</template>
