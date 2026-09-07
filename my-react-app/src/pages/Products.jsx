
// import { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";

// function Products() {
//   const [products, setProducts] = useState([]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortOption, setSortOption] = useState("default");

//   const [visibleCount, setVisibleCount] = useState(12);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(
//           "https://dummyjson.com/products?limit=100"
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }

//         const data = await response.json();

//         setProducts(data.products);
//       } catch (err) {
//         setError("Unable to load products. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Get categories
//   const categories = [
//     "all",
//     ...new Set(products.map((product) => product.category)),
//   ];

//   // Search + category filtering
//   let filteredProducts = products.filter((product) => {
//     const matchesSearch = product.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());

//     const matchesCategory =
//       selectedCategory === "all" ||
//       product.category === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });

//   // Sorting
//   if (sortOption === "price-low") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//   }

//   if (sortOption === "price-high") {
//     filteredProducts.sort((a, b) => b.price - a.price);
//   }

//   if (sortOption === "name-az") {
//     filteredProducts.sort((a, b) =>
//       a.title.localeCompare(b.title)
//     );
//   }

//   if (sortOption === "name-za") {
//     filteredProducts.sort((a, b) =>
//       b.title.localeCompare(a.title)
//     );
//   }

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm("");
//     setSelectedCategory("all");
//     setSortOption("default");
//     setVisibleCount(12);
//   };

//   // Reset visible products when filter changes
//   useEffect(() => {
//     setVisibleCount(12);
//   }, [searchTerm, selectedCategory, sortOption]);

//   // Products currently visible
//   const visibleProducts = filteredProducts.slice(
//     0,
//     visibleCount
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-10">

//       <div className="mx-auto max-w-7xl">

//         {/* Page Header */}
//         <div className="mb-8">

//           <h1 className="text-3xl font-bold text-gray-900">
//             Products
//           </h1>

//           <p className="mt-2 text-gray-500">
//             Browse our collection of products.
//           </p>

//         </div>

//         {/* Filters */}
//         <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">

//           <div className="grid gap-4 md:grid-cols-3">

//             {/* Search */}
//             <div>

//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Search
//               </label>

//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(event) =>
//                   setSearchTerm(event.target.value)
//                 }
//                 placeholder="Search products..."
//                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500"
//               />

//             </div>

//             {/* Category */}
//             <div>

//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Category
//               </label>

//               <select
//                 value={selectedCategory}
//                 onChange={(event) =>
//                   setSelectedCategory(event.target.value)
//                 }
//                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 capitalize outline-none transition focus:border-blue-500"
//               >

//                 {categories.map((category) => (
//                   <option
//                     key={category}
//                     value={category}
//                   >
//                     {category === "all"
//                       ? "All Categories"
//                       : category.replace("-", " ")}
//                   </option>
//                 ))}

//               </select>

//             </div>

//             {/* Sort */}
//             <div>

//               <label className="mb-2 block text-sm font-medium text-gray-700">
//                 Sort By
//               </label>

//               <select
//                 value={sortOption}
//                 onChange={(event) =>
//                   setSortOption(event.target.value)
//                 }
//                 className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
//               >

//                 <option value="default">
//                   Default
//                 </option>

//                 <option value="price-low">
//                   Price: Low to High
//                 </option>

//                 <option value="price-high">
//                   Price: High to Low
//                 </option>

//                 <option value="name-az">
//                   Name: A to Z
//                 </option>

//                 <option value="name-za">
//                   Name: Z to A
//                 </option>

//               </select>

//             </div>

//           </div>

//           {/* Reset Button */}
//           <div className="mt-4 flex justify-end">

//             <button
//               onClick={resetFilters}
//               className="rounded-xl border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
//             >
//               Reset Filters
//             </button>

//           </div>

//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="py-20 text-center">

//             <p className="text-gray-500">
//               Loading products...
//             </p>

//           </div>
//         )}

//         {/* Error */}
//         {!loading && error && (
//           <div className="rounded-xl bg-red-50 p-6 text-center">

//             <p className="text-red-600">
//               {error}
//             </p>

//           </div>
//         )}

//         {/* Product Results */}
//         {!loading && !error && (

//           <>
//             {filteredProducts.length === 0 ? (

//               <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

//                 <h2 className="text-xl font-semibold text-gray-900">
//                   No products found
//                 </h2>

