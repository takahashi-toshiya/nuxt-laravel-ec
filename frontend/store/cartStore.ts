import { getCart } from "~/api/cart";
import type { CartModel } from "~/types/api/CartModel";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as CartModel[],
  }),
  actions: {
    async fetchCart() {
      const response = await getCart();
      this.cart = response.data;
    },
    addCart(productId: number, quantity?: number) {
      // ここでAPIを叩いてカートに商品を追加する
      this.cart.push({
        productId,
        quantity: quantity ?? 1,
      });
    },
  },
});
