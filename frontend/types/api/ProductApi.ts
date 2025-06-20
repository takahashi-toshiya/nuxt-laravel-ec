export type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  comment: string;
  imagePath: string;
  alt?: string;
};

export type ProductByPageApiResponse = {
  currentPage: number;
  data: Product[];
  perPage: number;
  total: number;
};
