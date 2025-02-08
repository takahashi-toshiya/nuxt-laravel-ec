<script setup lang="ts">
import wrapper from "~/components/common/Wrapper.vue";
import Product from "~/components/pages/top/Product.vue";
import Slider from "~/components/pages/top/Slider.vue";
</script>

<template>
  <wrapper>
    <!--スライダ-->
    <div class="slider">
      <Slider />
    </div>
    <!--商品一覧-->
    <div class="product-list">
      <Product />
    </div>
  </wrapper>
</template>

<style scoped>
.slider {
  margin-bottom: 25px;
}
</style>