//                 <p className="mt-2 text-gray-500">
//                   Try changing your search or filters.
//                 </p>

//                 <button
//                   onClick={resetFilters}
//                   className="mt-5 rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600"
//                 >
//                   Reset Filters
//                 </button>

//               </div>

//             ) : (

//               <>

//                 {/* Result Count */}
//                 <p className="mb-5 text-sm text-gray-500">

//                   Showing{" "}
//                   {Math.min(
//                     visibleCount,
//                     filteredProducts.length
//                   )}{" "}
//                   of {filteredProducts.length}{" "}
//                   {filteredProducts.length === 1
//                     ? "product"
//                     : "products"}

//                 </p>

//                 {/* Product Grid */}
//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

//                   {visibleProducts.map((product) => (

//                     <ProductCard
//                       key={product.id}
//                       product={product}
//                     />

//                   ))}

//                 </div>

//                 {/* Load More */}
//                 {visibleCount < filteredProducts.length && (

//                   <div className="mt-10 text-center">

//                     <button
//                       onClick={() =>
//                         setVisibleCount(
//                           (current) => current + 12
//                         )
//                       }
//                       className="rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
//                     >
//                       Load More
//                     </button>

//                   </div>

//                 )}

//               </>

//             )}

//           </>

//         )}

//       </div>

//     </div>
//   );
// }

