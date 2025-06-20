import type { ProductByPageApiResponse } from "~/types/api/ProductApi";

export async function fetchProductsByPageApi(
  page: number
): Promise<ProductByPageApiResponse> {
  return await $fetch(`http://localhost/api/products?page=${page}`, {
    method: "GET",
  });
}
