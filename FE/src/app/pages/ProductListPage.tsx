import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SlidersHorizontal, X } from "lucide-react";

import { ProductCard } from "@/app/components/ProductCard";
import { getProducts } from "@/services/api";
import { Product } from "@/types/product";
import { brands } from "@/data/products";

export const ProductListPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();

  /* ================= UI STATE ================= */
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  /* ================= DATA STATE ================= */
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= EFFECT ================= */
  useEffect(() => {
    setLoading(true);

    getProducts({
      category,
      brand: selectedBrands.length ? selectedBrands.join(",") : undefined,
      ordering:
        sortBy === "price-low"
          ? "price"
          : sortBy === "price-high"
          ? "-price"
          : sortBy === "rating"
          ? "-rating"
          : undefined,
      page,
    })
      .then((res) => {
        setProducts(res.data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category, selectedBrands, sortBy, page]);

  /* ================= HANDLERS ================= */
  const toggleBrand = (brand: string) => {
    setPage(1);
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  /* ================= TITLE ================= */
  const categoryTitle =
    {
      "student-office": "Student & Office Laptops",
      gaming: "Gaming Laptops",
      business: "Business Laptops",
      "design-engineering": "Design & Engineering Laptops",
      accessories: "Laptop Accessories",
    }[category || ""] || "Products";

  /* ================= RENDER ================= */
  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryTitle}
          </h1>
          <p className="text-gray-600">
            {products.length} products available
          </p>
        </div>

        <div className="flex gap-8">
          {/* FILTER SIDEBAR */}
          <aside
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-64 flex-shrink-0`}
          >
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* BRAND FILTER */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1">
            {/* SORT + MOBILE FILTER */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filters
              </button>

              <select
                value={sortBy}
                onChange={(e) => {
                  setPage(1);
                  setSortBy(e.target.value);
                }}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* PRODUCT GRID */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                No products found.
              </div>
            )}

            {/* PAGINATION */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-6 py-2 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-2 border rounded-lg"
              >
                Next
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      {showFilters && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};
