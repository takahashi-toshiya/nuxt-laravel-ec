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
    <button 
      class="quantity-btn quantity-btn--decrease" 
      @click="handleDecrementOrRemove"
      :title="quantity === 1 ? 'カートから削除' : '数量を減らす'"
    >
      <template v-if="quantity === 1">🗑️</template>
      <template v-else>−</template>
    </button>
    <span class="quantity-display">{{ quantity }}</span>
    <button 
      class="quantity-btn quantity-btn--increase" 
      @click="handleIncrement"
      title="数量を増やす"
    >
      ＋
    </button>
  </div>
</template>

<style scoped>
.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin: 10px auto 0;
  min-height: 36px;
  min-width: 120px;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
}

.quantity-btn {
  width: 32px;
  height: 34px;
  border: none;
  background: #f8f9fa;
  color: #495057;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.quantity-btn:hover {
  background: #e9ecef;
}

.quantity-btn--decrease:hover {
  background: #f8d7da;
  color: #721c24;
}

.quantity-btn--increase:hover {
  background: #d1ecf1;
  color: #0c5460;
}

.quantity-display {
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  color: #495057;
  padding: 0 8px;
  background: #fff;
  border: none;
  line-height: 34px;
}
</style>
