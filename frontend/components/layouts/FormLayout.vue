<script setup lang="ts">
import { Form } from "vee-validate";
import Button from "../common/Button.vue";

type Props = {
  buttonText: string;
  buttonColor: "red" | "blue";
};

defineProps<Props>();
defineEmits(["submit"]);
</script>

<template>
  <div class="form-container">
    <Form @submit="() => $emit('submit')">
      <slot></slot>
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
</style>
