import {
  fetchCartApi,
  addCartApi,
  updateCartApi,
  deleteCartApi,
} from "@/api/cart";
import type { CartModel } from "@/types/model/CartModel";

export async function getCartService(): Promise<CartModel[]> {
  const res = await fetchCartApi();

  return res.data.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));
}

export async function addCartService(
  productId: number,
  quantity?: number
): Promise<void> {
  await addCartApi(productId, quantity);
}

export async function updateCartQuantityService(
  productId: number,
  quantity: number
): Promise<void> {
  await updateCartApi(productId, quantity);
}

export async function removeCartItemService(productId: number): Promise<void> {
  await deleteCartApi(productId);
}
