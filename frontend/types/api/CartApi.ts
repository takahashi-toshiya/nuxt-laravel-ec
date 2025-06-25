import type { Product } from "./ProductApi";

export type CartApiResponse = {
  data: {
    productId: number;
    quantity: number;
    product: Product;
  }[];
};
