<script setup lang="ts">
import ItemTitle from "./ItemTitle.vue";

type Props = {
  label: string;
  required: boolean;
  modelValue?: number | null;
  error?: string;
};
const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const handleInput = (value: number) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <ItemTitle :label="props.label" :required="props.required" />
  <div class="radio-wrap">
    <label>
      <input
        class="radio-button"
        type="radio"
        name="gender"
        value="0"
        :checked="props.modelValue === 0"
        @change="handleInput(0)"
      />男性
    </label>
  </div>
  <div class="radio-wrap">
    <label>
      <input
        class="radio-button"
        type="radio"
        name="gender"
        value="1"
        :checked="props.modelValue === 1"
        @change="handleInput(1)"
      />女性
    </label>
  </div>
  <p v-if="error" class="error-message">{{ error }}</p>
</template>

<style scoped>
.radio-wrap {
  position: relative;
  margin-top: 30px;
  padding-left: 30px;
}
.radio-button {
  appearance: none;
}
.radio-button::before {
  content: "";
  background-image: url(/public/image/radio.png);
  background-size: contain;
  display: block;
  position: absolute;
  top: -1px;
  left: 0;
  width: 18px;
  height: 18px;
  zoom: 150%;
}

.radio-button:checked::before {
  content: "";
  background-image: url(/public/image/radio-checked.png);
  background-size: contain;
  display: block;
  position: absolute;
  top: -1px;
  left: 0;
  width: 18px;
  height: 18px;
  zoom: 150%;
}
</style>
