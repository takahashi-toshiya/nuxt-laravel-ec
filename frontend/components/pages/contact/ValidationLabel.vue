<script setup lang="ts">
type Props = {
  mode: "required" | "optional";
};
const props = defineProps<Props>();
</script>

<template>
  <span v-if="props.mode === 'required'" class="base required">必須</span>
  <span v-else-if="props.mode === 'optional'" class="base optional">任意</span>
</template>

<style scoped>
.base {
  border-radius: 10px;
  padding: 5px;
  font-size: 0.9em;
}
.required {
  color: white;
  background-color: red;
}
.optional {
  color: white;
  background-color: #9b9b9b;
}
</style>
