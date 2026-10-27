<script setup lang="ts">
const { isReady, login } = useTokenClient({
  onSuccess: (response) => log("success", response),
});
</script>

<template>
  <button :disabled="!isReady" @click="login()">Get token</button>
</template>
