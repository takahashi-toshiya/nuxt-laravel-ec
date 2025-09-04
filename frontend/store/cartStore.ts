import type { CartItem } from "~/types/model/CartModel";
import { getCartService as fetchCart } from "~/services/cartService";
import { defineStore } from "pinia";
import type { ProductModel } from "~/types/model/ProductModel";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: new Map<number, CartItem>(), // productId をキーにした Map
  }),
  getters: {
    cartList: (state) => Array.from(state.cart.values()), // 表示用に配列に変換
  },
  actions: {
    async getCart() {
      const response = await fetchCart();
      const cartMap = new Map<number, CartItem>();

      response.forEach((item) => {
        cartMap.set(item.productId, {
          product: item.product,
          quantity: item.quantity,
        });
      });
      this.cart = cartMap;
    },
    addCart(product: ProductModel, quantity = 1) {
      this.cart.set(product.id, { quantity, product });
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
