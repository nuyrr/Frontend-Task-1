import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import ProductCard from "../components/ProductCard";
import useDebounce from "../hooks/useDebounce";

const PRODUCTS_CACHE_KEY = "supermart_products";
const PRODUCTS_CACHE_TIME_KEY = "supermart_products_time";
const CACHE_DURATION = 10 * 60 * 1000;

const fallbackProducts = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    description:
      "The Essence Mascara Lash Princess gives your lashes a fuller and more dramatic look.",
    category: "beauty",
    price: 9.99,
    discountPercentage: 10.48,
    rating: 4.94,
    stock: 5,
    brand: "Essence",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    description:
      "A beautiful eyeshadow palette with a variety of shades and a built-in mirror.",
    category: "beauty",
    price: 19.99,
    discountPercentage: 18.19,
    rating: 3.28,
    stock: 44,
    brand: "Glamour Beauty",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
  },
  {
    id: 3,
    title: "Powder Canister",
    description:
      "A convenient powder canister designed for easy storage and everyday use.",
    category: "beauty",
    price: 14.99,
    discountPercentage: 9.02,
    rating: 4.64,
    stock: 59,
    brand: "Velvet Touch",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
  },
  {
    id: 4,
    title: "Red Lipstick",
    description:
      "A bold red lipstick with a smooth finish and long-lasting color.",
    category: "beauty",
    price: 12.99,
    discountPercentage: 12.16,
    rating: 4.36,
    stock: 68,
    brand: "Chic Cosmetics",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
  },
  {
    id: 5,
    title: "Red Nail Polish",
    description:
      "A vibrant red nail polish with a smooth and glossy finish.",
    category: "beauty",
    price: 8.99,
    discountPercentage: 11.44,
    rating: 4.32,
    stock: 71,
    brand: "Nail Couture",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
  },
  {
    id: 6,
    title: "Calvin Klein CK One",
    description:
      "A refreshing fragrance with a clean and timeless scent.",
    category: "fragrances",
    price: 49.99,
    discountPercentage: 13.43,
    rating: 4.37,
    stock: 17,
    brand: "Calvin Klein",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
  },
  {
    id: 7,
    title: "Chanel Coco Noir Eau De",
    description:
      "A luxurious fragrance with an elegant and sophisticated aroma.",
    category: "fragrances",
    price: 129.99,
    discountPercentage: 10.82,
    rating: 4.26,
    stock: 41,
    brand: "Chanel",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
  },
  {
    id: 8,
    title: "Dior J'adore",
    description:
      "A premium floral fragrance with a sophisticated and feminine scent.",
    category: "fragrances",
    price: 89.99,
    discountPercentage: 15.62,
    rating: 3.8,
    stock: 91,
    brand: "Dior",
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
  },
];

