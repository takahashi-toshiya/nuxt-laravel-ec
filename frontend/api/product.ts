import type { ProductByPage } from "~/types/api/ProductModel";

export async function getProductsByPage(page: number): Promise<ProductByPage> {
  return await $fetch(`http://localhost/api/products?page=${page}`, {
    method: "GET",
  });
}
