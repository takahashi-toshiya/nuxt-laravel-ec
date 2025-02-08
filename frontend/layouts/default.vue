<script setup lang="ts">
import Footer from "~/components/layouts/Footer.vue";
import Header from "~/components/layouts/Header.vue";
</script>

<template>
  <Header />
  <main>
    <slot />
  </main>
  <Footer />
</template>

<style></style>
