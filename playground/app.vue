<template>
  <div class="center">
    <GoogleSignInButton @success="onSuccess" @error="onError" />
  </div>
</template>

<script setup>
// eslint-disable-next-line no-console
const onSuccess = resp => console.log(resp)
// eslint-disable-next-line no-console
const onError = resp => console.error(resp)
</script>

<style>
</style>
