<script setup lang="ts">
import ItemTitle from "./ItemTitle.vue";

type Props = {
  gender: number | null;
  label: string;
  required: boolean;
  error?: string;
};
const props = defineProps<Props>();
const emit = defineEmits(["update:gender"]);

const handleInput = (value: number) => {
  emit("update:gender", value);
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
        :checked="props.gender === 0"
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
        :checked="props.gender === 1"
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
