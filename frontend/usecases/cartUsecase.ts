import { useCartStore } from "~/store/cartStore";
import {
  addCartService,
  updateCartQuantityService,
} from "~/services/cartService";

export async function addCartUsecase(
  product: import("~/types/model/ProductModel").ProductModel
) {
  const store = useCartStore();
  store.addCart(product);
  await addCartService(product.id);
}

export async function incrementQuantityUsecase(productId: number) {
  const store = useCartStore();
  store.incrementQuantity(productId);

  const item = store.cart.get(productId);
  if (!item) return;

  await updateCartQuantityService(productId, item.quantity);
}
