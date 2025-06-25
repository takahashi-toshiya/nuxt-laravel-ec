<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { useUserStore } from "~/store/userStore";

type Props = {
  totalPrice: Number;
};
const { totalPrice } = defineProps<Props>();

const emit = defineEmits(["close", "purchase"]);

const userStore = useUserStore();

const cardNumber1 = ref("");
const cardNumber2 = ref("");
const cardNumber3 = ref("");
const cardNumber4 = ref("");
const expiry = ref("");
const securityCode = ref("");

const closeModal = () => {
  const totalPrice = 1;
  console.log(totalPrice);
  //emit("close");
};

const purchase = () => {
  // バリデーションと購入処理をここに追加
  emit("purchase");
};

onMounted(() => {
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <div class="payment-modal__overlay">
    <div class="payment-modal__content" @click.stop>
      <h2 class="payment-modal__title">決済情報の入力</h2>
      <div class="payment-modal__body">
        <div
          class="payment-modal__input-group payment-modal__input-group--vertical"
        >
          <label>金額:</label>
          <span>¥{{ totalPrice?.toLocaleString() }}円</span>
        </div>
        <!--
        <label>メールアドレス: {{ userStore. }}</label>
        -->
        <div
          class="payment-modal__input-group payment-modal__input-group--vertical"
        >
          <label>カード番号:</label>
          <div class="payment-modal__input-group">
            <input type="text" maxlength="4" size="4" />
            <input type="text" maxlength="4" size="4" />
            <input type="text" maxlength="4" size="4" />
            <input type="text" maxlength="4" size="4" />
          </div>
        </div>
        <div
          class="payment-modal__input-group payment-modal__input-group--vertical"
        >
          <label>有効期限:</label>
          <input type="text" placeholder="MM/YY" />
        </div>
        <div
          class="payment-modal__input-group payment-modal__input-group--vertical"
        >
          <label>セキュリティーコード:</label>
          <input type="text" maxlength="3" size="3" />
        </div>
        <button @click="closeModal">ボタン</button>
        <button class="payment-modal__purchase-button" @click="purchase">
          購入する
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.payment-modal__content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.payment-modal__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.payment-modal__title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.payment-modal__input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}
.payment-modal__input-group--vertical {
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
}
.payment-modal__purchase-button {
  background-color: #007bff;
  color: white;
  align-self: center;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
