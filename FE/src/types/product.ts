export interface Product {
  id: number;
  name: string;
  slug: string;

  price: string;     // ⚠️ backend trả STRING
  image: string;
  stock: number;

  description: string;
  brand: string;
  category: string;

  rating: number;
  featured: boolean;
}
