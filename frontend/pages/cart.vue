<script setup lang="ts">
import Wrapper from "~/components/common/Wrapper.vue";
import { useUserStore } from "~/store/userStore";

definePageMeta({
  middleware: "auth",
});

const { t } = useI18n();

const userStore = useUserStore();
</script>

<template>
  <Wrapper>
    <h2 class="cart_title">{{ t("cart.title", { name: userStore.name }) }}</h2>
  </Wrapper>
</template>

<style scoped>
.cart_title {
  font-size: 20px;
  color: #333;
  text-align: center;
  font-weight: 700;
}
</style>
