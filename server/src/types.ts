export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export type ProductInput = Pick<Product, "name" | "price" | "quantity">;
