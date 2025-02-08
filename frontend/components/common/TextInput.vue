<script setup lang="ts">
type Props = {
  id: string;
  modelValue: string;
  placeholder?: string;
};
const props = defineProps<Props>();

const emit = defineEmits();
const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <input
    type="text"
    :id="id"
    :value="modelValue"
    :placeholder="placeholder"
    @input="handleChange"
  />
</template>

<style scoped>
input {
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
