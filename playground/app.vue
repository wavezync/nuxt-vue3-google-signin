<script setup lang="ts">
import type { CredentialResponse } from "nuxt-vue3-google-signin";

const user = ref<string>();
const onSuccess = ({ credential }: CredentialResponse) => {
  user.value = credential && decodeCredential(credential).email;
};

const { isReady, login } = useTokenClient({
  onSuccess: (response) => console.log("token", response),
  onNonOAuthError: (error) => console.warn("popup", error.type),
});
</script>

<template>
  <main>
    <GoogleSignInButton @success="onSuccess" @error="console.error" />
    <p v-if="user">Signed in as {{ user }}</p>
    <button type="button" :disabled="!isReady" @click="login()">
      Get an access token
    </button>
  </main>
</template>
