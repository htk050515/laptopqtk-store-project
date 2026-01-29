import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useCart } from "@/context/CartContext";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

import { getProductDetail } from "@/services/api";
import { Product } from "@/types/product";
// import { ProductCard } from "@/app/components/ProductCard"; // 🔜 dùng khi có API related

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);


  // 🔜 DÙNG SAU KHI CÓ API RELATED PRODUCTS
  // const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { addToCart } = useCart();

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    getProductDetail(slug)
      .then((res) => {
        console.log("RAW API DATA:", res.data);
        setProduct(res.data);
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  /* ================= HANDLERS ================= */
  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  /* ================= STATES ================= */
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/" className="text-primary hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  /* ================= DERIVED DATA ================= */
  const price = product.price ? Number(product.price) : 0;
  const inStock = typeof product.stock === "number" && product.stock > 0;
  const rating = typeof product.rating === "number" ? product.rating : 0;


  const imageUrl = product.image?.includes("drive.google.com")
    ? product.image
        .replace("/view?usp=drive_link", "")
        .replace("/view", "")
        .replace("file/d/", "uc?id=")
    : product.image;

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to={`/laptops/${product.category}`}
              className="hover:text-primary capitalize"
            >
              {product.category
                ? product.category.replace("-", " & ")
                : ""}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-8 sticky top-24">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <p className="text-sm text-gray-500 uppercase mb-2">
                {product.brand}
              </p>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} / 5
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
              </div>

              {/* Stock */}
              <div className="mb-6">
                {inStock ? (
                  <p className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    In Stock
                  </p>
                ) : (
                  <p className="text-red-600">Out of Stock</p>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>

              {/* Quantity + Add to cart */}
              {inStock && (
                <div className="flex gap-4 mb-6">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() =>
                        setQuantity((q) => Math.max(1, q - 1))
                      }
                      className="px-4 py-2"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity((q) =>
                          Math.min(product.stock, q + 1)
                        )
                      }
                      className="px-4 py-2"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 border py-3 rounded-lg flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </button>
                <button className="border p-3 rounded-lg">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
<div className="mt-20">
  <h2 className="text-2xl font-bold mb-6">
    Related Products
  </h2>

  {loadingRelated && (
    <p className="text-gray-500">Loading related products...</p>
  )}

  {!loadingRelated && relatedProducts.length === 0 && (
    <p className="text-gray-500">No related products found.</p>
  )}

  {relatedProducts.length > 0 && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedProducts.map(item => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  )}
</div>

      </div>
    </div>
  );
};
