<script setup lang="ts">
// 画像取得はapiでやるべきだがひとまず決め打ち
const imgList = [
  { src: "public/image/bunner_01.jpg", title: "sale" },
  { src: "public/image/bunner_02.jpg", title: "sale" },
];
</script>

<template>
  <div class="slider">
    <img class="img-slider" src="public/image/bunner_01.jpg" />
  </div>
</template>

<style scoped>
.slider {
  width: 1000px;
  height: 350px;
}

.img-slider {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
