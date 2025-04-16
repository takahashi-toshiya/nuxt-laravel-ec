<script setup lang="ts">
import { defineProps } from "vue";

type Props = {
  src: string;
  alt?: string;
};

const props = defineProps<Props>();

const imageSrc = computed(() => {
  return props.src || "/image/no_image.png";
});
</script>

<template>
  <img :src="imageSrc" :alt="alt" />
</template>
