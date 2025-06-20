<script setup lang="ts">
import Image from "../common/Image.vue";
import type { CartModel } from "~/types/model/CartModel";
import type { ProductModel } from "~/types/model/ProductModel";
import QuantityControl from "./QuantityControl.vue";

type Props = {
  products: ProductModel[];
  carts: CartModel[];
};

const { t } = useI18n();

const props = defineProps<Props>();

const emit = defineEmits(["cartButtonClick", "increment", "decrementOrRemove"]);

const cartButtonClick = (productId: number) => {
  emit("cartButtonClick", productId);
};

const cartMap = computed(() => {
  return props.carts.reduce((map, cart) => {
    map[cart.productId] = cart;
    return map;
  }, {} as Record<number, CartModel>);
});
</script>

<template>
  <div class="product-list">
    <div
      class="product-list__item"
      v-for="product in products"
      :key="product.id"
    >
      <Image
        class="product-card__image"
        :src="product.imagePath"
        :alt="product.alt"
      />
      <p class="product-card__title">{{ product.name }}</p>
      <p class="product-card__price">{{ product.price.toLocaleString() }}</p>
      <p class="product-card__comment">{{ product.comment }}</p>

      <!-- カートに商品があるか判定 -->
      <template v-if="cartMap[product.id]">
        <QuantityControl
          :productId="product.id"
          :cart="cartMap[product.id]"
          @increment="$emit('increment', product.id)"
          @decrementOrRemove="$emit('decrementOrRemove', product.id)"
        />
      </template>
      <template v-else>
        <button
          class="product-card__button"
          @click="cartButtonClick(product.id)"
        >
          {{ t("product.add_to_cart") }}
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.product-list__item {
  width: 32%;
  height: 380px;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
}
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
