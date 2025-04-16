export type ProductModel = {
  id: number;
  name: string;
  price: number;
  stock: number;
  comment: string;
  imagePath: string;
  alt?: string;
};

export type ProductByPage = {
  currentPage: number;
  data: ProductModel[];
  perPage: number;
  total: number;
};
