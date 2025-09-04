<script setup lang="ts">
import { useCartStore } from "~/store/cartStore";
import QuantityControl from "~/components/product/QuantityControl.vue";
import { useI18n } from "vue-i18n";
import Wrapper from "~/components/common/Wrapper.vue";
import { useUserStore } from "~/store/userStore";
import PaymentModal from "~/components/cart/PaymentModal.vue";
import {
  incrementQuantityUsecase,
  decrementOrRemoveUsecase,
} from "~/usecases/cartUsecase";

const { t } = useI18n();
const cartStore = useCartStore();
const userStore = useUserStore();

const handleIncrement = async (productId: number) => {
  await incrementQuantityUsecase(productId);
};
const handleDecrementOrRemove = async (productId: number) => {
  await decrementOrRemoveUsecase(productId);
};

// 合計個数と合計金額の計算
const totalQuantity = computed(() =>
  cartStore.cartList.reduce((sum, cart) => sum + cart.quantity, 0)
);
const totalPrice = computed(() =>
  cartStore.cartList.reduce(
    (sum, cart) => sum + cart.quantity * cart.product.price,
    0
  )
);

// モーダルの表示制御
const isModalVisible = ref(false);
const showModal = () => {
  isModalVisible.value = true;
};
const hideModal = () => {
  isModalVisible.value = false;
};
</script>

<template>
  <Wrapper>
    <div class="cart">
      <div class="cart__title">{{ userStore.name }}のカートの中身</div>
      <div class="cart__product-list">
        <div
          class="cart__product-item"
          v-for="cart in cartStore.cartList"
          :key="cart.product.id"
        >
          <ProductCard :product="cart.product" :showComment="false">
            <template #actions>
              <QuantityControl
                :productId="cart.product.id"
                :cart="cart"
                @increment="handleIncrement(cart.product.id)"
                @decrementOrRemove="handleDecrementOrRemove(cart.product.id)"
              />
            </template>
          </ProductCard>
        </div>
        <div v-if="cartStore.cartList.length === 0" class="cart__empty">
          {{ t("cart.empty") || "カートに商品がありません。" }}
        </div>
      </div>
      <!-- 合計個数と合計金額、決済ボタン -->
      <div class="cart__summary">
        <dl class="cart__summary-list">
          <div class="cart__summary-item">
            <dt class="cart__summary-term">合計個数:</dt>
            <dd class="cart__summary-description">{{ totalQuantity }} 個</dd>
          </div>
          <div class="cart__summary-item">
            <dt class="cart__summary-term">合計金額:</dt>
            <dd class="cart__summary-description">
              ¥{{ totalPrice.toLocaleString() }}
            </dd>
          </div>
        </dl>
        <button class="cart__checkout-button" @click="showModal">
          決済をする
        </button>
      </div>
    </div>
    <PaymentModal
      v-if="isModalVisible"
      :totalPrice="totalPrice"
      @close="hideModal"
    />
  </Wrapper>
</template>

<style scoped>
.cart {
  background-color: #f7fafc;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
}
.cart__title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}
.cart__product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2%;
}
.cart__product-item {
  width: 32%;
  height: 380px;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
}
.cart__empty {
  text-align: center;
  font-size: 16px;
  color: #999;
}
.cart__summary {
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  text-align: center;
}
.cart__summary-list {
  margin: 0;
}
.cart__summary-item {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.cart__summary-term {
  font-weight: bold;
  margin-right: 5px;
  text-align: right;
  width: 80px;
}
.cart__summary-description {
  margin: 0;
  text-align: left;
  width: 100px;
}
.cart__checkout-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  display: inline-block;
}
.cart__checkout-button:hover {
  background-color: #0056b3;
}
</style>
