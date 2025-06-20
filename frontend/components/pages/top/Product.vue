<script setup lang="ts">
import { ref, onMounted } from "vue";
import ErrorModal from "~/components/modal/ErrorModal.vue";
import LoginRequiredModal from "~/components/modal/LoginRequiredModal.vue";
import { getProductsByPage } from "~/services/productService";
import { useCartStore } from "~/store/cartStore";
import { useUserStore } from "~/store/userStore";
import type { ProductModel } from "~/types/model/ProductModel";
import {
  addCartUsecase,
  incrementQuantityUsecase,
} from "~/usecases/cartUsecase";

const router = useRouter();
const cartStore = useCartStore();
const { t } = useI18n();
const { isError, errorMessage, showError } = useError();
const { isLoggedIn } = useUserStore();

const products = ref<ProductModel[]>([]);
const currentPage = ref<number>(0);
const total = ref<number>(0);
const pageCount = ref<number>(0);
const isLoginRequired = ref<boolean>(false);

const fetchProducts = async (page = currentPage.value) => {
  try {
    const response = await getProductsByPage(page);

    products.value = response.data;
    currentPage.value = response.currentPage;
    total.value = response.total;
    pageCount.value = response.perPage;
  } catch (error: any) {
    showError(error.message);
  }
};

const handleAddToCart = async (productId: number) => {
  if (!isLoggedIn) return (isLoginRequired.value = true);

  await addCartUsecase(productId);
};

const handleIncrement = async (productId: number) => {
  await incrementQuantityUsecase(productId);
};

const handleDecrementOrRemove = (productId: number) => {
  console.log("devre");
};

const handleLoginRequiredCOnfirm = () => {
  return router.push("/login");
};

onMounted(async () => {
  await fetchProducts();
  await cartStore.getCart();
});
</script>

<template>
  <ProductList
    :products="products"
    :carts="cartStore.cartList"
    @cartButtonClick="handleAddToCart"
    @increment="handleIncrement"
    @decrementOrRemove="handleDecrementOrRemove"
  />
  <div class="product-paginate">
    <UPagination
      v-model="currentPage"
      :total="total"
      :page-count="pageCount"
      @update:modelValue="fetchProducts"
    />
  </div>
  <LoginRequiredModal
    v-if="isLoginRequired"
    :message="t('product.login_required')"
    @confirm="handleLoginRequiredCOnfirm"
  />
  <ErrorModal v-if="isError" :message="errorMessage" @confirm="fetchProducts" />
</template>

<style scoped>
.product-paginate {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
