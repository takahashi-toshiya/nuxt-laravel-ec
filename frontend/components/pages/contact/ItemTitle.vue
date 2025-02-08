<script setup lang="ts">
import ValidationLabel from "./ValidationLabel.vue";

type Props = {
  label: string;
  required: boolean;
  uniqueId?: string;
};

const props = defineProps<Props>();
</script>

<template>
  <label class="title" :for="props.uniqueId">
    {{ props.label }}
    <ValidationLabel mode="required" />
  </label>
</template>

<style scoped>
.title {
  display: block;
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 24px;
  color: #202124;
  font-weight: 400;
  width: 100%;
  word-break: break-word;
  margin-bottom: 16px;
}
</style>
