<script setup lang="ts">
import type { ProductModel } from "~/types/model/ProductModel";
import Image from "../common/Image.vue";

type Props = {
  product: ProductModel;
  showComment?: boolean;
};
const { product, showComment = true } = defineProps<Props>();
</script>

<template>
  <Image
    class="product-card__image"
    :src="product.imagePath"
    :alt="product.alt"
  />
  <p class="product-card__title">{{ product.name }}</p>
  <p class="product-card__price">{{ product.price?.toLocaleString() }}</p>
  <p v-if="showComment" class="product-card__comment">
    {{ product.comment }}
  </p>

  <slot name="actions" />
</template>

<style scoped>
.product-card__image {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.product-card__title {
  font-size: 16px;
  font-weight: bold;
}
.product-card__price {
  font-size: 16px;
  color: red;
}
.product-card__comment {
  font-size: 16px;
}
.product-card__button {
  background-color: #bf0000;
  color: #fff;
  border-radius: 10px;
  padding: 3px 12px;
  margin: 10px auto 0;
  display: block;
}
</style>
