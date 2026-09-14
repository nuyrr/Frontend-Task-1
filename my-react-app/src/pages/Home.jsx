import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const HOME_PRODUCTS_CACHE = "supermart_home_products";
const HOME_PRODUCTS_CACHE_TIME = "supermart_home_products_time";

// Fallback products used when DummyJSON is temporarily unavailable
const fallbackProducts = [
  {
    id: 1,
    title: "Essence Mascara Lash Princess",
    price: 9.99,
    rating: 4.94,
    stock: 99,
    brand: "Essence",
    category: "beauty",
    discountPercentage: 7.17,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  },
  {
    id: 2,
    title: "Eyeshadow Palette with Mirror",
    price: 19.99,
    rating: 3.28,
    stock: 44,
    brand: "Glamour Beauty",
    category: "beauty",
    discountPercentage: 5.5,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
  },
  {
    id: 3,
    title: "Powder Canister",
    price: 14.99,
    rating: 4.64,
    stock: 59,
    brand: "Velvet Touch",
    category: "beauty",
    discountPercentage: 13.58,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
  },
  {
    id: 4,
    title: "Red Lipstick",
    price: 12.99,
    rating: 4.36,
    stock: 91,
    brand: "Chic Cosmetics",
    category: "beauty",
    discountPercentage: 8.4,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
  },
  {
    id: 5,
    title: "Red Nail Polish",
    price: 8.99,
    rating: 4.32,
    stock: 71,
    brand: "Nail Couture",
    category: "beauty",
    discountPercentage: 6.12,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp",
  },
  {
    id: 6,
    title: "Calvin Klein CK One",
    price: 49.99,
    rating: 4.37,
    stock: 17,
    brand: "Calvin Klein",
    category: "fragrances",
    discountPercentage: 10.5,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
  },
  {
    id: 7,
    title: "Chanel Coco Noir Eau De",
    price: 129.99,
    rating: 4.26,
    stock: 41,
    brand: "Chanel",
    category: "fragrances",
    discountPercentage: 14.7,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
  },
  {
    id: 8,
    title: "Dior J'adore",
    price: 89.99,
    rating: 4.31,
    stock: 34,
    brand: "Dior",
    category: "fragrances",
    discountPercentage: 15.2,
    thumbnail:
      "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
  },
];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ , setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        // -----------------------------------------
        // 1. Check local cache first
        // -----------------------------------------
        const cachedProducts = localStorage.getItem(
          HOME_PRODUCTS_CACHE
        );

        const cachedTime = localStorage.getItem(
          HOME_PRODUCTS_CACHE_TIME
        );

        const cacheAge = cachedTime
          ? Date.now() - Number(cachedTime)
          : Infinity;

        if (
          cachedProducts &&
          cacheAge < 10 * 60 * 1000
        ) {
          try {
            const parsedProducts = JSON.parse(cachedProducts);

            if (!cancelled && Array.isArray(parsedProducts)) {
              setProducts(parsedProducts);
              setLoading(false);
              return;
            }
          } catch {
            localStorage.removeItem(HOME_PRODUCTS_CACHE);
            localStorage.removeItem(
              HOME_PRODUCTS_CACHE_TIME
            );
          }
        }

        // -----------------------------------------
        // 2. Try API
        // -----------------------------------------
        const response = await fetch(
          "/api/products?limit=20"
        );

        if (!response.ok) {
          throw new Error(`API_ERROR_${response.status}`);
        }

        const data = await response.json();

        if (
          !data.products ||
          !Array.isArray(data.products)
        ) {
          throw new Error("INVALID_API_RESPONSE");
        }

        if (!cancelled) {
          setProducts(data.products);
          setUsingFallback(false);

          // Save successful response
          localStorage.setItem(
            HOME_PRODUCTS_CACHE,
            JSON.stringify(data.products)
          );

          localStorage.setItem(
            HOME_PRODUCTS_CACHE_TIME,
            Date.now().toString()
          );
        }
      } catch {
        // -----------------------------------------
        // 3. Try old cache
        // -----------------------------------------
        const oldCache = localStorage.getItem(
          HOME_PRODUCTS_CACHE
        );

        if (oldCache && !cancelled) {
          try {
            const parsedProducts = JSON.parse(oldCache);

            if (Array.isArray(parsedProducts)) {
              setProducts(parsedProducts);
              setUsingFallback(false);
            } else {
              setProducts(fallbackProducts);
              setUsingFallback(true);
            }
          } catch {
            setProducts(fallbackProducts);
            setUsingFallback(true);
          }
        } else if (!cancelled) {
          // -----------------------------------------
          // 4. Final fallback
          // -----------------------------------------
          setProducts(fallbackProducts);
          setUsingFallback(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [setUsingFallback]);

  // Flash sale products
  const flashSaleProducts = [...products]
    .sort(
      (a, b) =>
        (b.discountPercentage || 0) -
        (a.discountPercentage || 0)
    )
    .slice(0, 4);

  // Trending products
  const trendingProducts = products.slice(0, 8);

  // Categories
  const categories = [
    ...new Set(
      products.map((product) => product.category)
    ),
  ].slice(0, 8);

  // Brands
  const brands = [
    ...new Set(
      products
        .map((product) => product.brand)
        .filter(Boolean)
    ),
  ].slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HERO ================= */}
      <section className="bg-gray-900">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">

          <div className="text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-400">
              Welcome to SuperMart
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Everything you need.
              <span className="block text-blue-400">
                All in one place.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-gray-300">
              Discover amazing products, exclusive deals,
              and everyday essentials at great prices.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/products"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="rounded-xl border border-gray-500 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-gray-900"
              >
                Explore Products
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative flex h-72 w-full max-w-md items-center justify-center overflow-hidden rounded-3xl bg-white/10 p-8 backdrop-blur-sm sm:h-80">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
                  Special Offer
                </p>

                <p className="mt-3 text-6xl font-black text-white">
                  50%
                </p>

                <p className="mt-2 text-xl font-semibold text-white">
                  OFF
                </p>

                <p className="mt-3 text-sm text-gray-300">
                  On selected products
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FLASH SALE ================= */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-500">
              Limited Time
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              Flash Sale ⚡
            </h2>
          </div>

          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {flashSaleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">

          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Explore
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              Shop By Category
            </h2>

            <p className="mt-2 text-gray-500">
              Find what you're looking for quickly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(
                  category
                )}`}
                className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center transition hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm transition group-hover:scale-110">
                  🛍️
                </div>

                <h3 className="mt-4 font-semibold capitalize text-gray-900">
                  {category.replace("-", " ")}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Shop now →
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TRENDING PRODUCTS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-12">

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Popular Now
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              Trending Products
            </h2>
          </div>

          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </section>

      {/* ================= BRAND STRIP ================= */}
      <section className="border-y border-gray-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">

          <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
            Popular Brands
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {brands.map((brand) => (
              <Link
                key={brand}
                to={`/products?brand=${encodeURIComponent(brand)}`}
                className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
              >
                {brand}
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="bg-gray-900 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            Stay Updated
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Get the latest deals
          </h2>

          <p className="mt-3 text-gray-400">
            Subscribe to our newsletter and never miss an
            exclusive offer.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              alert("Thanks for subscribing!");
            }}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              className="flex-1 rounded-xl border border-gray-700 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>

        </div>
      </section>

    </div>
  );
}

export default Home;