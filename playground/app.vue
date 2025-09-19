<template>
  <div class="center">
    <GoogleSignInButton @success="onSuccess" @error="onError" />
  </div>
</template>

<script setup>
const onSuccess = resp => console.log(resp)

const onError = resp => console.error(resp)
</script>

<style></style>
