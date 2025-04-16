<script setup lang="ts">
import BaseModal from "./BaseModal.vue";

defineProps({
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["confirm"]);
</script>

<template>
  <BaseModal :message="message" @confirm="emit('confirm')" />
</template>
