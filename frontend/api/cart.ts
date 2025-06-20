import type { CartApiResponse } from "~/types/api/CartApi";

export async function fetchCartApi(): Promise<CartApiResponse> {
  const response = await customFetch<CartApiResponse>(
    "http://localhost/api/cart",
    {
      method: "GET",
    }
  );

  return response;
}

export async function addCartApi(
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

export async function updateCartApi(
  productId: number,
  quantity: number
): Promise<void> {
  await customFetch(`http://localhost/api/cart/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

export async function deleteCartApi(productId: number): Promise<void> {
  await customFetch(`http://localhost/api/cart/${productId}`, {
    method: "DELETE",
  });
}
