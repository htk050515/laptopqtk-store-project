import { ApiProduct } from '@/types/api';
import { Product } from '@/types/product';

export function mapApiProductToUI(product: ApiProduct): Product {
  return {
    id: product.slug,                 // UI dùng string
    name: product.name,
    price: product.price,
    originalPrice: product.price,     // tạm = price
    brand: 'Unknown',                 // tạm
    image: product.image,
    rating: 4.5,                      // mock hợp lý
    reviewCount: 120,                 // mock hợp lý
    inStock: product.stock > 0,
    description: product.description,
    category: 'student-office',        // tạm
  };
}
