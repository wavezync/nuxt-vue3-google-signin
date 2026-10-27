<script setup lang="ts">
// Header and payload of an ID token; decodeCredential doesn't check signatures
const token = [
  { alg: "RS256", typ: "JWT" },
  { email: "ada@example.com", name: "Ada Lovelace" },
]
  .map((part) => btoa(JSON.stringify(part)))
  .join(".");
const user = decodeCredential(`${token}.signature`);
</script>

<template>
  <p data-testid="user">{{ user.name }} &lt;{{ user.email }}&gt;</p>
</template>
