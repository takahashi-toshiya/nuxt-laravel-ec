import { fetchProductsByPageApi } from "~/api/product";
import type { ProductByPageApiResponse } from "~/types/api/ProductApi";
import type { ProductByPageModel } from "~/types/model/ProductModel";

export async function getProductsByPage(
  page: number
): Promise<ProductByPageModel> {
  const apiResponse: ProductByPageApiResponse = await fetchProductsByPageApi(
    page
  );

  return apiResponse;
}
