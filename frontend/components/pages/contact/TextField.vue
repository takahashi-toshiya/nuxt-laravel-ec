<script setup lang="ts">
import ItemTitle from "./ItemTitle.vue";

type Props = {
  label: string;
  required: boolean;
  uniqueId: string;
  modelValue?: string;
  error?: string;
};

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<Props>();

const handleInput = (event: any) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <ItemTitle
    :label="props.label"
    :uniqueId="props.uniqueId"
    :required="props.required"
  />
  <input
    class="input"
    type="text"
    id="name"
    :required="props.required"
    :value="props.modelValue"
    @input="handleInput"
  />
  <p v-if="error" class="error-message">{{ error }}</p>
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

.input {
  outline: none;
  border: none;
  border-bottom: 1px solid #dadce0;
  width: 300px;
  /* ダークモード対応 */
  color-scheme: light;
  background-color: white;
  color: black;
}

/* Chrome autofill対応 */
.input:-webkit-autofill,
.input:-webkit-autofill:hover,
.input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 30px white inset !important;
  -webkit-text-fill-color: black !important;
}
.input:focus {
  border: 1px solid lightblue;
}
</style>
