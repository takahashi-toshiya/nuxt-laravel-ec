import { getCartService as fetchCart } from "~/services/cartService";
import type { CartModel } from "~/types/model/CartModel";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: new Map<number, CartModel>(), // productId をキーにした Map
  }),
  getters: {
    cartList: (state) => Array.from(state.cart.values()), // 表示用に配列に変換
  },
  actions: {
    async getCart() {
      const response = await fetchCart();
      const cartMap = new Map<number, CartModel>();
      response.forEach((item) => {
        cartMap.set(item.productId, item);
      });
      this.cart = cartMap;
    },
    addCart(productId: number, quantity = 1) {
      this.cart.set(productId, { productId, quantity });
    },
    incrementQuantity(productId: number) {
      const item = this.cart.get(productId);
      if (item) {
        item.quantity++;
      }
    },
    decrementQuantity(productId: number) {
      const item = this.cart.get(productId);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    removeCart(productId: number) {
      this.cart.delete(productId);
    },
    clearCart() {
      this.cart.clear();
    },
  },
});
