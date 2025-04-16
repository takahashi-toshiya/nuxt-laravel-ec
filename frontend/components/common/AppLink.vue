<script setup lang="ts">
import { NuxtLink } from "#components";

type Props = {
  to: string;
  label: string;
  color: "red" | "blue";
};

const props = defineProps<Props>();
const emit = defineEmits(["a-click"]);

const isExternal = props.to.startsWith("http");
</script>

<template>
  <component
    :is="isExternal ? 'a' : NuxtLink"
    :href="isExternal ? to : undefined"
    :to="isExternal ? undefined : to"
    :class="['app-link', props.color]"
  >
    {{ label }}
  </component>
</template>

<style scoped>
.app-link {
  text-decoration: none; /* 下線を削除 */
  cursor: pointer;
}
.red {
  color: #f33737;
}
.blue {
  color: #0e84e5;
}
</style>