// export default Products;

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useDebounce from "../hooks/useDebounce";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );

  const [selectedBrand, setSelectedBrand] = useState(
    searchParams.get("brand") || "all"
  );

  const [sortOption, setSortOption] = useState(
    searchParams.get("sort") || "default"
  );

  const [visibleCount, setVisibleCount] = useState(12);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced search
  const debouncedSearch = useDebounce(searchTerm, 400);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (err) {
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Categories
  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(products.map((product) => product.category)),
    ];
  }, [products]);

  // Brands
  const brands = useMemo(() => {
    return [
      "all",
      ...new Set(
        products
          .map((product) => product.brand)
          .filter(Boolean)
      ),
    ];
  }, [products]);

  // Search suggestions
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }

    const search = searchTerm.toLowerCase();

    return products
      .filter(
        (product) =>
          product.title.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search) ||
          product.brand?.toLowerCase().includes(search)
      )
      .slice(0, 6);
  }, [products, searchTerm]);

  // Filter products
  const filteredProducts = useMemo(() => {
    const search = debouncedSearch.toLowerCase().trim();

    const result = products.filter((product) => {
      const matchesSearch =
        !search ||
        product.title.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search);

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesBrand =
        selectedBrand === "all" ||
        product.brand === selectedBrand;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand
      );
    });

    if (sortOption === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "name-az") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sortOption === "name-za") {
      result.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    }

    return result;
  }, [
    products,
    debouncedSearch,
    selectedCategory,
    selectedBrand,
    sortOption,
  ]);

  // Update URL when filters change
  useEffect(() => {
    const params = {};

    if (debouncedSearch) {
      params.search = debouncedSearch;
    }

    if (selectedCategory !== "all") {
      params.category = selectedCategory;
    }

    if (selectedBrand !== "all") {
      params.brand = selectedBrand;
    }

    if (sortOption !== "default") {
      params.sort = sortOption;
    }

    setSearchParams(params, { replace: true });
  }, [
    debouncedSearch,
    selectedCategory,
    selectedBrand,
    sortOption,
    setSearchParams,
  ]);

  // Reset visible products when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [
    debouncedSearch,
    selectedCategory,
    selectedBrand,
    sortOption,
  ]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSortOption("default");
    setVisibleCount(12);
    setShowSuggestions(false);
  };

  // Remove individual filter
  const removeFilter = (filterType) => {
    if (filterType === "search") {
      setSearchTerm("");
    }

    if (filterType === "category") {
      setSelectedCategory("all");
    }

    if (filterType === "brand") {
      setSelectedBrand("all");
    }

    if (filterType === "sort") {
      setSortOption("default");
    }
  };

  const visibleProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  const hasActiveFilters =
    searchTerm.trim() ||
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    sortOption !== "default";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Discover
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Products
          </h1>

          <p className="mt-2 text-gray-500">
            Browse our collection of products and find
            exactly what you need.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">

            {/* Search */}
            <div className="relative md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Search Products
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(
                      () => setShowSuggestions(false),
                      150
                    )
                  }
                  placeholder="Search products, categories or brands..."
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setShowSuggestions(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 transition hover:text-gray-700"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Live Suggestions */}
              {showSuggestions &&
                searchTerm.trim() &&
                suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                    {suggestions.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onMouseDown={() => {
                          setSearchTerm(product.title);
                          setShowSuggestions(false);
                        }}
                        className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-gray-50"
                      >
                        <img
                          src={product.thumbnail}
                          alt=""
                          className="h-10 w-10 rounded-lg bg-gray-100 object-contain"
                        />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {product.title}
                          </p>

                          <p className="mt-1 text-xs capitalize text-gray-500">
                            {product.category}
                            {product.brand
                              ? ` • ${product.brand}`
                              : ""}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

              {showSuggestions &&
                searchTerm.trim() &&
                suggestions.length === 0 &&
                !loading && (
                  <div className="absolute left-0 right-0 top-full z-30 mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                    <p className="text-sm text-gray-500">
                      No matching products found.
                    </p>
                  </div>
                )}
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
              </label>

              <select
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 capitalize outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category === "all"
                      ? "All Categories"
                      : category.replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Brand
              </label>

              <select
                value={selectedBrand}
                onChange={(event) =>
                  setSelectedBrand(event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 capitalize outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {brands.map((brand) => (
                  <option
                    key={brand}
                    value={brand}
                  >
                    {brand === "all"
                      ? "All Brands"
                      : brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Sort By
              </label>

              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="default">
                  Default
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="name-az">
                  Name: A to Z
                </option>

                <option value="name-za">
                  Name: Z to A
                </option>
              </select>
            </div>
          </div>

          {/* Applied Filters */}
          {hasActiveFilters && (
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-5">
              <span className="mr-1 text-sm font-medium text-gray-600">
                Applied filters:
              </span>

              {searchTerm.trim() && (
                <button
                  onClick={() => removeFilter("search")}
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                >
                  Search: {searchTerm} ×
                </button>
              )}

              {selectedCategory !== "all" && (
                <button
                  onClick={() =>
                    removeFilter("category")
                  }
                  className="rounded-full bg-purple-50 px-3 py-1.5 text-sm font-medium capitalize text-purple-700 transition hover:bg-purple-100"
                >
                  Category:{" "}
                  {selectedCategory.replace("-", " ")} ×
                </button>
              )}

              {selectedBrand !== "all" && (
                <button
                  onClick={() => removeFilter("brand")}
                  className="rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition hover:bg-green-100"
                >
                  Brand: {selectedBrand} ×
                </button>
              )}

              {sortOption !== "default" && (
                <button
                  onClick={() => removeFilter("sort")}
                  className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 transition hover:bg-orange-100"
                >
                  Sort applied ×
                </button>
              )}

              <button
                onClick={resetFilters}
                className="ml-auto text-sm font-semibold text-gray-500 transition hover:text-red-500"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <div className="h-64 animate-pulse bg-gray-200" />

                  <div className="space-y-3 p-5">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200" />
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl bg-red-50 p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
              ⚠️
            </div>

            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-red-600">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              /* Empty State */
              <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
                  🔍
                </div>

                <h2 className="mt-6 text-2xl font-bold text-gray-900">
                  No products found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-gray-500">
                  We couldn't find products matching your
                  current search or filters. Try a different
                  search or clear your filters.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-6 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                {/* Result Header */}
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {Math.min(
                        visibleCount,
                        filteredProducts.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredProducts.length}
                    </span>{" "}
                    {filteredProducts.length === 1
                      ? "product"
                      : "products"}
                  </p>

                  {debouncedSearch && (
                    <p className="text-sm text-gray-500">
                      Results for{" "}
                      <span className="font-semibold text-gray-900">
                        "{debouncedSearch}"
                      </span>
                    </p>
                  )}
                </div>

                {/* Product Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>

                {/* Load More */}
                {visibleCount <
                  filteredProducts.length && (
                  <div className="mt-10 text-center">
                    <button
                      onClick={() =>
                        setVisibleCount(
                          (current) => current + 12
                        )
                      }
                      className="rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
                    >
                      Load More
                    </button>
                  </div>
                )}

                {/* End Message */}
                {visibleCount >=
                  filteredProducts.length &&
                  filteredProducts.length > 12 && (
                    <p className="mt-8 text-center text-sm text-gray-400">
                      You've reached the end of the results.
                    </p>
                  )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Products;