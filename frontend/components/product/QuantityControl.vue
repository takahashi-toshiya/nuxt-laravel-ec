<script setup lang="ts">
import type { CartItem } from "~/types/model/CartModel";

type Props = {
  productId: number;
  cart: CartItem;
};

const props = defineProps<Props>();

const emit = defineEmits(["increment", "decrementOrRemove"]);

const cart = toRef(props, "cart");
const quantity = computed(() => cart.value.quantity);

const handleIncrement = () => {
  emit("increment");
};

const handleDecrementOrRemove = () => {
  emit("decrementOrRemove");
};
</script>

<template>
  <div class="quantity-controls">
    <div class="button-wrapper">
      <button @click="handleDecrementOrRemove">
        <template v-if="quantity === 1">×</template>
        <template v-else>−</template>
      </button>
      <span>{{ quantity }}</span>
      <button @click="handleIncrement">＋</button>
    </div>
  </div>
</template>

<style scoped>
.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-wrapper {
  background-color: #bf0000;
  color: #fff;
  border-radius: 10px;
  padding: 3px 12px;
  margin: 10px auto 0;
  display: block;
}

button {
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  background: transparent;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

span {
  min-width: 2rem;
  text-align: center;
  font-weight: bold;
}
</style>
