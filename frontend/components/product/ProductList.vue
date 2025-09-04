<script setup lang="ts">
import type { CartItem } from "~/types/model/CartModel";
import type { ProductModel } from "~/types/model/ProductModel";
import QuantityControl from "./QuantityControl.vue";

type Props = {
  products: ProductModel[];
  carts: CartItem[];
};

const { t } = useI18n();

const props = defineProps<Props>();

const emit = defineEmits(["cartButtonClick", "increment", "decrementOrRemove"]);

const cartButtonClick = (product: ProductModel) => {
  emit("cartButtonClick", product);
};

const cartMap = computed(() => {
  return props.carts.reduce((map, cart) => {
    map[cart.product.id] = cart;
    return map;
  }, {} as Record<number, CartItem>);
});
</script>

<template>
  <div class="product-list">
    <div
      class="product-list__item"
      v-for="product in products"
      :key="product.id"
    >
      <ProductCard :product="product">
        <template #actions>
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
              @click="cartButtonClick(product)"
            >
              {{ t("product.add_to_cart") }}
            </button>
          </template>
        </template>
      </ProductCard>
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
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin: 10px auto 0;
  display: block;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-height: 36px;
  min-width: 120px;
}

.product-card__button:hover {
  background-color: #0056b3;
}
</style>
