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
  color: #fff;
  background-color: #6cb2eb;
  border: none;
  border-radius: 5px;
  width: 300px;
  line-height: 40px;
  font-weight: 700;
  box-shadow: 0px 2px 2px 0px #000000;
}
.button:hover {
  background-color: #6cb2eb;
}
.button:active {
  box-shadow: none;
  transform: translateY(2px);
}
</style>