function ProductSkeleton({ viewMode }) {
  if (viewMode === "list") {
    return (
      <div className="animate-pulse rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="h-52 w-full rounded-xl bg-gray-200 sm:w-52" />

          <div className="flex-1 space-y-4">
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-10 w-36 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="h-64 bg-gray-200" />

      <div className="space-y-4 p-5">
        <div className="h-4 w-1/3 rounded bg-gray-200" />
        <div className="h-5 w-4/5 rounded bg-gray-200" />
        <div className="h-5 w-1/2 rounded bg-gray-200" />
        <div className="h-10 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

function FilterContent({
  selectedCategory,
  setSelectedCategory,
  categories,
  selectedBrand,
  setSelectedBrand,
  brands,
  minPrice,
  handleMinPriceChange,
  maxPrice,
  handleMaxPriceChange,
  selectedRating,
  setSelectedRating,
  availability,
  setAvailability,
  activeFilters,
  clearAllFilters,
}) {
  return (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Category
        </label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(event) =>
            setSelectedCategory(event.target.value)
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label
          htmlFor="brand"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Brand
        </label>

        <select
          id="brand"
          value={selectedBrand}
          onChange={(event) =>
            setSelectedBrand(event.target.value)
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">All Brands</option>

          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">
          Price Range
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) =>
              handleMinPriceChange(event.target.value)
            }
            placeholder="Min"
            className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) =>
              handleMaxPriceChange(event.target.value)
            }
            placeholder="Max"
            className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">
          Customer Rating
        </h3>

        <div className="space-y-2">
          {[
            ["4.5", "4.5+ Stars"],
            ["4", "4+ Stars"],
            ["3.5", "3.5+ Stars"],
            ["3", "3+ Stars"],
          ].map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
            >
              <input
                type="radio"
                name="rating"
                value={value}
                checked={selectedRating === value}
                onChange={(event) =>
                  setSelectedRating(event.target.value)
                }
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-yellow-500">★</span>

              <span>{label}</span>
            </label>
          ))}

          {selectedRating && (
            <button
              type="button"
              onClick={() => setSelectedRating("")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear rating
            </button>
          )}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">
          Availability
        </h3>

        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-600 transition hover:bg-gray-50">
            <input
              type="radio"
              name="availability"
              value="in-stock"
              checked={availability === "in-stock"}
              onChange={(event) =>
                setAvailability(event.target.value)
              }
              className="h-4 w-4 accent-blue-600"
            />

            <span>In Stock</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-600 transition hover:bg-gray-50">
            <input
              type="radio"
              name="availability"
              value="out-of-stock"
              checked={availability === "out-of-stock"}
              onChange={(event) =>
                setAvailability(event.target.value)
              }
              className="h-4 w-4 accent-blue-600"
            />

            <span>Out of Stock</span>
          </label>

          {availability && (
            <button
              type="button"
              onClick={() => setAvailability("")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear availability
            </button>
          )}
        </div>
      </div>

      {/* Clear */}
      {activeFilters.length > 0 && (
        <button
          type="button"
          onClick={clearAllFilters}
          className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}

function Products() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || ""
  );

  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "default"
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  const [selectedRating, setSelectedRating] = useState(
    searchParams.get("rating") || ""
  );

  const [availability, setAvailability] = useState(
    searchParams.get("availability") || ""
  );

  const [viewMode, setViewMode] = useState(
    searchParams.get("view") || "grid"
  );

  const [visibleCount, setVisibleCount] = useState(12);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 400);

  /*
   * Initial product loading.
   *
   * The request is kept inside the effect so ESLint does not
   * flag a direct state-changing function call from the effect.
   */
  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const cachedProducts = localStorage.getItem(
          PRODUCTS_CACHE_KEY
        );

        const cachedTime = localStorage.getItem(
          PRODUCTS_CACHE_TIME_KEY
        );

        if (cachedProducts && cachedTime) {
          const cacheAge =
            Date.now() - Number(cachedTime);

          if (cacheAge < CACHE_DURATION) {
            const parsedProducts =
              JSON.parse(cachedProducts);

            if (
              Array.isArray(parsedProducts) &&
              parsedProducts.length > 0
            ) {
              if (!cancelled) {
                setProducts(parsedProducts);
                setLoading(false);
              }

              return;
            }
          }
        }

        const response = await fetch(
          "/api/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        if (
          !Array.isArray(data.products) ||
          data.products.length === 0
        ) {
          throw new Error("No products returned");
        }

        if (!cancelled) {
          setProducts(data.products);
        }

        localStorage.setItem(
          PRODUCTS_CACHE_KEY,
          JSON.stringify(data.products)
        );

        localStorage.setItem(
          PRODUCTS_CACHE_TIME_KEY,
          String(Date.now())
        );
      } catch {
        if (!cancelled) {
          try {
            const oldCache = localStorage.getItem(
              PRODUCTS_CACHE_KEY
            );

            if (oldCache) {
              const parsedOldCache =
                JSON.parse(oldCache);

              if (
                Array.isArray(parsedOldCache) &&
                parsedOldCache.length > 0
              ) {
                setProducts(parsedOldCache);

                setError(
                  "Showing previously loaded products. Refresh to try again."
                );

                setLoading(false);
                return;
              }
            }
          } catch {
            // Ignore invalid cache.
          }

          setProducts(fallbackProducts);

          setError(
            "Live products are temporarily unavailable. Showing sample products."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * Keep the URL synchronized with filters/search/view state.
   */
  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }

    if (selectedCategory) {
      params.set("category", selectedCategory);
    }

    if (selectedBrand) {
      params.set("brand", selectedBrand);
    }

    if (sortOption !== "default") {
      params.set("sort", sortOption);
    }

    if (minPrice !== "") {
      params.set("minPrice", minPrice);
    }

    if (maxPrice !== "") {
      params.set("maxPrice", maxPrice);
    }

    if (selectedRating) {
      params.set("rating", selectedRating);
    }

    if (availability) {
      params.set("availability", availability);
    }

    if (viewMode !== "grid") {
      params.set("view", viewMode);
    }

    setSearchParams(params, { replace: true });
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    sortOption,
    minPrice,
    maxPrice,
    selectedRating,
    availability,
    viewMode,
    setSearchParams,
  ]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ].sort();
  }, [products]);

  const brands = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.brand)
          .filter(Boolean)
      ),
    ].sort();
  }, [products]);

  const suggestions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return [];
    }

    return products
      .filter((product) =>
        product.title?.toLowerCase().includes(term)
      )
      .slice(0, 6);
  }, [products, searchTerm]);

  const filteredProducts = useMemo(() => {
    const search = debouncedSearch.trim().toLowerCase();

    let result = [...products];

    if (search) {
      result = result.filter((product) => {
        const title = product.title?.toLowerCase() || "";
        const description =
          product.description?.toLowerCase() || "";
        const brand =
          product.brand?.toLowerCase() || "";
        const category =
          product.category?.toLowerCase() || "";

        return (
          title.includes(search) ||
          description.includes(search) ||
          brand.includes(search) ||
          category.includes(search)
        );
      });
    }

    if (selectedCategory) {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    if (selectedBrand) {
      result = result.filter(
        (product) => product.brand === selectedBrand
      );
    }

    if (minPrice !== "") {
      const minimum = Number(minPrice);

      if (!Number.isNaN(minimum)) {
        result = result.filter(
          (product) =>
            Number(product.price) >= minimum
        );
      }
    }

    if (maxPrice !== "") {
      const maximum = Number(maxPrice);

      if (!Number.isNaN(maximum)) {
        result = result.filter(
          (product) =>
            Number(product.price) <= maximum
        );
      }
    }

    if (selectedRating) {
      const rating = Number(selectedRating);

      if (!Number.isNaN(rating)) {
        result = result.filter(
          (product) =>
            Number(product.rating) >= rating
        );
      }
    }

    if (availability === "in-stock") {
      result = result.filter(
        (product) => Number(product.stock) > 0
      );
    }

    if (availability === "out-of-stock") {
      result = result.filter(
        (product) => Number(product.stock) <= 0
      );
    }

    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "rating-high":
        result.sort((a, b) => b.rating - a.rating);
        break;

      case "name-az":
        result.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "name-za":
        result.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        break;

      default:
        break;
    }

    return result;
  }, [
    products,
    debouncedSearch,
    selectedCategory,
    selectedBrand,
    sortOption,
    minPrice,
    maxPrice,
    selectedRating,
    availability,
  ]);

  const visibleProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  const activeFilters = [];

  if (searchTerm.trim()) {
    activeFilters.push({
      key: "search",
      label: `Search: ${searchTerm}`,
      clear: () => setSearchTerm(""),
    });
  }

  if (selectedCategory) {
    activeFilters.push({
      key: "category",
      label: `Category: ${selectedCategory}`,
      clear: () => setSelectedCategory(""),
    });
  }

  if (selectedBrand) {
    activeFilters.push({
      key: "brand",
      label: `Brand: ${selectedBrand}`,
      clear: () => setSelectedBrand(""),
    });
  }

  if (minPrice !== "") {
    activeFilters.push({
      key: "minPrice",
      label: `Min: $${minPrice}`,
      clear: () => setMinPrice(""),
    });
  }

  if (maxPrice !== "") {
    activeFilters.push({
      key: "maxPrice",
      label: `Max: $${maxPrice}`,
      clear: () => setMaxPrice(""),
    });
  }

  if (selectedRating) {
    activeFilters.push({
      key: "rating",
      label: `${selectedRating}+ stars`,
      clear: () => setSelectedRating(""),
    });
  }

  if (availability) {
    activeFilters.push({
      key: "availability",
      label:
        availability === "in-stock"
          ? "In Stock"
          : "Out of Stock",
      clear: () => setAvailability(""),
    });
  }

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSortOption("default");
    setMinPrice("");
    setMaxPrice("");
    setSelectedRating("");
    setAvailability("");
  };

  const handleSearchSuggestion = (product) => {
    setSearchTerm(product.title);
    setShowSuggestions(false);
  };

  const handleMinPriceChange = (value) => {
    if (value === "") {
      setMinPrice("");
      return;
    }

    const number = Number(value);

    if (!Number.isNaN(number) && number >= 0) {
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (value) => {
    if (value === "") {
      setMaxPrice("");
      return;
    }

    const number = Number(value);

    if (!Number.isNaN(number) && number >= 0) {
      setMaxPrice(value);
    }
  };

  const retryProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/products?limit=100"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      if (
        !Array.isArray(data.products) ||
        data.products.length === 0
      ) {
        throw new Error("No products returned");
      }

      setProducts(data.products);

      localStorage.setItem(
        PRODUCTS_CACHE_KEY,
        JSON.stringify(data.products)
      );

      localStorage.setItem(
        PRODUCTS_CACHE_TIME_KEY,
        String(Date.now())
      );
    } catch {
      setError(
        "Unable to refresh products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            SuperMart Marketplace
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Discover Products
          </h1>

          <p className="mt-2 max-w-2xl text-gray-500">
            Search, filter and explore products from our
            marketplace.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <span className="flex items-center pl-4 text-gray-400">
              🔎
            </span>

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search products, brands or categories..."
              className="w-full bg-transparent px-4 py-4 text-gray-900 outline-none placeholder:text-gray-400"
              aria-label="Search products"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setShowSuggestions(false);
                }}
                className="px-4 text-gray-400 transition hover:text-gray-700"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 z-40 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() =>
                    handleSearchSuggestion(product)
                  }
                  className="flex w-full items-center gap-4 px-4 py-3 text-left transition hover:bg-gray-50"
                >
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="h-12 w-12 rounded-lg bg-gray-50 object-contain"
                  />

                  <div className="min-w-0">
                    <p className="truncate font-medium text-gray-900">
                      {product.title}
                    </p>

                    <p className="text-sm text-gray-400">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Filter Button */}
        <div className="mb-5 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-100"
          >
            ⚙️ Filters

            {activeFilters.length > 0 && (
              <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs text-white">
                {activeFilters.length}
              </span>
            )}
          </button>

          <span className="text-sm text-gray-500">
            {filteredProducts.length} products
          </span>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(false)
              }
              className="absolute inset-0 h-full w-full bg-black/40"
              aria-label="Close filters"
            />

            <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Filters
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Refine your results
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(false)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>

              <FilterContent
                selectedCategory={selectedCategory}
                setSelectedCategory={
                  setSelectedCategory
                }
                categories={categories}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                brands={brands}
                minPrice={minPrice}
                handleMinPriceChange={
                  handleMinPriceChange
                }
                maxPrice={maxPrice}
                handleMaxPriceChange={
                  handleMaxPriceChange
                }
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                availability={availability}
                setAvailability={setAvailability}
                activeFilters={activeFilters}
                clearAllFilters={clearAllFilters}
              />

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="mt-8 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Show {filteredProducts.length} Products
              </button>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* Desktop Sidebar */}
          <aside className="hidden self-start rounded-2xl bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:block">
            <div className="mb-6 border-b border-gray-100 pb-5">
              <h2 className="text-lg font-bold text-gray-900">
                Filters
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Refine your results
              </p>
            </div>

            <FilterContent
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              brands={brands}
              minPrice={minPrice}
              handleMinPriceChange={
                handleMinPriceChange
              }
              maxPrice={maxPrice}
              handleMaxPriceChange={
                handleMaxPriceChange
              }
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              availability={availability}
              setAvailability={setAvailability}
              activeFilters={activeFilters}
              clearAllFilters={clearAllFilters}
            />
          </aside>

          {/* Products Area */}
          <section className="min-w-0">
            {/* Toolbar */}
            <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {loading
                      ? "Loading products..."
                      : `${filteredProducts.length} products found`}
                  </p>

                  {!loading &&
                    activeFilters.length > 0 && (
                      <p className="mt-1 text-xs text-gray-400">
                        {activeFilters.length} active
                        filter
                        {activeFilters.length === 1
                          ? ""
                          : "s"}
                      </p>
                    )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    value={sortOption}
                    onChange={(event) =>
                      setSortOption(event.target.value)
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500"
                    aria-label="Sort products"
                  >
                    <option value="default">
                      Recommended
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                    <option value="rating-high">
                      Rating: High to Low
                    </option>

                    <option value="name-az">
                      Name: A to Z
                    </option>

                    <option value="name-za">
                      Name: Z to A
                    </option>
                  </select>

                  <div className="flex rounded-xl border border-gray-200 p-1">
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        viewMode === "grid"
                          ? "bg-blue-600 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      aria-label="Grid view"
                    >
                      ▦
                    </button>

                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                        viewMode === "list"
                          ? "bg-blue-600 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      aria-label="List view"
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              {/* Applied Filters */}
              {activeFilters.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                  <span className="flex items-center text-xs font-semibold text-gray-400">
                    Applied:
                  </span>

                  {activeFilters.map((filter) => (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={filter.clear}
                      className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                    >
                      {filter.label} ×
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* API Status */}
            {error && (
              <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-amber-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={retryProducts}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Loading */}
            {loading ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    : "space-y-5"
                }
              >
                {Array.from({ length: 6 }).map(
                  (_, index) => (
                    <ProductSkeleton
                      key={index}
                      viewMode={viewMode}
                    />
                  )
                )}
              </div>
            ) : filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">
                  🔍
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  No products found
                </h2>

                <p className="mx-auto mt-3 max-w-md text-gray-500">
                  We couldn't find products matching your
                  current search and filters.
                </p>

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* Grid */
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              /* List */
              <div className="space-y-5">
                {visibleProducts.map((product) => (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                  >
                    <div className="flex flex-col gap-5 md:flex-row">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex h-56 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 md:w-56"
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="h-full w-full object-contain p-5 transition duration-300 hover:scale-105"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
                            {product.category}
                          </span>

                          {product.brand && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                              {product.brand}
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/product/${product.id}`}
                        >
                          <h2 className="mt-3 text-xl font-bold text-gray-900 transition hover:text-blue-600">
                            {product.title}
                          </h2>
                        </Link>

                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span className="text-yellow-500">
                            ★
                          </span>

                          <span className="font-semibold text-gray-700">
                            {product.rating}
                          </span>

                          <span className="text-gray-400">
                            •
                          </span>

                          <span
                            className={
                              product.stock > 0
                                ? "text-green-600"
                                : "text-red-500"
                            }
                          >
                            {product.stock > 0
                              ? `${product.stock} in stock`
                              : "Out of stock"}
                          </span>
                        </div>

                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                          {product.description}
                        </p>

                        <div className="mt-auto flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-2xl font-bold text-gray-900">
                              $
                              {Number(
                                product.price
                              ).toFixed(2)}
                            </p>

                            {product.discountPercentage >
                              0 && (
                              <p className="text-sm text-green-600">
                                {product.discountPercentage.toFixed(
                                  0
                                )}
                                % off
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 sm:flex-row">
                            <Link
                              to={`/product/${product.id}`}
                              className="rounded-xl border border-gray-300 px-5 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                              View Details
                            </Link>

                            <button
                              type="button"
                              onClick={() =>
                                dispatch(
                                  addToCart({
                                    ...product,
                                    quantity: 1,
                                  })
                                )
                              }
                              disabled={product.stock <= 0}
                              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                              {product.stock > 0
                                ? "Add to Cart"
                                : "Out of Stock"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Load More */}
            {!loading &&
              visibleCount < filteredProducts.length && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount(
                        (current) => current + 12
                      )
                    }
                    className="rounded-xl bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-800"
                  >
                    Load More Products
                  </button>

                  <p className="mt-3 text-sm text-gray-400">
                    Showing {visibleProducts.length} of{" "}
                    {filteredProducts.length}
                  </p>
                </div>
              )}

            {!loading &&
              filteredProducts.length > 0 &&
              visibleCount >=
                filteredProducts.length && (
                <p className="mt-10 text-center text-sm text-gray-400">
                  You've reached the end of the results.
                </p>
              )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Products;