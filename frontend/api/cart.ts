import type { CartModel } from "~/types/api/CartModel";

export async function getCart(): Promise<{ data: CartModel[] }> {
  const response = await customFetch<{ data: CartModel[] }>(
    "http://localhost/api/cart",
    {
      method: "GET",
    }
  );

  return response; // ✅ これで `response` が `{ data: CartModel[] }` 型になる
}

export async function addCart(
  productId: number,
  quantity?: number
): Promise<void> {
  await customFetch("http://localhost/api/cart", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      quantity: quantity ?? 1,
    }),
  });
}
