import type { ProductModel } from "./ProductModel";

export type CartModel = {
  productId: number;
  quantity: number;
  product: ProductModel;
};

export interface CartItem {
  product: ProductModel;
  quantity: number;
}
