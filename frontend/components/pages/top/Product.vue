<script setup lang="ts">
const { data: items } = await useFetch("/test/product");
</script>

<template>
  <div class="container">
    <div class="item" v-for="item in items">
      <img :src="item.image_path" />
      <p>{{ item.name }}</p>
      <p>{{ item.price }}</p>
      <p>{{ item.comment }}</p>
      <button>カートに入れる</button>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
}
.container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item {
  width: 28%;
  background-color: #fff;
  padding: 20px;
}
</style>
