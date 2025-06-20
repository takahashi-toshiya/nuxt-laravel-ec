export type ProductModel = {
  id: number;
  name: string;
  price: number;
  stock: number;
  comment: string;
  imagePath: string;
  alt?: string;
};

export type ProductByPageModel = {
  data: ProductModel[];
  currentPage: number;
  perPage: number;
  total: number;
};
