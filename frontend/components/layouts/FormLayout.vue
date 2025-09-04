<script setup lang="ts">
import { Form } from "vee-validate";
import Button from "../common/Button.vue";

type Props = {
  buttonText: string;
  buttonColor: "red" | "blue";
  errorMessage?: string;
};

defineProps<Props>();
defineEmits(["submit"]);
</script>

<template>
  <div class="form-container">
    <Form @submit="() => $emit('submit')">
      <slot></slot>
      <div v-if="errorMessage" class="form-error">
        {{ errorMessage }}
      </div>
      <div class="form-button">
        <Button :label="buttonText" :color="buttonColor" />
      </div>
    </Form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
}
.form-button {
  display: flex;
  justify-content: center;
}
.form-error {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  border-radius: 0.375rem;
}
</style>
