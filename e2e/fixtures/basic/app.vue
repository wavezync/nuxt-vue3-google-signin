<script setup lang="ts">
// Lets tests navigate client-side without clicking through links
onMounted(() => (window.__router = useRouter()));
</script>

<template>
  <NuxtPage />
</template>
