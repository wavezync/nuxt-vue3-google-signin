<script setup lang="ts">
const { isReady, login } = useCodeClient({
  onSuccess: (response) => log("success", response),
});
</script>

<template>
  <button :disabled="!isReady" @click="login()">Get code</button>
</template>
