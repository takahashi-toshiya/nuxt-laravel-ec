<script setup lang="ts">
type Props = {
  id: string;
  modelValue: string;
  placeholder?: string;
  required?: boolean;
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
    :required="required"
  />
</template>

<style scoped>
input {
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* ダークモード対応 */
  color-scheme: light;
  background-color: white;
  color: black;
}

/* Chrome autofill対応 */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: black !important;
}
</style>
