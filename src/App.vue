<script setup lang="ts">
import MyCounter from "./components/MyCounter.vue"
</script>

<template>
  <section>
    <h1>Mi primera app</h1>
    <MyCounter :value="5" />
  </section>
</template>

<style scoped></style>
