<script setup lang="ts">
const emit = defineEmits(["click"]);
const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>
<template>
  <input class="button" type="submit" value="送信する" @click="handleClick" />
</template>

<style scoped>
.button {
  padding: 3px 8px;
  border-radius: 3px;
  border: none;
  color: #fff;
  cursor: pointer;
  background-color: red;
  width: 300px;
  line-height: 40px;
  font-weight: 700;
}
.button:hover {
  background-color: darkred;
}
</style>
