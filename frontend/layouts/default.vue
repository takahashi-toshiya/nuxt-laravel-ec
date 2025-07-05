<script setup lang="ts">
import Footer from "~/components/layouts/Footer.vue";
import Header from "~/components/layouts/Header.vue";
import LoadingOverlay from "~/components/common/LoadingOverlay.vue";
import { useLoadingStore } from "~/store/loadingStore";

const loadingStore = useLoadingStore();
</script>

<template>
  <div class="app-container">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
    <LoadingOverlay 
      :is-visible="loadingStore.isLoading"
      :text="loadingStore.loadingMessage"
    />
  </div>
</template>

<style></style>
