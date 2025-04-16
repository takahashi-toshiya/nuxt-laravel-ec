<script setup lang="ts">
type Props = {
  label: string;
  color: "red" | "blue";
};
const props = defineProps<Props>();
const emit = defineEmits(["button-click"]);

const handleClick = (event: MouseEvent) => {
  emit("button-click", event);
};
</script>

<template>
  <button :class="props.color" @click="handleClick" curs>
    {{ props.label }}
  </button>
</template>

<style scoped>
button {
  padding: 3px 8px;
  border-radius: 3px;
  border: none;
  color: #fff;
  cursor: pointer;
}
.red {
  background-color: red;
}

.blue {
  background-color: #3490dc;
}
</style>
