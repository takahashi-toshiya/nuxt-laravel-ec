<script setup lang="ts">
import TextInput from "~/components/common/TextInput.vue";

type Props = {
  id: string;
  label: string;
  modelValue: string | undefined;
  placeholder?: string;
  errorMessage?: string;
};

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="row">
    <label :for="id">{{ label }}</label>
    <TextInput
      :id="id"
      :modelValue="modelValue"
      :placeholder="placeholder"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 320px;
  margin-bottom: 1rem;
}

.error-message {
  color: red;
  font-size: 0.875rem;
  text-align: left;
  width: 100%;
}

.row {
  display: flex;
  flex-direction: column;
  width: 320px; /* 入力欄の幅を固定（適宜調整） */
  margin-bottom: 1rem;
}

.row label {
  text-align: left; /* 明示的に左寄せ */
  width: 100%;
}

.row input {
  width: 100%; /* 入力欄の幅を `.row` に合わせる */
}
</style>
