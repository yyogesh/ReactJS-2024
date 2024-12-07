export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}